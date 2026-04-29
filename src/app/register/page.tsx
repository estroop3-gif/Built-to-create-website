'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { pricing, DEPOSIT, getCurrentTotal, isAfterFullPaymentDeadline, calculateRemainingBalance, formatPaymentDate, FULL_PAYMENT_DEADLINE, LATE_TOTAL, getActiveWindow } from '@/lib/pricing';
import { TEXAS_DEPOSIT, getTexasCurrentTotal, isTexasAfterFullPaymentDeadline, calculateTexasRemainingBalance, formatTexasPaymentDate, TEXAS_FULL_PAYMENT_DEADLINE, TEXAS_LATE_TOTAL, getTexasActiveWindow } from '@/lib/texasPricing';
import { RefundPolicyContent } from '@/shared/refundPolicyContent';

type ExperienceType = 'costa-rica' | 'texas' | 'filmmaking-workshop';
type CostaRicaSession = 'session-1' | 'session-2' | '';
type TexasSession = 'session-1' | 'session-2' | '';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    retreat: '' as ExperienceType | '',
    costaRicaSession: '' as CostaRicaSession,
    texasSession: '' as TexasSession,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    portfolioLink: '',
    experience: '',
    goals: '',
    dietaryNotes: '',
    emergencyContact: '',
    emergencyPhone: '',
    bringOwnCamera: false,
    paymentOption: 'deposit',
    promoCode: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [capacityStatus, setCapacityStatus] = useState<{
    capacity: number | null;
    registered_count: number;
    available: number | null;
    is_full: boolean;
    waitlist_count: number;
  } | null>(null);
  const [capacityLoading, setCapacityLoading] = useState(false);
  const [waitlistForm, setWaitlistForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [waitlistError, setWaitlistError] = useState('');

  const isWorkshop = formData.retreat === 'filmmaking-workshop';

  // Map form retreat value to experience slug for capacity lookup
  const experienceSlugMap: Record<string, string> = {
    'filmmaking-workshop': 'filmmaking-in-the-real-world',
    'costa-rica': 'costa-rica',
    'texas': 'texas',
  };

  // Fetch capacity when experience changes
  useEffect(() => {
    if (!formData.retreat) {
      setCapacityStatus(null);
      setWaitlistSuccess(false);
      setWaitlistError('');
      return;
    }
    const slug = experienceSlugMap[formData.retreat] || formData.retreat;
    setCapacityLoading(true);
    setWaitlistSuccess(false);
    setWaitlistError('');
    fetch(`/api/experiences/${slug}/capacity`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => setCapacityStatus(data))
      .catch(() => setCapacityStatus(null))
      .finally(() => setCapacityLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.retreat]);

  // Force full payment if after deadline for selected retreat
  useEffect(() => {
    if (formData.retreat === 'costa-rica' && isAfterFullPaymentDeadline() && formData.paymentOption === 'deposit') {
      setFormData({ ...formData, paymentOption: 'full' });
    }
    if (formData.retreat === 'texas' && isTexasAfterFullPaymentDeadline() && formData.paymentOption === 'deposit') {
      setFormData({ ...formData, paymentOption: 'full' });
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Reset sessions when retreat changes
    if (name === 'retreat') {
      setFormData({
        ...formData,
        retreat: value as ExperienceType | '',
        costaRicaSession: '',
        texasSession: '',
        bringOwnCamera: false
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const getBaseTuition = () => {
    if (formData.retreat === 'texas') {
      return TEXAS_LATE_TOTAL;
    }
    return LATE_TOTAL;
  };

  const getDiscount = () => {
    if (formData.retreat === 'texas') {
      const baseTuition = TEXAS_LATE_TOTAL;
      const currentPrice = getTexasCurrentTotal();
      return baseTuition - currentPrice;
    }
    const baseTuition = LATE_TOTAL;
    const currentPrice = getCurrentTotal();
    return baseTuition - currentPrice;
  };

  const getDiscountLabel = () => {
    if (formData.retreat === 'texas') {
      const activeWindow = getTexasActiveWindow();
      switch (activeWindow) {
        case 'EARLY_BIRD':
          return 'Early Bird Discount';
        case 'STANDARD':
          return 'Standard Pricing Discount';
        default:
          return null;
      }
    }
    const activeWindow = getActiveWindow();
    switch (activeWindow) {
      case 'EARLY_BIRD':
        return 'Early Bird Discount';
      case 'STANDARD':
        return 'Standard Pricing Discount';
      default:
        return null;
    }
  };

  const calculateSubtotal = () => {
    let total = formData.retreat === 'texas' ? getTexasCurrentTotal() : getCurrentTotal();
    // Only apply camera discount for Costa Rica
    if (formData.retreat === 'costa-rica' && formData.bringOwnCamera) {
      total -= pricing.cameraDiscount;
    }
    return total;
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const calculateDeposit = () => {
    return formData.retreat === 'texas' ? TEXAS_DEPOSIT : DEPOSIT;
  };

  const calculateDueToday = () => {
    const isAfterDeadline = formData.retreat === 'texas'
      ? isTexasAfterFullPaymentDeadline()
      : isAfterFullPaymentDeadline();

    if (formData.paymentOption === 'full' || isAfterDeadline) {
      return calculateTotal();
    }
    return calculateDeposit();
  };

  const getRemainingBalance = () => {
    const isAfterDeadline = formData.retreat === 'texas'
      ? isTexasAfterFullPaymentDeadline()
      : isAfterFullPaymentDeadline();

    if (formData.paymentOption === 'full' || isAfterDeadline) {
      return 0;
    }

    if (formData.retreat === 'texas') {
      return calculateTexasRemainingBalance(calculateTotal());
    }
    return calculateRemainingBalance(calculateTotal());
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistForm.email || !waitlistForm.firstName) return;

    setWaitlistSubmitting(true);
    setWaitlistError('');
    try {
      const slug = experienceSlugMap[formData.retreat] || formData.retreat;
      const res = await fetch(`/api/experiences/${slug}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: waitlistForm.email,
          full_name: `${waitlistForm.firstName} ${waitlistForm.lastName}`.trim(),
          phone: waitlistForm.phone || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to join waitlist');
      }
      setWaitlistSuccess(true);
    } catch (error) {
      setWaitlistError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setWaitlistSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.retreat) {
      alert('Please select an experience');
      return;
    }

    if (formData.retreat === 'costa-rica' && !formData.costaRicaSession) {
      alert('Please select a Costa Rica session');
      return;
    }

    if (formData.retreat === 'texas' && !formData.texasSession) {
      alert('Please select a Texas session');
      return;
    }

    if (!formData.email) {
      alert('Please enter your email address');
      return;
    }

    // Force full payment if after deadline (retreats only)
    if (!isWorkshop) {
      const isAfterDeadline = formData.retreat === 'texas'
        ? isTexasAfterFullPaymentDeadline()
        : isAfterFullPaymentDeadline();

      if (isAfterDeadline && formData.paymentOption === 'deposit') {
        setFormData({ ...formData, paymentOption: 'full' });
        return;
      }
    }

    setIsLoading(true);

    try {
      let planLabel = '';
      let retreatName = '';
      let retreatDates = '';
      let retreatLocation = '';

      if (isWorkshop) {
        planLabel = 'Workshop - Full';
        retreatName = 'Filmmaking in the Real World Workshop';
        retreatDates = 'May 16, 2026';
        retreatLocation = 'Jasper, GA';
      } else {
        // Determine the correct plan label based on current pricing tier and payment option
        const activeWindow = formData.retreat === 'texas'
          ? getTexasActiveWindow()
          : getActiveWindow();

        if (formData.paymentOption === 'deposit') {
          planLabel = 'Deposit';
        } else {
          switch (activeWindow) {
            case 'EARLY_BIRD':
              planLabel = 'Full - Early Bird';
              break;
            case 'STANDARD':
              planLabel = 'Full - Standard';
              break;
            case 'LATE':
              planLabel = 'Full - Late';
              break;
            default:
              planLabel = 'Full - Standard';
          }
        }

        if (formData.retreat === 'costa-rica') {
          retreatName = 'Born to Create Project - Costa Rica';
          retreatLocation = 'Costa Rica';
          if (formData.costaRicaSession === 'session-1') {
            retreatDates = 'Session 1: February 13-21, 2026';
          } else {
            retreatDates = 'Session 2: April 17-25, 2026';
          }
        } else if (formData.retreat === 'texas') {
          retreatName = 'Media Leaders Retreat - Texas';
          retreatLocation = 'Texas Hill Country';
          if (formData.texasSession === 'session-1') {
            retreatDates = 'Session 1: February 4-6, 2026 (Travel: Feb 3 & 7)';
          } else {
            retreatDates = 'Session 2: May 6-8, 2026 (Travel: May 5 & 9)';
          }
        }
      }

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          planLabel: planLabel,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          date_of_birth: '',
          address_line1: '',
          address_line2: '',
          city: '',
          state_province: '',
          postal_code: '',
          country: '',
          emergency_contact_name: isWorkshop ? '' : formData.emergencyContact,
          emergency_contact_phone: isWorkshop ? '' : formData.emergencyPhone,
          emergency_contact_relationship: '',
          experience_level: formData.experience,
          bring_own_camera: formData.retreat === 'costa-rica' ? formData.bringOwnCamera : false,
          camera_equipment_details: '',
          dietary_restrictions: isWorkshop ? '' : formData.dietaryNotes,
          medical_conditions: '',
          how_did_you_hear: '',
          special_requests: formData.goals,
          retreat: retreatName,
          retreat_start: retreatDates,
          retreat_location: retreatLocation,
          retreat_type: formData.retreat,
          promo_code: formData.promoCode || undefined,
          costa_rica_session: formData.retreat === 'costa-rica' ? formData.costaRicaSession : undefined,
          texas_session: formData.retreat === 'texas' ? formData.texasSession : undefined
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Something went wrong. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPaymentDeadline = () => {
    return formData.retreat === 'texas'
      ? formatTexasPaymentDate(TEXAS_FULL_PAYMENT_DEADLINE)
      : formatPaymentDate(FULL_PAYMENT_DEADLINE);
  };

  const isAfterDeadlineForSelectedRetreat = () => {
    return formData.retreat === 'texas'
      ? isTexasAfterFullPaymentDeadline()
      : isAfterFullPaymentDeadline();
  };

  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-sage/30 nature-texture opacity-20"></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Register</h1>
          <p className="text-xl text-charcoal/70">
            Register for one of our workshops or retreats. Choose your experience below, then tell us who you are and how we can best serve you.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-cream rounded-2xl p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Experience Selection */}
                  <div className="border-b border-stone/20 pb-6">
                    <h3 className="text-lg font-semibold text-charcoal mb-4">Choose Your Experience</h3>

                    <div>
                      <label htmlFor="retreat" className="block text-sm font-semibold text-charcoal mb-2">
                        Select Experience *
                      </label>
                      <select
                        id="retreat"
                        name="retreat"
                        required
                        value={formData.retreat}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                      >
                        <option value="">Choose an experience...</option>
                        <option value="filmmaking-workshop">Filmmaking in the Real World — Jasper, GA · May 16, 2026 · $50</option>
                        {/* <option value="costa-rica">Costa Rica – Filmmaking Retreat</option> */}
                        {/* <option value="texas">Texas – Media Leaders Retreat</option> */}
                      </select>
                    </div>

                    {/* Costa Rica Session Selection */}
                    {formData.retreat === 'costa-rica' && (
                      <div className="mt-4">
                        <label htmlFor="costaRicaSession" className="block text-sm font-semibold text-charcoal mb-2">
                          Select Session *
                        </label>
                        <select
                          id="costaRicaSession"
                          name="costaRicaSession"
                          required
                          value={formData.costaRicaSession}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                        >
                          <option value="">Choose a session...</option>
                          <option value="session-1">Session 1 – February 13–21, 2026 (9 days)</option>
                          <option value="session-2">Session 2 – April 17–25, 2026 (9 days)</option>
                        </select>
                      </div>
                    )}

                    {/* Texas Session Selection */}
                    {formData.retreat === 'texas' && (
                      <div className="mt-4">
                        <label htmlFor="texasSession" className="block text-sm font-semibold text-charcoal mb-2">
                          Select Session *
                        </label>
                        <select
                          id="texasSession"
                          name="texasSession"
                          required
                          value={formData.texasSession}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                        >
                          <option value="">Choose a session...</option>
                          <option value="session-1">Session 1 – Retreat February 4–6, 2026 (Travel February 3 and 7)</option>
                          <option value="session-2">Session 2 – Retreat May 6–8, 2026 (Travel May 5 and 9)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Capacity loading */}
                  {formData.retreat && capacityLoading && (
                    <div className="text-center py-2">
                      <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-forest"></div>
                    </div>
                  )}

                  {/* Capacity indicator — spots remaining */}
                  {formData.retreat && !capacityLoading && capacityStatus && capacityStatus.capacity !== null && !capacityStatus.is_full && (
                    <div className="bg-forest/5 border border-forest/20 rounded-lg p-3 text-sm text-forest font-medium">
                      {capacityStatus.available} {capacityStatus.available === 1 ? 'spot' : 'spots'} remaining
                    </div>
                  )}

                  {/* Waitlist form — shown when experience is full */}
                  {formData.retreat && !capacityLoading && capacityStatus?.is_full && (
                    <div className="border-t border-stone/20 pt-6">
                      {waitlistSuccess ? (
                        <div className="bg-forest/5 border border-forest/20 rounded-lg p-6 text-center">
                          <svg className="w-12 h-12 mx-auto text-forest mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h3 className="text-lg font-semibold text-charcoal mb-2">You&apos;re on the Waitlist!</h3>
                          <p className="text-charcoal/70 text-sm">
                            We&apos;ll email you when a spot opens up. Keep an eye on your inbox!
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                            <h3 className="text-base font-semibold text-amber-800 mb-1">This experience is currently full</h3>
                            <p className="text-amber-700 text-sm">Join the waitlist and we&apos;ll notify you when a spot opens up!</p>
                          </div>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="wl-firstName" className="block text-sm font-semibold text-charcoal mb-2">First Name *</label>
                                <input
                                  type="text"
                                  id="wl-firstName"
                                  required
                                  value={waitlistForm.firstName}
                                  onChange={(e) => setWaitlistForm({ ...waitlistForm, firstName: e.target.value })}
                                  className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                                />
                              </div>
                              <div>
                                <label htmlFor="wl-lastName" className="block text-sm font-semibold text-charcoal mb-2">Last Name *</label>
                                <input
                                  type="text"
                                  id="wl-lastName"
                                  required
                                  value={waitlistForm.lastName}
                                  onChange={(e) => setWaitlistForm({ ...waitlistForm, lastName: e.target.value })}
                                  className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="wl-email" className="block text-sm font-semibold text-charcoal mb-2">Email *</label>
                              <input
                                type="email"
                                id="wl-email"
                                required
                                value={waitlistForm.email}
                                onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                              />
                            </div>
                            <div>
                              <label htmlFor="wl-phone" className="block text-sm font-semibold text-charcoal mb-2">Phone (optional)</label>
                              <input
                                type="tel"
                                id="wl-phone"
                                value={waitlistForm.phone}
                                onChange={(e) => setWaitlistForm({ ...waitlistForm, phone: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                              />
                            </div>
                            {waitlistError && (
                              <p className="text-red-600 text-sm">{waitlistError}</p>
                            )}
                            <button
                              type="button"
                              onClick={handleWaitlistSubmit}
                              disabled={waitlistSubmitting || !waitlistForm.email || !waitlistForm.firstName}
                              className="w-full bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-forest-500 hover:text-white focus:bg-forest-500 focus:text-white active:bg-forest-500 active:text-white focus:outline-none focus:ring-2 focus:ring-forest-400 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                              {waitlistSubmitting ? 'Joining...' : 'Join the Waitlist'}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Regular form — hidden when experience is full */}
                  {(!capacityStatus?.is_full || !formData.retreat) && (
                  <>
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-charcoal mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-charcoal mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-charcoal mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Portfolio Link - Retreats only */}
                  {!isWorkshop && (
                    <div>
                      <label htmlFor="portfolioLink" className="block text-sm font-semibold text-charcoal mb-2">
                        Portfolio Link
                      </label>
                      <input
                        type="url"
                        id="portfolioLink"
                        name="portfolioLink"
                        value={formData.portfolioLink}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                        placeholder="https://your-portfolio.com"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="experience" className="block text-sm font-semibold text-charcoal mb-2">
                      Filmmaking Experience *
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                    >
                      <option value="">Select your experience level</option>
                      <option value="beginner">Beginner - No prior experience</option>
                      <option value="intermediate">Intermediate - Some experience</option>
                      <option value="advanced">Advanced - Professional experience</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="goals" className="block text-sm font-semibold text-charcoal mb-2">
                      {isWorkshop ? 'What do you hope to learn? *' : 'What do you hope to achieve from this retreat? *'}
                    </label>
                    <textarea
                      id="goals"
                      name="goals"
                      required
                      rows={4}
                      value={formData.goals}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors resize-none"
                      placeholder={isWorkshop ? 'Tell us what you\'re hoping to learn from this workshop...' : 'Tell us about your creative goals and what you\'re hoping to learn...'}
                    />
                  </div>

                  {/* Dietary Notes - Retreats only */}
                  {!isWorkshop && (
                    <div>
                      <label htmlFor="dietaryNotes" className="block text-sm font-semibold text-charcoal mb-2">
                        Dietary Notes
                      </label>
                      <input
                        type="text"
                        id="dietaryNotes"
                        name="dietaryNotes"
                        value={formData.dietaryNotes}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                        placeholder="Vegetarian, vegan, allergies, etc."
                      />
                    </div>
                  )}

                  {/* Emergency Contact - Retreats only */}
                  {!isWorkshop && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="emergencyContact" className="block text-sm font-semibold text-charcoal mb-2">
                          Emergency Contact Name *
                        </label>
                        <input
                          type="text"
                          id="emergencyContact"
                          name="emergencyContact"
                          required
                          value={formData.emergencyContact}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="emergencyPhone" className="block text-sm font-semibold text-charcoal mb-2">
                          Emergency Contact Phone *
                        </label>
                        <input
                          type="tel"
                          id="emergencyPhone"
                          name="emergencyPhone"
                          required
                          value={formData.emergencyPhone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* Equipment & Payment - Retreats only */}
                  {!isWorkshop && (
                    <div className="border-t border-stone/20 pt-6">
                      <h3 className="text-lg font-semibold text-charcoal mb-4">Equipment & Payment</h3>

                      <div className="space-y-4">
                        {/* Bring Own Camera - Costa Rica Only */}
                        {formData.retreat === 'costa-rica' && (
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="bringOwnCamera"
                              name="bringOwnCamera"
                              checked={formData.bringOwnCamera}
                              onChange={handleChange}
                              className="mt-1 mr-3"
                            />
                            <label htmlFor="bringOwnCamera" className="text-sm text-charcoal">
                              <strong>I&apos;ll bring my own camera equipment</strong><br />
                              <span className="text-sage font-semibold">Save $300 on tuition</span>
                            </label>
                          </div>
                        )}

                        <div>
                          <label htmlFor="paymentOption" className="block text-sm font-semibold text-charcoal mb-2">
                            Payment Option
                          </label>
                          <select
                            id="paymentOption"
                            name="paymentOption"
                            value={formData.paymentOption}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                          >
                            <option value="deposit" disabled={isAfterDeadlineForSelectedRetreat()}>Deposit Only (Required Today)</option>
                            <option value="full">Pay Full Amount Today</option>
                          </select>
                        </div>

                        {formData.paymentOption === 'deposit' && !isAfterDeadlineForSelectedRetreat() && (
                          <div className="bg-sand-50 p-4 rounded-lg border border-sand-200">
                            <h4 className="text-sm font-semibold text-charcoal mb-2">Payment Schedule</h4>
                            <div className="space-y-1 text-sm text-charcoal/70">
                              <p>Deposit due today: ${calculateDeposit().toLocaleString()}</p>
                              <p>Remaining balance due by: {getPaymentDeadline()}</p>
                              <div className="flex flex-col space-y-1">
                                <button
                                  type="button"
                                  onClick={() => setShowRefundModal(true)}
                                  className="text-forest underline text-xs hover:text-forest-600 transition-colors"
                                >
                                  Refund policy
                                </button>
                                <Link
                                  href="/terms"
                                  className="text-forest underline text-xs hover:text-forest-600 transition-colors"
                                >
                                  Terms & Agreement
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  )}

                  {/* Promo Code */}
                  <div>
                    <label htmlFor="promoCode" className="block text-sm font-semibold text-charcoal mb-2">
                      Promo Code
                    </label>
                    <input
                      type="text"
                      id="promoCode"
                      name="promoCode"
                      value={formData.promoCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors"
                      placeholder="Enter promo code (if applicable)"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !formData.retreat}
                    className="w-full bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-forest-500 hover:text-white focus:bg-forest-500 focus:text-white active:bg-forest-500 active:text-white focus:outline-none focus:ring-2 focus:ring-forest-400 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Continue to Payment'
                    )}
                  </button>
                  </>
                  )}
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-forest text-cream rounded-2xl p-6 shadow-lg sticky top-24">
                <h2 className="text-xl font-bold mb-4">Registration Summary</h2>

                {formData.retreat ? (
                  isWorkshop ? (
                    /* Workshop summary */
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between font-semibold">
                        <span>Filmmaking in the Real World</span>
                      </div>
                      <div className="flex justify-between text-cream/80">
                        <span>Date:</span>
                        <span>May 16, 2026</span>
                      </div>
                      <div className="flex justify-between text-cream/80">
                        <span>Location:</span>
                        <span>Jasper, GA</span>
                      </div>
                      <div className="flex justify-between text-cream/80">
                        <span>Duration:</span>
                        <span>2 hours</span>
                      </div>
                      <div className="border-t border-cream/20 pt-3">
                        <div className="flex justify-between font-semibold">
                          <span>Due Today:</span>
                          <span>$50</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Retreat summary */
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Base tuition:</span>
                        <span>${getBaseTuition().toLocaleString()}</span>
                      </div>

                      {getDiscount() > 0 && (
                        <div className="flex justify-between text-sage">
                          <span>{getDiscountLabel()}:</span>
                          <span>-${getDiscount().toLocaleString()}</span>
                        </div>
                      )}

                      {formData.retreat === 'costa-rica' && formData.bringOwnCamera && (
                        <div className="flex justify-between text-sage">
                          <span>Camera discount:</span>
                          <span>-${pricing.cameraDiscount}</span>
                        </div>
                      )}

                      <div className="border-t border-cream/20 pt-3">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>
                            ${calculateSubtotal().toLocaleString()}
                            {getDiscountLabel() && <span className="text-sage text-xs ml-2">{getDiscountLabel()} Applied</span>}
                          </span>
                        </div>
                      </div>

                      {formData.paymentOption === 'deposit' && (
                        <div className="flex justify-between">
                          <span>Non-refundable deposit:</span>
                          <span>${calculateDeposit().toLocaleString()}</span>
                        </div>
                      )}

                      <div className="border-t border-cream/20 pt-3">
                        <div className="flex justify-between font-semibold">
                          <span>Due Today:</span>
                          <span>${calculateDueToday().toLocaleString()}</span>
                        </div>
                      </div>

                      {formData.paymentOption === 'deposit' && !isAfterDeadlineForSelectedRetreat() && getRemainingBalance() > 0 && (
                        <div className="text-cream/90 text-sm mt-2">
                          <p>Remaining balance ${getRemainingBalance().toLocaleString()} due by {getPaymentDeadline()}</p>
                        </div>
                      )}
                    </div>
                  )
                ) : (
                  <p className="text-cream/70 text-sm">Please select an experience to see pricing details.</p>
                )}

                <div className="mt-6 p-4 bg-cream/10 rounded-lg">
                  <p className="text-xs text-cream/90">
                    <strong>Next Steps:</strong> After clicking &quot;Continue to Payment&quot;, you&apos;ll be securely redirected to complete your payment. Upon successful payment, you&apos;ll receive confirmation and details via email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refund Policy Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="text-lg font-bold text-charcoal">Refund Policy</h3>
              <button
                onClick={() => setShowRefundModal(false)}
                className="text-charcoal/60 hover:text-charcoal transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto flex-grow">
              <RefundPolicyContent />
            </div>
            <button
              onClick={() => setShowRefundModal(false)}
              className="w-full mt-6 bg-forest text-white px-4 py-2 rounded-lg font-semibold hover:bg-forest-600 transition-colors flex-shrink-0"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
