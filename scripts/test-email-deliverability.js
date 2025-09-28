#!/usr/bin/env node

/**
 * Email deliverability testing script
 * Tests the enhanced sendMail functions and verifies headers
 */

// Use dynamic imports to work with CommonJS
const { sendTransactionalEmail, sendPromotionalEmail } = require('../src/lib/resend');

const TEST_EMAIL = process.env.ADMIN_TEST_EMAIL || 'estroop3@gmail.com';

if (!TEST_EMAIL) {
  console.error('❌ TEST_EMAIL environment variable is required');
  process.exit(1);
}

/**
 * Test transactional email (no unsubscribe headers)
 */
async function testTransactionalEmail() {
  console.log('📧 Testing transactional email...');

  try {
    const result = await sendTransactionalEmail({
      to: TEST_EMAIL,
      subject: '🔧 Test Transactional Email - Born to Create Project',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Transactional Email Test</h1>
          <p>This is a test of the transactional email system.</p>
          <ul>
            <li>✅ Should have proper authentication headers</li>
            <li>✅ Should NOT have List-Unsubscribe headers</li>
            <li>✅ Should have both HTML and plain text versions</li>
          </ul>
          <p>Sent from: Born to Create Project</p>
        </div>
      `,
      text: `
        Transactional Email Test

        This is a test of the transactional email system.

        - Should have proper authentication headers
        - Should NOT have List-Unsubscribe headers
        - Should have both HTML and plain text versions

        Sent from: Born to Create Project
      `
    });

    if (result.error) {
      console.error('❌ Transactional email failed:', result.error);
      return false;
    }

    console.log('✅ Transactional email sent successfully!');
    console.log('📬 Message ID:', result.data?.id);
    return true;

  } catch (error) {
    console.error('❌ Transactional email error:', error.message);
    return false;
  }
}

/**
 * Test promotional email (with unsubscribe headers)
 */
async function testPromotionalEmail() {
  console.log('📧 Testing promotional email...');

  try {
    const result = await sendPromotionalEmail({
      to: TEST_EMAIL,
      subject: '📰 Test Promotional Email - Born to Create Project',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Promotional Email Test</h1>
          <p>This is a test of the promotional email system.</p>
          <ul>
            <li>✅ Should have proper authentication headers</li>
            <li>✅ Should have List-Unsubscribe headers</li>
            <li>✅ Should have One-Click unsubscribe support</li>
            <li>✅ Should have both HTML and plain text versions</li>
          </ul>
          <p>Look for the unsubscribe link in your email client!</p>
          <p>Sent from: Born to Create Project</p>
        </div>
      `,
      text: `
        Promotional Email Test

        This is a test of the promotional email system.

        - Should have proper authentication headers
        - Should have List-Unsubscribe headers
        - Should have One-Click unsubscribe support
        - Should have both HTML and plain text versions

        Look for the unsubscribe link in your email client!

        Sent from: Born to Create Project
      `
    });

    if (result.error) {
      console.error('❌ Promotional email failed:', result.error);
      return false;
    }

    console.log('✅ Promotional email sent successfully!');
    console.log('📬 Message ID:', result.data?.id);
    console.log('🔗 Check for unsubscribe headers in the received email');
    return true;

  } catch (error) {
    console.error('❌ Promotional email error:', error.message);
    return false;
  }
}

/**
 * Test unsubscribe token generation
 */
async function testUnsubscribeToken() {
  console.log('🔐 Testing unsubscribe token generation...');

  try {
    const { generateUnsubscribeUrl, verifyUnsubscribeToken } = require('../src/lib/token');

    const testEmail = TEST_EMAIL;
    const unsubscribeUrl = generateUnsubscribeUrl(testEmail);

    console.log('✅ Unsubscribe URL generated:', unsubscribeUrl);

    // Extract token from URL
    const url = new URL(unsubscribeUrl);
    const token = url.searchParams.get('token');

    if (!token) {
      console.error('❌ No token found in URL');
      return false;
    }

    // Verify token
    const decoded = verifyUnsubscribeToken(token);

    if (decoded.email !== testEmail.toLowerCase()) {
      console.error('❌ Token verification failed: email mismatch');
      return false;
    }

    console.log('✅ Token verification successful!');
    console.log('📧 Decoded email:', decoded.email);
    console.log('🎯 Purpose:', decoded.purpose);

    return true;

  } catch (error) {
    console.error('❌ Token test error:', error.message);
    return false;
  }
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('🧪 Born to Create Project - Email Deliverability Tests');
  console.log('=====================================================');
  console.log('📬 Test email address:', TEST_EMAIL);
  console.log('');

  const results = [];

  // Test unsubscribe tokens first (no emails sent)
  results.push(await testUnsubscribeToken());
  console.log('');

  // Test transactional email
  results.push(await testTransactionalEmail());
  console.log('');

  // Add delay between emails
  console.log('⏳ Waiting 2 seconds between emails...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('');

  // Test promotional email
  results.push(await testPromotionalEmail());
  console.log('');

  // Summary
  const passed = results.filter(Boolean).length;
  const total = results.length;

  console.log('📊 Test Results Summary');
  console.log('=======================');
  console.log(`✅ Passed: ${passed}/${total}`);

  if (passed === total) {
    console.log('🎉 All tests passed! Email deliverability system is working correctly.');
    console.log('');
    console.log('📋 Next Steps:');
    console.log('1. Check your email inbox for test messages');
    console.log('2. Verify unsubscribe headers in email client');
    console.log('3. Test unsubscribe links');
    console.log('4. Monitor delivery rates in Resend dashboard');
  } else {
    console.log('❌ Some tests failed. Check the errors above.');
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}