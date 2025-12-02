import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

// Type assertion - we know JWT_SECRET is defined after the check above
const secret: string = JWT_SECRET;

export interface UnsubscribeTokenPayload {
  email: string;
  purpose: 'unsubscribe';
  iat?: number;
  exp?: number;
}

/**
 * Generate a short-lived JWT token for unsubscribe links
 * Token expires in 30 days to handle slow email clients
 */
export function generateUnsubscribeToken(email: string): string {
  const payload: UnsubscribeTokenPayload = {
    email: email.toLowerCase(),
    purpose: 'unsubscribe',
  };

  return jwt.sign(payload, secret, {
    expiresIn: '30d', // 30 days for email client compatibility
    issuer: 'thebtcp.com',
    audience: 'email-unsubscribe',
  });
}

/**
 * Verify and decode an unsubscribe token
 */
export function verifyUnsubscribeToken(token: string): UnsubscribeTokenPayload {
  try {
    const decoded = jwt.verify(token, secret, {
      issuer: 'thebtcp.com',
      audience: 'email-unsubscribe',
    }) as UnsubscribeTokenPayload;

    if (decoded.purpose !== 'unsubscribe') {
      throw new Error('Invalid token purpose');
    }

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Unsubscribe link has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid unsubscribe link');
    }
    throw error;
  }
}

/**
 * Generate unsubscribe URL with token
 */
export function generateUnsubscribeUrl(email: string): string {
  const token = generateUnsubscribeToken(email);
  const baseUrl = process.env.EMAIL_PUBLIC_URL || 'https://thebtcp.com';
  return `${baseUrl}/api/unsubscribe?token=${token}`;
}