import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Section from '@/components/Section';
import Link from 'next/link';

export default async function BillingPage() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  // Fetch user purchases
  const { data: purchases } = await supabase
    .from('purchases')
    .select(`
      *,
      products (
        name,
        type
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen">
      <Section spacing="xl" background="sage">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link
              href="/account"
              className="inline-flex items-center text-forest-600 hover:text-forest-700 font-medium mb-4"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-4">
              Billing & Payments
            </h1>
            <p className="font-body text-xl text-ink-600">
              View your payment history and invoices
            </p>
          </div>

          {/* Purchase History */}
          <div className="bg-white rounded-lg shadow-soft p-8">
            <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6">
              Purchase History
            </h2>

            {purchases && purchases.length > 0 ? (
              <div className="space-y-4">
                {purchases.map((purchase: { id: string; created_at: string; products?: { name: string } }) => (
                  <div key={purchase.id} className="bg-sage-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-lg font-bold text-ink-900">
                          {purchase.products?.name || 'Unknown Product'}
                        </h3>
                        <p className="font-body text-ink-600">
                          {new Date(purchase.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-ink-900">
                          ${(purchase.amount_cents / 100).toFixed(2)}
                        </div>
                        <div className={`text-sm font-medium ${
                          purchase.status === 'paid' ? 'text-green-600' :
                          purchase.status === 'pending' ? 'text-yellow-600' :
                          purchase.status === 'failed' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="font-body text-ink-600 mb-4">
                  No purchases found.
                </p>
                <Link
                  href="/pricing"
                  className="inline-block bg-forest-600 text-cream-50 px-6 py-3 rounded-lg font-medium hover:bg-forest-700 transition-colors"
                >
                  View Programs
                </Link>
              </div>
            )}
          </div>

          {/* Support */}
          <div className="bg-white rounded-lg shadow-soft p-8 mt-8">
            <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6">
              Need Help?
            </h2>
            <p className="font-body text-ink-600 mb-4">
              If you have questions about your billing or need assistance, please contact our support team.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-forest-600 text-cream-50 px-6 py-3 rounded-lg font-medium hover:bg-forest-700 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}