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

export default async function LensesPage({ searchParams }: PageProps) {
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
        title="Lens Selection Guide"
        subtitle="Choose the right lens for every story moment"
        currentSlug="lenses"
        userEmail={userEmail}
      >
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <div className="bg-forest-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800 mb-4">
                🔍 Your Lens is Your Voice
              </h2>
              <p className="text-forest-700 text-lg leading-relaxed">
                Different lenses create different emotional responses in your audience. Understanding 
                focal length and its psychological impact is crucial for effective storytelling.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              📏 Focal Length Psychology
            </h2>
            
            <div className="space-y-6">
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-ink-800 mb-3">14-24mm Ultra-Wide</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Best For:</strong> Establishing shots, landscapes, architecture</p>
                    <p className="text-ink-600 mb-2"><strong>Emotional Impact:</strong> Grandeur, scale, overwhelming vastness</p>
                  </div>
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Pros:</strong> Dramatic perspective, everything in focus</p>
                    <p className="text-ink-600 mb-2"><strong>Cons:</strong> Distortion at edges, hard to isolate subjects</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-ink-800 mb-3">24-35mm Wide Angle</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Best For:</strong> Environmental portraits, group shots</p>
                    <p className="text-ink-600 mb-2"><strong>Emotional Impact:</strong> Context, inclusion, community</p>
                  </div>
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Pros:</strong> Shows subject in environment</p>
                    <p className="text-ink-600 mb-2"><strong>Cons:</strong> Less subject isolation</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-ink-800 mb-3">50mm Standard</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Best For:</strong> Natural perspective, documentary style</p>
                    <p className="text-ink-600 mb-2"><strong>Emotional Impact:</strong> Authentic, honest, relatable</p>
                  </div>
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Pros:</strong> Matches human vision, versatile</p>
                    <p className="text-ink-600 mb-2"><strong>Cons:</strong> Can be "boring" without creative framing</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-ink-800 mb-3">85-135mm Portrait</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Best For:</strong> Interviews, close-ups, emotional moments</p>
                    <p className="text-ink-600 mb-2"><strong>Emotional Impact:</strong> Intimacy, focus, emotional connection</p>
                  </div>
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Pros:</strong> Beautiful bokeh, flattering compression</p>
                    <p className="text-ink-600 mb-2"><strong>Cons:</strong> Requires distance from subject</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🎯 Storytelling Applications
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">📖 Testimony/Interview</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Primary:</strong> 85mm f/1.8 (intimate connection)</div>
                  <div><strong>Secondary:</strong> 50mm f/2.8 (environmental context)</div>
                  <div><strong>B-Roll:</strong> 24mm f/4 (location establishing)</div>
                  <div><strong>Goal:</strong> Draw viewer into personal story</div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">⛪ Worship/Community</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Wide:</strong> 24mm f/5.6 (showing congregation)</div>
                  <div><strong>Medium:</strong> 50mm f/2.8 (individual worshippers)</div>
                  <div><strong>Tight:</strong> 85mm f/1.4 (emotional expressions)</div>
                  <div><strong>Goal:</strong> Capture both unity and personal experience</div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🌍 Mission/Outreach</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Context:</strong> 35mm f/4 (environment and people)</div>
                  <div><strong>Action:</strong> 50mm f/2.8 (natural documentation)</div>
                  <div><strong>Impact:</strong> 85mm f/1.8 (emotional moments)</div>
                  <div><strong>Goal:</strong> Show both need and response</div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🎬 Narrative/Drama</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Establishing:</strong> 24mm f/8 (set the scene)</div>
                  <div><strong>Medium:</strong> 50mm f/2.8 (natural conversation)</div>
                  <div><strong>Close-up:</strong> 85mm f/1.4 (emotional climax)</div>
                  <div><strong>Goal:</strong> Guide emotional journey</div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              💡 Creative Techniques
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Lens Compression</h3>
                <p className="text-ink-600">
                  Longer lenses compress the background, making distant objects appear closer and larger. 
                  Use this to create dramatic sunsets behind subjects or compress crowds for impact.
                </p>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Bokeh Quality</h3>
                <p className="text-ink-600">
                  The quality of background blur varies between lenses. Fast primes (f/1.4-1.8) 
                  create creamy bokeh that isolates subjects beautifully, perfect for testimonies.
                </p>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Wide Angle Drama</h3>
                <p className="text-ink-600">
                  Get close to subjects with wide lenses for dramatic effect. This works well for 
                  action shots, worship moments, or creating sense of urgency.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-forest-50 rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800 mb-4">
                ✝️ Seeing Through God's Eyes
              </h2>
              <p className="text-forest-700 mb-4">
                "The eye is the lamp of the body. If your eyes are healthy, your whole body will be full of light." 
                - Matthew 6:22
              </p>
              <p className="text-forest-600">
                Our lens choice affects how audiences see and feel. When we choose focal lengths 
                intentionally, we're helping others see God's work more clearly—whether that's 
                the vastness of His creation or the intimacy of His love.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-sage-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-heading font-bold text-ink-900 mb-4">
                Master Exposure Control
              </h3>
              <p className="text-ink-600 text-lg mb-6">
                Now that you understand lens choice, let's perfect your exposure techniques 
                for consistent, professional results.
              </p>
              <a 
                href={`/learn/exposure?t=${params.t}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white font-bold rounded-lg hover:bg-forest-700 transition-colors"
              >
                Perfect Your Exposure →
              </a>
            </div>
          </section>
        </div>
      </LearnLayout>
    </>
  );
}