'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { RetreatData, formatDateRange } from '@/lib/retreats';
import type { Experience, ExperienceUpdate, DayItem, FAQ } from '@/lib/types/experience';
import Section from '../Section';
import RetreatRegistrationsTab from './RetreatRegistrationsTab';
import RetreatWaitlistTab from './RetreatWaitlistTab';

interface AdminRetreatDetailPageProps {
  retreat: RetreatData;
}

interface RetreatContent {
  id: string;
  section: string;
  title: string;
  body: string;
  order_index: number;
}

interface UserAccess {
  id: string;
  user_id: string;
  profiles?: {
    email: string;
    full_name: string;
  };
  granted_by: string;
  created_at: string;
}

interface CapacityStatus {
  capacity: number | null;
  registered_count: number;
  available: number | null;
  is_full: boolean;
  waitlist_count: number;
}

interface ExperienceRecord {
  id: string;
  slug: string;
}

const sectionOptions = [
  { value: 'itinerary', label: 'Itinerary' },
  { value: 'packing', label: 'Packing List' },
  { value: 'travel', label: 'Travel Information' },
  { value: 'flights', label: 'Flights & Arrival' },
  { value: 'lodging', label: 'Lodging Information' },
  { value: 'safety', label: 'Safety & Medical' },
  { value: 'visa', label: 'Visa & Entry Requirements' }
];

type TabKey = 'overview' | 'edit-page' | 'attendee-content' | 'registrations' | 'waitlist';

// ─── Edit Page Tab Component ───────────────────────────────────────────────────

