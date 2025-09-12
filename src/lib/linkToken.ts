import { createHmac, timingSafeEqual } from 'crypto';

const SECRET = process.env.BORN_TO_CREATE_LINK_SECRET || 'dev-secret-key';

export function signToken(payload: string): string {
  const timestamp = Date.now().toString();
  const data = `${payload}:${timestamp}`;
  const signature = createHmac('sha256', SECRET)
    .update(data)
    .digest('hex');
  
  const token = Buffer.from(`${data}:${signature}`, 'utf8').toString('base64url');
  return token;
}

export function verifyToken(token: string, maxAge: number = 30 * 24 * 60 * 60 * 1000): { valid: boolean; payload?: string } {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split(':');
    
    if (parts.length !== 3) {
      return { valid: false };
    }
    
    const [payload, timestamp, signature] = parts;
    const age = Date.now() - parseInt(timestamp);
    
    if (age > maxAge) {
      return { valid: false };
    }
    
    const data = `${payload}:${timestamp}`;
    const expectedSignature = createHmac('sha256', SECRET)
      .update(data)
      .digest('hex');
    
    const signatureBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');
    
    if (signatureBuffer.length !== expectedBuffer.length) {
      return { valid: false };
    }
    
    const valid = timingSafeEqual(signatureBuffer, expectedBuffer);
    return { valid, payload: valid ? payload : undefined };
    
  } catch (error) {
    return { valid: false };
  }
}

export function checklistUrlForLead(leadId: string): string {
  const token = signToken(`lead:${leadId}`);
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://thebtcp.com' 
    : 'http://localhost:3000';
  return `${baseUrl}/resources/gear-checklist?t=${token}`;
}