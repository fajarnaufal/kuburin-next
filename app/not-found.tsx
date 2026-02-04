import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-graveyard flex flex-col items-center justify-center p-4 text-center z-10 relative">
            <h1 className="text-9xl font-bold text-gray-800 opacity-50 select-none">404</h1>
            <div className="absolute z-20 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-kubur-text mb-4">Link Not Found</h2>
                <p className="text-gray-400 mb-8 max-w-md">
                    This link has either decomposed, was never buried here, or has been moved to the great beyond.
                </p>
                <Link
                    href="/"
                    className="bg-kubur-accent hover:bg-violet-600 text-white font-bold py-3 px-8 rounded-md transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                >
                    Return to Graveyard
                </Link>
            </div>
        </div>
    );
}
