import { notFound } from 'next/navigation';
import Link from 'next/link';
import Stripe from 'stripe';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RegistrationSuccessPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams.session_id as string;

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Missing Session Information</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find your registration details. This might happen if you navigated here directly.
          </p>
          <Link 
            href="/register"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Return to Registration
          </Link>
        </div>
      </div>
    );
  }

  let session: Stripe.Checkout.Session | null = null;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-08-27.basil',
    });

    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'customer'],
    });
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Session Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't retrieve your registration details. The session may have expired or be invalid.
          </p>
          <Link 
            href="/register"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Start New Registration
          </Link>
        </div>
      </div>
    );
  }

  if (!session || session.payment_status !== 'paid') {
    return notFound();
  }

  // Extract customer info — prefer metadata (set by our form) over Stripe billing details
  const metaFirst = session.metadata?.first_name || '';
  const metaLast = session.metadata?.last_name || '';
  const customerName = metaFirst
    ? `${metaFirst} ${metaLast}`.trim()
    : session.customer_details?.name || 'Valued Guest';
  const firstName = metaFirst || customerName.split(' ')[0];
  const email = session.customer_details?.email || '';
  const amountPaid = (session.amount_total || 0) / 100;
  const currency = (session.currency || 'usd').toUpperCase();

  // Extract retreat info from metadata
  const retreatType = session.metadata?.retreat_type || '';
  const isWorkshop = retreatType === 'filmmaking-workshop' || retreatType === 'canton-workshop';
  const retreatName = session.metadata?.retreat || (isWorkshop ? 'Filmmaking in the Real World Workshop' : 'Born to Create Project Retreat');
  const retreatStart = session.metadata?.retreat_start || (isWorkshop ? (retreatType === 'canton-workshop' ? 'May 23, 2026' : 'May 16, 2026') : '');
  const retreatLocation = session.metadata?.retreat_location || (isWorkshop ? (retreatType === 'canton-workshop' ? 'Canton, GA' : 'Jasper, GA') : '');

  // Payment details - safely handle payment intent
  let lastFour: string | undefined;
  if (session.payment_intent && typeof session.payment_intent === 'object') {
    const paymentIntent = session.payment_intent as { charges?: { data?: { payment_method_details?: { card?: { last4?: string } } }[] } };
    if (paymentIntent.charges?.data?.[0]?.payment_method_details?.card?.last4) {
      lastFour = paymentIntent.charges.data[0].payment_method_details.card.last4;
    }
  }

  // Workshop confirmation — fully separate page
  if (isWorkshop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Workshop Hero */}
            <div className="bg-green-600 text-white text-center py-8 px-6">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold mb-2">You&apos;re Registered, {firstName}!</h1>
              <p className="text-green-100 text-lg">{retreatName}</p>
              <p className="text-green-200">{retreatStart} — {retreatLocation}</p>
            </div>

            <div className="p-8">
              {/* Registration Details */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                <h2 className="text-xl font-bold text-green-800 mb-4">✅ Registration Confirmed</h2>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-green-700">Name:</span> {customerName}
                  </div>
                  <div>
                    <span className="font-semibold text-green-700">Email:</span> {email}
                  </div>
                  <div>
                    <span className="font-semibold text-green-700">Amount Paid:</span> ${amountPaid.toLocaleString()} {currency}
                  </div>
                  <div>
                    <span className="font-semibold text-green-700">Payment Method:</span>
                    {lastFour ? ` •••• ${lastFour}` : ' Card Payment'}
                  </div>
                </div>
              </div>

              {/* Workshop Details */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Workshop Details</h2>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Date:</span> {retreatStart}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Time:</span> 2:00 – 4:00 PM
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-semibold text-gray-700">Venue:</span>{' '}
                    {retreatLocation === 'Canton, GA'
                      ? 'River Church Canton — Community Room, 2335 Sixes Rd, Canton, GA 30144'
                      : 'Pickens County Recreation Center, 1329 Camp Rd, Jasper, GA 30143'}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Duration:</span> 2 hours
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Gear:</span> All equipment provided
                  </div>
                </div>
              </div>

              {/* Workshop Breakdown */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🎬 What You&apos;ll Cover</h2>
                <div className="space-y-4">
                  <div className="flex items-start bg-green-50 rounded-lg p-4">
                    <div className="flex-shrink-0 bg-green-600 text-white text-xs font-bold rounded px-2 py-1 mt-0.5">20 min</div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">How Real Productions Work</h3>
                      <p className="text-gray-600 text-sm">What happens on set, who does what, how projects move from idea to finished product</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-green-50 rounded-lg p-4">
                    <div className="flex-shrink-0 bg-green-600 text-white text-xs font-bold rounded px-2 py-1 mt-0.5">45 min</div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Camera Basics, Coverage &amp; Common Mistakes</h3>
                      <p className="text-gray-600 text-sm">Frame rate, shutter speed, aperture, ISO, lenses, composition, and multicam thinking — taught the way working professionals use them</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-green-50 rounded-lg p-4">
                    <div className="flex-shrink-0 bg-green-600 text-white text-xs font-bold rounded px-2 py-1 mt-0.5">30 min</div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Documentary Fundamentals</h3>
                      <p className="text-gray-600 text-sm">Interviews that feel real, B-roll that supports the story, and common lighting and audio mistakes to avoid</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-green-50 rounded-lg p-4">
                    <div className="flex-shrink-0 bg-green-600 text-white text-xs font-bold rounded px-2 py-1 mt-0.5">25 min</div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Q&amp;A and Next Steps</h3>
                      <p className="text-gray-600 text-sm">Open questions, direct answers, and a practical plan for what to do after the workshop</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Know */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 What to Know</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">✓</div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">No Experience Required</h3>
                      <p className="text-gray-600 text-sm">Designed for beginners and anyone who wants a stronger foundation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">✓</div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">No Gear Needed</h3>
                      <p className="text-gray-600 text-sm">You&apos;ll use professional cinema cameras used on real TV and documentary sets</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">✓</div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Bring Something to Take Notes</h3>
                      <p className="text-gray-600 text-sm">Phone, notebook, whatever works for you</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">✓</div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Arrive 10 Minutes Early</h3>
                      <p className="text-gray-600 text-sm">Give yourself time to get settled before we start</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons — FAQ + Contact only */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <Link
                  href="/faq"
                  className="bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  ❓ FAQ
                </Link>
                <Link
                  href="/contact"
                  className="bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  📱 Contact
                </Link>
              </div>

              {/* Email Notice — workshop language */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="text-blue-500 text-2xl">📧</div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-blue-800">Check Your Email</h3>
                    <p className="text-blue-700">
                      We've sent a confirmation email with all the details to <strong>{email}</strong>.
                      {' '}Keep an eye on your inbox for any updates as the workshop date approaches.
                    </p>
                  </div>
                </div>
              </div>

              {/* Questions Section */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions or Need Changes?</h3>
                <p className="text-gray-600 mb-4">
                  Just reply to your confirmation email or contact us directly. We're here to help!
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-medium transition-colors"
                >
                  Get in Touch
                </Link>
              </div>

              {/* Reference */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Reference: {sessionId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Retreat confirmation — existing layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Retreat Hero */}
          <div className="bg-green-600 text-white text-center py-8 px-6">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold mb-2">Welcome aboard, {firstName}!</h1>
            <p className="text-green-100 text-lg">{retreatName}</p>
            <p className="text-green-200">{retreatLocation} • {retreatStart}</p>
          </div>

          <div className="p-8">
            {/* Registration Details */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
              <h2 className="text-xl font-bold text-green-800 mb-4">✅ Registration Confirmed</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-green-700">Name:</span> {customerName}
                </div>
                <div>
                  <span className="font-semibold text-green-700">Email:</span> {email}
                </div>
                <div>
                  <span className="font-semibold text-green-700">Amount Paid:</span> ${amountPaid.toLocaleString()} {currency}
                </div>
                <div>
                  <span className="font-semibold text-green-700">Payment Method:</span>
                  {lastFour ? ` •••• ${lastFour}` : ' Card Payment'}
                </div>
              </div>
            </div>

            {/* What Happens Next — Retreat */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 What happens next</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">1</div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Review Your Itinerary</h3>
                      <p className="text-gray-600 text-sm">See the full 9-day schedule and daily activities</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">2</div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Check Packing List</h3>
                      <p className="text-gray-600 text-sm">Get ready with our comprehensive packing guide</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">3</div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Plan Your Travel</h3>
                      <p className="text-gray-600 text-sm">We'll send detailed arrival/departure info soon</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">4</div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Stay Connected</h3>
                      <p className="text-gray-600 text-sm">We'll send updates and prep info as the date approaches</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons — all four */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Link
                href="/itinerary"
                className="bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                📋 Itinerary
              </Link>
              <Link
                href="/packing"
                className="bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                🎒 Packing List
              </Link>
              <Link
                href="/faq"
                className="bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                ❓ FAQ
              </Link>
              <Link
                href="/contact"
                className="bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                📱 Contact
              </Link>
            </div>

            {/* Email Notice — retreat language */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="text-blue-500 text-2xl">📧</div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-blue-800">Check Your Email</h3>
                  <p className="text-blue-700">
                    We've sent a confirmation email with all the details to <strong>{email}</strong>.
                    {' '}Keep an eye on your inbox for travel details and final preparation info as the retreat date approaches.
                  </p>
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions or Need Changes?</h3>
              <p className="text-gray-600 mb-4">
                Just reply to your confirmation email or contact us directly. We're here to help!
              </p>
              <Link
                href="/contact"
                className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-medium transition-colors"
              >
                Get in Touch
              </Link>
            </div>

            {/* Reference */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Reference: {sessionId}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Registration Confirmed - The Born to Create Project',
  description: 'Your registration has been confirmed. Welcome!',
};