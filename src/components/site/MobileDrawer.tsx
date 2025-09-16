'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/navigation';
import HeaderCTA from './HeaderCTA';
import Button from '../Button';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  hamburgerRef?: React.RefObject<HTMLButtonElement>;
}

export default function MobileDrawer({ isOpen, onClose, hamburgerRef }: MobileDrawerProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);

  // Handle focus trap
  useEffect(() => {
    if (!isOpen) return;

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = drawerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', trapFocus);
    document.addEventListener('keydown', handleEscape);

    // Focus the close button when drawer opens
    setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', trapFocus);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Return focus to hamburger when closed
  useEffect(() => {
    if (!isOpen && hamburgerRef?.current) {
      hamburgerRef.current.focus();
    }
  }, [isOpen, hamburgerRef]);

  const handleLinkClick = (href: string) => {
    // Fire analytics for navigation link clicks
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'header_link_click', {
        event_category: 'navigation',
        path: href
      });
    }
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const drawerClasses = `
    fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm
    transition-all duration-300 ease-in-out
    ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
    motion-reduce:transition-none
  `;

  const panelClasses = `
    fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
    motion-reduce:transition-none
    overflow-y-auto
  `;

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={drawerClasses}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-heading"
    >
      <div ref={drawerRef} className={panelClasses}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sage-200 bg-sage-50">
          <h2
            ref={headingRef}
            id="drawer-heading"
            className="font-heading font-bold text-forest-800 text-xl"
          >
            Menu
          </h2>
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="p-2 rounded-lg text-ink-700 hover:text-forest-700 hover:bg-sage-100 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* CTA for mobile - first item */}
          <div className="mb-6 sm:hidden">
            <HeaderCTA onMenuClose={onClose} />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item, index) => {
              const isActive = pathname === item.href;
              const isLast = index === NAV_ITEMS.length - 1;

              return (
                <Link
                  key={item.href}
                  ref={isLast ? lastFocusableRef : undefined}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`
                    block py-3 px-3 text-lg font-medium rounded-md transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2
                    ${isActive
                      ? 'text-forest-700 bg-forest-50 font-semibold'
                      : 'text-ink-700 hover:text-forest-600 hover:bg-sage-50'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTAs for mobile */}
          <div className="mt-8 space-y-3 sm:hidden">
            <Button
              as="link"
              href="/register"
              size="md"
              variant="primary"
              className="w-full justify-center"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'header_cta_register', {
                    event_category: 'engagement',
                    event_label: 'mobile_drawer'
                  });
                }
                onClose();
              }}
            >
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}