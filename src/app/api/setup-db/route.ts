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

    console.log('🔧 Setting up database table...')

    // Create the registrations table
    const { error } = await supabaseAdmin.rpc('create_registrations_table', {
      sql_statement: `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

        CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
        CREATE INDEX IF NOT EXISTS idx_registrations_retreat_start ON public.registrations(retreat_start);
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

        CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
        CREATE INDEX IF NOT EXISTS idx_registrations_retreat_start ON public.registrations(retreat_start);
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

    // Test table access
    const { data: testData, error: testError } = await supabaseAdmin
      .from('registrations')
      .select('*')
      .limit(1)

    if (testError) {
      console.error('❌ Table test error:', testError)
      return NextResponse.json({ 
        error: 'Table creation failed', 
        details: testError.message 
      }, { status: 500 })
    }

    console.log('✅ Database setup completed successfully')

    return NextResponse.json({
      success: true,
      message: 'Database table created successfully',
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