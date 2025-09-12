import React from 'react';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/linkToken';
import LearnLayout from '@/components/LearnLayout';

interface SearchParams {
  t?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function EditingPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.t;

  if (!token) {
    redirect('/404');
  }

  const { valid, payload } = await verifyToken(token);
  if (!valid) {
    redirect('/404');
  }

  let userEmail: string | undefined;
  if (payload) {
    const parts = payload.split(':');
    if (parts.length >= 2) {
      const identifier = parts[1];
      if (identifier.includes('@')) {
        userEmail = identifier;
      }
    }
  }

  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <LearnLayout
        title="Post-Production Flow"
        subtitle="Transform raw footage into compelling stories"
        currentSlug="editing"
        userEmail={userEmail}
      >
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <div className="bg-forest-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800 mb-4">
                ✂️ Where Stories Come Alive
              </h2>
              <p className="text-forest-700 text-lg leading-relaxed">
                Editing is where you discover the true story hidden in your footage. 
                Learn to shape emotion, control pacing, and guide your audience through 
                a transformative experience.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🔄 Professional Workflow
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">1. Organization & Import</h3>
                <p className="text-ink-600 mb-3">
                  Create a logical folder structure. Import and organize clips by scene, interview, 
                  or B-roll. Add metadata and keywords for easy searching.
                </p>
                <ul className="text-sm text-ink-500 space-y-1 ml-4">
                  <li>• Use consistent naming conventions</li>
                  <li>• Create bins for different content types</li>
                  <li>• Back up original files immediately</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">2. Assembly Edit</h3>
                <p className="text-ink-600 mb-3">
                  Build your story structure first. Focus on the narrative flow, not 
                  perfect cuts. Get your message clear before polishing.
                </p>
                <ul className="text-sm text-ink-500 space-y-1 ml-4">
                  <li>• Start with your strongest material</li>
                  <li>• Use temp music to find rhythm</li>
                  <li>• Don't worry about perfect timing yet</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">3. Rough Cut</h3>
                <p className="text-ink-600 mb-3">
                  Refine timing, add B-roll, and start shaping the emotional arc. 
                  This is where you find the rhythm and pacing.
                </p>
                <ul className="text-sm text-ink-500 space-y-1 ml-4">
                  <li>• Cut on action for seamless flow</li>
                  <li>• Use reaction shots to build emotion</li>
                  <li>• Vary shot sizes for visual interest</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">4. Fine Cut & Polish</h3>
                <p className="text-ink-600 mb-3">
                  Perfect every transition, add final music, color grade, and audio mix. 
                  Every frame should serve the story.
                </p>
                <ul className="text-sm text-ink-500 space-y-1 ml-4">
                  <li>• Fine-tune audio levels and EQ</li>
                  <li>• Color correct for consistency</li>
                  <li>• Add graphics and titles</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🎵 Audio is Half Your Story
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🎤 Dialogue</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Priority #1:</strong> Clear, intelligible speech</div>
                  <div><strong>EQ:</strong> Cut low frequencies, boost presence (3-5kHz)</div>
                  <div><strong>Compression:</strong> Even out levels for consistency</div>
                  <div><strong>De-noise:</strong> Remove hum, hiss, and room tone</div>
                </div>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🎶 Music & Sound Design</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Underscore:</strong> Support emotion without overwhelming</div>
                  <div><strong>Transitions:</strong> Use music to smooth cuts</div>
                  <div><strong>Silence:</strong> Don't be afraid of quiet moments</div>
                  <div><strong>Ambiance:</strong> Add natural sound for realism</div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🎨 Color & Visual Polish
            </h2>
            
            <div className="space-y-6">
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">Color Correction vs Grading</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Correction:</strong> Fix technical issues</p>
                    <ul className="text-sm text-ink-500 space-y-1">
                      <li>• White balance</li>
                      <li>• Exposure matching</li>
                      <li>• Contrast adjustment</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Grading:</strong> Create mood and style</p>
                    <ul className="text-sm text-ink-500 space-y-1">
                      <li>• Color schemes</li>
                      <li>• Emotional enhancement</li>
                      <li>• Visual consistency</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">Popular Look Styles</h3>
                <div className="space-y-3">
                  <div>
                    <strong className="text-ink-700">Warm & Inspiring:</strong>
                    <span className="text-ink-600 text-sm ml-2">Orange/teal, lifted shadows, warm highlights</span>
                  </div>
                  <div>
                    <strong className="text-ink-700">Documentary Natural:</strong>
                    <span className="text-ink-600 text-sm ml-2">Minimal grading, true colors, high contrast</span>
                  </div>
                  <div>
                    <strong className="text-ink-700">Cinematic Drama:</strong>
                    <span className="text-ink-600 text-sm ml-2">Desaturated, crushed blacks, film emulation</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-forest-50 rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800 mb-4">
                ✝️ Editing with Purpose
              </h2>
              <p className="text-forest-700 mb-4">
                "She considers a field and buys it; out of her earnings she plants a vineyard." 
                - Proverbs 31:16
              </p>
              <p className="text-forest-600">
                Like the Proverbs 31 woman, approach editing with careful consideration. 
                Every cut, every transition, every color choice should serve the greater 
                purpose of glorifying God and blessing others.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-sage-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-heading font-bold text-ink-900 mb-4">
                Master Natural Light
              </h3>
              <p className="text-ink-600 text-lg mb-6">
                Complete your filmmaking education by mastering the most beautiful 
                light source of all—natural light.
              </p>
              <a 
                href={`/learn/lighting?t=${params.t}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white font-bold rounded-lg hover:bg-forest-700 transition-colors"
              >
                Master Natural Lighting →
              </a>
            </div>
          </section>
        </div>
      </LearnLayout>
    </>
  );
}