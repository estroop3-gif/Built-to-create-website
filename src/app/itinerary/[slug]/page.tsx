import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDayBySlug } from '@/lib/itinerary';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const day = getDayBySlug(slug);
  
  if (!day) {
    return {
      title: 'Day Not Found - The Born to Create Project',
    };
  }

  return {
    title: `Day ${day.id}: ${day.title} - The Born to Create Project`,
    description: `${day.theme} - ${day.spiritualAnchor}`,
  };
}

export default async function DayPage({ params }: Props) {
  const { slug } = await params;
  const day = getDayBySlug(slug);

  if (!day) {
    notFound();
  }

  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-sand nature-texture opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-forest text-cream rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl">
              {day.id}
            </div>
            {day.isTransferDay && (
              <span className="bg-charcoal/20 text-charcoal px-3 py-2 rounded text-sm font-semibold">
                Transfer Day
              </span>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4">{day.title}</h1>
          <p className="text-xl text-charcoal/70 mb-2">{day.theme}</p>
          <p className="text-lg text-sage font-semibold">{day.location}</p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/itinerary"
              className="inline-flex items-center text-forest hover:text-charcoal transition-colors"
            >
              ← Back to Itinerary
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-cream rounded-2xl p-6">
              <h2 className="text-xl font-bold text-charcoal mb-4">Spiritual Anchor</h2>
              <p className="text-charcoal/80">{day.spiritualAnchor}</p>
            </div>

            <div className="bg-sage/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-charcoal mb-4">Creative Focus</h2>
              <p className="text-charcoal/80">{day.creativeFocus}</p>
            </div>

            <div className="bg-sand/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-charcoal mb-4">Field Work & Practice</h2>
              <p className="text-charcoal/80">{day.fieldWork}</p>
            </div>

            {day.eveningTouchpoint && (
              <div className="bg-forest/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-charcoal mb-4">Evening Touchpoint</h2>
                <p className="text-charcoal/80">{day.eveningTouchpoint}</p>
              </div>
            )}
          </div>

          <div className="mt-12 flex justify-between">
            {day.id > 1 && (
              <Link 
                href={`/itinerary/day-${day.id - 1}`}
                className="inline-flex items-center text-forest hover:text-charcoal transition-colors"
              >
                ← Previous Day
              </Link>
            )}
            <div></div>
            {day.id < 9 && (
              <Link 
                href={`/itinerary/day-${day.id + 1}`}
                className="inline-flex items-center text-forest hover:text-charcoal transition-colors"
              >
                Next Day →
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}