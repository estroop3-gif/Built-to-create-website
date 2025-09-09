'use client';

import { useState } from 'react';
import { faqData, faqByCategory } from '@/lib/faq';

const categoryLabels = {
  general: 'General',
  pricing: 'Pricing & Payment',
  equipment: 'Equipment',
  travel: 'Travel & Hotels',
  logistics: 'Logistics & Meals'
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="bg-white rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden border border-sage-100">
      <button
        className="w-full text-left p-8 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-inset"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-heading text-xl font-bold text-ink-900 pr-6 leading-tight">
            {question}
          </h3>
          <div className={`
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
            transition-all duration-200
            ${isOpen ? 'bg-forest-500 rotate-180' : 'bg-sage-100 hover:bg-sage-200'}
          `}>
            <svg
              className={`w-4 h-4 transition-colors duration-200 ${isOpen ? 'text-white' : 'text-forest-600'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>
      
      <div
        className={`
          px-8 transition-all duration-300 ease-in-out
          ${isOpen ? 'pb-8 max-h-96 opacity-100' : 'pb-0 max-h-0 opacity-0'}
        `}
        style={{ overflow: 'hidden' }}
      >
        <div className="border-t border-sage-100 pt-6">
          <p className="font-body text-ink-700 leading-relaxed text-lg">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (question: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(question)) {
      newOpenItems.delete(question);
    } else {
      newOpenItems.add(question);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
          Everything you need to know about the retreat, from equipment to travel logistics.
        </p>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-12">
        {Object.entries(faqByCategory).map(([category, questions]) => (
          <div key={category}>
            {/* Category Header */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 bg-forest-500 rounded-2xl flex items-center justify-center mr-4">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h3 className="font-heading text-2xl font-bold text-ink-900">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h3>
              </div>
            </div>

            {/* Questions in Category */}
            <div className="space-y-4">
              {questions.map((faq, index) => (
                <FAQItem
                  key={`${category}-${index}`}
                  question={faq.question}
                  // @ts-ignore - FAQ component not currently used
                  answer={faq.answer}
                  isOpen={openItems.has(faq.question)}
                  onToggle={() => toggleItem(faq.question)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Note */}
      <div className="mt-20 text-center">
        <div className="bg-sage-50 rounded-2xl p-10 border border-sage-200 paper-texture max-w-2xl mx-auto">
          <h3 className="font-heading text-2xl font-bold text-ink-900 mb-4">
            Still have questions?
          </h3>
          <p className="font-body text-ink-700 mb-6 text-lg leading-relaxed">
            We're here to help! Reach out with any specific questions about the retreat.
          </p>
          <a
            href="mailto:parker@builttocreateproject.com"
            className="inline-flex items-center font-body font-bold text-forest-700 hover:text-forest-800 transition-colors text-lg group"
          >
            parker@builttocreateproject.com
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}