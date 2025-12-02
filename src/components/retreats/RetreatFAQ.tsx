'use client';

import { useState } from 'react';
import Section from '../Section';
import { RetreatData } from '@/lib/retreats';

interface RetreatFAQProps {
  retreat: RetreatData;
}

export default function RetreatFAQ({ retreat }: RetreatFAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Section spacing="xl" background="sage">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
          Everything you need to know about your {retreat.country} filmmaking adventure.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {retreat.faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-soft overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-sage-25 focus:outline-none focus:bg-sage-25 transition-colors duration-200"
                aria-expanded={openItems.includes(index)}
                aria-controls={`faq-content-${index}`}
              >
                <span className="font-heading text-lg font-bold text-ink-900 pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-ink-600 transition-transform duration-200 flex-shrink-0 ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                id={`faq-content-${index}`}
                className={`transition-all duration-200 ease-in-out ${
                  openItems.includes(index)
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="px-6 pb-5">
                  <p className="font-body text-ink-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}