interface LocationStripProps {
  city: string;
  hotel: string;
  day: number;
}

export default function LocationStrip({ city, hotel, day }: LocationStripProps) {
  return (
    <div className="bg-sand/30 rounded-xl p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-forest text-cream rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
            {day}
          </div>
          <div>
            <p className="font-semibold text-charcoal">{city}</p>
            <p className="text-sm text-charcoal/60">{hotel}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-charcoal/60">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Costa Rica</span>
        </div>
      </div>
    </div>
  );
}