import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CopyButton from '@/components/CopyButton';

export default async function BuriedPage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    const link = await prisma.link.findUnique({
        where: { shortCode: code },
    });

    if (!link) {
        notFound();
    }

    // Determine base URL (environment variable or default)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const shortUrl = `${baseUrl}/${link.shortCode}`;

    return (
        <main className="min-h-screen bg-graveyard flex items-center justify-center p-4">
            <div className="w-full max-w-lg z-10 text-center">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-wider text-gray-200">
                        kubur<span className="text-kubur-accent">in</span>
                    </h1>
                </div>

                <div className="bg-kubur-card p-8 rounded-lg shadow-lg border border-gray-800">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-kubur-gray rounded-full flex items-center justify-center mx-auto mb-4 border border-kubur-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-kubur-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Rest in Peace</h2>
                        <p className="text-gray-400">The link has been buried successfully.</p>
                    </div>

                    <div className="bg-kubur-gray p-4 rounded border border-gray-700 mb-6 flex items-center justify-between">
                        <code className="text-kubur-accent font-mono text-lg">{shortUrl}</code>
                        <CopyButton text={shortUrl} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            href="/"
                            className="block w-full text-center bg-transparent border border-gray-600 text-gray-300 font-bold py-3 rounded-md hover:bg-gray-800 transition"
                        >
                            Bury Another
                        </Link>
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="block w-full text-center bg-kubur-accent text-white font-bold py-3 rounded-md hover:bg-violet-600 transition"
                        >
                            Visit Link
                        </a>
                    </div>
                    <div className="mt-4 text-xs text-gray-500">
                        Expires at: {link.expiresAt ? new Date(link.expiresAt).toLocaleString() : 'Never'}
                    </div>
                </div>
            </div>
        </main>
    );
}
