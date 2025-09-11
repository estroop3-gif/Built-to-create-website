import { NextResponse } from 'next/server'
import { getRegistrations } from '@/lib/supabaseAdmin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const registrations = await getRegistrations()

    if (registrations.length === 0) {
      return new NextResponse('No registrations found', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    // Generate CSV
    const csvContent = generateCSV(registrations)

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="registrations-${new Date().toISOString().split('T')[0]}.csv"`
      }
    })

  } catch (error) {
    console.error('❌ Export error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

interface RegistrationRecord {
  id?: string
  stripe_session_id?: string
  email?: string
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
  created_at?: string
  updated_at?: string
}

function generateCSV(registrations: RegistrationRecord[]): string {
  if (registrations.length === 0) return ''

  // CSV headers
  const headers = [
    'ID',
    'Stripe Session ID',
    'Email',
    'First Name',
    'Last Name',
    'Phone',
    'Date of Birth',
    'Address Line 1',
    'Address Line 2',
    'City',
    'State/Province',
    'Postal Code',
    'Country',
    'Emergency Contact Name',
    'Emergency Contact Phone',
    'Emergency Contact Relationship',
    'Experience Level',
    'Bring Own Camera',
    'Camera Equipment Details',
    'Dietary Restrictions',
    'Medical Conditions',
    'How Did You Hear',
    'Special Requests',
    'Plan Label',
    'Amount Paid',
    'Currency',
    'Retreat',
    'Retreat Start',
    'Retreat Location',
    'Created At',
    'Updated At'
  ]

  // Convert registrations to CSV rows
  const rows = registrations.map(reg => [
    reg.id || '',
    reg.stripe_session_id || '',
    reg.email || '',
    reg.first_name || '',
    reg.last_name || '',
    reg.phone || '',
    reg.date_of_birth || '',
    reg.address_line1 || '',
    reg.address_line2 || '',
    reg.city || '',
    reg.state_province || '',
    reg.postal_code || '',
    reg.country || '',
    reg.emergency_contact_name || '',
    reg.emergency_contact_phone || '',
    reg.emergency_contact_relationship || '',
    reg.experience_level || '',
    reg.bring_own_camera ? 'Yes' : 'No',
    reg.camera_equipment_details || '',
    reg.dietary_restrictions || '',
    reg.medical_conditions || '',
    reg.how_did_you_hear || '',
    reg.special_requests || '',
    reg.plan_label || '',
    reg.amount_paid || '',
    reg.currency || '',
    reg.retreat || '',
    reg.retreat_start || '',
    reg.retreat_location || '',
    reg.created_at || '',
    reg.updated_at || ''
  ])

  // Escape CSV values
  const escapeCSV = (value: string | number | boolean): string => {
    if (value === null || value === undefined) return ''
    const str = String(value)
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }

  // Build CSV content
  const csvLines = [
    headers.map(escapeCSV).join(','),
    ...rows.map(row => row.map(escapeCSV).join(','))
  ]

  return csvLines.join('\n')
}