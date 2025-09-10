// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      registrations: {
        Row: Registration;
        Insert: RegistrationInsert;
        Update: RegistrationUpdate;
      };
    };
    Views: {
      admin_registrations_summary: {
        Row: {
          status: string;
          payment_status: string;
          count: number;
          total_amount: number;
        };
      };
    };
  };
}

export interface Registration {
  id: string;
  created_at: string;
  updated_at: string;
  
  // Personal Information
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relationship?: string;
  
  // Address
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state_province?: string;
  postal_code?: string;
  country?: string;
  
  // Retreat Preferences
  dietary_restrictions?: string;
  medical_conditions?: string;
  experience_level?: 'beginner' | 'intermediate' | 'advanced';
  bring_own_camera: boolean;
  camera_equipment_details?: string;
  
  // Payment Information
  payment_type: 'deposit' | 'full';
  payment_status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  payment_amount?: number;
  payment_currency?: string;
  stripe_payment_intent_id?: string;
  
  // Additional Information
  how_did_you_hear?: string;
  special_requests?: string;
  terms_accepted: boolean;
  marketing_consent: boolean;
  
  // Internal tracking
  registration_source?: string;
  admin_notes?: string;
  status: 'submitted' | 'approved' | 'waitlist' | 'cancelled';
}

export type RegistrationInsert = Omit<Registration, 'id' | 'created_at' | 'updated_at'>;
export type RegistrationUpdate = Partial<RegistrationInsert>;

// Form data type for the registration form
export interface RegistrationFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  
  // Address
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  
  // Retreat Preferences
  dietaryRestrictions: string;
  medicalConditions: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  bringOwnCamera: boolean;
  cameraEquipmentDetails: string;
  
  // Payment Information
  paymentType: 'deposit' | 'full';
  
  // Additional Information
  howDidYouHear: string;
  specialRequests: string;
  termsAccepted: boolean;
  marketingConsent: boolean;
}

// Email notification types
export interface RegistrationEmailData {
  registration: Registration;
  calculatedTotal: number;
  paymentAmount: number;
}

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text: string;
}