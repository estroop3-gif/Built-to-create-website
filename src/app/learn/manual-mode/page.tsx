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

export default async function ManualModePage({ searchParams }: PageProps) {
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
        title="Manual Mode Mastery"
        subtitle="Take full creative control of your camera"
        currentSlug="manual-mode"
        userEmail={userEmail}
      >
        <div className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-forest-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800 mb-4">
                📸 Why Manual Mode Matters
              </h2>
              <p className="text-forest-700 text-lg leading-relaxed">
                Manual mode gives you complete creative control over your image. Instead of letting 
                the camera guess what you want, you make intentional decisions about exposure, 
                depth of field, and motion blur.
              </p>
            </div>
          </section>

          {/* The Exposure Triangle */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              ⚖️ The Exposure Triangle
            </h2>
            
            <p className="text-ink-600 text-lg mb-8">
              Understanding the relationship between aperture, shutter speed, and ISO is fundamental 
              to mastering manual mode. Each setting affects both exposure and creative elements.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-sage-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🔵</div>
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Aperture (f-stop)</h3>
                <p className="text-ink-600 mb-4">Controls depth of field</p>
                <ul className="text-sm text-ink-500 space-y-1">
                  <li>f/1.4-2.8: Shallow depth</li>
                  <li>f/4-5.6: Medium depth</li>
                  <li>f/8-11: Deep depth</li>
                </ul>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Shutter Speed</h3>
                <p className="text-ink-600 mb-4">Controls motion blur</p>
                <ul className="text-sm text-ink-500 space-y-1">
                  <li>1/60s+: Freeze motion</li>
                  <li>1/30s: Slight motion blur</li>
                  <li>1/15s-: Creative blur</li>
                </ul>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🔆</div>
                <h3 className="text-xl font-semibold text-ink-800 mb-3">ISO</h3>
                <p className="text-ink-600 mb-4">Controls sensor sensitivity</p>
                <ul className="text-sm text-ink-500 space-y-1">
                  <li>100-400: Clean image</li>
                  <li>800-1600: Slight noise</li>
                  <li>3200+: Visible noise</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step-by-Step Process */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              📋 Manual Mode Workflow
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Step 1: Choose Your Aperture</h3>
                <p className="text-ink-600 mb-3">
                  Start with aperture because it determines your depth of field. Ask yourself: 
                  "How much of my scene do I want in focus?"
                </p>
                <ul className="text-sm text-ink-500 space-y-1 ml-4">
                  <li>• Portrait/Interview: f/1.4-2.8 (shallow focus on subject)</li>
                  <li>• Group shots: f/4-5.6 (everyone in focus)</li>
                  <li>• Landscapes: f/8-11 (everything sharp)</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Step 2: Set Your Shutter Speed</h3>
                <p className="text-ink-600 mb-3">
                  Choose based on your subject movement and desired effect:
                </p>
                <ul className="text-sm text-ink-500 space-y-1 ml-4">
                  <li>• Talking heads: 1/60s (natural motion)</li>
                  <li>• Walking/movement: 1/120s+ (crisp action)</li>
                  <li>• Creative blur: 1/30s or slower</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Step 3: Adjust ISO for Exposure</h3>
                <p className="text-ink-600 mb-3">
                  Use your camera's light meter or histogram to achieve proper exposure:
                </p>
                <ul className="text-sm text-ink-500 space-y-1 ml-4">
                  <li>• Start with ISO 100-400 in good light</li>
                  <li>• Increase ISO if image is too dark</li>
                  <li>• Keep it as low as possible for best quality</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Step 4: Fine-tune and Test</h3>
                <p className="text-ink-600 mb-3">
                  Take a test shot and adjust as needed:
                </p>
                <ul className="text-sm text-ink-500 space-y-1 ml-4">
                  <li>• Too dark? Lower f-stop, slower shutter, or higher ISO</li>
                  <li>• Too bright? Higher f-stop, faster shutter, or lower ISO</li>
                  <li>• Check focus and depth of field</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Scenarios */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🎬 Common Filming Scenarios
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🗣️ Interview Setup</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Aperture:</strong> f/2.8-4 (shallow depth, subject focus)</div>
                  <div><strong>Shutter:</strong> 1/60s (natural motion)</div>
                  <div><strong>ISO:</strong> 400-800 (adjust for lighting)</div>
                  <div><strong>Goal:</strong> Separate subject from background</div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🌅 Golden Hour B-Roll</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Aperture:</strong> f/1.4-2.8 (cinematic bokeh)</div>
                  <div><strong>Shutter:</strong> 1/120s (smooth movement)</div>
                  <div><strong>ISO:</strong> 100-400 (clean image)</div>
                  <div><strong>Goal:</strong> Beautiful background blur</div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🏞️ Landscape Establishing</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Aperture:</strong> f/8-11 (everything sharp)</div>
                  <div><strong>Shutter:</strong> 1/60-120s (stable)</div>
                  <div><strong>ISO:</strong> 100-200 (maximum quality)</div>
                  <div><strong>Goal:</strong> Show entire scene in focus</div>
                </div>
              </div>
              
              <div className="bg-ink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-3">🌙 Low Light Interior</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div><strong>Aperture:</strong> f/1.4-2.0 (gather light)</div>
                  <div><strong>Shutter:</strong> 1/60s (maintain sharpness)</div>
                  <div><strong>ISO:</strong> 1600-3200 (balance noise)</div>
                  <div><strong>Goal:</strong> Usable image in challenging light</div>
                </div>
              </div>
            </div>
          </section>

          {/* Practice Exercises */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              💪 Practice Exercises
            </h2>
            
            <div className="bg-sage-100 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-ink-800 mb-4">This Week's Challenges</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1.5 h-4 w-4 text-forest-600 rounded border-ink-300" />
                  <div>
                    <strong className="text-ink-800">Depth of Field Practice:</strong>
                    <p className="text-ink-600 text-sm mt-1">
                      Film the same subject at f/1.4, f/4, and f/8. Notice how the background changes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1.5 h-4 w-4 text-forest-600 rounded border-ink-300" />
                  <div>
                    <strong className="text-ink-800">Motion Blur Experiment:</strong>
                    <p className="text-ink-600 text-sm mt-1">
                      Film someone walking at 1/15s, 1/60s, and 1/120s. See the difference in motion blur.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1.5 h-4 w-4 text-forest-600 rounded border-ink-300" />
                  <div>
                    <strong className="text-ink-800">ISO Comparison:</strong>
                    <p className="text-ink-600 text-sm mt-1">
                      Take the same shot at ISO 100, 800, 1600, and 3200. Compare image quality.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1.5 h-4 w-4 text-forest-600 rounded border-ink-300" />
                  <div>
                    <strong className="text-ink-800">Complete Scene:</strong>
                    <p className="text-ink-600 text-sm mt-1">
                      Film a 2-minute conversation entirely in manual mode, adjusting for different angles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Faith Integration */}
          <section className="mb-12">
            <div className="bg-forest-50 rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800 mb-4">
                ✝️ Faith & Technical Excellence
              </h2>
              <p className="text-forest-700 mb-4">
                "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters." 
                - Colossians 3:23
              </p>
              <p className="text-forest-600">
                Mastering manual mode isn't just about technical proficiency—it's about stewarding 
                your creative gifts well. When we take time to understand our tools deeply, we're 
                better equipped to serve God's kingdom through excellent storytelling.
              </p>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-8">
            <div className="bg-sage-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-heading font-bold text-ink-900 mb-4">
                Ready for the Next Level?
              </h3>
              <p className="text-ink-600 text-lg mb-6">
                Now that you understand manual mode fundamentals, let's explore how different 
                lenses can transform your storytelling.
              </p>
              <a 
                href={`/learn/lenses?t=${params.t}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white font-bold rounded-lg hover:bg-forest-700 transition-colors"
              >
                Learn About Lenses →
              </a>
            </div>
          </section>
        </div>
      </LearnLayout>
    </>
  );
}