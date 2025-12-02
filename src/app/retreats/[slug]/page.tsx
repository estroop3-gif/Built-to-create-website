import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getRetreat, getAllRetreats, formatDateRange } from '@/lib/retreats';
import RetreatHero from '@/components/retreats/RetreatHero';
import RetreatOverview from '@/components/retreats/RetreatOverview';
import RetreatLearning from '@/components/retreats/RetreatLearning';
import RetreatItinerary from '@/components/retreats/RetreatItinerary';
import RetreatGear from '@/components/retreats/RetreatGear';
import RetreatFAQ from '@/components/retreats/RetreatFAQ';
import RetreatCTA from '@/components/retreats/RetreatCTA';

interface RetreatPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const retreats = getAllRetreats();
  return retreats.map((retreat) => ({
    slug: retreat.slug,
  }));
}

export async function generateMetadata({ params }: RetreatPageProps): Promise<Metadata> {
  const { slug } = await params;
  const retreat = getRetreat(slug);

  if (!retreat) {
    return {
      title: 'Retreat Not Found',
      description: 'The requested retreat could not be found.',
    };
  }

  return {
    title: `${retreat.title} — Born to Create Project`,
    description: retreat.seoDescription,
    openGraph: {
      title: `${retreat.title} — Born to Create Project`,
      description: retreat.seoDescription,
      images: [
        {
          url: retreat.ogImage,
          width: 1200,
          height: 630,
          alt: `${retreat.title} - Born to Create Project`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${retreat.title} — Born to Create Project`,
      description: retreat.seoDescription,
      images: [retreat.ogImage],
    },
  };
}

export default async function RetreatPage({ params }: RetreatPageProps) {
  const { slug } = await params;
  const retreat = getRetreat(slug);

  if (!retreat) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <RetreatHero retreat={retreat} />

      {/* Overview Section */}
      <RetreatOverview retreat={retreat} />

      {/* What You'll Learn Section */}
      <RetreatLearning retreat={retreat} />

      {/* Itinerary Section */}
      <RetreatItinerary retreat={retreat} />

      {/* Gear Section */}
      <RetreatGear retreat={retreat} />

      {/* FAQ Section */}
      <RetreatFAQ retreat={retreat} />

      {/* CTA Section */}
      <RetreatCTA retreat={retreat} />
    </main>
  );
}