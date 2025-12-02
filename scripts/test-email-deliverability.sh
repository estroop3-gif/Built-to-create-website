#!/bin/bash

# Email deliverability testing script
# Tests the email system through API endpoints

echo "🧪 Born to Create Project - Email Deliverability Tests"
echo "====================================================="

BASE_URL=${BASE_URL:-"http://localhost:3001"}
TEST_EMAIL=${ADMIN_TEST_EMAIL:-"estroop3@gmail.com"}

echo "📬 Base URL: $BASE_URL"
echo "📧 Test email: $TEST_EMAIL"
echo ""

# Test 1: Contact form (transactional email)
echo "📧 Testing contact form (transactional email)..."
CONTACT_RESPONSE=$(curl -s -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Email Test User\",
    \"email\": \"$TEST_EMAIL\",
    \"subject\": \"🔧 Deliverability Test - Contact Form\",
    \"message\": \"This is a test of the contact form email system. Should be sent as transactional (no unsubscribe headers).\",
    \"math_answer\": 5,
    \"consent\": true
  }")

if echo "$CONTACT_RESPONSE" | grep -q '"success":true'; then
  echo "✅ Contact form test passed"
  echo "📬 Response: $CONTACT_RESPONSE"
else
  echo "❌ Contact form test failed"
  echo "📬 Response: $CONTACT_RESPONSE"
fi
echo ""

# Test 2: Unsubscribe token generation
echo "🔐 Testing unsubscribe token generation..."
TOKEN_URL="$BASE_URL/api/unsubscribe?token=test"
TOKEN_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$TOKEN_URL")

if [ "$TOKEN_RESPONSE" = "400" ]; then
  echo "✅ Unsubscribe endpoint responding correctly (400 for invalid token)"
else
  echo "❌ Unsubscribe endpoint test failed (got $TOKEN_RESPONSE)"
fi
echo ""

# Test 3: Check if development server is running
echo "🔍 Checking development server..."
SERVER_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/")

if [ "$SERVER_RESPONSE" = "200" ]; then
  echo "✅ Development server is running"
else
  echo "❌ Development server not responding (got $SERVER_RESPONSE)"
fi
echo ""

echo "📋 Manual Testing Steps:"
echo "========================"
echo "1. Check your email inbox ($TEST_EMAIL) for test messages"
echo "2. Verify email headers using tools like:"
echo "   - https://mxtoolbox.com/EmailHeaders.aspx"
echo "   - https://www.mail-tester.com/"
echo "3. Test unsubscribe links if promotional emails are sent"
echo "4. Check Resend dashboard for delivery metrics"
echo ""
echo "📊 Expected Results:"
echo "===================="
echo "✅ Contact form emails should be transactional (no List-Unsubscribe headers)"
echo "✅ Marketing emails should have List-Unsubscribe headers"
echo "✅ All emails should have proper SPF/DKIM authentication"
echo "✅ Plain text versions should be auto-generated"
echo ""
echo "🔧 Troubleshooting:"
echo "==================="
echo "- If emails don't arrive, check Resend dashboard for errors"
echo "- If authentication fails, verify DNS records"
echo "- If unsubscribe doesn't work, check JWT_SECRET environment variable"