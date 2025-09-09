interface HotelCardProps {
  name: string;
  city: string;
  nights: number;
  description: string;
  mapLink?: string;
}

export default function HotelCard({ name, city, nights, description, mapLink }: HotelCardProps) {
  return (
    <div className="bg-cream rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-charcoal">{name}</h3>
          <p className="text-sm font-semibold text-sage">{city}, Costa Rica</p>
        </div>
        <div className="text-right">
          <span className="bg-forest/10 text-forest px-2 py-1 rounded text-sm font-semibold">
            {nights} {nights === 1 ? 'night' : 'nights'}
          </span>
        </div>
      </div>
      
      <p className="text-charcoal/70 text-sm mb-4">{description}</p>
      
      <div className="flex justify-between items-center">
        {mapLink ? (
          <a 
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-forest hover:text-moss transition-colors text-sm font-semibold"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            View Location
          </a>
        ) : (
          <span className="text-charcoal/40 text-sm">Map link coming soon</span>
        )}
        
        <div className="flex items-center text-xs text-charcoal/60">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Included
        </div>
      </div>
    </div>
  );
}