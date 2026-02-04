import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';

export default async function RedirectPage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;

    // Use type casting to avoid IDE errors with rateLimit if needed, though here we just access Link
    // We already fixed prisma client type in previous steps, so standard usage should be fine.
    // If not, we can assume standard prisma usage.

    const link = await prisma.link.findUnique({
        where: { shortCode: code },
    });

    if (!link) {
        notFound();
    }

    if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
        // Lazy delete
        try {
            await prisma.link.delete({
                where: { id: link.id },
            });
        } catch (e) {
            // Ignore delete errors (race conditions)
        }

        // Return 404 UI for expired links instead of raw 410 text
        notFound();
    }

    redirect(link.originalUrl);
}
