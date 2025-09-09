import Container from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'cream' | 'sand' | 'sage' | 'forest';
}

const spacingClasses = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-20 lg:py-24',
  lg: 'py-20 sm:py-24 lg:py-32',
  xl: 'py-24 sm:py-32 lg:py-40',
};

const backgroundClasses = {
  white: 'bg-white',
  cream: 'bg-cream-100 paper-texture',
  sand: 'bg-sand-100 paper-texture',
  sage: 'bg-sage-50 nature-texture',
  forest: 'bg-forest-50 nature-texture',
};

export default function Section({ 
  children, 
  className = '',
  containerSize = 'lg',
  spacing = 'lg',
  background = 'white'
}: SectionProps) {
  return (
    <section className={`w-full ${spacingClasses[spacing]} ${backgroundClasses[background]} ${className}`}>
      <Container size={containerSize}>
        <div className="flex flex-col items-center text-center">
          {children}
        </div>
      </Container>
    </section>
  );
}