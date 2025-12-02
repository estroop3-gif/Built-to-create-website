import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jasper Itinerary - The Born to Create Project | Mountain Filmmaking Retreat',
  description: 'Faith-centered filmmaking retreat in Jasper, Georgia. Ministry-driven production and mountain-focused creative work.',
};

export default function JasperItineraryPage() {
  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-sand nature-texture opacity-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/itinerary-header.jpg')"
          }}
        ></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Jasper, Georgia Retreat Itinerary</h1>
          <p className="text-xl text-charcoal/70">
            A mountain retreat for focused, ministry-driven filmmaking
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-forest/10 border-l-4 border-forest rounded-r-lg p-6 mb-12">
            <p className="text-charcoal/70 mb-3">
              This schedule is a framework. Times and exact locations may shift based on weather and the leading of the Holy Spirit, but the flow below gives you a clear picture of how the retreat works.
            </p>
            <p className="text-charcoal/70">
              Each day balances spiritual time, teaching, production, and rest so you can hear from God and create at a high level without burning out.
            </p>
          </div>

          <div className="space-y-8">
            {/* Tuesday - Travel and Check In */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-bold text-forest">Tuesday – Travel and Check In</h2>
                  <span className="text-sm font-semibold text-sage">Day 1</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-forest mb-2">12:00 pm to 9:00 pm</p>
                  <ul className="space-y-2 text-sm text-charcoal/70">
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      <span>Arrivals and check in at the property</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      <span>Guests claim bunks or tents and get settled</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">6:30 pm to 7:30 pm</p>
                  <p className="text-sm text-charcoal/70">Casual dinner for whoever is in</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">7:30 pm to 8:30 pm</p>
                  <div className="space-y-2">
                    <p className="text-sm text-charcoal/70">Optional welcome fire hang</p>
                    <ul className="ml-4 space-y-1 text-sm text-charcoal/70">
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>Names</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>Where you serve</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>One thing you are hoping God does this week</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">After 9:00 pm</p>
                  <p className="text-sm text-charcoal/70">Rest</p>
                </div>
              </div>
            </div>

            {/* Wednesday - Day 1 */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-bold text-forest">Wednesday – Day 1</h2>
                  <span className="text-sm font-semibold text-sage">Day 2</span>
                </div>
                <p className="text-sm text-charcoal/60">Theme: Interviews, testimonies, lighting, and sound • Location: Property</p>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-forest mb-2">7:30 am to 8:30 am</p>
                  <p className="text-sm text-charcoal/70">Breakfast</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">8:30 am to 10:15 am</p>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-charcoal">Morning session: Lighting a story – interviews, testimonies, and sound basics</p>
                    <p className="text-sm text-charcoal/70">Teaching plus live demo in one block</p>
                    <ul className="ml-4 space-y-1 text-sm text-charcoal/70">
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>How to think about testimonies and interviews</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>Asking questions that go past surface answers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>Creating safety and trust for real stories</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>Natural light foundations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>Simple three point lighting</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>Sound basics – lav versus shotgun</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">10:15 am to 11:00 am</p>
                  <div className="space-y-1">
                    <p className="text-sm text-charcoal/70">Quiet time on the property</p>
                    <p className="text-xs text-charcoal/60 italic">Prompt: God, who do you want me to be as a storyteller</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">11:00 am to 1:00 pm</p>
                  <div className="space-y-2">
                    <p className="text-sm text-charcoal/70">Hands on interview labs – Several stations around the property</p>
                    <p className="text-xs text-charcoal/60">Stations: Natural light interview • Three point lighting interview • Sound station</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">1:00 pm to 2:00 pm</p>
                  <p className="text-sm text-charcoal/70">Lunch at the property</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">2:00 pm to 4:00 pm</p>
                  <p className="text-sm text-charcoal/70">Testimony practice shoot – Small groups capture at least one real short testimony</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">4:00 pm to 5:15 pm</p>
                  <p className="text-sm text-charcoal/70">Free time – showers, rest, hang time</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">5:45 pm to 6:45 pm</p>
                  <p className="text-sm text-charcoal/70">Dinner</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">7:00 pm to 8:15 pm</p>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-charcoal">Evening session: Why we even do this – calling and media in the church</p>
                    <ul className="ml-4 space-y-1 text-sm text-charcoal/70">
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>Being a leader in media, not just a tech</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>Pairing calling with working in a church body</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>Using media to glorify God</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">8:15 pm to 9:30 pm</p>
                  <p className="text-sm text-charcoal/70">Fire hang and unstructured community</p>
                </div>
              </div>
            </div>

            {/* Thursday - Day 2 */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-bold text-forest">Thursday – Day 2</h2>
                  <span className="text-sm font-semibold text-sage">Day 3</span>
                </div>
                <p className="text-sm text-charcoal/60">Theme: From sanctuary to streets • Location: Property, church, downtown Jasper</p>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-forest mb-2">7:00 am to 7:30 am</p>
                  <p className="text-sm text-charcoal/70">Quiet time – Solo prayer and Scripture</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">8:30 am to 10:00 am</p>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-charcoal">Morning session at the church: Serving the room – multi camera as worship</p>
                    <ul className="ml-4 space-y-1 text-sm text-charcoal/70">
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>Excellence as worship instead of perfectionism</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sage mr-2">•</span>
                        <span>Camera angles, lens choices, and audio that serve real people</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">10:00 am to 11:15 am</p>
                  <p className="text-sm text-charcoal/70">Multi camera lab – Set layout, run worship/teaching block, rotate roles</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">12:00 pm to 1:00 pm</p>
                  <p className="text-sm text-charcoal/70">Lunch at a downtown Jasper restaurant</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">1:00 pm to 2:00 pm</p>
                  <div className="space-y-1">
                    <p className="text-sm text-charcoal/70">Quiet and solo b roll time in downtown Jasper</p>
                    <p className="text-xs text-charcoal/60 italic">Prompt: God, help me see this town and these people the way you do</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">2:00 pm to 4:00 pm</p>
                  <div className="space-y-2">
                    <p className="text-sm text-charcoal/70">Group street shoot in downtown Jasper</p>
                    <p className="text-xs text-charcoal/60">Visual sequence, on-the-fly interviews, texture coverage</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">4:30 pm to 5:30 pm</p>
                  <p className="text-sm text-charcoal/70">Ingest and quick look – Show standout clips from each team</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">7:45 pm to 9:00 pm</p>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-charcoal">Evening session: Street stories and Kingdom eyes</p>
                    <p className="text-sm text-charcoal/70">What was hardest about approaching people, where you sensed God, being a media missionary in your own city</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Friday - Day 3 */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-bold text-forest">Friday – Day 3</h2>
                  <span className="text-sm font-semibold text-sage">Day 4</span>
                </div>
                <p className="text-sm text-charcoal/60">Theme: Hike, story brain, live edit, sending • Location: Property and hike</p>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-forest mb-2">8:00 am to 8:20 am</p>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-charcoal">Short teaching setup: Walking with Christ as a storyteller</p>
                    <p className="text-sm text-charcoal/70">Calling, wilderness, obedience shaping your voice</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">8:20 am to 10:15 am</p>
                  <div className="space-y-1">
                    <p className="text-sm text-charcoal/70">Hike with built in quiet time – Prayer and reflection walk</p>
                    <p className="text-xs text-charcoal/60 italic">Prompts: What are you asking me to lay down? What are you asking me to pick up?</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">10:15 am to 10:45 am</p>
                  <p className="text-sm text-charcoal/70">Debrief back at the property – Small circles share what God highlighted</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">1:00 pm to 2:15 pm</p>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-charcoal">Live edit part one: From footage to film</p>
                    <p className="text-sm text-charcoal/70">Organization, selects, bin structure, building a selects sequence</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">2:30 pm to 3:45 pm</p>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-charcoal">Live edit part two: Build a one minute Jasper piece in real time</p>
                    <p className="text-sm text-charcoal/70">Define story, drop music, build spine, layer b roll</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">3:45 pm to 4:15 pm</p>
                  <div className="space-y-1">
                    <p className="text-sm text-charcoal/70">Final solo quiet time</p>
                    <p className="text-xs text-charcoal/60 italic">One spiritual rhythm I am committing to • One story I will tell in the next three months</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">4:15 pm to 5:00 pm</p>
                  <p className="text-sm text-charcoal/70">Small group share and prayer – Groups of three</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">7:15 pm to 8:30 pm</p>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-charcoal">Evening session: Next steps and commissioning</p>
                    <p className="text-sm text-charcoal/70">Final word, testimonies, corporate prayer and commissioning as servant-leader filmmakers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Saturday - Check out */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-bold text-forest">Saturday – Check out and travel</h2>
                  <span className="text-sm font-semibold text-sage">Day 5</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-forest mb-2">8:00 am to 9:00 am</p>
                  <p className="text-sm text-charcoal/70">Light breakfast and coffee</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">9:00 am to 11:00 am</p>
                  <p className="text-sm text-charcoal/70">Pack up, tear down tents, clean up property</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-forest mb-2">11:00 am to 2:00 pm</p>
                  <p className="text-sm text-charcoal/70">Airport runs and departures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
