import Hero from '@/components/Hero';
import Section from '@/components/Section';
import FeatureGrid from '@/components/FeatureGrid';
import PricingCards from '@/components/PricingCards';
import EquipmentList from '@/components/EquipmentList';
import GalleryGrid from '@/components/GalleryGrid';
import Link from 'next/link';

export const metadata = {
  title: 'Costa Rica Experience — The Born to Create Project',
  description: 'Costa Rica 9-Day Filmmaking Retreat — Two sessions: February 13-21 & April 17-25, 2026',
};

export default function CostaRicaExperience() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Secondary Navigation for Costa Rica sub-pages */}
      <Section spacing="sm" background="cream">
        <div className="max-w-7xl mx-auto">
          <nav className="flex flex-wrap justify-center gap-4">
            <Link
              href="/experience"
              className="px-6 py-2 text-base font-medium text-ink-700 hover:text-forest-700 hover:bg-sage-100 rounded-full transition-colors duration-200"
            >
              The Experience
            </Link>
            <Link
              href="/itinerary"
              className="px-6 py-2 text-base font-medium text-ink-700 hover:text-forest-700 hover:bg-sage-100 rounded-full transition-colors duration-200"
            >
              Itinerary
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-2 text-base font-medium text-ink-700 hover:text-forest-700 hover:bg-sage-100 rounded-full transition-colors duration-200"
            >
              Pricing
            </Link>
            <Link
              href="/packing"
              className="px-6 py-2 text-base font-medium text-ink-700 hover:text-forest-700 hover:bg-sage-100 rounded-full transition-colors duration-200"
            >
              Packing
            </Link>
            <Link
              href="/travel"
              className="px-6 py-2 text-base font-medium text-ink-700 hover:text-forest-700 hover:bg-sage-100 rounded-full transition-colors duration-200"
            >
              Travel
            </Link>
          </nav>
        </div>
      </Section>

      {/* Features Section */}
      <Section spacing="xl" background="white">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
            Why Choose The Born to Create Project?
          </h2>
          <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
            More than just a filmmaking workshop—this is a transformative journey
            that combines technical mastery with creative awakening.
          </p>
        </div>
        <FeatureGrid />
      </Section>

      {/* Pricing Section */}
      <Section spacing="xl" background="sage">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
            Secure Your Spot
          </h2>
          <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
            Choose the pricing tier that works for you. All tiers include the complete
            professional equipment kit worth over $2,800.
          </p>
        </div>
        <PricingCards />
      </Section>

      {/* Equipment Section */}
      <Section spacing="xl" background="cream">
        <EquipmentList />
      </Section>

      {/* Gallery Section */}
      <Section spacing="xl" background="white">
        <GalleryGrid />
      </Section>
    </main>
  );
}
