'use client';

import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string | JSX.Element;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone/20 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 text-left flex justify-between items-center hover:text-forest transition-colors"
      >
        <h3 className="text-lg font-semibold text-charcoal pr-4">{question}</h3>
        <svg 
          className={`w-5 h-5 text-sage transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="pb-6 text-charcoal/70 animate-fade-in">
          {typeof answer === 'string' ? (
            String(answer).split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))
          ) : (
            answer
          )}
        </div>
      )}
    </div>
  );
}