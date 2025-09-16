'use client';

import Link from 'next/link';

interface HeaderCTAProps {
  onMenuClose?: () => void;
}

export default function HeaderCTA({ onMenuClose }: HeaderCTAProps) {
  const handleClick = () => {
    // Fire analytics for header CTA click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'header_cta_click', {
        event_category: 'engagement',
        event_label: 'join_email_list'
      });
    }

    if (onMenuClose) {
      onMenuClose();
    }
  };

  return (
    <Link
      href="/subscribe"
      onClick={handleClick}
      className="font-body font-medium text-ink-700 hover:text-forest-600 transition-colors duration-200 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 rounded-md"
    >
      Join the Email List
    </Link>
  );
}