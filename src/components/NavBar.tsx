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
  
  const handleMenuToggle = () => {
    console.log('Menu toggle clicked, current state:', isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
    console.log('Menu state will be:', !isMenuOpen);
  };
  
  useEffect(() => {
    console.log('useEffect triggered, isMenuOpen:', isMenuOpen);
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
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
            onClick={handleMenuToggle}
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

      {/* Mobile Navigation Overlay - Debug version */}
      <div 
        id="mobile-menu"
        className={`fixed inset-0 z-[9999] transition-transform duration-300 lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          display: isMenuOpen ? 'block' : 'none',
          backgroundColor: '#ffffff',
          width: '100vw',
          height: '100vh'
        }}
      >
        <div className="flex items-center justify-between p-4 border-b-2 border-sage-300 bg-sage-50">
          <span className="font-heading font-bold text-forest-800 text-xl">MENU</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-lg text-ink-700"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 bg-white min-h-screen">
          {/* Navigation Links */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 px-2 text-lg font-medium text-ink-700 hover:text-forest-600 hover:bg-sage-50 border-b border-sage-200 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          {/* CTAs */}
          <div className="mt-6 space-y-3">
            <Link 
              href="/subscribe" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full py-3 px-4 text-center bg-sage-100 text-forest-700 rounded-lg font-medium"
            >
              Join Email List
            </Link>
            <Link 
              href="/register" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full py-3 px-4 text-center bg-forest-700 text-white rounded-lg font-medium"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}