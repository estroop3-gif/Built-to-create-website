// Use Web Crypto API for Edge Runtime compatibility
const crypto = globalThis.crypto;

const SECRET = process.env.BORN_TO_CREATE_LINK_SECRET || 'dev-secret-key';

export async function signToken(payload: string): Promise<string> {
  const timestamp = Date.now().toString();
  const data = `${payload}:${timestamp}`;
  
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const signatureHex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  const token = Buffer.from(`${data}:${signatureHex}`, 'utf8').toString('base64url');
  return token;
}

export async function verifyToken(token: string, maxAge: number = 30 * 24 * 60 * 60 * 1000): Promise<{ valid: boolean; payload?: string }> {
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
    
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const expectedSignatureBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
    // Timing-safe comparison
    const signatureBuffer = new Uint8Array(signature.length / 2);
    for (let i = 0; i < signature.length; i += 2) {
      signatureBuffer[i / 2] = parseInt(signature.substr(i, 2), 16);
    }
    
    const expectedBuffer = new Uint8Array(expectedSignatureBuffer);
    
    if (signatureBuffer.length !== expectedBuffer.length) {
      return { valid: false };
    }
    
    let valid = true;
    for (let i = 0; i < signatureBuffer.length; i++) {
      if (signatureBuffer[i] !== expectedBuffer[i]) {
        valid = false;
      }
    }
    
    return { valid, payload: valid ? payload : undefined };
    
  } catch {
    return { valid: false };
  }
}

export async function checklistUrlForLead(leadId: string): Promise<string> {
  const token = await signToken(`lead:${leadId}`);
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://thebtcp.com' 
    : 'http://localhost:3000';
  return `${baseUrl}/resources/gear-checklist?t=${token}`;
}