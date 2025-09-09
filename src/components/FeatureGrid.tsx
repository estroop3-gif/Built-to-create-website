interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "🎬",
    title: "Professional Filmmaking",
    description: "Learn advanced techniques with industry-standard equipment and expert guidance from seasoned professionals."
  },
  {
    icon: "🌿",
    title: "Nature Immersion", 
    description: "Capture the breathtaking landscapes of Costa Rica while developing your unique creative voice in stunning locations."
  },
  {
    icon: "🤝",
    title: "Collaborative Community",
    description: "Connect with fellow filmmakers and storytellers in an intimate setting designed for meaningful creative partnerships."
  },
  {
    icon: "📚",
    title: "Comprehensive Learning",
    description: "Master both technical skills and storytelling craft through hands-on workshops and personalized mentorship."
  },
  {
    icon: "🛠️",
    title: "Complete Equipment Kit",
    description: "Take home professional equipment worth over $2,800 including cameras, lenses, and accessories."
  },
  {
    icon: "✨",
    title: "Transformative Experience",
    description: "Return home with renewed creative purpose and a clear direction for your future projects."
  }
];

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="group text-center"
        >
          {/* Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-forest-100 to-sage-100 rounded-2xl shadow-soft group-hover:shadow-card transition-all duration-300 group-hover:-translate-y-1">
              <span className="text-3xl" role="img" aria-label={feature.title}>
                {feature.icon}
              </span>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="font-heading text-xl font-bold text-ink-900 mb-4">
            {feature.title}
          </h3>
          
          {/* Description */}
          <p className="font-body text-ink-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}