'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
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
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.setAttribute('data-lock-scroll', 'true');
      // Simple focus trap
      const focusableElements = document.querySelectorAll(
        '#mobile-menu button, #mobile-menu a'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
        }
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      firstElement?.focus();
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.removeAttribute('data-lock-scroll');
    }
  }, [isMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-sage-200 shadow-soft">
      <Container size="xl">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-heading font-bold text-forest-800 hover:text-forest-900 transition-colors duration-200 flex flex-col"
            aria-label="THE BORN TO CREATE PROJECT"
          >
            <span className="text-xs leading-none -mb-0.5">THE</span>
            <span className="text-2xl leading-none">BORN TO CREATE</span>
            <span className="text-xs leading-none -mt-0.5 self-end">PROJECT</span>
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

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/subscribe"
              className="font-body font-medium text-ink-700 hover:text-forest-600 transition-colors duration-200 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 rounded-md"
            >
              Join the Email List
            </Link>
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
            id="mobile-menu-button"
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

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto backdrop-blur bg-white/95 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-heading"
        >
          <div className="flex items-center justify-between p-4">
            <h2 id="mobile-menu-heading" className="sr-only">Navigation Menu</h2>
            <Link 
              href="/" 
              className="font-heading font-bold text-forest-800 hover:text-forest-900 transition-colors duration-200 flex flex-col"
              aria-label="THE BORN TO CREATE PROJECT"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-xs leading-none -mb-0.5">THE</span>
              <span className="text-2xl leading-none">BORN TO CREATE</span>
              <span className="text-xs leading-none -mt-0.5 self-end">PROJECT</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-ink-700 hover:text-forest-700 hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-all duration-200"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 px-4 pb-4">
            {/* Prominent Join Email List CTA */}
            <div className="mb-8">
              <Link href="/subscribe" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="w-full justify-center"
                >
                  Join the Email List
                </Button>
              </Link>
            </div>
            
            {/* Mobile Navigation Links */}
            <div className="space-y-1 mb-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block font-body font-medium text-ink-700 hover:text-forest-600 hover:bg-sage-50 transition-all duration-200 py-4 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Mobile Register Button */}
            <div>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  size="lg" 
                  variant="primary" 
                  className="w-full justify-center"
                >
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}