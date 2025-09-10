'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { pricing, paymentOptions, DEPOSIT, TAX_RATE, getCurrentTotal, isEarlyBirdPeriod, isAfterFullPaymentDeadline, calculateRemainingBalance, formatPaymentDate, FULL_PAYMENT_DEADLINE } from '@/lib/pricing';
import { RefundPolicyContent } from '@/shared/refundPolicyContent';

const metadata: Metadata = {
  title: 'Register - Costa Rica Filmmaking Retreat | The Born to Create Project',
  description: 'Register for the Costa Rica 9-day filmmaking retreat. Complete equipment kit included or save $300 by bringing your own camera.',
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
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
    paymentOption: 'deposit'
  });

  const [submitted, setSubmitted] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  // Force full payment if after deadline
  useEffect(() => {
    if (isAfterFullPaymentDeadline() && formData.paymentOption === 'deposit') {
      setFormData({ ...formData, paymentOption: 'full' });
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const calculateSubtotal = () => {
    let total = getCurrentTotal();
    if (formData.bringOwnCamera) {
      total -= pricing.cameraDiscount;
    }
    return total;
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const calculateDeposit = () => {
    return DEPOSIT;
  };

  const calculateFirstPayment = () => {
    return 0;
  };

  const calculateSalesTaxToday = () => {
    if (formData.paymentOption === 'full' || isAfterFullPaymentDeadline()) {
      return Math.round(calculateTotal() * TAX_RATE);
    }
    return Math.round(calculateDeposit() * TAX_RATE);
  };

  const calculateDueToday = () => {
    const salesTax = calculateSalesTaxToday();
    if (formData.paymentOption === 'full' || isAfterFullPaymentDeadline()) {
      // For full payment, only charge the total (deposit is already included in total)
      return calculateTotal() + salesTax;
    }
    return calculateDeposit() + salesTax;
  };

  const getRemainingBalance = () => {
    if (formData.paymentOption === 'full' || isAfterFullPaymentDeadline()) {
      return 0;
    }
    return calculateRemainingBalance(calculateTotal());
  };

  const getSelectedPaymentOption = () => {
    return paymentOptions[0];
  };

  const calculateMonthlyPayment = () => {
    return 0;
  };

  const getRemainingPaymentCount = () => {
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Force full payment if after deadline
    if (isAfterFullPaymentDeadline() && formData.paymentOption === 'deposit') {
      setFormData({ ...formData, paymentOption: 'full' });
      return;
    }
    
    console.log('Registration submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-cream rounded-2xl p-8 shadow-lg">
            <svg className="w-16 h-16 text-sage mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            <h1 className="text-3xl font-bold text-charcoal mb-4">Registration Received!</h1>
            <p className="text-charcoal/70 mb-6">
              Thank you for registering for the Costa Rica Filmmaking Retreat. We'll be in touch within 24 hours with payment information and next steps.
            </p>
            
            <div className="bg-sand/30 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-charcoal mb-2">Your Registration Details:</h3>
              <p className="text-sm text-charcoal/70">
                Total: ${calculateTotal().toLocaleString()}
                {formData.bringOwnCamera && (
                  <span className="text-forest"> (includes $300 camera discount)</span>
                )}
              </p>
            </div>
            
            <p className="text-sm text-charcoal/60">
              Questions? Contact us at parker@thebtcp.com
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-sage/30 nature-texture opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Register</h1>
          <p className="text-xl text-charcoal/70">
            Secure your spot for the Costa Rica filmmaking retreat
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-cream rounded-2xl p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      What do you hope to achieve from this retreat? *
                    </label>
                    <textarea
                      id="goals"
                      name="goals"
                      required
                      rows={4}
                      value={formData.goals}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors resize-none"
                      placeholder="Tell us about your creative goals and what you're hoping to learn..."
                    />
                  </div>

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

                  <div className="border-t border-stone/20 pt-6">
                    <h3 className="text-lg font-semibold text-charcoal mb-4">Equipment & Accommodation</h3>
                    
                    <div className="space-y-4">
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
                          <strong>I'll bring my own camera equipment</strong><br />
                          <span className="text-sage font-semibold">Save $300 on tuition</span>
                        </label>
                      </div>

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
                          <option value="deposit" disabled={isAfterFullPaymentDeadline()}>Deposit Only (Required Today)</option>
                          <option value="full">Pay Full Amount Today</option>
                        </select>
                      </div>

                      {formData.paymentOption === 'deposit' && !isAfterFullPaymentDeadline() && (
                        <div className="bg-sand-50 p-4 rounded-lg border border-sand-200">
                          <h4 className="text-sm font-semibold text-charcoal mb-2">Payment Schedule</h4>
                          <div className="space-y-1 text-sm text-charcoal/70">
                            <p>Deposit due today: ${DEPOSIT.toLocaleString()} plus applicable sales tax</p>
                            <p>Remaining balance due by: {formatPaymentDate(FULL_PAYMENT_DEADLINE)}</p>
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

                  <button
                    type="submit"
                    className="w-full bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-forest-500 hover:text-white focus:bg-forest-500 focus:text-white active:bg-forest-500 active:text-white focus:outline-none focus:ring-2 focus:ring-forest-400 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                  >
                    Submit Registration
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-forest text-cream rounded-2xl p-6 shadow-lg sticky top-24">
                <h2 className="text-xl font-bold mb-4">Registration Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Base tuition:</span>
                    <span>${pricing.standardTuition.toLocaleString()}</span>
                  </div>
                  
                  {formData.bringOwnCamera && (
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
                        {isEarlyBirdPeriod() && <span className="text-sage text-xs ml-2">Early Bird Applied</span>}
                      </span>
                    </div>
                  </div>
                  
                  {formData.paymentOption === 'deposit' && (
                    <div className="flex justify-between">
                      <span>Non-refundable deposit:</span>
                      <span>${calculateDeposit().toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Sales Tax (7%):</span>
                    <span>${calculateSalesTaxToday().toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-cream/20 pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Due Today:</span>
                      <span>${calculateDueToday().toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {formData.paymentOption === 'deposit' && !isAfterFullPaymentDeadline() && getRemainingBalance() > 0 && (
                    <div className="text-cream/90 text-sm mt-2">
                      <p>Remaining balance ${getRemainingBalance().toLocaleString()} due by {formatPaymentDate(FULL_PAYMENT_DEADLINE)}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-cream/10 rounded-lg">
                  <p className="text-xs text-cream/90">
                    <strong>Next Steps:</strong> After submitting this form, you'll receive payment instructions and detailed retreat information within 24 hours.
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
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg">
            <div className="flex items-center justify-between mb-4">
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
            <RefundPolicyContent />
            <button
              onClick={() => setShowRefundModal(false)}
              className="w-full mt-6 bg-forest text-white px-4 py-2 rounded-lg font-semibold hover:bg-forest-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}