import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must agree to be contacted about your inquiry'
  }),
  hidden_honeypot: z.string().optional().refine(val => !val || val === '', {
    message: 'Invalid submission'
  }),
  math_answer: z.number().refine(val => val === 5, {
    message: 'Incorrect answer to math question'
  })
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const contactSchemaServer = contactSchema.extend({
  client_ip: z.string().optional(),
  user_agent: z.string().optional()
});