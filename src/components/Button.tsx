import Link from 'next/link';
import { forwardRef } from 'react';

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

interface ButtonAsLinkProps extends BaseButtonProps {
  as: 'link';
  href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantClasses = {
  primary: 'bg-forest-700 text-cream-100 hover:bg-forest-800 hover:-translate-y-0.5 focus:ring-forest-500 shadow-button hover:shadow-button-hover',
  secondary: 'bg-sand-200 text-ink-900 hover:bg-sand-300 hover:-translate-y-0.5 focus:ring-sand-400 shadow-soft hover:shadow-card',
  ghost: 'bg-transparent text-cream-100 hover:bg-white/10 focus:ring-cream-300 border-2 border-cream-200/40 hover:border-cream-200/60 backdrop-blur-sm',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm font-medium',
  md: 'px-6 py-3 text-base font-semibold',
  lg: 'px-8 py-4 text-lg font-semibold',
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ children, className = '', variant = 'primary', size = 'md', disabled = false, ...props }, ref) => {
    const baseClasses = `
      inline-flex items-center justify-center
      rounded-full
      transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      font-heading tracking-wide
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    if (props.as === 'link') {
      return (
        <Link
          href={props.href}
          className={baseClasses}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        type={props.type || 'button'}
        onClick={props.onClick}
        disabled={disabled}
        className={baseClasses}
        ref={ref as React.Ref<HTMLButtonElement>}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;