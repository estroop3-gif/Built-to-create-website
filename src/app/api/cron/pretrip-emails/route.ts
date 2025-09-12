import { NextRequest, NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { emailService } from '@/lib/services/email';

export const runtime = 'edge';

// Verify this is called by Vercel Cron or authorized source
function isAuthorizedCronCall(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || 'dev-cron-secret';
  
  // In development, allow calls without auth header
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // In production, verify the cron secret
  return authHeader === `Bearer ${cronSecret}`;
}

export async function POST(request: NextRequest) {
  // Verify authorization
  if (!isAuthorizedCronCall(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const now = new Date().toISOString();

    // Get leads ready for their next email
    const { data: readyLeads, error: selectError } = await supabase
      .from('leads')
      .select('*')
      .eq('registered', false)
      .eq('consent_marketing', true)
      .lte('next_send_at', now)
      .not('next_send_at', 'is', null)
      .order('next_send_at', { ascending: true })
      .limit(100); // Process in batches

    if (selectError) {
      console.error('Error selecting leads:', selectError);
      return NextResponse.json(
        { error: 'Database error', details: selectError.message },
        { status: 500 }
      );
    }

    const results = {
      processed: 0,
      sent: 0,
      errors: 0,
      completed_sequences: 0
    };

    for (const lead of readyLeads || []) {
      try {
        results.processed++;
        
        // Skip if sequence is complete (stage 10 or higher means sequence finished)
        if (lead.sequence_stage >= 10) {
          results.completed_sequences++;
          
          // Clear next_send_at to stop further processing
          await supabase
            .from('leads')
            .update({ 
              next_send_at: null,
              updated_at: now 
            })
            .eq('id', lead.id);
          
          continue;
        }

        // Send the email for the current stage
        let emailResult;
        
        if (lead.sequence_stage === 0) {
          // This shouldn't happen as welcome emails are sent immediately on subscribe
          emailResult = await emailService.sendWelcomeEmail(lead.email, lead.first_name);
        } else {
          emailResult = await emailService.sendSequenceEmail(
            lead.email,
            lead.first_name,
            lead.sequence_stage
          );
        }

        if (emailResult.success) {
          results.sent++;
          
          // Calculate next send time
          const nextStage = lead.sequence_stage + 1;
          let nextSendAt = null;
          
          if (nextStage < 10) { // Don't schedule beyond our sequence
            nextSendAt = emailService.getNextSendTime(nextStage);
            
            // Special case: if we're at stage 8 (countdown email), schedule relative to retreat date
            if (nextStage === 9) {
              const retreatDate = new Date('2026-02-20'); // February 20, 2026
              const countdownDate = new Date(retreatDate);
              countdownDate.setDate(countdownDate.getDate() - 30); // 30 days before
              nextSendAt = countdownDate > new Date() ? countdownDate : null;
            }
          }

          // Update the lead with new stage and next send time
          const { error: updateError } = await supabase
            .from('leads')
            .update({
              sequence_stage: nextStage,
              last_sent_at: now,
              next_send_at: nextSendAt?.toISOString() || null,
              updated_at: now
            })
            .eq('id', lead.id);

          if (updateError) {
            console.error(`Error updating lead ${lead.email}:`, updateError);
            results.errors++;
          }
          
        } else {
          console.error(`Email failed for ${lead.email}:`, emailResult.error);
          results.errors++;
          
          // Don't advance the stage if email failed - retry next time
        }

      } catch (error) {
        console.error(`Error processing lead ${lead.email}:`, error);
        results.errors++;
      }
    }

    // Check for scarcity threshold (optional feature)
    await checkAndTriggerScarcityEmails(supabase);

    console.log('Cron job completed:', results);

    return NextResponse.json({
      success: true,
      results,
      timestamp: now
    });

  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'Cron job failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}

async function checkAndTriggerScarcityEmails(_supabase: SupabaseClient) {
  // This is a placeholder for scarcity logic
  // const CAPACITY_THRESHOLD = 0.8; // Trigger at 80% capacity
  // const MAX_REGISTRATIONS = 20; // Adjust based on actual capacity
  
  try {
    // Example implementation - uncomment and modify based on your registrations table
    // const { count: registrationCount } = await supabase
    //   .from('registrations')
    //   .select('*', { count: 'exact' });
    
    // if (registrationCount && registrationCount >= MAX_REGISTRATIONS * CAPACITY_THRESHOLD) {
    //   const { data: scarcityLeads } = await supabase
    //     .from('leads')
    //     .select('*')
    //     .eq('registered', false)
    //     .eq('consent_marketing', true)
    //     .lte('sequence_stage', 8);
        
    //   for (const lead of scarcityLeads || []) {
    //     const emailResult = await emailService.sendSequenceEmail(
    //       lead.email,
    //       lead.first_name,
    //       9 // Scarcity email
    //     );
        
    //     if (emailResult.success) {
    //       await supabase
    //         .from('leads')
    //         .update({
    //           sequence_stage: 10, // End sequence after scarcity email
    //           last_sent_at: new Date().toISOString(),
    //           next_send_at: null,
    //           updated_at: new Date().toISOString()
    //         })
    //         .eq('id', lead.id);
    //     }
    //   }
    // }
    
  } catch (error) {
    console.error('Error in scarcity email check:', error);
  }
}

// Allow manual triggering in development
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }
  
  // Manual trigger for testing
  return POST(request);
}