import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;

    const link = await prisma.link.findUnique({
        where: { shortCode: code },
    });

    if (!link) {
        // Handle 404
        return new NextResponse(null, { status: 404 });
    }

    // Check expiration
    if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
        return new NextResponse(null, { status: 410 });
    }

    const userAgent = request.headers.get('user-agent') || '';
    const isBot = /bot|spider|crawl|slurp|facebookexternalhit/i.test(userAgent);

    const visitedKey = `visited_${link.shortCode}`;
    const hasVisited = request.cookies.has(visitedKey);

    if (!isBot && !hasVisited) {
        try {
            await prisma.link.update({
                where: { id: link.id },
                data: { clickCount: { increment: 1 } },
            });
        } catch (error) {
            // connection errors
        }
    }

    const response = NextResponse.redirect(link.originalUrl);

    if (!isBot) {
        response.cookies.set(visitedKey, 'true', {
            maxAge: 3600,
            path: '/',
            httpOnly: true,
        });
    }

    return response;
}
