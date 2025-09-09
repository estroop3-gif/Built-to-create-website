'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-stone/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-forest">Built to Create Project</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-charcoal hover:text-forest transition-colors duration-200">
              Home
            </Link>
            <Link href="/itinerary" className="text-charcoal hover:text-forest transition-colors duration-200">
              Itinerary
            </Link>
            <Link href="/pricing" className="text-charcoal hover:text-forest transition-colors duration-200">
              Pricing
            </Link>
            <Link href="/packing" className="text-charcoal hover:text-forest transition-colors duration-200">
              Packing
            </Link>
            <Link href="/faq" className="text-charcoal hover:text-forest transition-colors duration-200">
              FAQ
            </Link>
            <Link href="/register" className="bg-forest text-cream px-6 py-2 rounded-full hover:bg-moss transition-colors duration-200">
              Register
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-charcoal hover:text-forest"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-cream border-t border-stone/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-charcoal hover:text-forest transition-colors duration-200">
              Home
            </Link>
            <Link href="/itinerary" className="block px-3 py-2 text-charcoal hover:text-forest transition-colors duration-200">
              Itinerary
            </Link>
            <Link href="/pricing" className="block px-3 py-2 text-charcoal hover:text-forest transition-colors duration-200">
              Pricing
            </Link>
            <Link href="/packing" className="block px-3 py-2 text-charcoal hover:text-forest transition-colors duration-200">
              Packing
            </Link>
            <Link href="/faq" className="block px-3 py-2 text-charcoal hover:text-forest transition-colors duration-200">
              FAQ
            </Link>
            <Link href="/register" className="block px-3 py-2 text-charcoal hover:text-forest transition-colors duration-200">
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}