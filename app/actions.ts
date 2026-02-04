'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { randomBytes } from 'node:crypto';

const schema = z.object({
    url: z.string().url('Please enter a valid URL'),
    custom_alias: z.string().optional().refine(val => !val || /^[a-zA-Z0-9-_]+$/.test(val), 'Alias can only contain letters, numbers, dashes, and underscores'),
    duration: z.enum(['8h', '24h', '3d', '7d', '30d']),
});

function generateShortCode(length = 6): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const bytes = randomBytes(length);
    let result = '';
    // Use modulo to map random bytes to charset
    for (let i = 0; i < length; i++) {
        result += chars[bytes[i] % chars.length];
    }
    return result;
}

function calculateExpiry(duration: string): Date {
    const now = new Date();
    switch (duration) {
        case '8h': return new Date(now.getTime() + 8 * 60 * 60 * 1000);
        case '24h': return new Date(now.getTime() + 24 * 60 * 60 * 1000);
        case '3d': return new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        case '7d': return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        case '30d': return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        default: return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
}

import { headers } from 'next/headers';

// ... imports

export async function buryLink(prevState: any, formData: FormData) {
    const hp = formData.get('hp');
    if (hp && typeof hp === 'string' && hp.length > 0) {
        return { message: 'Error' }; // Silent fail for bots
    }

    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || '127.0.0.1';

    // Rate Limiting
    const now = new Date();
    const prismaClient = prisma as any;

    const limit = await prismaClient.rateLimit.findUnique({ where: { ip } });

    if (limit) {
        if (limit.expiresAt < now) {
            // Reset if expired
            await prismaClient.rateLimit.update({
                where: { ip },
                data: { count: 1, expiresAt: new Date(now.getTime() + 60 * 60 * 1000) }
            });
        } else if (limit.count >= 10) { // Limit: 10 per hour
            return { message: 'Too many links created. Try again later.' };
        } else {
            await prismaClient.rateLimit.update({
                where: { ip },
                data: { count: limit.count + 1 }
            });
        }
    } else {
        await prismaClient.rateLimit.create({
            data: { ip, count: 1, expiresAt: new Date(now.getTime() + 60 * 60 * 1000) }
        });
    }

    const url = formData.get('url');
    const custom_alias = formData.get('custom_alias');
    const duration = formData.get('duration');

    const rawData = {
        url: typeof url === 'string' ? url : undefined,
        custom_alias: typeof custom_alias === 'string' && custom_alias.trim() !== '' ? custom_alias : undefined,
        duration: typeof duration === 'string' ? duration : undefined,
    };

    const result = schema.safeParse(rawData);

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
            message: 'Validation failed',
        };
    }

    const data = result.data;
    let shortCode = data.custom_alias;

    if (shortCode) {
        const existing = await prisma.link.findUnique({
            where: { shortCode: shortCode },
        });
        if (existing) {
            return {
                errors: { custom_alias: ['This alias is already taken.'] },
                message: 'Alias taken',
            };
        }
    } else {
        let unique = false;
        while (!unique) {
            shortCode = generateShortCode();
            const existing = await prisma.link.findUnique({
                where: { shortCode: shortCode },
            });
            if (!existing) unique = true;
        }
    }

    // Double check shortCode is not null/undefined
    if (!shortCode) return { message: 'Failed to generate code' };

    try {
        await prisma.link.create({
            data: {
                originalUrl: data.url,
                shortCode: shortCode,
                expiresAt: calculateExpiry(data.duration),
            },
        });
    } catch (e) {
        return { message: 'Database error' };
    }

    redirect(`/buried/${shortCode}`);
}
