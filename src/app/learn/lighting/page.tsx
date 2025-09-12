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

export default async function LightingPage({ searchParams }: PageProps) {
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
        title="Natural Light Mastery"
        subtitle="Harness God's perfect lighting system"
        currentSlug="lighting"
        userEmail={userEmail}
      >
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <div className="bg-forest-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800 mb-4">
                ☀️ God's Studio Lighting
              </h2>
              <p className="text-forest-700 text-lg leading-relaxed">
                Natural light is the most beautiful, free, and powerful light source available. 
                Learn to read light like a language and use it to create stunning, professional 
                footage anywhere in the world.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🌅 Quality of Light
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Hard Light</h3>
                <div className="space-y-2 text-ink-600">
                  <p><strong>Source:</strong> Direct sun, small light sources</p>
                  <p><strong>Characteristics:</strong> Sharp shadows, high contrast</p>
                  <p><strong>Mood:</strong> Dramatic, intense, energetic</p>
                  <p><strong>Best Use:</strong> Action, determination, conflict</p>
                </div>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Soft Light</h3>
                <div className="space-y-2 text-ink-600">
                  <p><strong>Source:</strong> Overcast sky, large windows</p>
                  <p><strong>Characteristics:</strong> Gradual shadows, even exposure</p>
                  <p><strong>Mood:</strong> Gentle, peaceful, contemplative</p>
                  <p><strong>Best Use:</strong> Interviews, emotional moments</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🕐 Direction & Time of Day
            </h2>
            
            <div className="space-y-6">
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🌄 Golden Hour (Sunrise/Sunset)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Time:</strong> Hour after sunrise/before sunset</p>
                    <p className="text-ink-600 mb-2"><strong>Quality:</strong> Warm, directional, flattering</p>
                    <p className="text-ink-600"><strong>Perfect For:</strong> Portraits, beauty shots, inspiration</p>
                  </div>
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Challenge:</strong> Changes quickly</p>
                    <p className="text-ink-600 mb-2"><strong>Solution:</strong> Plan shots, work efficiently</p>
                    <p className="text-ink-600"><strong>Bonus:</strong> Natural rim lighting</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🌞 Blue Hour (Twilight)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Time:</strong> 30 mins after sunset/before sunrise</p>
                    <p className="text-ink-600 mb-2"><strong>Quality:</strong> Cool, even, atmospheric</p>
                    <p className="text-ink-600"><strong>Perfect For:</strong> Establishing shots, mood pieces</p>
                  </div>
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Challenge:</strong> Very brief window</p>
                    <p className="text-ink-600 mb-2"><strong>Solution:</strong> Higher ISO, stabilization</p>
                    <p className="text-ink-600"><strong>Bonus:</strong> City lights balance with sky</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">☀️ Harsh Midday Sun</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Challenge:</strong> Top-down shadows, squinting</p>
                    <p className="text-ink-600 mb-2"><strong>Solutions:</strong> Find shade, use reflectors</p>
                    <p className="text-ink-600"><strong>Alternative:</strong> Shoot silhouettes</p>
                  </div>
                  <div>
                    <p className="text-ink-600 mb-2"><strong>Shade Options:</strong> Trees, overhangs, buildings</p>
                    <p className="text-ink-600 mb-2"><strong>Reflector Use:</strong> Bounce light into faces</p>
                    <p className="text-ink-600"><strong>Creative Use:</strong> Strong shadows for drama</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🪟 Working with Windows
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Window as Key Light</h3>
                <p className="text-ink-600">
                  Position your subject facing a large window for beautiful, soft key lighting. 
                  Works especially well for interviews and testimonies. Use a reflector on the 
                  opposite side to fill shadows.
                </p>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Window as Background</h3>
                <p className="text-ink-600">
                  Never put your subject directly in front of a bright window unless you want 
                  silhouettes. If you must, expose for the subject and let the window blow out, 
                  or use artificial lights to balance.
                </p>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Controlling Window Light</h3>
                <p className="text-ink-600">
                  Use sheer curtains or blinds to soften harsh window light. Reflectors can 
                  redirect light where needed. White walls naturally bounce and soften light 
                  throughout a room.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🛠️ Simple Light Modifiers
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-sage-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🪩</div>
                <h3 className="text-lg font-semibold text-ink-800 mb-3">Reflectors</h3>
                <div className="text-sm text-ink-600 space-y-1">
                  <div><strong>White:</strong> Gentle fill light</div>
                  <div><strong>Silver:</strong> Bright, contrasty fill</div>
                  <div><strong>Gold:</strong> Warm, sunset-like fill</div>
                  <div><strong>Use:</strong> Bounce light into shadows</div>
                </div>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🖤</div>
                <h3 className="text-lg font-semibold text-ink-800 mb-3">Flags/Negatives</h3>
                <div className="text-sm text-ink-600 space-y-1">
                  <div><strong>Purpose:</strong> Block unwanted light</div>
                  <div><strong>DIY:</strong> Black foam core, cloth</div>
                  <div><strong>Use:</strong> Create shadows, control spill</div>
                  <div><strong>Effect:</strong> More dramatic lighting</div>
                </div>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🌫️</div>
                <h3 className="text-lg font-semibold text-ink-800 mb-3">Diffusers</h3>
                <div className="text-sm text-ink-600 space-y-1">
                  <div><strong>Material:</strong> White fabric, shower curtain</div>
                  <div><strong>Effect:</strong> Soften harsh sunlight</div>
                  <div><strong>Use:</strong> Between sun and subject</div>
                  <div><strong>Result:</strong> More flattering portraits</div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              📍 Location-Specific Tips
            </h2>
            
            <div className="space-y-6">
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🏖️ Beach/Ocean</h3>
                <p className="text-ink-600 mb-3">
                  Watch for reflected light from sand and water creating natural fill. 
                  Can be very bright—use this for energy. Position subjects with water 
                  as background for beautiful rim lighting.
                </p>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🌳 Forest/Jungle</h3>
                <p className="text-ink-600 mb-3">
                  Dappled light creates natural patterns. Look for clearings with 
                  overhead openings. Green foliage reflects green light—watch skin tones. 
                  Perfect for contemplative, peaceful content.
                </p>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🏔️ Mountains</h3>
                <p className="text-ink-600 mb-3">
                  High altitude means stronger UV and contrast. Light changes quickly 
                  with weather. Use mountains as natural backdrops. Morning mist and 
                  fog create natural diffusion.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-forest-50 rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800 mb-4">
                ✝️ The Light of the World
              </h2>
              <p className="text-forest-700 mb-4">
                "When Jesus spoke again to the people, he said, 'I am the light of the world. 
                Whoever follows me will never walk in darkness, but will have the light of life.'" 
                - John 8:12
              </p>
              <p className="text-forest-600">
                Every time we work with natural light, we're working with God's creation. 
                The same God who separated light from darkness gives us this incredible 
                tool to reveal beauty, truth, and hope in our storytelling.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-sage-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-heading font-bold text-ink-900 mb-4">
                You're Ready for Costa Rica!
              </h3>
              <p className="text-ink-600 text-lg mb-6">
                You've completed our foundational filmmaking curriculum. Now it's time to 
                put these skills to work in one of the world's most beautiful locations.
              </p>
              <div className="flex items-center justify-center gap-2 text-forest-600 mb-6">
                <span className="text-xl font-semibold">February 20–28, 2026</span>
                <span>•</span>
                <span className="text-xl font-semibold">Costa Rica</span>
              </div>
              <div className="space-y-4">
                <a 
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white font-bold rounded-lg hover:bg-forest-700 transition-colors mr-4"
                >
                  Reserve Your Spot
                </a>
                <a 
                  href={`/vision?t=${params.t}`}
                  className="inline-flex items-center justify-center px-6 py-3 bg-sage-200 text-ink-700 font-semibold rounded-lg hover:bg-sage-300 transition-colors"
                >
                  Review Our Vision
                </a>
              </div>
            </div>
          </section>
        </div>
      </LearnLayout>
    </>
  );
}