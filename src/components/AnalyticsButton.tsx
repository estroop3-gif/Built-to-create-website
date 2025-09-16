'use client';

import Button from './Button';

interface AnalyticsButtonProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  eventName: string;
  children: React.ReactNode;
}

export default function AnalyticsButton({
  href,
  variant = 'primary',
  size = 'md',
  eventName,
  children
}: AnalyticsButtonProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
      (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag('event', eventName, {
        event_category: 'engagement',
        event_label: 'experience_page'
      });
    }
  };

  return (
    <div onClick={handleClick}>
      <Button
        as="link"
        href={href}
        variant={variant}
        size={size}
      >
        {children}
      </Button>
    </div>
  );
}