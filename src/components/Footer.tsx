'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from './Container';

const footerNavigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Itinerary', href: '/itinerary' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Travel', href: '/travel' },
    { name: 'Course', href: '/course' },
  ],
  company: [
    { name: 'The Experience', href: '/experience' },
    { name: 'Packing List', href: '/packing' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
    { name: 'Register', href: '/register' },
  ],
  experiences: [
    {
      name: 'Costa Rica',
      items: [
        { name: 'Overview', href: '/experiences/costa-rica' },
        { name: 'Itinerary', href: '/experiences/costa-rica/itinerary' },
        { name: 'Pricing', href: '/experiences/costa-rica/pricing' },
        { name: 'Packing', href: '/experiences/costa-rica/packing' },
        { name: 'Travel', href: '/experiences/costa-rica/travel' },
      ]
    },
    {
      name: 'Jasper, GA',
      items: [
        { name: 'Overview', href: '/experiences/jasper' },
        { name: 'Itinerary', href: '/experiences/jasper/itinerary' },
        { name: 'Pricing', href: '/experiences/jasper/pricing' },
        { name: 'Packing', href: '/experiences/jasper/packing' },
        { name: 'Travel', href: '/experiences/jasper/travel' },
        { name: 'Church Media Toolkit', href: '/experiences/jasper/what-you-bring-back' },
      ]
    },
  ],
  social: [
    {
      name: 'Instagram',
      href: 'https://instagram.com/borntocreateproject',
      icon: (
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61580683108622',
      icon: (
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      ),
    },
  ],
};

export default function Footer() {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);

  return (
    <footer className="bg-sand-100 paper-texture border-t border-sand-200">
      <Container size="xl" className="py-20">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-12">
            <Link 
              href="/" 
              className="font-heading text-3xl font-bold text-forest-800 hover:text-forest-900 transition-colors"
            >
              The Born to Create Project
            </Link>
            <p className="font-body text-sm text-ink-500 mt-2">A project by Second Watch Network</p>
            <p className="font-body text-lg text-ink-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              Where creativity meets calling. Join us for transformative filmmaking
              and storytelling retreats around the world.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 max-w-6xl mx-auto">
            {/* Main Navigation */}
            <div>
              <h3 className="font-heading text-lg font-bold text-ink-900 mb-6">
                Navigate
              </h3>
              <ul className="space-y-4">
                {footerNavigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="font-body text-ink-600 hover:text-forest-700 transition-colors duration-200 text-lg"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experiences */}
            <div>
              <h3 className="font-heading text-lg font-bold text-ink-900 mb-6">
                Experiences
              </h3>
              <ul className="space-y-4">
                {footerNavigation.experiences.map((experience) => (
                  <li key={experience.name} className="flex flex-col items-center">
                    <button
                      onClick={() => setExpandedExperience(expandedExperience === experience.name ? null : experience.name)}
                      className="font-body text-ink-600 hover:text-forest-700 transition-colors duration-200 text-lg font-semibold flex items-center gap-2"
                    >
                      {experience.name}
                      <svg
                        className={`w-4 h-4 transition-transform ${expandedExperience === experience.name ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedExperience === experience.name && (
                      <ul className="mt-3 space-y-2">
                        {experience.items.map((item) => (
                          <li key={item.name} className="text-center">
                            <Link
                              href={item.href}
                              className="font-body text-sm text-ink-600 hover:text-forest-700 transition-colors duration-200"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-heading text-lg font-bold text-ink-900 mb-6">
                Company
              </h3>
              <ul className="space-y-4">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="font-body text-ink-600 hover:text-forest-700 transition-colors duration-200 text-lg"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-12">
            <h3 className="font-heading text-lg font-bold text-ink-900 mb-4">
              Connect
            </h3>
            <div className="space-y-4">
              <p className="font-body text-ink-600">
                <a
                  href="mailto:parker@thebtcp.com"
                  className="hover:text-forest-700 transition-colors duration-200 text-lg"
                >
                  parker@thebtcp.com
                </a>
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-6">
                {footerNavigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="w-10 h-10 bg-forest-100 rounded-full flex items-center justify-center text-forest-600 hover:bg-forest-200 hover:text-forest-800 transition-colors duration-200"
                    aria-label={item.name}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Details */}
          <div className="mb-12 py-8 border-t border-b border-sand-300/50">
            <div className="font-body text-ink-600 text-lg">
              <p className="mb-2">2 Experience Destinations</p>
              <p>Costa Rica • Jasper, GA</p>
            </div>
          </div>

          {/* Legal Links */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/terms" 
                className="font-body text-sm text-ink-600 hover:text-forest-700 underline transition-colors duration-200"
              >
                Terms & Agreement
              </Link>
              <Link 
                href="/privacy" 
                className="font-body text-sm text-ink-600 hover:text-forest-700 underline transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="font-body text-sm text-ink-500">
            <p>© 2024 The Born to Create Project. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}