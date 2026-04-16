import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-lg font-semibold text-slate-800 hover:text-sky-600"
            >
              Strona główna
            </Link>
            <Link
              href="/items"
              className="text-sm text-slate-700 hover:text-sky-600"
            >
              Lista produktów
            </Link>
            <Link
              href="/stats"
              className="text-sm text-slate-700 hover:text-sky-600"
            >
              Statystyki
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
