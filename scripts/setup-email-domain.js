#!/usr/bin/env node

/**
 * Setup script for Resend email domain configuration
 * Run this after adding the DNS records to your domain
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DOMAIN = 'mail.thebtcp.com';

if (!RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY environment variable is required');
  process.exit(1);
}

// Function to create domain in Resend
async function createDomain() {
  try {
    console.log(`🔧 Creating domain: ${DOMAIN}`);

    const response = await fetch('https://api.resend.com/domains', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: DOMAIN,
        region: 'us-east-1' // or 'eu-west-1' based on your preference
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    console.log('✅ Domain created successfully!');
    console.log('📋 DNS Records to add:');
    console.log('');

    // Format DNS records as table
    console.log('| Record Type | Name | Value | TTL |');
    console.log('|-------------|------|-------|-----|');

    data.records.forEach(record => {
      console.log(`| ${record.type} | ${record.name} | ${record.value} | 3600 |`);
    });

    console.log('');
    console.log('🔍 Domain ID:', data.id);
    console.log('📨 You can now send from: contact@' + DOMAIN);

    return data;
  } catch (error) {
    console.error('❌ Failed to create domain:', error.message);
    throw error;
  }
}

// Function to verify domain
async function verifyDomain(domainId) {
  try {
    console.log(`🔍 Verifying domain: ${DOMAIN}`);

    const response = await fetch(`https://api.resend.com/domains/${domainId}/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    console.log('✅ Domain verification result:');
    console.log('Status:', data.status);
    console.log('Records:', data.records);

    return data;
  } catch (error) {
    console.error('❌ Failed to verify domain:', error.message);
    throw error;
  }
}

// Function to get domain status
async function getDomainStatus(domainId) {
  try {
    const response = await fetch(`https://api.resend.com/domains/${domainId}`, {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    console.log('📊 Domain Status:');
    console.log('Name:', data.name);
    console.log('Status:', data.status);
    console.log('Region:', data.region);
    console.log('Created:', data.createdAt);

    return data;
  } catch (error) {
    console.error('❌ Failed to get domain status:', error.message);
    throw error;
  }
}

// Main execution
async function main() {
  const command = process.argv[2];

  switch (command) {
    case 'create':
      await createDomain();
      break;
    case 'verify':
      const domainId = process.argv[3];
      if (!domainId) {
        console.error('❌ Domain ID required for verify command');
        console.log('Usage: node setup-email-domain.js verify <domain-id>');
        process.exit(1);
      }
      await verifyDomain(domainId);
      break;
    case 'status':
      const statusDomainId = process.argv[3];
      if (!statusDomainId) {
        console.error('❌ Domain ID required for status command');
        console.log('Usage: node setup-email-domain.js status <domain-id>');
        process.exit(1);
      }
      await getDomainStatus(statusDomainId);
      break;
    default:
      console.log('📧 Resend Domain Setup Script');
      console.log('');
      console.log('Commands:');
      console.log('  create          Create domain and show DNS records');
      console.log('  verify <id>     Verify domain after DNS is configured');
      console.log('  status <id>     Check domain status');
      console.log('');
      console.log('Examples:');
      console.log('  node setup-email-domain.js create');
      console.log('  node setup-email-domain.js verify d_abc123');
      console.log('  node setup-email-domain.js status d_abc123');
  }
}

// DMARC record information
console.log('');
console.log('📋 DMARC Record (add separately):');
console.log('| Record Type | Name | Value | TTL |');
console.log('|-------------|------|-------|-----|');
console.log('| TXT | _dmarc.thebtcp.com | v=DMARC1; p=none; rua=mailto:dmarc@thebtcp.com; ruf=mailto:dmarc@thebtcp.com; fo=1 | 3600 |');
console.log('');
console.log('⚠️  Start with p=none (monitor mode) for 1 week, then move to p=quarantine, then p=reject');

main().catch(console.error);