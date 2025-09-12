// Simple script to generate a test token for development
const crypto = require('crypto');

const SECRET = process.env.BORN_TO_CREATE_LINK_SECRET || 'dev-secret-key';

function signToken(payload) {
  const timestamp = Date.now().toString();
  const data = `${payload}:${timestamp}`;
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(data)
    .digest('hex');
  
  const token = Buffer.from(`${data}:${signature}`, 'utf8').toString('base64url');
  return token;
}

// Generate test token
const testToken = signToken('lead:test@example.com');
const testUrl = `http://localhost:3000/resources/gear-checklist?t=${testToken}`;

console.log('Test Token:', testToken);
console.log('Test URL:', testUrl);
console.log('\nTesting URLs:');
console.log('1. Without token (should 404):', 'http://localhost:3000/resources/gear-checklist');
console.log('2. With invalid token (should 404):', 'http://localhost:3000/resources/gear-checklist?t=invalid');
console.log('3. With valid token (should work):', testUrl);