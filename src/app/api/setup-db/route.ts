import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🔧 Setting up database tables...')

    // Create comprehensive database schema with both registrations and email marketing tables
    const { error } = await supabaseAdmin.rpc('create_complete_schema', {
      sql_statement: `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        -- Create registrations table
        CREATE TABLE IF NOT EXISTS public.registrations (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          stripe_session_id text UNIQUE,
          email text NOT NULL,
          first_name text,
          last_name text,
          phone text,
          date_of_birth text,
          address_line1 text,
          address_line2 text,
          city text,
          state_province text,
          postal_code text,
          country text,
          emergency_contact_name text,
          emergency_contact_phone text,
          emergency_contact_relationship text,
          experience_level text,
          bring_own_camera boolean,
          camera_equipment_details text,
          dietary_restrictions text,
          medical_conditions text,
          how_did_you_hear text,
          special_requests text,
          plan_label text,
          amount_paid numeric,
          currency text,
          retreat text,
          retreat_start date,
          retreat_location text,
          created_at timestamptz DEFAULT now(),
          updated_at timestamptz DEFAULT now()
        );

        -- Create leads table for email marketing
        CREATE TABLE IF NOT EXISTS public.leads (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          email text UNIQUE NOT NULL,
          first_name text NULL,
          source text NULL,
          utm_source text NULL,
          utm_medium text NULL,
          utm_campaign text NULL,
          utm_content text NULL,
          referrer text NULL,
          consent_marketing boolean NOT NULL DEFAULT true,
          sequence_stage int NOT NULL DEFAULT 0,
          last_sent_at timestamptz NULL,
          next_send_at timestamptz NULL,
          registered boolean NOT NULL DEFAULT false,
          created_at timestamptz NOT NULL DEFAULT now(),
          updated_at timestamptz NOT NULL DEFAULT now()
        );

        -- Create email_events table for tracking
        CREATE TABLE IF NOT EXISTS public.email_events (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
          email_address text NOT NULL,
          event_type text NOT NULL,
          sequence_stage int NULL,
          template_id text NULL,
          message_id text NULL,
          user_agent text NULL,
          ip_address text NULL,
          link_url text NULL,
          metadata jsonb NULL,
          created_at timestamptz NOT NULL DEFAULT now()
        );

        -- Create indexes for performance
        CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
        CREATE INDEX IF NOT EXISTS idx_registrations_retreat_start ON public.registrations(retreat_start);
        CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
        CREATE INDEX IF NOT EXISTS idx_leads_next_send_at ON public.leads(next_send_at);
        CREATE INDEX IF NOT EXISTS idx_leads_sequence_registered ON public.leads(sequence_stage, registered);
        CREATE INDEX IF NOT EXISTS idx_leads_consent_registered ON public.leads(consent_marketing, registered);
        CREATE INDEX IF NOT EXISTS idx_email_events_lead_id ON public.email_events(lead_id);
        CREATE INDEX IF NOT EXISTS idx_email_events_type_created ON public.email_events(event_type, created_at);

        -- Enable RLS
        ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.email_events ENABLE ROW LEVEL SECURITY;

        -- RLS Policies for leads table
        DROP POLICY IF EXISTS "Allow service role full access on leads" ON public.leads;
        CREATE POLICY "Allow service role full access on leads"
        ON public.leads FOR ALL
        TO service_role
        USING (true)
        WITH CHECK (true);

        DROP POLICY IF EXISTS "Deny anon access to leads" ON public.leads;
        CREATE POLICY "Deny anon access to leads"
        ON public.leads FOR ALL
        TO anon
        USING (false);

        -- RLS Policies for email_events table
        DROP POLICY IF EXISTS "Allow service role full access on email_events" ON public.email_events;
        CREATE POLICY "Allow service role full access on email_events"
        ON public.email_events FOR ALL
        TO service_role
        USING (true)
        WITH CHECK (true);

        DROP POLICY IF EXISTS "Deny anon access to email_events" ON public.email_events;
        CREATE POLICY "Deny anon access to email_events"
        ON public.email_events FOR ALL
        TO anon
        USING (false);

        -- Update function for leads.updated_at
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $function$
        BEGIN
            NEW.updated_at = now();
            RETURN NEW;
        END;
        $function$ language 'plpgsql';

        -- Trigger for leads table
        DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
        CREATE TRIGGER update_leads_updated_at 
        BEFORE UPDATE ON public.leads 
        FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
      `
    })

    if (error) {
      console.error('❌ Database setup error:', error)
      // Try direct SQL execution instead
      const { error: sqlError } = await supabaseAdmin
        .from('pg_stat_user_tables')
        .select('*')
        .limit(1)

      if (sqlError) {
        return NextResponse.json({ 
          error: 'Database connection failed', 
          details: sqlError.message 
        }, { status: 500 })
      }

      // Execute SQL directly
      const createTableSQL = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        -- Create registrations table
        CREATE TABLE IF NOT EXISTS public.registrations (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          stripe_session_id text UNIQUE,
          email text NOT NULL,
          first_name text,
          last_name text,
          phone text,
          date_of_birth text,
          address_line1 text,
          address_line2 text,
          city text,
          state_province text,
          postal_code text,
          country text,
          emergency_contact_name text,
          emergency_contact_phone text,
          emergency_contact_relationship text,
          experience_level text,
          bring_own_camera boolean,
          camera_equipment_details text,
          dietary_restrictions text,
          medical_conditions text,
          how_did_you_hear text,
          special_requests text,
          plan_label text,
          amount_paid numeric,
          currency text,
          retreat text,
          retreat_start date,
          retreat_location text,
          created_at timestamptz DEFAULT now(),
          updated_at timestamptz DEFAULT now()
        );

        -- Create leads table for email marketing
        CREATE TABLE IF NOT EXISTS public.leads (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          email text UNIQUE NOT NULL,
          first_name text NULL,
          source text NULL,
          utm_source text NULL,
          utm_medium text NULL,
          utm_campaign text NULL,
          utm_content text NULL,
          referrer text NULL,
          consent_marketing boolean NOT NULL DEFAULT true,
          sequence_stage int NOT NULL DEFAULT 0,
          last_sent_at timestamptz NULL,
          next_send_at timestamptz NULL,
          registered boolean NOT NULL DEFAULT false,
          created_at timestamptz NOT NULL DEFAULT now(),
          updated_at timestamptz NOT NULL DEFAULT now()
        );

        -- Create email_events table for tracking
        CREATE TABLE IF NOT EXISTS public.email_events (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
          email_address text NOT NULL,
          event_type text NOT NULL,
          sequence_stage int NULL,
          template_id text NULL,
          message_id text NULL,
          user_agent text NULL,
          ip_address text NULL,
          link_url text NULL,
          metadata jsonb NULL,
          created_at timestamptz NOT NULL DEFAULT now()
        );

        CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
        CREATE INDEX IF NOT EXISTS idx_registrations_retreat_start ON public.registrations(retreat_start);
        CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
        CREATE INDEX IF NOT EXISTS idx_leads_next_send_at ON public.leads(next_send_at);
        CREATE INDEX IF NOT EXISTS idx_leads_sequence_registered ON public.leads(sequence_stage, registered);
        CREATE INDEX IF NOT EXISTS idx_leads_consent_registered ON public.leads(consent_marketing, registered);
        CREATE INDEX IF NOT EXISTS idx_email_events_lead_id ON public.email_events(lead_id);
        CREATE INDEX IF NOT EXISTS idx_email_events_type_created ON public.email_events(event_type, created_at);
      `

      const { error: execError } = await supabaseAdmin
        .from('sql')
        .insert({ statement: createTableSQL })

      if (execError) {
        console.error('❌ SQL execution error:', execError)
        return NextResponse.json({ 
          error: 'Failed to create table', 
          details: execError.message 
        }, { status: 500 })
      }
    }

    // Test table access - check both registrations and leads tables
    const { error: registrationsTestError } = await supabaseAdmin
      .from('registrations')
      .select('*')
      .limit(1)

    const { error: leadsTestError } = await supabaseAdmin
      .from('leads')
      .select('*')
      .limit(1)

    if (registrationsTestError || leadsTestError) {
      console.error('❌ Table test errors:', { registrationsTestError, leadsTestError })
      return NextResponse.json({ 
        error: 'Table creation verification failed', 
        details: {
          registrations: registrationsTestError?.message,
          leads: leadsTestError?.message
        }
      }, { status: 500 })
    }

    console.log('✅ Database setup completed successfully - All tables created')

    return NextResponse.json({
      success: true,
      message: 'Database tables created successfully (registrations, leads, email_events)',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Setup error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}