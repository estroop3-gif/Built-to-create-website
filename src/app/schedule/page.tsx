export default function Schedule() {
  const schedule = [
    {
      day: 1,
      title: "Arrival & Foundation",
      activities: [
        { time: "2:00 PM", activity: "Check-in & Welcome" },
        { time: "4:00 PM", activity: "Opening Circle & Introductions" },
        { time: "6:00 PM", activity: "Welcome Dinner" },
        { time: "8:00 PM", activity: "Storytelling Foundations Workshop" }
      ]
    },
    {
      day: 2,
      title: "Technical Mastery",
      activities: [
        { time: "7:00 AM", activity: "Morning Meditation" },
        { time: "8:00 AM", activity: "Breakfast" },
        { time: "9:00 AM", activity: "Camera & Cinematography Workshop" },
        { time: "12:00 PM", activity: "Lunch" },
        { time: "2:00 PM", activity: "Editing Fundamentals" },
        { time: "5:00 PM", activity: "Free Creative Time" },
        { time: "7:00 PM", activity: "Dinner & Film Screening" }
      ]
    },
    {
      day: 3,
      title: "Story Development",
      activities: [
        { time: "7:00 AM", activity: "Morning Meditation" },
        { time: "8:00 AM", activity: "Breakfast" },
        { time: "9:00 AM", activity: "Narrative Structure Workshop" },
        { time: "12:00 PM", activity: "Lunch" },
        { time: "2:00 PM", activity: "Individual Story Consultations" },
        { time: "5:00 PM", activity: "Production Planning" },
        { time: "7:00 PM", activity: "Dinner & Guest Speaker" }
      ]
    },
    {
      day: 4,
      title: "Production Day",
      activities: [
        { time: "7:00 AM", activity: "Morning Meditation" },
        { time: "8:00 AM", activity: "Breakfast" },
        { time: "9:00 AM", activity: "Film Production (All Day)" },
        { time: "12:00 PM", activity: "Working Lunch" },
        { time: "6:00 PM", activity: "Wrap & Review" },
        { time: "7:00 PM", activity: "Dinner & Rough Cut Reviews" }
      ]
    },
    {
      day: 5,
      title: "Completion & Celebration",
      activities: [
        { time: "8:00 AM", activity: "Breakfast" },
        { time: "9:00 AM", activity: "Final Editing & Polish" },
        { time: "12:00 PM", activity: "Lunch" },
        { time: "2:00 PM", activity: "Film Festival & Presentations" },
        { time: "5:00 PM", activity: "Closing Circle" },
        { time: "6:00 PM", activity: "Farewell Celebration Dinner" }
      ]
    }
  ];

  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-sand"></div>
        <div className="absolute inset-0 nature-texture opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">5-Day Journey</h1>
          <p className="text-xl text-charcoal/70">
            A carefully crafted schedule designed to maximize learning and creativity
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {schedule.map((day) => (
              <div key={day.day} className="relative">
                <div className="md:grid md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <div className="sticky top-24">
                      <div className="bg-forest text-cream rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold">{day.day}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-charcoal mb-2">Day {day.day}</h3>
                      <p className="text-lg text-forest font-semibold">{day.title}</p>
                    </div>
                  </div>

                  <div className="md:col-span-9 mt-8 md:mt-0">
                    <div className="bg-cream rounded-2xl p-6 shadow-sm">
                      <div className="space-y-4">
                        {day.activities.map((activity, index) => (
                          <div key={index} className="flex border-b border-stone/20 last:border-0 pb-4 last:pb-0">
                            <div className="w-24 flex-shrink-0">
                              <span className="text-sm font-semibold text-sage">{activity.time}</span>
                            </div>
                            <div className="flex-grow">
                              <p className="text-charcoal">{activity.activity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sand/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-cream p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-forest mb-3">Daily Rhythm</h3>
              <p className="text-charcoal/70 text-sm">
                Each day begins with optional morning meditation, followed by structured workshops, hands-on practice, and evening community gatherings.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-forest mb-3">Flexible Learning</h3>
              <p className="text-charcoal/70 text-sm">
                While we have a structured schedule, we adapt to the group's needs and energy, ensuring everyone gets the support they need.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-forest mb-3">Creative Space</h3>
              <p className="text-charcoal/70 text-sm">
                Built-in free time allows for personal reflection, individual work, and spontaneous creative collaborations with fellow participants.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-charcoal mb-6">Location & Logistics</h2>
          <div className="bg-forest/10 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-lg font-semibold text-forest mb-3">Venue</h3>
                <p className="text-charcoal/70 mb-4">
                  Our retreat takes place at a beautiful nature-immersed location, providing the perfect backdrop for creative inspiration and focused work.
                </p>
                <h3 className="text-lg font-semibold text-forest mb-3">Accommodation</h3>
                <p className="text-charcoal/70">
                  Comfortable shared rooms with all amenities. Single room upgrades available upon request.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-forest mb-3">Meals</h3>
                <p className="text-charcoal/70 mb-4">
                  All meals are provided, featuring locally-sourced, nutritious food with vegetarian and vegan options available.
                </p>
                <h3 className="text-lg font-semibold text-forest mb-3">Equipment</h3>
                <p className="text-charcoal/70">
                  Professional cameras, editing stations, and all necessary equipment are provided. Bring your own if you prefer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}