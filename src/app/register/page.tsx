'use client';

// import { Metadata } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { pricing, DEPOSIT, getCurrentTotal, isEarlyBirdPeriod, isAfterFullPaymentDeadline, calculateRemainingBalance, formatPaymentDate, FULL_PAYMENT_DEADLINE, getActiveWindow, LATE_TOTAL } from '@/lib/pricing';
import { RefundPolicyContent } from '@/shared/refundPolicyContent';

// const metadata: Metadata = {
//   title: 'Register - Costa Rica Filmmaking Retreat | The Born to Create Project',
//   description: 'Register for the Costa Rica 9-day filmmaking retreat. Complete equipment kit included or save $300 by bringing your own camera.',
// };

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

  // const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const getBaseTuition = () => {
    return LATE_TOTAL; // Always use late price as base
  };

  const getDiscount = () => {
    const activeWindow = getActiveWindow();
    const baseTuition = getBaseTuition();
    const currentPrice = getCurrentTotal();
    return baseTuition - currentPrice;
  };

  const getDiscountLabel = () => {
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

  const calculateDueToday = () => {
    if (formData.paymentOption === 'full' || isAfterFullPaymentDeadline()) {
      // For full payment, charge the total
      return calculateTotal();
    }
    return calculateDeposit();
  };

  const getRemainingBalance = () => {
    if (formData.paymentOption === 'full' || isAfterFullPaymentDeadline()) {
      return 0;
    }
    return calculateRemainingBalance(calculateTotal());
  };

  // const getSelectedPaymentOption = () => {
  //   return paymentOptions[0];
  // };

  // const calculateMonthlyPayment = () => {
  //   return 0;
  // };

  // const getRemainingPaymentCount = () => {
  //   return 0;
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      alert('Please enter your email address');
      return;
    }
    
    // Force full payment if after deadline
    if (isAfterFullPaymentDeadline() && formData.paymentOption === 'deposit') {
      setFormData({ ...formData, paymentOption: 'full' });
      return;
    }

    setIsLoading(true);
    
    try {
      // Determine the correct plan label based on current pricing tier and payment option
      const activeWindow = getActiveWindow();
      let planLabel = '';
      
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

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          planLabel: planLabel,
          customer_data: formData // Include form data for future use
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

  // Removed submitted state - now redirects directly to Stripe checkout

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
                            <p>Deposit due today: ${DEPOSIT.toLocaleString()}</p>
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
                    disabled={isLoading}
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
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-forest text-cream rounded-2xl p-6 shadow-lg sticky top-24">
                <h2 className="text-xl font-bold mb-4">Registration Summary</h2>
                
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
                  
                  {formData.paymentOption === 'deposit' && !isAfterFullPaymentDeadline() && getRemainingBalance() > 0 && (
                    <div className="text-cream/90 text-sm mt-2">
                      <p>Remaining balance ${getRemainingBalance().toLocaleString()} due by {formatPaymentDate(FULL_PAYMENT_DEADLINE)}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-cream/10 rounded-lg">
                  <p className="text-xs text-cream/90">
                    <strong>Next Steps:</strong> After clicking "Continue to Payment", you'll be securely redirected to complete your payment. Upon successful payment, you'll receive detailed retreat information and itinerary via email.
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