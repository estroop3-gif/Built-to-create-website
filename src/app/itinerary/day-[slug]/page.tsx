import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDayBySlug, itinerary } from '@/lib/itinerary';
import LocationStrip from '@/components/LocationStrip';
import TransferNote from '@/components/TransferNote';

export async function generateStaticParams() {
  return itinerary.map((day) => ({
    slug: day.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const day = getDayBySlug(params.slug);
  
  if (!day) {
    return {
      title: 'Day Not Found - Built to Create',
    };
  }
  
  return {
    title: `Day ${day.id}: ${day.title} - Costa Rica Filmmaking Retreat`,
    description: `${day.location} - ${day.theme}`,
  };
}

export default function DayDetailPage({ params }: { params: { slug: string } }) {
  const day = getDayBySlug(params.slug);
  
  if (!day) {
    notFound();
  }
  
  const prevDay = day.id > 1 ? day.id - 1 : null;
  const nextDay = day.id < 9 ? day.id + 1 : null;
  
  const getTransferInfo = () => {
    if (day.id === 4) return { from: "San José", to: "Jacó", duration: "1.5 hours" };
    if (day.id === 7) return { from: "Jacó", to: "Santiago de Puriscal", duration: "2 hours" };
    if (day.id === 8) return { from: "Santiago de Puriscal", to: "San José", duration: "1.5 hours" };
    return null;
  };
  
  const transferInfo = getTransferInfo();
  
  return (
    <>
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/itinerary" 
            className="inline-flex items-center text-forest hover:text-moss transition-colors mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Itinerary
          </Link>
          
          <LocationStrip city={day.location} hotel={day.location} day={day.id} />
          
          <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4">{day.title}</h1>
          <p className="text-xl text-charcoal/70 mb-8">{day.theme}</p>
          
          {transferInfo && (
            <TransferNote 
              from={transferInfo.from} 
              to={transferInfo.to} 
              duration={transferInfo.duration} 
            />
          )}
          
          <div className="bg-cream rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-forest mb-3">Day Focus</h2>
            <div className="space-y-4">
              <div className="flex items-start text-charcoal/70">
                <svg className="w-4 h-4 text-sage mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Spiritual Anchor:</strong> {day.spiritualAnchor}
                </div>
              </div>
              <div className="flex items-start text-charcoal/70">
                <svg className="w-4 h-4 text-sage mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Creative Focus:</strong> {day.creativeFocus}
                </div>
              </div>
              <div className="flex items-start text-charcoal/70">
                <svg className="w-4 h-4 text-sage mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Field Work:</strong> {day.fieldWork}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-earth/10 border-l-4 border-earth rounded-r-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-earth mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="font-semibold text-charcoal mb-2">Evening Touchpoint</p>
                <p className="text-sm text-charcoal/70">{day.eveningTouchpoint}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-8">Daily Schedule</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-charcoal">{day.creativeFocus}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-stone/20">
            {prevDay ? (
              <Link 
                href={`/itinerary/day-${prevDay}`}
                className="flex items-center text-forest hover:text-moss transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Day {prevDay}
              </Link>
            ) : (
              <div></div>
            )}
            
            {nextDay ? (
              <Link 
                href={`/itinerary/day-${nextDay}`}
                className="flex items-center text-forest hover:text-moss transition-colors"
              >
                Day {nextDay}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <Link 
                href="/register"
                className="bg-forest text-cream px-6 py-2 rounded-full hover:bg-moss transition-colors"
              >
                Register Now
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}