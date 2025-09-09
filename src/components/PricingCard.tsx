'use client';

import Link from 'next/link';
import { pricingTiers, byoDiscount, formatDate } from '@/lib/pricing';

interface TieredPricingCardProps {
  tier: string;
  price: number;
  startDate: Date;
  endDate: Date;
  description: string;
  isActive?: boolean;
  showBYO?: boolean;
}

export function TieredPricingCard({
  tier,
  price,
  startDate,
  endDate,
  description,
  isActive = false,
  showBYO = true
}: TieredPricingCardProps) {
  const byoPrice = price - byoDiscount;
  
  return (
    <div className={`relative bg-cream rounded-2xl p-6 shadow-lg ${isActive ? 'ring-2 ring-forest' : ''}`}>
      {isActive && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-forest text-cream px-3 py-1 rounded-full text-xs font-semibold">
            Current Pricing
          </span>
        </div>
      )}
      
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-charcoal mb-1">{tier}</h3>
        <p className="text-xs text-charcoal/60">
          {formatDate(startDate)} - {formatDate(endDate)}
        </p>
      </div>
      
      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-forest">
          ${price.toLocaleString()}
        </div>
        <p className="text-xs text-charcoal/70 mt-1">{description}</p>
      </div>
      
      {showBYO && (
        <div className="border-t border-stone/20 pt-3 mt-3">
          <div className="text-center">
            <p className="text-xs text-charcoal/60 mb-1">Bring Your Own Camera</p>
            <p className="text-lg font-semibold text-sage">${byoPrice.toLocaleString()}</p>
            <p className="text-xs text-sage">Save ${byoDiscount}</p>
          </div>
        </div>
      )}
      
      {isActive && (
        <Link 
          href="/register" 
          className="block w-full text-center bg-forest text-cream px-4 py-2 rounded-full font-semibold hover:bg-moss transition-colors mt-4"
        >
          Register Now
        </Link>
      )}
    </div>
  );
}

export function AllPricingTiers() {
  const today = new Date();
  
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {pricingTiers.map((tier) => {
        const isActive = today >= tier.startDate && today <= tier.endDate;
        return (
          <TieredPricingCard
            key={tier.tier}
            tier={tier.tier}
            price={tier.price}
            startDate={tier.startDate}
            endDate={tier.endDate}
            description={tier.description}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
}

interface StandardPricingCardProps {
  showDetails?: boolean;
}

export function StandardPricingCard({ showDetails = true }: StandardPricingCardProps) {
  const currentTier = pricingTiers.find(tier => {
    const today = new Date();
    return today >= tier.startDate && today <= tier.endDate;
  }) || pricingTiers[0];
  
  return (
    <div className="bg-cream rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-charcoal mb-2">Complete Equipment Kit Included</h3>
        <div className="text-4xl font-bold text-forest mb-2">
          ${currentTier.price.toLocaleString()}
        </div>
        <p className="text-sm text-charcoal/70">{currentTier.tier} Pricing</p>
      </div>
      
      {showDetails && (
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-charcoal/70">9-day filmmaking retreat</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-charcoal/70">Complete equipment kit (yours to keep)</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-charcoal/70">All accommodations & transfers</span>
          </div>
        </div>
      )}
      
      <Link 
        href="/register" 
        className="block w-full text-center bg-forest text-cream px-6 py-3 rounded-full font-semibold hover:bg-moss transition-colors"
      >
        Register Now
      </Link>
    </div>
  );
}

export function DiscountPricingCard({ showDetails = true }: StandardPricingCardProps) {
  const currentTier = pricingTiers.find(tier => {
    const today = new Date();
    return today >= tier.startDate && today <= tier.endDate;
  }) || pricingTiers[0];
  
  const discountedPrice = currentTier.price - byoDiscount;
  
  return (
    <div className="bg-sand/30 rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-charcoal mb-2">Bring Your Own Camera</h3>
        <div className="text-sm text-charcoal/60 line-through mb-1">
          ${currentTier.price.toLocaleString()}
        </div>
        <div className="text-4xl font-bold text-sage mb-2">
          ${discountedPrice.toLocaleString()}
        </div>
        <p className="text-sm font-semibold text-forest">Save ${byoDiscount}</p>
      </div>
      
      {showDetails && (
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-charcoal/70">Use your own camera equipment</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-charcoal/70">Still get audio, lighting & accessories</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-charcoal/70">All accommodations & transfers</span>
          </div>
        </div>
      )}
      
      <Link 
        href="/register" 
        className="block w-full text-center bg-charcoal text-cream px-6 py-3 rounded-full font-semibold hover:bg-charcoal/90 transition-colors"
      >
        Register with Discount
      </Link>
    </div>
  );
}