'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, NavItem } from '@/lib/navigation';
import HeaderCTA from './HeaderCTA';
import Button from '../Button';
import { User } from '@supabase/supabase-js';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  hamburgerRef?: React.RefObject<HTMLButtonElement | null>;
  user?: User | null;
}

export default function MobileDrawer({ isOpen, onClose, hamburgerRef, user }: MobileDrawerProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

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

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
  };

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
              const isLast = index === NAV_ITEMS.length - 1 && !user;

              if (item.children) {
                // Dropdown item
                const isDropdownOpen = openDropdowns.includes(item.label);
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="w-full flex items-center justify-between py-3 px-3 text-lg font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 text-ink-700 hover:text-forest-600 hover:bg-sage-50"
                      aria-expanded={isDropdownOpen}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isDropdownOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child, childIndex) => {
                          const isChildActive = pathname === child.href;
                          const isChildLast = isLast && childIndex === item.children!.length - 1;

                          return (
                            <Link
                              key={child.href}
                              ref={isChildLast ? lastFocusableRef : undefined}
                              href={child.href!}
                              onClick={() => handleLinkClick(child.href!)}
                              className={`
                                block py-2 px-3 text-base font-medium rounded-md transition-colors duration-200
                                focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2
                                ${isChildActive
                                  ? 'text-forest-700 bg-forest-50 font-semibold'
                                  : 'text-ink-600 hover:text-forest-600 hover:bg-sage-50'
                                }
                              `}
                              aria-current={isChildActive ? 'page' : undefined}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              } else {
                // Regular link
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
              }
            })}

            {/* Account and Admin Links for Authenticated Users */}
            {user && (
              <>
                <Link
                  href="/account"
                  onClick={() => handleLinkClick('/account')}
                  className={`
                    block py-3 px-3 text-lg font-medium rounded-md transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2
                    ${pathname === '/account' || pathname.startsWith('/account/')
                      ? 'text-forest-700 bg-forest-50 font-semibold'
                      : 'text-ink-700 hover:text-forest-600 hover:bg-sage-50'
                    }
                  `}
                  aria-current={pathname === '/account' || pathname.startsWith('/account/') ? 'page' : undefined}
                >
                  Account
                </Link>

                {/* Admin Link - will be shown/hidden based on user permissions via CSS or conditional rendering */}
                <Link
                  ref={lastFocusableRef}
                  href="/admin"
                  onClick={() => handleLinkClick('/admin')}
                  className={`
                    admin-only-link block py-3 px-3 text-lg font-medium rounded-md transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2
                    ${pathname === '/admin' || pathname.startsWith('/admin/')
                      ? 'text-forest-700 bg-forest-50 font-semibold'
                      : 'text-ink-700 hover:text-forest-600 hover:bg-sage-50'
                    }
                  `}
                  aria-current={pathname === '/admin' || pathname.startsWith('/admin/') ? 'page' : undefined}
                  style={{ display: 'none' }}
                >
                  Admin
                </Link>
              </>
            )}
          </nav>

          {/* CTAs for mobile */}
          <div className="mt-8 space-y-3 sm:hidden">
            {user ? (
              <div
                onClick={() => {
                  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
                    (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag('event', 'header_cta_account', {
                      event_category: 'engagement',
                      event_label: 'mobile_drawer'
                    });
                  }
                  onClose();
                }}
              >
                <Button
                  as="link"
                  href="/account"
                  size="md"
                  variant="primary"
                  className="w-full justify-center"
                >
                  My Account
                </Button>
              </div>
            ) : (
              <>
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
                <div
                  onClick={() => {
                    onClose();
                  }}
                >
                  <Button
                    as="link"
                    href="/auth/login"
                    size="md"
                    variant="ghost"
                    className="w-full justify-center"
                  >
                    Sign In
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}