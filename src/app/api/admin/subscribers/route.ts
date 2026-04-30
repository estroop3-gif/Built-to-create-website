import { NextRequest, NextResponse } from 'next/server';
import { checkIsAdmin } from '@/lib/admin';
import { getEmailSubscribers, getSubscriberCount, getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') as 'subscribed' | 'unsubscribed' | null;

  try {
    const [emailSubscribers, totalSubscribed] = await Promise.all([
      getEmailSubscribers(status || undefined),
      getSubscriberCount(),
    ]);

    // Also fetch leads with consent to merge in
    const supabase = getSupabaseAdmin();
    const { data: leads } = await supabase
      .from('leads')
      .select('id, email, first_name, consent_marketing, created_at')
      .eq('consent_marketing', true)
      .order('created_at', { ascending: false });

    // Merge: add leads that aren't already in email_subscribers
    const existingEmails = new Set(emailSubscribers.map(s => s.email.toLowerCase()));
    const mergedLeads = (leads || [])
      .filter(l => !existingEmails.has(l.email.toLowerCase()))
      .map(l => ({
        id: l.id,
        email: l.email,
        name: l.first_name,
        phone: null,
        source: 'website',
        status: status === 'unsubscribed' ? null : 'subscribed',
        created_at: l.created_at,
        unsubscribed_at: null,
      }))
      .filter(l => l.status !== null); // filter out if viewing unsubscribed only

    const subscribers = [...emailSubscribers, ...mergedLeads]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const totalActive = totalSubscribed + mergedLeads.length;

    return NextResponse.json({
      subscribers,
      totalSubscribed: totalActive,
      total: subscribers.length,
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
