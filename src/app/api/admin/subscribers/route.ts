import { NextRequest, NextResponse } from 'next/server';
import { checkIsAdmin } from '@/lib/admin';
import { getEmailSubscribers, getSubscriberCount } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') as 'subscribed' | 'unsubscribed' | null;

  try {
    const [subscribers, totalSubscribed] = await Promise.all([
      getEmailSubscribers(status || undefined),
      getSubscriberCount(),
    ]);

    return NextResponse.json({
      subscribers,
      totalSubscribed,
      total: subscribers.length,
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
