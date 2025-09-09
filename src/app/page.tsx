import Hero from '@/components/Hero';
import Section from '@/components/Section';
import FeatureGrid from '@/components/FeatureGrid';
import PricingCards from '@/components/PricingCards';
import EquipmentList from '@/components/EquipmentList';
import GalleryGrid from '@/components/GalleryGrid';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Section spacing="xl" background="white">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
            Why Choose Built to Create Project?
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