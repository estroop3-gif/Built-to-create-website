import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const CONTACT_INBOX_EMAIL = process.env.CONTACT_INBOX_EMAIL || 'parker@thebtcp.com';
export const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'contact@thebtcp.com';