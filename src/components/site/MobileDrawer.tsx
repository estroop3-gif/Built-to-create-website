'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, NavItem } from '@/lib/navigation';
import HeaderCTA from './HeaderCTA';
import Button from '../Button';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  hamburgerRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function MobileDrawer({ isOpen, onClose, hamburgerRef }: MobileDrawerProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

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
    // Fire analytics for navigation link clicks (production only)
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
      (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag('event', 'header_link_click', {
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

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
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
              const isLast = index === NAV_ITEMS.length - 1;

              // If item has children (dropdown), render as expandable button + submenu
              if (item.children) {
                const isExpanded = expandedItems.includes(item.label);
                const hasActiveChild = item.children.some(child => pathname === child.href);

                return (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={`
                        w-full flex items-center justify-between py-3 px-3 text-lg font-medium rounded-md transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2
                        ${hasActiveChild
                          ? 'text-forest-700 bg-forest-50 font-semibold'
                          : 'text-ink-700 hover:text-forest-600 hover:bg-sage-50'
                        }
                      `}
                      aria-expanded={isExpanded}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => {
                          const isActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href!}
                              onClick={() => handleLinkClick(child.href!)}
                              className={`
                                block py-2 px-3 text-base font-medium rounded-md transition-colors duration-200
                                focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2
                                ${isActive
                                  ? 'text-forest-700 bg-forest-50 font-semibold'
                                  : 'text-ink-600 hover:text-forest-600 hover:bg-sage-50'
                                }
                              `}
                              aria-current={isActive ? 'page' : undefined}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Regular nav item (no dropdown)
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  ref={isLast ? lastFocusableRef : undefined}
                  href={item.href!}
                  onClick={() => handleLinkClick(item.href!)}
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
            <div
              onClick={() => {
                if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
                  (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag('event', 'header_cta_register', {
                    event_category: 'engagement',
                    event_label: 'mobile_drawer'
                  });
                }
                onClose();
              }}
            >
              <Button
                as="link"
                href="/register"
                size="md"
                variant="primary"
                className="w-full justify-center"
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}