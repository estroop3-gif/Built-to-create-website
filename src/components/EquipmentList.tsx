import { equipmentKit, equipmentByCategory, getTotalEquipmentValue } from '@/lib/equipment';

const categoryLabels = {
  camera: 'Camera & Power',
  lens: 'Lenses',
  audio: 'Audio',
  lighting: 'Lighting',
  storage: 'Storage',
  accessories: 'Accessories & Support'
};

const categoryIcons = {
  camera: '📷',
  lens: '🔍',
  audio: '🎤',
  lighting: '💡',
  storage: '💾',
  accessories: '🔧'
};

export default function EquipmentList() {
  const totalValue = getTotalEquipmentValue();
  
  return (
    <div className="max-w-6xl mx-auto text-center">
      {/* Header */}
      <div className="mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          Professional Equipment Kit Included
        </h2>
        <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed mb-6">
          Take home over ${totalValue.toLocaleString()} worth of professional filmmaking equipment. 
          This complete kit is yours to keep after the retreat.
        </p>
        <div className="inline-flex items-center px-6 py-3 bg-forest-100 border border-forest-200 rounded-full">
          <div className="w-3 h-3 bg-forest-500 rounded-full mr-3"></div>
          <span className="font-heading font-bold text-forest-800">
            Kit Value: ${totalValue.toLocaleString()}+
          </span>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(equipmentByCategory).map(([category, items]) => (
          <div 
            key={category}
            className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 text-left"
          >
            {/* Category Header */}
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-forest-100 to-sage-100 rounded-2xl flex items-center justify-center mr-4 shadow-soft">
                <span className="text-2xl" role="img">
                  {categoryIcons[category as keyof typeof categoryIcons]}
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-ink-900">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h3>
            </div>

            {/* Equipment Items */}
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex items-start">
                  {/* Checkmark */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-forest-500 flex items-center justify-center mr-4 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body font-semibold text-ink-900 mb-1">
                      {item.name}
                    </h4>
                    {item.description && (
                      <p className="font-body text-sm text-ink-600 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-16">
        <div className="inline-flex items-center px-8 py-4 bg-sage-50 border border-sage-200 rounded-2xl paper-texture">
          <div className="w-8 h-8 bg-forest-500 rounded-full flex items-center justify-center mr-4">
            <span className="text-white text-lg">✓</span>
          </div>
          <p className="font-body text-ink-700 text-lg">
            <strong className="font-heading">You keep this entire kit.</strong> All equipment becomes yours at the end of the retreat.
          </p>
        </div>
      </div>
    </div>
  );
}