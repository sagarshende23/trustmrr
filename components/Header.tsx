"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-900 bg-black">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center max-w-[1800px] relative">
        <Link 
          href="/" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-xl">⭐</span>
          <span className="text-lg font-bold text-white">TrustMRR</span>
        </Link>
        <button
          className="text-xs px-2 py-1 text-gray-500 hover:text-white transition-colors absolute right-4"
          aria-label="Toggle theme"
        >
          Theme
        </button>
      </div>
    </header>
  );
}
