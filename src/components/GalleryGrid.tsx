import Image from 'next/image';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

// Placeholder images - replace with actual gallery images
const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/gallery/golden-hour-beach.jpg', 
    alt: 'Golden hour beach with palm trees',
    caption: 'Perfect lighting for cinematic storytelling'
  },
  {
    id: '2',
    src: '/images/gallery/costa-rica-coastline.jpg',
    alt: 'Dramatic Costa Rica coastline',
    caption: 'Capturing stories along the stunning Pacific coast'
  },
  {
    id: '3',
    src: '/images/gallery/rainforest-waterfall.jpg',
    alt: 'Lush rainforest with cascading waterfall',
    caption: 'Deep jungle adventures and natural storytelling'
  },
  {
    id: '4',
    src: '/images/gallery/filmmaking-bts.jpg',
    alt: 'Behind-the-scenes filmmaking in Costa Rica jungle',
    caption: 'Hands-on learning with professional equipment'
  },
  {
    id: '5',
    src: '/images/gallery/tropical-sunset.jpg',
    alt: 'Golden hour tropical beach with palm trees',
    caption: 'Cinematic moments at every turn'
  },
  {
    id: '6',
    src: '/images/gallery/costa-rica-culture.jpg',
    alt: 'Historic Costa Rica colonial architecture',
    caption: 'Rich cultural storytelling opportunities'
  }
];

interface GalleryGridProps {
  images?: GalleryImage[];
  className?: string;
}

export default function GalleryGrid({ 
  images = galleryImages,
  className = '' 
}: GalleryGridProps) {
  return (
    <div className={`max-w-7xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          Experience Costa Rica
        </h2>
        <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
          Immerse yourself in breathtaking landscapes while developing your filmmaking craft. 
          Every location becomes your classroom and canvas.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`
              group relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover
              transition-all duration-300 hover:-translate-y-2 cursor-pointer
              ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
            `}
          >
            {/* Image Container */}
            <div className={`relative ${index === 0 ? 'aspect-[4/3]' : 'aspect-[4/3]'}`}>
              {/* Show all real images - complete gallery */}
              {index <= 5 ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={`${index === 0 ? 'object-cover object-center w-full h-full' : 'object-cover'} group-hover:scale-110 transition-transform duration-500`}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-forest-100 via-sage-100 to-sand-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-forest-200 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">📸</span>
                    </div>
                    <p className="font-body text-sm text-forest-700 px-4 max-w-48">
                      {image.alt}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                {image.caption && (
                  <p className="font-body text-white text-sm leading-relaxed">
                    {image.caption}
                  </p>
                )}
              </div>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-forest-400/40 transition-all duration-300"></div>
          </div>
        ))}
      </div>

      {/* Note about placeholder images */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center px-6 py-3 bg-sand-50 border border-sand-200 rounded-full">
          <div className="w-2 h-2 bg-sand-400 rounded-full mr-3"></div>
          <p className="font-body text-sm text-ink-600 italic">
            Gallery images coming soon. These represent the beautiful locations where you'll be filming.
          </p>
        </div>
      </div>
    </div>
  );
}