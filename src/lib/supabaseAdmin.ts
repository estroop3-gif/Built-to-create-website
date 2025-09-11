import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export interface RegistrationData {
  stripe_session_id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  date_of_birth?: string
  address_line1?: string
  address_line2?: string
  city?: string
  state_province?: string
  postal_code?: string
  country?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  emergency_contact_relationship?: string
  experience_level?: string
  bring_own_camera?: boolean
  camera_equipment_details?: string
  dietary_restrictions?: string
  medical_conditions?: string
  how_did_you_hear?: string
  special_requests?: string
  plan_label?: string
  amount_paid?: number
  currency?: string
  retreat?: string
  retreat_start?: string
  retreat_location?: string
}

export async function upsertRegistration(data: RegistrationData) {
  const { error } = await supabaseAdmin
    .from('registrations')
    .upsert(data, { 
      onConflict: 'stripe_session_id',
      ignoreDuplicates: false 
    })
  
  if (error) {
    console.error('Error upserting registration:', error)
    throw error
  }
}

export async function getRegistrations() {
  const { data, error } = await supabaseAdmin
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching registrations:', error)
    throw error
  }
  
  return data
}

export async function getUpcomingRetreats(daysAhead: number) {
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + daysAhead)
  const targetDateStr = targetDate.toISOString().split('T')[0]
  
  const { data, error } = await supabaseAdmin
    .from('registrations')
    .select('*')
    .eq('retreat_start', targetDateStr)
  
  if (error) {
    console.error('Error fetching upcoming retreats:', error)
    throw error
  }
  
  return data
}