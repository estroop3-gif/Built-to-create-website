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

  // Extract customer info
  const customerName = session.customer_details?.name || 'Valued Guest';
  const firstName = customerName.split(' ')[0];
  const email = session.customer_details?.email || '';
  const amountPaid = (session.amount_total || 0) / 100;
  const currency = (session.currency || 'usd').toUpperCase();

  // Extract retreat info from metadata
  const retreatName = session.metadata?.retreat || 'Born to Create Project Retreat';
  const retreatStart = session.metadata?.retreat_start || 'February 20-28, 2026';
  const retreatLocation = session.metadata?.retreat_location || 'Costa Rica';

  // Payment details - safely handle payment intent
  let lastFour: string | undefined;
  if (session.payment_intent && typeof session.payment_intent === 'object') {
    const paymentIntent = session.payment_intent as { charges?: { data?: { payment_method_details?: { card?: { last4?: string } } }[] } };
    if (paymentIntent.charges?.data?.[0]?.payment_method_details?.card?.last4) {
      lastFour = paymentIntent.charges.data[0].payment_method_details.card.last4;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white text-center py-8 px-6">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold mb-2">Welcome aboard, {firstName}!</h1>
            <p className="text-green-100 text-lg">{retreatName}</p>
            <p className="text-green-200">{retreatLocation} • {retreatStart}</p>
          </div>

          {/* Registration Details */}
          <div className="p-8">
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

            {/* What Happens Next */}
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

            {/* Action Buttons */}
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

            {/* Important Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="text-blue-500 text-2xl">📧</div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-blue-800">Check Your Email</h3>
                  <p className="text-blue-700">
                    We've sent a confirmation email with all the details to <strong>{email}</strong>. 
                    Keep an eye on your inbox for travel details and final preparation info as the retreat date approaches.
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
  description: 'Your registration has been confirmed. Welcome to the Costa Rica filmmaking retreat!',
};