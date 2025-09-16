'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Container from '../Container';
import HeaderCTA from './HeaderCTA';
import MobileDrawer from './MobileDrawer';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const handleMenuToggle = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);

    // Fire analytics for menu open/close
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', newState ? 'header_menu_open' : 'header_menu_close', {
        event_category: 'navigation',
        event_label: 'hamburger_menu'
      });
    }
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);

    // Fire analytics for menu close
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'header_menu_close', {
        event_category: 'navigation',
        event_label: 'hamburger_menu'
      });
    }
  };

  return (
    <>
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

            {/* Right side: CTA (desktop/tablet) + Hamburger */}
            <div className="flex items-center gap-4">
              {/* Desktop/Tablet CTA */}
              <div className="hidden sm:block">
                <HeaderCTA />
              </div>

              {/* Hamburger Button - Always visible */}
              <button
                ref={hamburgerRef}
                onClick={handleMenuToggle}
                className="p-2 rounded-lg text-ink-700 hover:text-forest-700 hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 transition-all duration-200"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="navigation-drawer"
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
        </Container>
      </nav>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        hamburgerRef={hamburgerRef}
      />
    </>
  );
}