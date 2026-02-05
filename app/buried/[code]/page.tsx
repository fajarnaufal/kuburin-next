import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CopyButton from '@/components/CopyButton';
import ExpirationDate from '@/components/ExpirationDate';

export default async function BuriedPage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    const link = await prisma.link.findUnique({
        where: { shortCode: code },
    });

    if (!link) {
        notFound();
    }


    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const shortUrl = `${baseUrl}/${link.shortCode}`;

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
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

                    <div className="bg-kubur-gray p-4 rounded border border-gray-700 mb-6 flex flex-col sm:flex-row items-center gap-3">
                        <code className="text-kubur-accent font-mono text-sm sm:text-lg truncate max-w-full flex-1 text-center sm:text-left" title={shortUrl}>{shortUrl}</code>
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
                    <div className="mt-6 flex justify-between items-center text-xs text-gray-400">
                        <ExpirationDate date={link.expiresAt} />
                        <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {link.clickCount} visits
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
}
