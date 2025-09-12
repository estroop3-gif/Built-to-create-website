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

export default async function VisionPage({ searchParams }: PageProps) {
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
        title="Our Vision & Mission"
        subtitle="Understanding the heart behind Born to Create Project"
        currentSlug="vision"
        userEmail={userEmail}
      >
        <div className="prose prose-lg max-w-none">
          
          {/* Mission Statement */}
          <section className="mb-12">
            <div className="bg-forest-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800 mb-4">
                🎯 Our Mission
              </h2>
              <p className="text-forest-700 text-lg leading-relaxed">
                To empower Christian storytellers with the technical skills, creative vision, and 
                faith-based perspective needed to create compelling films that honor God and impact culture.
              </p>
            </div>
          </section>

          {/* Vision Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🌟 Our Vision for Christian Filmmaking
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Excellence in Craft</h3>
                <p className="text-ink-600">
                  We believe Christian films should match or exceed secular standards in technical 
                  quality, storytelling, and production value.
                </p>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Kingdom Purpose</h3>
                <p className="text-ink-600">
                  Every project should serve God's kingdom, whether through evangelism, 
                  discipleship, or cultural transformation.
                </p>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Authentic Stories</h3>
                <p className="text-ink-600">
                  We focus on genuine, relatable narratives that reflect real faith journeys 
                  and human experiences.
                </p>
              </div>
              
              <div className="bg-sage-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-ink-800 mb-3">Global Impact</h3>
                <p className="text-ink-600">
                  Our films should transcend cultural boundaries and speak to universal 
                  truths found in the Gospel.
                </p>
              </div>
            </div>
          </section>

          {/* Why Costa Rica */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🌿 Why Costa Rica?
            </h2>
            
            <p className="text-ink-600 text-lg mb-6">
              Costa Rica provides the perfect backdrop for intensive filmmaking education:
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-forest-600 text-xl">🎬</span>
                <div>
                  <strong className="text-ink-800">Diverse Locations:</strong>
                  <span className="text-ink-600 ml-2">
                    Beaches, rainforests, mountains, and urban settings all within hours of each other
                  </span>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <span className="text-forest-600 text-xl">☀️</span>
                <div>
                  <strong className="text-ink-800">Perfect Lighting:</strong>
                  <span className="text-ink-600 ml-2">
                    Consistent golden hour light and natural beauty that enhances every shot
                  </span>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <span className="text-forest-600 text-xl">🤝</span>
                <div>
                  <strong className="text-ink-800">Welcoming Culture:</strong>
                  <span className="text-ink-600 ml-2">
                    Friendly locals and established filmmaking infrastructure
                  </span>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <span className="text-forest-600 text-xl">⚡</span>
                <div>
                  <strong className="text-ink-800">Focused Learning:</strong>
                  <span className="text-ink-600 ml-2">
                    Immersive environment away from daily distractions
                  </span>
                </div>
              </li>
            </ul>
          </section>

          {/* Our Approach */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              ⚖️ Our Balanced Approach
            </h2>
            
            <div className="bg-ink-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🛠️</div>
                  <h3 className="text-lg font-semibold text-ink-800 mb-3">Technical Mastery</h3>
                  <p className="text-ink-600 text-sm">
                    Camera operation, lighting, audio, and post-production skills that match 
                    industry standards
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-lg font-semibold text-ink-800 mb-3">Creative Vision</h3>
                  <p className="text-ink-600 text-sm">
                    Storytelling techniques, composition, and artistic choices that elevate 
                    your message
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4">✝️</div>
                  <h3 className="text-lg font-semibold text-ink-800 mb-3">Faith Integration</h3>
                  <p className="text-ink-600 text-sm">
                    Biblical worldview application and ministry-focused project development
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What You'll Gain */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
              🚀 What You'll Gain
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Professional Skills</h3>
                <p className="text-ink-600">
                  Master camera operation, lighting techniques, audio recording, and post-production 
                  workflows that will serve you for years to come.
                </p>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Creative Confidence</h3>
                <p className="text-ink-600">
                  Develop your unique visual style and storytelling voice through hands-on practice 
                  and personalized mentorship.
                </p>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Ministry Perspective</h3>
                <p className="text-ink-600">
                  Learn to integrate faith authentically into your work and understand how 
                  filmmaking can serve God's kingdom.
                </p>
              </div>
              
              <div className="border-l-4 border-forest-600 pl-6">
                <h3 className="text-lg font-semibold text-ink-800 mb-2">Lifelong Community</h3>
                <p className="text-ink-600">
                  Connect with other Christian filmmakers and build relationships that will 
                  support your ongoing creative journey.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Deeper Learning */}
          <section className="mb-8">
            <div className="bg-sage-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-heading font-bold text-ink-900 mb-4">
                Ready to Dive Deeper?
              </h3>
              <p className="text-ink-600 text-lg mb-6">
                Now that you understand our heart and vision, let's explore the technical skills 
                that will make your stories shine. Start with our manual mode mastery guide.
              </p>
              <a 
                href={`/learn/manual-mode?t=${params.t}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white font-bold rounded-lg hover:bg-forest-700 transition-colors"
              >
                Begin Technical Training →
              </a>
            </div>
          </section>
        </div>
      </LearnLayout>
    </>
  );
}