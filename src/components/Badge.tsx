interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'forest' | 'sage';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'bg-ink-100 text-ink-800',
  success: 'bg-forest-100 text-forest-800',
  warning: 'bg-sand-200 text-sand-900',
  info: 'bg-sage-100 text-sage-800',
  forest: 'bg-forest-700 text-cream-100',
  sage: 'bg-sage-500 text-white',
};

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
};

export default function Badge({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'sm'
}: BadgeProps) {
  return (
    <span 
      className={`
        inline-flex items-center
        rounded-full
        font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </span>
  );
}