function EditPageTab({ experienceId }: { experienceId: string }) {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [type, setType] = useState<'retreat' | 'workshop'>('retreat');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [theme, setTheme] = useState('');
  const [overview, setOverview] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [priceDisplay, setPriceDisplay] = useState('');
  const [durationDisplay, setDurationDisplay] = useState('');
  const [gearNote, setGearNote] = useState('');
  const [registerUrl, setRegisterUrl] = useState('');
  const [emailCtaText, setEmailCtaText] = useState('');
  const [capacity, setCapacity] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [venue, setVenue] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<DayItem[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/experiences/${experienceId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data: Experience = await res.json();
        setExperience(data);
        // Populate form
        setTitle(data.title ?? '');
        setSubtitle(data.subtitle ?? '');
        setType(data.type ?? 'retreat');
        setStatus(data.status ?? 'draft');
        setStartDate(data.start_date ?? '');
        setEndDate(data.end_date ?? '');
        setCountry(data.country ?? '');
        setCity(data.city ?? '');
        setTheme(data.theme ?? '');
        setOverview(data.overview ?? '');
        setSeoDescription(data.seo_description ?? '');
        setPriceDisplay(data.price_display ?? '');
        setDurationDisplay(data.duration_display ?? '');
        setGearNote(data.gear_note ?? '');
        setRegisterUrl(data.register_url ?? '/register');
        setEmailCtaText(data.email_cta_text ?? 'Join the Email List');
        setCapacity(data.capacity?.toString() ?? '');
        setHeroImage(data.hero_image ?? '');
        setOgImage(data.og_image ?? '');
        setStartTime(data.start_time ?? '');
        setEndTime(data.end_time ?? '');
        setVenue(data.venue ?? '');
        setVenueAddress(data.venue_address ?? '');
        setLearningOutcomes(data.learning_outcomes?.length ? data.learning_outcomes : ['']);
        setItinerary(data.itinerary?.length ? data.itinerary : [{ day: 1, title: '', description: '', location: '' }]);
        setFaqs(data.faqs?.length ? data.faqs : [{ question: '', answer: '' }]);
      } catch (err) {
        console.error('Error loading experience:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [experienceId]);

  async function handleSave() {
    setSaving(true);
    setSaveMessage('');
    try {
      const update: ExperienceUpdate = {
        title,
        subtitle: subtitle || null,
        type,
        status,
        start_date: startDate || null,
        end_date: endDate || null,
        country: country || null,
        city: city || null,
        theme: theme || null,
        overview: overview || null,
        seo_description: seoDescription || null,
        price_display: priceDisplay || null,
        duration_display: durationDisplay || null,
        gear_note: gearNote || null,
        register_url: registerUrl || '/register',
        email_cta_text: emailCtaText || 'Join the Email List',
        capacity: capacity ? parseInt(capacity) : null,
        hero_image: heroImage || null,
        og_image: ogImage || null,
        start_time: startTime || null,
        end_time: endTime || null,
        venue: venue || null,
        venue_address: venueAddress || null,
        learning_outcomes: learningOutcomes.filter(o => o.trim()),
        itinerary: itinerary.filter(i => i.title.trim()),
        faqs: faqs.filter(f => f.question.trim()),
      };

      const res = await fetch(`/api/admin/experiences/${experienceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
      });
      if (!res.ok) throw new Error('Failed to save');
      const updated = await res.json();
      setExperience(updated);
      setSaveMessage('Saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      console.error('Error saving:', err);
      setSaveMessage('Error saving changes');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
        <p className="mt-4 font-body text-ink-600">Loading page data...</p>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="p-6">
        <p className="text-ink-500 italic">Could not load experience data from the database.</p>
      </div>
    );
  }

  const inputClass = 'w-full px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-forest-200 focus:border-forest-400 text-sm';
  const labelClass = 'block text-sm font-medium text-ink-700 mb-1';

  return (
    <div className="p-6 space-y-8">
      {/* Section 1: Basic Info */}
      <div>
        <h3 className="font-heading text-lg font-bold text-ink-900 mb-4">Basic Info</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Subtitle</label>
            <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Type</label>
            <select value={type} onChange={e => setType(e.target.value as 'retreat' | 'workshop')} className={inputClass}>
              <option value="retreat">Retreat</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as 'draft' | 'published' | 'archived')} className={inputClass}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Start Date</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>End Date</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Country</label>
            <input type="text" value={country} onChange={e => setCountry(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input type="text" value={city} onChange={e => setCity(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Theme</label>
            <input type="text" value={theme} onChange={e => setTheme(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Capacity</label>
            <input type="number" value={capacity} onChange={e => setCapacity(e.target.value)} placeholder="Unlimited" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Price Display</label>
            <input type="text" value={priceDisplay} onChange={e => setPriceDisplay(e.target.value)} placeholder="e.g. $50" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Duration Display</label>
            <input type="text" value={durationDisplay} onChange={e => setDurationDisplay(e.target.value)} placeholder="e.g. 2 hours" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Start Time</label>
            <input type="text" value={startTime} onChange={e => setStartTime(e.target.value)} placeholder="e.g. 2:00 PM" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>End Time</label>
            <input type="text" value={endTime} onChange={e => setEndTime(e.target.value)} placeholder="e.g. 4:00 PM" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Venue</label>
            <input type="text" value={venue} onChange={e => setVenue(e.target.value)} placeholder="e.g. Pickens County Recreation Center" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Venue Address</label>
            <input type="text" value={venueAddress} onChange={e => setVenueAddress(e.target.value)} placeholder="e.g. 1329 Camp Rd, Jasper, GA 30143" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Register URL</label>
            <input type="text" value={registerUrl} onChange={e => setRegisterUrl(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email CTA Text</label>
            <input type="text" value={emailCtaText} onChange={e => setEmailCtaText(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label className={labelClass}>Overview</label>
            <textarea value={overview} onChange={e => setOverview(e.target.value)} rows={4} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>SEO Description</label>
            <textarea value={seoDescription} onChange={e => setSeoDescription(e.target.value)} rows={2} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Gear Note</label>
            <textarea value={gearNote} onChange={e => setGearNote(e.target.value)} rows={2} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Section 2: Images */}
      <div>
        <h3 className="font-heading text-lg font-bold text-ink-900 mb-4">Images</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Hero Image URL</label>
            <input type="text" value={heroImage} onChange={e => setHeroImage(e.target.value)} className={inputClass} />
            {heroImage && (
              <div className="mt-2 rounded-lg overflow-hidden border border-sage-200">
                <img src={heroImage} alt="Hero preview" className="w-full h-32 object-cover" />
              </div>
            )}
          </div>
          <div>
            <label className={labelClass}>OG Image URL</label>
            <input type="text" value={ogImage} onChange={e => setOgImage(e.target.value)} className={inputClass} />
            {ogImage && (
              <div className="mt-2 rounded-lg overflow-hidden border border-sage-200">
                <img src={ogImage} alt="OG preview" className="w-full h-32 object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Learning Outcomes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-bold text-ink-900">Learning Outcomes</h3>
          <button
            type="button"
            onClick={() => setLearningOutcomes([...learningOutcomes, ''])}
            className="text-forest-600 hover:text-forest-700 text-sm font-medium"
          >
            + Add Outcome
          </button>
        </div>
        <div className="space-y-2">
          {learningOutcomes.map((outcome, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-ink-400 w-6 text-right">{i + 1}.</span>
              <input
                type="text"
                value={outcome}
                onChange={e => {
                  const updated = [...learningOutcomes];
                  updated[i] = e.target.value;
                  setLearningOutcomes(updated);
                }}
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={() => {
                  const updated = learningOutcomes.filter((_, idx) => idx !== i);
                  setLearningOutcomes(updated.length ? updated : ['']);
                }}
                className="text-red-500 hover:text-red-700 text-sm px-2"
              >
                Remove
              </button>
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...learningOutcomes];
                    [updated[i - 1], updated[i]] = [updated[i], updated[i - 1]];
                    setLearningOutcomes(updated);
                  }}
                  className="text-ink-400 hover:text-ink-600 text-xs"
                  title="Move up"
                >
                  &uarr;
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Itinerary */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-bold text-ink-900">Itinerary</h3>
          <button
            type="button"
            onClick={() => setItinerary([...itinerary, { day: itinerary.length + 1, title: '', description: '', location: '' }])}
            className="text-forest-600 hover:text-forest-700 text-sm font-medium"
          >
            + Add Day
          </button>
        </div>
        <div className="space-y-4">
          {itinerary.map((item, i) => (
            <div key={i} className="bg-sage-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-ink-900 text-sm">Day {item.day}</span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = itinerary.filter((_, idx) => idx !== i);
                    setItinerary(updated.length ? updated : [{ day: 1, title: '', description: '', location: '' }]);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-3 mb-3">
                <div>
                  <label className={labelClass}>Day #</label>
                  <input
                    type="number"
                    value={item.day}
                    onChange={e => {
                      const updated = [...itinerary];
                      updated[i] = { ...updated[i], day: parseInt(e.target.value) || 0 };
                      setItinerary(updated);
                    }}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={e => {
                      const updated = [...itinerary];
                      updated[i] = { ...updated[i], title: e.target.value };
                      setItinerary(updated);
                    }}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    type="text"
                    value={item.location ?? ''}
                    onChange={e => {
                      const updated = [...itinerary];
                      updated[i] = { ...updated[i], location: e.target.value };
                      setItinerary(updated);
                    }}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  value={item.description}
                  onChange={e => {
                    const updated = [...itinerary];
                    updated[i] = { ...updated[i], description: e.target.value };
                    setItinerary(updated);
                  }}
                  rows={2}
                  className={inputClass}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: FAQs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-bold text-ink-900">FAQs</h3>
          <button
            type="button"
            onClick={() => setFaqs([...faqs, { question: '', answer: '' }])}
            className="text-forest-600 hover:text-forest-700 text-sm font-medium"
          >
            + Add FAQ
          </button>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-sage-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-ink-900 text-sm">FAQ {i + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = faqs.filter((_, idx) => idx !== i);
                    setFaqs(updated.length ? updated : [{ question: '', answer: '' }]);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={e => {
                      const updated = [...faqs];
                      updated[i] = { ...updated[i], question: e.target.value };
                      setFaqs(updated);
                    }}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Answer</label>
                  <textarea
                    value={faq.answer}
                    onChange={e => {
                      const updated = [...faqs];
                      updated[i] = { ...updated[i], answer: e.target.value };
                      setFaqs(updated);
                    }}
                    rows={3}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 6: Save */}
      <div className="flex items-center gap-4 pt-4 border-t border-sage-200">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-forest-600 text-cream-50 px-6 py-3 rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 font-medium"
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
        <a
          href={`/retreats/${experience.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-forest-600 hover:text-forest-700 font-medium text-sm"
        >
          Preview Page &rarr;
        </a>
        {saveMessage && (
          <span className={`text-sm font-medium ${saveMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {saveMessage}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function AdminRetreatDetailPage({ retreat }: AdminRetreatDetailPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [content, setContent] = useState<RetreatContent[]>([]);
  const [userAccess, setUserAccess] = useState<UserAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState<RetreatContent | null>(null);
  const [newContent, setNewContent] = useState({
    section: 'itinerary',
    title: '',
    body: '',
    order_index: 0
  });
  const [capacityStatus, setCapacityStatus] = useState<CapacityStatus | null>(null);
  const [editingCapacity, setEditingCapacity] = useState(false);
  const [capacityInput, setCapacityInput] = useState('');
  const [savingCapacity, setSavingCapacity] = useState(false);
  const [experienceRecord, setExperienceRecord] = useState<ExperienceRecord | null>(null);

  const supabase = createClient();

  const fetchCapacity = useCallback(async () => {
    try {
      const res = await fetch(`/api/experiences/${retreat.slug}/capacity`);
      if (res.ok) {
        const data = await res.json();
        setCapacityStatus(data);
        setCapacityInput(data.capacity?.toString() || '');
      }
    } catch (error) {
      console.error('Error fetching capacity:', error);
    }
  }, [retreat.slug]);

  const fetchExperienceRecord = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('experiences')
        .select('id, slug')
        .eq('slug', retreat.slug)
        .single();
      if (data) setExperienceRecord(data);
    } catch {
      // Experience may not exist in DB yet
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retreat.slug]);

  useEffect(() => {
    fetchData();
    fetchCapacity();
    fetchExperienceRecord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retreat.slug]);

  async function fetchData() {
    try {
      const { data: contentData } = await supabase
        .from('retreat_content')
        .select('*')
        .eq('retreat_slug', retreat.slug)
        .order('section', { ascending: true })
        .order('order_index', { ascending: true });

      const { data: accessData } = await supabase
        .from('retreat_access')
        .select(`
          *,
          profiles(email, full_name)
        `)
        .eq('retreat_slug', retreat.slug);

      setContent(contentData || []);
      setUserAccess(accessData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveContent() {
    try {
      const { error } = await supabase
        .from('retreat_content')
        .insert({
          retreat_slug: retreat.slug,
          ...newContent
        });
      if (error) throw error;
      await supabase.from('audit_log').insert({
        action: 'CONTENT_CREATE',
        target: `${retreat.slug}:${newContent.section}`,
        payload: { title: newContent.title }
      });
      setNewContent({ section: 'itinerary', title: '', body: '', order_index: 0 });
      fetchData();
    } catch (error) {
      console.error('Error saving content:', error);
    }
  }

  async function updateContent() {
    if (!editingContent) return;
    try {
      const { error } = await supabase
        .from('retreat_content')
        .update({
          title: editingContent.title,
          body: editingContent.body,
          order_index: editingContent.order_index
        })
        .eq('id', editingContent.id);
      if (error) throw error;
      await supabase.from('audit_log').insert({
        action: 'CONTENT_UPDATE',
        target: `${retreat.slug}:${editingContent.section}`,
        payload: { title: editingContent.title }
      });
      setEditingContent(null);
      fetchData();
    } catch (error) {
      console.error('Error updating content:', error);
    }
  }

  async function deleteContent(contentId: string) {
    try {
      const { error } = await supabase
        .from('retreat_content')
        .delete()
        .eq('id', contentId);
      if (error) throw error;
      await supabase.from('audit_log').insert({
        action: 'CONTENT_DELETE',
        target: `${retreat.slug}:content`,
        payload: { contentId }
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  }

  async function revokeAccess(accessId: string, userEmail?: string) {
    try {
      const { error } = await supabase
        .from('retreat_access')
        .delete()
        .eq('id', accessId);
      if (error) throw error;
      await supabase.from('audit_log').insert({
        action: 'REVOKE_ACCESS',
        target: `${retreat.slug}:${userEmail || 'unknown'}`
      });
      fetchData();
    } catch (error) {
      console.error('Error revoking access:', error);
    }
  }

  async function saveCapacity() {
    if (!experienceRecord) return;
    setSavingCapacity(true);
    try {
      const newCapacity = capacityInput === '' ? null : parseInt(capacityInput);
      const res = await fetch(`/api/admin/experiences/${experienceRecord.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ capacity: newCapacity }),
      });
      if (!res.ok) throw new Error('Failed to update capacity');
      setEditingCapacity(false);
      fetchCapacity();
    } catch (error) {
      console.error('Error updating capacity:', error);
    } finally {
      setSavingCapacity(false);
    }
  }

  const isWorkshop = retreat.type === 'workshop';

  if (loading) {
    return (
      <Section spacing="xl" background="sage">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
          <p className="mt-4 font-body text-ink-600">Loading retreat data...</p>
        </div>
      </Section>
    );
  }

  const tabs: { key: TabKey; label: string; badge?: number }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'edit-page', label: 'Edit Page' },
    { key: 'attendee-content', label: 'Attendee Content' },
    { key: 'registrations', label: 'Registrations' },
    {
      key: 'waitlist',
      label: 'Waitlist',
      badge: capacityStatus?.waitlist_count || undefined,
    },
  ];

  return (
    <Section spacing="xl" background="sage">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/admin/retreats"
            className="inline-flex items-center text-forest-600 hover:text-forest-700 font-medium mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Retreats
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900">
              {retreat.title}
            </h1>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              isWorkshop
                ? 'bg-blue-100 text-blue-700'
                : 'bg-forest-100 text-forest-700'
            }`}>
              {isWorkshop ? 'Workshop' : 'Retreat'}
            </span>
          </div>
          <p className="font-body text-xl text-ink-600">
            Manage content, registrations, and waitlist for this {isWorkshop ? 'workshop' : 'retreat'}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-soft mb-8">
          <div className="border-b border-sage-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'text-forest-700 border-b-2 border-forest-600'
                      : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  {tab.label}
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="ml-2 inline-block bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="p-6 space-y-8">
              {/* Capacity Card */}
              {capacityStatus && (
                <div className="bg-sage-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-heading text-lg font-bold text-ink-900">Capacity</h4>
                    {experienceRecord && !editingCapacity && (
                      <button
                        onClick={() => {
                          setCapacityInput(capacityStatus.capacity?.toString() || '');
                          setEditingCapacity(true);
                        }}
                        className="text-forest-600 hover:text-forest-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {editingCapacity ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="0"
                        value={capacityInput}
                        onChange={(e) => setCapacityInput(e.target.value)}
                        placeholder="Unlimited"
                        className="w-32 px-3 py-2 border border-sage-200 rounded-lg text-sm"
                      />
                      <button
                        onClick={saveCapacity}
                        disabled={savingCapacity}
                        className="bg-forest-600 text-cream-50 px-3 py-2 rounded-lg text-sm hover:bg-forest-700 disabled:opacity-50"
                      >
                        {savingCapacity ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => setEditingCapacity(false)}
                        className="text-ink-500 hover:text-ink-700 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      {capacityStatus.capacity !== null ? (
                        <>
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-2xl font-bold text-ink-900">
                              {capacityStatus.registered_count}
                            </span>
                            <span className="text-ink-500">
                              / {capacityStatus.capacity} registered
                            </span>
                            {capacityStatus.is_full && (
                              <span className="ml-2 bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded">
                                FULL
                              </span>
                            )}
                          </div>
                          <div className="w-full bg-sage-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all ${
                                capacityStatus.is_full ? 'bg-red-500' : 'bg-forest-500'
                              }`}
                              style={{
                                width: `${Math.min(
                                  100,
                                  (capacityStatus.registered_count / capacityStatus.capacity) * 100
                                )}%`,
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-sm text-ink-500 mt-1">
                            <span>{capacityStatus.available} spots available</span>
                            <span>{capacityStatus.waitlist_count} on waitlist</span>
                          </div>
                        </>
                      ) : (
                        <p className="text-ink-600">
                          Unlimited capacity ({capacityStatus.registered_count} registered, {capacityStatus.waitlist_count} on waitlist)
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-heading text-lg font-bold text-ink-900 mb-4">Details</h4>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-ink-500">Dates</dt>
                      <dd className="text-ink-900">{formatDateRange(retreat.startDate, retreat.endDate)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-ink-500">Location</dt>
                      <dd className="text-ink-900">{retreat.city || retreat.country}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-ink-500">Theme</dt>
                      <dd className="text-ink-900">{retreat.theme}</dd>
                    </div>
                    {retreat.price && (
                      <div>
                        <dt className="text-sm font-medium text-ink-500">Price</dt>
                        <dd className="text-ink-900">{retreat.price}</dd>
                      </div>
                    )}
                    {retreat.duration && (
                      <div>
                        <dt className="text-sm font-medium text-ink-500">Duration</dt>
                        <dd className="text-ink-900">{retreat.duration}</dd>
                      </div>
                    )}
                    {retreat.gearNote && (
                      <div>
                        <dt className="text-sm font-medium text-ink-500">Gear</dt>
                        <dd className="text-ink-900">{retreat.gearNote}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div>
                  <h4 className="font-heading text-lg font-bold text-ink-900 mb-4">Overview</h4>
                  <p className="text-ink-700 text-sm leading-relaxed">{retreat.overview}</p>
                </div>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h4 className="font-heading text-lg font-bold text-ink-900 mb-4">Learning Outcomes</h4>
                <ul className="space-y-2">
                  {retreat.learningOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                      <svg className="w-4 h-4 text-forest-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary */}
              <div>
                <h4 className="font-heading text-lg font-bold text-ink-900 mb-4">Itinerary</h4>
                <div className="space-y-3">
                  {retreat.itinerary.map((item) => (
                    <details key={item.day} className="border border-sage-200 rounded-lg">
                      <summary className="px-4 py-3 cursor-pointer font-medium text-ink-900 hover:bg-sage-50">
                        Day {item.day}: {item.title}
                        {item.location && (
                          <span className="text-ink-500 font-normal ml-2">— {item.location}</span>
                        )}
                      </summary>
                      <div className="px-4 py-3 border-t border-sage-200 text-sm text-ink-700">
                        {item.description}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h4 className="font-heading text-lg font-bold text-ink-900 mb-4">FAQs</h4>
                <div className="space-y-3">
                  {retreat.faqs.map((faq, i) => (
                    <details key={i} className="border border-sage-200 rounded-lg">
                      <summary className="px-4 py-3 cursor-pointer font-medium text-ink-900 hover:bg-sage-50">
                        {faq.question}
                      </summary>
                      <div className="px-4 py-3 border-t border-sage-200 text-sm text-ink-700">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* User Access Section */}
              <div>
                <h4 className="font-heading text-lg font-bold text-ink-900 mb-4">
                  User Access ({userAccess.length} users)
                </h4>
                <div className="space-y-3">
                  {userAccess.map((access) => (
                    <div key={access.id} className="flex items-center justify-between p-4 bg-sage-50 rounded-lg">
                      <div>
                        <p className="font-body font-medium text-ink-900">
                          {access.profiles?.full_name || 'Unknown User'}
                        </p>
                        <p className="font-body text-sm text-ink-600">{access.profiles?.email}</p>
                        <p className="font-body text-xs text-ink-500">
                          Granted by {access.granted_by} on {new Date(access.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => revokeAccess(access.id, access.profiles?.email)}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors"
                      >
                        Revoke Access
                      </button>
                    </div>
                  ))}
                  {userAccess.length === 0 && (
                    <p className="text-ink-500 italic">No users have access to this {isWorkshop ? 'workshop' : 'retreat'} yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Edit Page Tab */}
          {activeTab === 'edit-page' && experienceRecord && (
            <EditPageTab experienceId={experienceRecord.id} />
          )}
          {activeTab === 'edit-page' && !experienceRecord && (
            <div className="p-6">
              <p className="text-ink-500 italic">
                This experience has not been seeded in the database yet. Run migration 009 to populate page fields.
              </p>
            </div>
          )}

          {/* Attendee Content Tab */}
          {activeTab === 'attendee-content' && (
            <div className="p-6">
              <h3 className="font-heading text-xl font-bold text-ink-900 mb-6">
                Attendee Content
              </h3>

              {/* Add New Content Form */}
              <div className="bg-sage-50 rounded-lg p-6 mb-8">
                <h4 className="font-heading text-lg font-bold text-ink-900 mb-4">
                  Add New Content
                </h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-2">Section</label>
                    <select
                      value={newContent.section}
                      onChange={(e) => setNewContent({ ...newContent, section: e.target.value })}
                      className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-forest-200 focus:border-forest-400"
                    >
                      {sectionOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-2">Order Index</label>
                    <input
                      type="number"
                      value={newContent.order_index}
                      onChange={(e) => setNewContent({ ...newContent, order_index: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-forest-200 focus:border-forest-400"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-ink-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newContent.title}
                    onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-forest-200 focus:border-forest-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-ink-700 mb-2">Content</label>
                  <textarea
                    value={newContent.body}
                    onChange={(e) => setNewContent({ ...newContent, body: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-forest-200 focus:border-forest-400"
                  />
                </div>
                <button
                  onClick={saveContent}
                  className="bg-forest-600 text-cream-50 px-4 py-2 rounded-lg hover:bg-forest-700 transition-colors"
                >
                  Add Content
                </button>
              </div>

              {/* Existing Content */}
              <div className="space-y-4">
                {sectionOptions.map((section) => {
                  const sectionContent = content.filter(c => c.section === section.value);
                  return (
                    <div key={section.value} className="border border-sage-200 rounded-lg">
                      <div className="bg-sage-50 px-4 py-3 border-b border-sage-200">
                        <h4 className="font-heading text-lg font-bold text-ink-900">
                          {section.label} ({sectionContent.length} items)
                        </h4>
                      </div>
                      <div className="p-4">
                        {sectionContent.length > 0 ? (
                          <div className="space-y-3">
                            {sectionContent.map((item) => (
                              <div key={item.id} className="bg-white p-4 rounded-lg border border-sage-100">
                                {editingContent?.id === item.id ? (
                                  <div className="space-y-3">
                                    <input
                                      type="text"
                                      value={editingContent.title}
                                      onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                                      className="w-full px-3 py-2 border border-sage-200 rounded-lg"
                                    />
                                    <textarea
                                      value={editingContent.body}
                                      onChange={(e) => setEditingContent({ ...editingContent, body: e.target.value })}
                                      rows={3}
                                      className="w-full px-3 py-2 border border-sage-200 rounded-lg"
                                    />
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={updateContent}
                                        className="bg-forest-600 text-cream-50 px-3 py-1 rounded text-sm hover:bg-forest-700"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => setEditingContent(null)}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h5 className="font-heading text-base font-bold text-ink-900 mb-2">
                                        {item.title}
                                      </h5>
                                      <p className="font-body text-ink-600 text-sm whitespace-pre-wrap">
                                        {item.body.substring(0, 200)}
                                        {item.body.length > 200 && '...'}
                                      </p>
                                    </div>
                                    <div className="flex space-x-2 ml-4">
                                      <button
                                        onClick={() => setEditingContent(item)}
                                        className="text-forest-600 hover:text-forest-700 text-sm"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => deleteContent(item.id)}
                                        className="text-red-600 hover:text-red-700 text-sm"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-ink-500 italic">No content added yet</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Registrations Tab */}
          {activeTab === 'registrations' && (
            <RetreatRegistrationsTab slug={retreat.slug} />
          )}

          {/* Waitlist Tab */}
          {activeTab === 'waitlist' && experienceRecord && (
            <RetreatWaitlistTab
              experienceId={experienceRecord.id}
              slug={retreat.slug}
            />
          )}
          {activeTab === 'waitlist' && !experienceRecord && (
            <div className="p-6">
              <p className="text-ink-500 italic">
                This experience has not been seeded in the database yet. Run migration 008 to create it.
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
