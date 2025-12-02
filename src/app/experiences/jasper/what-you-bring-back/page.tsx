import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Church Media Toolkit - Jasper Retreat | The Born to Create Project',
  description: 'Practical tools, systems, and workflows you can plug into your church media team from the Jasper, Georgia retreat.',
};

export default function WhatYouBringBackPage() {
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
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Church Media Toolkit</h1>
          <p className="text-xl text-charcoal/70">
            Practical tools, systems, and workflows you can plug into your church media team the moment you get home.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-forest/10 border-l-4 border-forest rounded-r-lg p-6 mb-12">
            <p className="text-charcoal/70">
              The Jasper, Georgia retreat is not a one time mountaintop moment. It is designed to send you back to your church with tangible resources, repeatable systems, and clear next steps for your media team. Everything you practice on the mountain is built so it can work on a normal Sunday, with a normal church budget, and a real congregation in the room.
            </p>
          </div>

          <div className="space-y-8">
            {/* Section 1: Course booklet */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">A course booklet built for church media</h2>

              <p className="text-charcoal/70 mb-6">
                Every participant leaves Jasper with a printed course booklet and a digital copy you can share with your team. The booklet is not just inspirational notes. It is a working field manual for church media.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Exposure reference charts you can use on any camera, including guidance based on the Panasonic GH4, Sony FS100, Sony FS7, and Panasonic AF100 setups we use at the retreat</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Simple lighting diagrams for testimonies, interviews, and teaching so you can set up repeatable looks in your sanctuary or small rooms</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Audio checklists and basic mic placement guides for voice, worship, and teaching</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Space to add your own notes, diagrams, and presets as you learn what works in your specific room</span>
                </li>
              </ul>
            </div>

            {/* Section 2: DIT and naming systems */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">DIT and naming conventions that keep you organized</h2>

              <p className="text-charcoal/70 mb-6">
                You will also bring home a clear DIT and naming convention guide so your footage, projects, and exports stay organized long after the retreat is over. This is built for real church environments where time is tight and volunteers are involved.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A simple folder structure you can copy and paste for every Sunday, event, or special project</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>File naming templates for cameras, cards, and audio that make it obvious what each clip is without having to watch it</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A DIT workflow that covers card offload, backup, and handoff so nothing gets lost between the booth, the office, and volunteer editors</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Practical examples that show how to apply the same structure to testimonies, interviews, multi camera services, and street stories</span>
                </li>
              </ul>
            </div>

            {/* Section 3: Practical systems */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Plug and play systems for Sundays and beyond</h2>

              <p className="text-charcoal/70 mb-6">
                Throughout the Jasper retreat you will build simple systems you can plug straight into your church. The goal is not to give you theory, but working rhythms and checklists you can hand to your pastor or volunteers.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A repeatable process for capturing and editing testimonies that feels safe for the person sharing and doable for your team</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A basic multi camera worship and teaching plan you can scale up or down based on how many volunteers and cameras you have</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A framework for planning "street stories" and community pieces so you can tell what God is doing outside the walls of your building</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Sunday service media checklists that cover pre service checks, live moments, and post service exports</span>
                </li>
              </ul>
            </div>

            {/* Section 4: Course material you can teach */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Material you can teach to your own team</h2>

              <p className="text-charcoal/70 mb-6">
                All of the core teaching from the Jasper retreat is designed so you can take it home and teach it again. You will not just leave with inspiration. You will leave with language, outlines, and examples you can share with your media team, youth, or volunteers.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Session outlines on interviews, testimonies, multi camera worship coverage, and downtown storytelling</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Simple principles for framing, movement, and audio you can pass on to new volunteers without overwhelming them</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A step by step walkthrough of the live edit process used at Jasper to build a one minute piece from real footage</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Prompts and questions you can use in your own training nights and small groups for media team discipleship</span>
                </li>
              </ul>
            </div>

            {/* Section 5: Spiritual and leadership takeaways */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Spiritual and leadership rhythms for media leaders</h2>

              <p className="text-charcoal/70 mb-6">
                Alongside the technical tools, you will bring home spiritual and leadership rhythms meant to keep you grounded as you serve week after week.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Prayer and Scripture rhythms you can integrate into your pre service run throughs and weekly prep</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A language for talking with your pastor about media as ministry, not just tech</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Questions to ask your team that help them process calling, burnout, and obedience</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A simple framework for evaluating new projects and ideas through both a creative and Kingdom lens</span>
                </li>
              </ul>
            </div>

            {/* Section 6: How to use this when you get back */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">How to put this to work in the first 30 days</h2>

              <p className="text-charcoal/70 mb-6">
                The Jasper retreat is a launch pad, not a finish line. This page and the resources you receive are designed to guide your first month back home.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Suggested first week actions, such as organizing your existing drive structure and renaming a recent project using the new DIT conventions</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A simple plan for one training night where you walk your media team through testimonies, interviews, and the new naming system</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A one to three month sketch of the first stories you want to tell in and around your church using the tools you practiced in Jasper</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
