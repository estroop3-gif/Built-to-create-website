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

export default async function CompositionPage({ searchParams }: PageProps) {
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
        title="Cinematic Composition"
        subtitle="Guide your audience's eye and emotion"
        currentSlug="composition"
        userEmail={userEmail}
      >
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <div className="bg-forest-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800 mb-4">
                🎨 Visual Storytelling
              </h2>
              <p className="text-forest-700 text-lg leading-relaxed">
                Every frame is a carefully composed painting. Learn to direct your audience's 
                attention, create emotional impact, and support your narrative through 
                intentional visual choices.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              📐 Classic Composition Rules
            </h2>
            
            <div className="space-y-6">
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Rule of Thirds</h3>
                <p className="text-ink-600 mb-3">
                  Divide frame into nine sections. Place key elements along lines or intersections 
                  for more dynamic, interesting compositions.
                </p>
                <p className="text-sm text-ink-500">
                  <strong>When to break it:</strong> Center framing for symmetry, power, or formal presentations
                </p>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Leading Lines</h3>
                <p className="text-ink-600 mb-3">
                  Use roads, fences, shorelines, or architectural elements to guide the 
                  viewer's eye toward your subject.
                </p>
                <p className="text-sm text-ink-500">
                  <strong>Pro tip:</strong> Diagonal lines create energy; horizontal lines suggest peace
                </p>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Framing</h3>
                <p className="text-ink-600 mb-3">
                  Use doorways, windows, trees, or other elements to create a natural 
                  frame around your subject.
                </p>
                <p className="text-sm text-ink-500">
                  <strong>Emotional impact:</strong> Frames can suggest intimacy, isolation, or focus
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🎬 Cinematic Techniques
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🔄 Symmetry & Patterns</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Use:</strong> Formal interviews, church architecture</div>
                  <div><strong>Effect:</strong> Stability, authority, reverence</div>
                  <div><strong>Tip:</strong> Center your subject for maximum impact</div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">⚖️ Balance & Weight</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Visual Weight:</strong> Bright objects feel "heavier"</div>
                  <div><strong>Balance:</strong> Distribute weight across frame</div>
                  <div><strong>Tension:</strong> Unbalance creates dynamic energy</div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">📏 Depth & Layers</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Foreground:</strong> Add interest with objects</div>
                  <div><strong>Mid-ground:</strong> Your main subject</div>
                  <div><strong>Background:</strong> Context and atmosphere</div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🌈 Color Theory</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Warm Colors:</strong> Energy, passion, comfort</div>
                  <div><strong>Cool Colors:</strong> Calm, sadness, distance</div>
                  <div><strong>Contrast:</strong> Makes subjects pop</div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              💡 Advanced Composition
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Negative Space</h3>
                <p className="text-ink-600">
                  Empty space around your subject can be just as important as the subject itself. 
                  Use it to create breathing room, suggest isolation, or emphasize scale.
                </p>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Eye Level & Perspective</h3>
                <p className="text-ink-600">
                  Low angles make subjects powerful and heroic. High angles make them vulnerable 
                  or small. Eye level creates equality and connection.
                </p>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Movement & Direction</h3>
                <p className="text-ink-600">
                  Give moving subjects space to "move into" the frame. This creates a sense of 
                  motion and prevents claustrophobic framing.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-forest-50 rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800 mb-4">
                ✝️ Composition with Purpose
              </h2>
              <p className="text-forest-700 mb-4">
                "The heavens declare the glory of God; the skies proclaim the work of his hands." 
                - Psalm 19:1
              </p>
              <p className="text-forest-600">
                God is the ultimate artist, and His creation teaches us about composition. 
                Study how light falls across landscapes, how patterns repeat in nature, 
                how balance exists in seemingly chaotic scenes.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-sage-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-heading font-bold text-ink-900 mb-4">
                Master Post-Production
              </h3>
              <p className="text-ink-600 text-lg mb-6">
                Great composition in-camera is just the beginning. Learn to enhance 
                your vision in the editing room.
              </p>
              <a 
                href={`/learn/editing?t=${params.t}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white font-bold rounded-lg hover:bg-forest-700 transition-colors"
              >
                Learn Post-Production →
              </a>
            </div>
          </section>
        </div>
      </LearnLayout>
    </>
  );
}