import { pricingTiers, byoDiscount, formatDate, getCurrentPricingTier } from '@/lib/pricing';
import Button from './Button';

export default function PricingCards() {
  const currentTier = getCurrentPricingTier();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {pricingTiers.map((tier) => {
        const isCurrentTier = tier.tier === currentTier.tier;
        const discountedPrice = tier.price - byoDiscount;
        
        return (
          <div
            key={tier.tier}
            className={`
              relative bg-white rounded-2xl p-8 shadow-card transition-all duration-300
              ${isCurrentTier ? 'ring-2 ring-forest-500 transform scale-105 shadow-card-hover' : 'hover:shadow-card-hover hover:-translate-y-1'}
              overflow-hidden
            `}
          >
            {/* Current Tier Badge */}
            {isCurrentTier && (
              <div className="absolute -top-0 -right-0 bg-forest-500 text-cream-100 px-4 py-1 text-sm font-heading font-bold transform rotate-12 translate-x-4 -translate-y-2 rounded-full">
                Current Rate
              </div>
            )}
            
            {/* Tier Name */}
            <div className="text-center mb-6">
              <h3 className="font-heading text-2xl font-bold text-ink-900 mb-2">
                {tier.tier}
              </h3>
              <p className="font-body text-ink-600 leading-relaxed">
                {tier.description}
              </p>
            </div>
            
            {/* Pricing */}
            <div className="text-center mb-8">
              <div className="mb-4">
                <span className="text-4xl font-bold font-heading text-forest-800">
                  ${tier.price.toLocaleString()}
                </span>
                <span className="font-body text-ink-600 ml-2">per person</span>
              </div>
              
              {/* BYO Camera Discount */}
              <div className="bg-sand-50 border border-sand-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm text-ink-700 font-medium">
                    Bring your own camera
                  </span>
                  <span className="font-heading font-bold text-forest-700">
                    -${byoDiscount}
                  </span>
                </div>
                <div className="text-center">
                  <span className="font-heading text-2xl font-bold text-forest-800">
                    ${discountedPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Date Range */}
            <div className="text-center mb-8">
              <div className="font-body text-sm font-medium text-ink-500 mb-1">
                Registration Period
              </div>
              <div className="font-body text-sm text-ink-800">
                {formatDate(tier.startDate)} – {formatDate(tier.endDate)}
              </div>
            </div>
            
            {/* CTA Button */}
            <Button
              as="link"
              href="/register"
              size="lg"
              variant={isCurrentTier ? "primary" : "secondary"}
              className="w-full justify-center"
            >
              {isCurrentTier ? "Register Now" : "Learn More"}
            </Button>
          </div>
        );
      })}
    </div>
  );
}