'use client';

import { useState } from 'react';
import Section from './Section';

export default function HomeFAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: 'Do I need prior experience?',
      answer: 'No prior filmmaking experience is required. Our curriculum is designed to take you from complete beginner to proficient filmmaker, whether you choose the retreats or online course track.'
    },
    {
      question: 'What\'s included with tuition?',
      answer: 'Retreat tuition includes instruction, lodging, most meals, ground transport, and a complete filmmaking kit on your first retreat (valued at $2,800). Online course tuition includes video curriculum, mentorship, assignments, feedback, and community access.'
    },
    {
      question: 'How do the online course and retreats work together?',
      answer: 'The online course prepares you for the retreats and will be required to unlock retreat access in the future. You can take the course alone or combine it with retreats for the full experience.'
    },
    {
      question: 'What are the exact retreat dates?',
      answer: 'All retreats are 9 days with Friday departures. 2026: Costa Rica (Feb 20-28), Greece (May 22-30), Africa (Aug 21-29), Japan (Nov 20-28). 2027: Panama (Feb 26-Mar 6), United Kingdom (May 21-29), Germany (Aug 20-28), Thailand (Nov 26-Dec 4).'
    },
    {
      question: 'What is the returning-student discount?',
      answer: 'If you\'ve attended a Born to Create retreat before, you receive $500 off each additional retreat you book. This discount applies per retreat and cannot be combined with other offers.'
    }
  ];

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
          FAQs
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
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