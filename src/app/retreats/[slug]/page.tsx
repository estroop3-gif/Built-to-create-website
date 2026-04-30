import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getRetreat, getAllRetreats, experienceToRetreatData } from '@/lib/retreats';
import { getExperienceBySlug } from '@/lib/services/experienceService';
import RetreatHero from '@/components/retreats/RetreatHero';
import RetreatOverview from '@/components/retreats/RetreatOverview';
import RetreatLearning from '@/components/retreats/RetreatLearning';
import RetreatItinerary from '@/components/retreats/RetreatItinerary';
import RetreatGear from '@/components/retreats/RetreatGear';
import RetreatFAQ from '@/components/retreats/RetreatFAQ';
import RetreatCTA from '@/components/retreats/RetreatCTA';

export const revalidate = 60;

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

async function getRetreatData(slug: string) {
  const hardcoded = getRetreat(slug);
  try {
    const experience = await getExperienceBySlug(slug);
    if (experience) {
      return experienceToRetreatData(experience, hardcoded);
    }
  } catch {
    // DB unavailable — fall through to hardcoded
  }
  return hardcoded;
}

export async function generateMetadata({ params }: RetreatPageProps): Promise<Metadata> {
  const { slug } = await params;
  const retreat = await getRetreatData(slug);

  if (!retreat) {
    return {
      title: 'Retreat Not Found',
      description: 'The requested retreat could not be found.',
    };
  }

  return {
    title: `${retreat.title} — The Born to Create Project`,
    description: retreat.seoDescription,
    openGraph: {
      title: `${retreat.title} — The Born to Create Project`,
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
      title: `${retreat.title} — The Born to Create Project`,
      description: retreat.seoDescription,
      images: [retreat.ogImage],
    },
  };
}

export default async function RetreatPage({ params }: RetreatPageProps) {
  const { slug } = await params;
  const retreat = await getRetreatData(slug);

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
