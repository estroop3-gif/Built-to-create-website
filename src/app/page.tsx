import HomeHero from '@/components/HomeHero';
import FilmmakingKitSection from '@/components/FilmmakingKitSection';
import LoyaltyDiscountSection from '@/components/LoyaltyDiscountSection';
import CourseTracksSection from '@/components/CourseTracksSection';
import RetreatsOverviewSection from '@/components/RetreatsOverviewSection';
import WhatYoullMakeSection from '@/components/WhatYoullMakeSection';
import OurCoreSection from '@/components/OurCoreSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import HomeFAQSection from '@/components/HomeFAQSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HomeHero />

      {/* Filmmaking Kit Section */}
      <FilmmakingKitSection />

      {/* Loyalty Discount Section */}
      <LoyaltyDiscountSection />

      {/* Online Course Tracks Section */}
      <CourseTracksSection />

      {/* Retreats Overview Section */}
      <RetreatsOverviewSection />

      {/* What You'll Make Section */}
      <WhatYoullMakeSection />

      {/* Our Core Values Section */}
      <OurCoreSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <HomeFAQSection />
    </main>
  );
}