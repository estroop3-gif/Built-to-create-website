'use client';

import Link from 'next/link';
import { useState } from 'react';
import Container from './Container';
import Button from './Button';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/itinerary', label: 'Itinerary' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/packing', label: 'Packing' },
  { href: '/travel', label: 'Travel' },
  { href: '/faq', label: 'FAQ' },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-sage-200 shadow-soft">
      <Container size="xl">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-heading text-2xl font-bold text-forest-800 hover:text-forest-900 transition-colors duration-200"
          >
            Built to Create Project
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body font-medium text-ink-700 hover:text-forest-600 transition-colors duration-200 py-2 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button for Desktop */}
          <div className="hidden lg:block">
            <Button as="link" href="/register" size="md" variant="primary">
              Register
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-ink-700 hover:text-forest-700 hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-all duration-200"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
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
      </Container>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-sm border-t border-sage-200 shadow-soft">
          <Container>
            <div className="py-8 space-y-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block font-body font-medium text-ink-700 hover:text-forest-600 transition-colors duration-200 py-3 border-b border-sage-100 last:border-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {/* Mobile CTA Button */}
              <div className="pt-4">
                <Button 
                  as="link" 
                  href="/register" 
                  size="lg" 
                  variant="primary" 
                  className="w-full justify-center"
                >
                  Register Now
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
}