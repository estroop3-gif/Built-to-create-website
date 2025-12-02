import Container from './Container';
import Button from './Button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center bg-forest-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-costa-rica.jpg"
          alt="Costa Rica landscape"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSorjrdOzW2g=="
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/70 via-forest-900/50 to-forest-800/60"></div>
      </div>
      
      {/* Content */}
      <Container className="relative z-10" size="lg">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-cream-50 mb-8 leading-tight tracking-wide mt-8">
            <span className="block">COSTA RICA</span>
            <span className="block">9-DAY FILMMAKING</span>
            <span className="block">RETREAT</span>
          </h1>
          
          {/* Supporting Text */}
          <div className="space-y-4 mb-10">
            <p className="font-body text-xl sm:text-2xl text-cream-200 font-medium">
              Two sessions: February 13–21, 2026 & April 17–25, 2026
            </p>
            <p className="font-body text-lg sm:text-xl text-cream-300 max-w-2xl mx-auto leading-relaxed">
              San José • Jacó • Santiago de Puriscal
            </p>
          </div>
          
          <p className="font-body text-base sm:text-lg text-cream-300/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Where creativity meets calling. Join us for a transformative filmmaking and storytelling retreat 
            in the heart of Costa Rica's breathtaking landscapes.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button as="link" href="/itinerary" size="lg" variant="ghost">
              View Itinerary
            </Button>
            <Button as="link" href="/register" size="lg" variant="primary">
              Register Now
            </Button>
          </div>
          
          {/* Equipment Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-cream-200/20 text-cream-100 mb-20">
            <div className="w-3 h-3 bg-forest-400 rounded-full mr-3"></div>
            <span className="font-body text-sm font-medium">
              Professional equipment kit included
            </span>
          </div>
        </div>
      </Container>
      
    </section>
  );
}