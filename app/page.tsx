import LinkShortenerForm from '@/components/LinkShortenerForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-graveyard flex items-center justify-center p-4">
      <div className="w-full max-w-lg z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wider text-gray-200">
            kubur<span className="text-kubur-accent">in</span>
          </h1>
          <p className="text-gray-500 mt-2">Bury your links. Let them rest in peace.</p>
        </div>

        <LinkShortenerForm />

        <footer className="mt-8 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} kuburin URL Shortener by <a href="https://naufalfajar.com" target="_blank" rel="noopener noreferrer" className="text-kubur-accent hover:text-white transition-colors decoration-none font-semibold">nphew</a>
        </footer>
      </div>
    </main>
  );
}
