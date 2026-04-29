export interface BlastNotification {
  id: string;
  experience_id: string | null;
  subject: string;
  html_content: string;
  text_content: string | null;
  sent_by: string | null;
  sent_at: string | null;
  recipient_count: number;
  status: 'draft' | 'sending' | 'sent' | 'failed';
  created_at: string;
}

export interface BlastNotificationInsert {
  experience_id?: string | null;
  subject: string;
  html_content: string;
  text_content?: string | null;
}
