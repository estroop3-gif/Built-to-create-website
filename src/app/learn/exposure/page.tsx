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

export default async function ExposurePage({ searchParams }: PageProps) {
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
        title="Perfect Exposure"
        subtitle="Consistent, professional results in any lighting"
        currentSlug="exposure"
        userEmail={userEmail}
      >
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <div className="bg-forest-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800 mb-4">
                ☀️ Mastering Light
              </h2>
              <p className="text-forest-700 text-lg leading-relaxed">
                Perfect exposure isn't just technical—it's artistic. You're painting with light 
                to evoke emotion, direct attention, and serve your story's needs.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              📊 Reading Your Tools
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-sage-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Histogram</h3>
                <p className="text-ink-600 mb-4">Shows actual light distribution</p>
                <ul className="text-sm text-ink-500 space-y-1">
                  <li>Left: Shadows/blacks</li>
                  <li>Center: Midtones</li>
                  <li>Right: Highlights/whites</li>
                </ul>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Light Meter</h3>
                <p className="text-ink-600 mb-4">Shows exposure relative to middle gray</p>
                <ul className="text-sm text-ink-500 space-y-1">
                  <li>-2/-1: Underexposed</li>
                  <li>0: Proper exposure</li>
                  <li>+1/+2: Overexposed</li>
                </ul>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Zebras/Focus Peaking</h3>
                <p className="text-ink-600 mb-4">Highlight overexposed areas</p>
                <ul className="text-sm text-ink-500 space-y-1">
                  <li>100%: Blown highlights</li>
                  <li>95%: Near overexposure</li>
                  <li>70%: Skin tone reference</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🌅 Lighting Scenarios & Solutions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🌞 Bright Daylight</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Challenge:</strong> Harsh shadows, blown highlights</p>
                    <p className="text-ink-600 mb-2"><strong>Solution:</strong> Find open shade, use reflectors</p>
                  </div>
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Settings:</strong> f/2.8, 1/120s, ISO 100</p>
                    <p className="text-ink-600"><strong>Pro Tip:</strong> Expose for highlights, lift shadows in post</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🌅 Golden Hour</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Advantage:</strong> Soft, warm, directional light</p>
                    <p className="text-ink-600 mb-2"><strong>Watch For:</strong> Changing light intensity</p>
                  </div>
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Settings:</strong> f/1.8, 1/60s, ISO 200-400</p>
                    <p className="text-ink-600"><strong>Pro Tip:</strong> Work fast, light changes quickly</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🏠 Indoor/Mixed Lighting</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Challenge:</strong> Color temperature mixing</p>
                    <p className="text-ink-600 mb-2"><strong>Solution:</strong> White balance carefully, use LED panels</p>
                  </div>
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Settings:</strong> f/1.4, 1/60s, ISO 800-1600</p>
                    <p className="text-ink-600"><strong>Pro Tip:</strong> Match ambient or overpower it</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🌆 Low Light/Evening</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Advantage:</strong> Moody, dramatic atmosphere</p>
                    <p className="text-ink-600 mb-2"><strong>Challenge:</strong> Noise, focus difficulties</p>
                  </div>
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Settings:</strong> f/1.4, 1/60s, ISO 1600-3200</p>
                    <p className="text-ink-600"><strong>Pro Tip:</strong> Embrace underexposure for mood</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🎨 Creative Exposure Techniques
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Expose to the Right (ETTR)</h3>
                <p className="text-ink-600">
                  Slightly overexpose to capture maximum detail in shadows, then pull back highlights 
                  in post. Works best with cameras that have good highlight recovery.
                </p>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Silhouetting</h3>
                <p className="text-ink-600">
                  Expose for the bright background to create dramatic silhouettes. Perfect for 
                  worship moments, sunset interviews, or symbolic shots.
                </p>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">High Key vs Low Key</h3>
                <p className="text-ink-600">
                  High key (bright, overexposed feel) for hope and joy. Low key (dark, underexposed) 
                  for drama and introspection. Match exposure style to emotional content.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-forest-50 rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800 mb-4">
                ✝️ Light as Metaphor
              </h2>
              <p className="text-forest-700 mb-4">
                "You are the light of the world. A town built on a hill cannot be hidden." 
                - Matthew 5:14
              </p>
              <p className="text-forest-600">
                Every exposure choice communicates something spiritual. Light reveals truth, 
                shadows create mystery, and the interplay between them mirrors the Christian 
                journey from darkness to light.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-sage-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-heading font-bold text-ink-900 mb-4">
                Compose Like a Master
              </h3>
              <p className="text-ink-600 text-lg mb-6">
                With exposure mastered, let's explore composition techniques that guide 
                your audience's eye and enhance your storytelling.
              </p>
              <a 
                href={`/learn/composition?t=${params.t}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white font-bold rounded-lg hover:bg-forest-700 transition-colors"
              >
                Master Composition →
              </a>
            </div>
          </section>
        </div>
      </LearnLayout>
    </>
  );
}