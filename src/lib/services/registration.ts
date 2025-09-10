import { supabaseBrowser } from '../supabase-browser';
import { RegistrationFormData, RegistrationInsert, Registration } from '../types/database';

export class RegistrationService {
  private supabase = supabaseBrowser();

  /**
   * Submit a new registration to the database
   */
  async submitRegistration(formData: RegistrationFormData, paymentAmount: number): Promise<{ success: boolean; registration?: Registration; error?: string }> {
    try {
      // Transform form data to database format
      const registrationData: RegistrationInsert = {
        // Personal Information
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth || undefined,
        emergency_contact_name: formData.emergencyContactName,
        emergency_contact_phone: formData.emergencyContactPhone,
        emergency_contact_relationship: formData.emergencyContactRelationship,
        
        // Address
        address_line1: formData.addressLine1,
        address_line2: formData.addressLine2,
        city: formData.city,
        state_province: formData.stateProvince,
        postal_code: formData.postalCode,
        country: formData.country,
        
        // Retreat Preferences
        dietary_restrictions: formData.dietaryRestrictions,
        medical_conditions: formData.medicalConditions,
        experience_level: formData.experienceLevel,
        bring_own_camera: formData.bringOwnCamera,
        camera_equipment_details: formData.cameraEquipmentDetails,
        
        // Payment Information
        payment_type: formData.paymentType,
        payment_amount: paymentAmount,
        payment_status: 'pending',
        payment_currency: 'USD',
        
        // Additional Information
        how_did_you_hear: formData.howDidYouHear,
        special_requests: formData.specialRequests,
        terms_accepted: formData.termsAccepted,
        marketing_consent: formData.marketingConsent,
        
        // Internal tracking
        registration_source: 'website',
        status: 'submitted'
      };

      const { data, error } = await this.supabase
        .from('registrations')
        .insert(registrationData)
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        return { success: false, error: error.message };
      }

      // Send email notification
      await this.sendEmailNotification(data, paymentAmount);

      return { success: true, registration: data };
    } catch (error) {
      console.error('Registration submission error:', error);
      return { success: false, error: 'Failed to submit registration' };
    }
  }

  /**
   * Get registration by ID
   */
  async getRegistration(id: string): Promise<Registration | null> {
    const { data, error } = await this.supabase
      .from('registrations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching registration:', error);
      return null;
    }

    return data;
  }

  /**
   * Get registration by email
   */
  async getRegistrationByEmail(email: string): Promise<Registration | null> {
    const { data, error } = await this.supabase
      .from('registrations')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error fetching registration by email:', error);
      return null;
    }

    return data;
  }

  /**
   * Update registration status
   */
  async updateRegistrationStatus(id: string, status: Registration['status']): Promise<boolean> {
    const { error } = await this.supabase
      .from('registrations')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating registration status:', error);
      return false;
    }

    return true;
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(
    id: string, 
    paymentStatus: Registration['payment_status'], 
    stripePaymentIntentId?: string
  ): Promise<boolean> {
    const updateData: { payment_status: Registration['payment_status']; stripe_payment_intent_id?: string } = { payment_status: paymentStatus };
    if (stripePaymentIntentId) {
      updateData.stripe_payment_intent_id = stripePaymentIntentId;
    }

    const { error } = await this.supabase
      .from('registrations')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating payment status:', error);
      return false;
    }

    return true;
  }

  /**
   * Send email notification to admin
   */
  private async sendEmailNotification(registration: Registration, paymentAmount: number): Promise<void> {
    try {
      await fetch('/api/send-registration-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registration,
          paymentAmount,
        }),
      });
    } catch (error) {
      console.error('Failed to send email notification:', error);
      // Don't fail the registration if email fails
    }
  }
}

export const registrationService = new RegistrationService();