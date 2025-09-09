import { ScheduleItem } from '@/lib/itinerary';

interface DayScheduleProps {
  schedule: ScheduleItem[];
}

export default function DaySchedule({ schedule }: DayScheduleProps) {
  return (
    <div className="space-y-6">
      {schedule.map((item, index) => (
        <div key={index} className="bg-cream rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="md:w-24 flex-shrink-0">
              <span className="inline-block bg-sage/20 text-forest px-3 py-1 rounded-full text-sm font-semibold">
                {item.time}
              </span>
            </div>
            
            <div className="flex-grow space-y-3">
              <h3 className="text-lg font-bold text-charcoal">{item.title}</h3>
              <p className="text-charcoal/70">{item.description}</p>
              
              {item.skillsFocus && item.skillsFocus.length > 0 && (
                <div className="pt-3 border-t border-stone/20">
                  <p className="text-xs font-semibold text-forest mb-2">Skills Focus:</p>
                  <div className="flex flex-wrap gap-2">
                    {item.skillsFocus.map((skill, idx) => (
                      <span key={idx} className="text-xs bg-sand/50 text-charcoal px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 text-xs text-charcoal/60">
                {item.gearNotes && (
                  <div className="flex items-start gap-1">
                    <svg className="w-4 h-4 text-sage mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{item.gearNotes}</span>
                  </div>
                )}
                
                {item.terrainNotes && (
                  <div className="flex items-start gap-1">
                    <svg className="w-4 h-4 text-moss mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{item.terrainNotes}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}