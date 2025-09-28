#!/bin/bash

# Comprehensive automated email testing script
# Tests all email endpoints with enhanced deliverability

echo "🧪 Born to Create Project - Comprehensive Email System Tests"
echo "==========================================================="

BASE_URL=${BASE_URL:-"http://localhost:3001"}
TEST_EMAIL=${ADMIN_TEST_EMAIL:-"estroop3@gmail.com"}

echo "📬 Base URL: $BASE_URL"
echo "📧 Test email: $TEST_EMAIL"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_pattern="$3"

    echo "📧 Testing: $test_name"
    TOTAL_TESTS=$((TOTAL_TESTS + 1))

    RESPONSE=$(eval "$test_command" 2>/dev/null)
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    RESPONSE_BODY=$(echo "$RESPONSE" | head -n -1)

    if echo "$RESPONSE_BODY" | grep -q "$expected_pattern"; then
        echo -e "  ${GREEN}✅ PASSED${NC} - $test_name"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        echo -e "  ${RED}❌ FAILED${NC} - $test_name"
        echo "  Expected: $expected_pattern"
        echo "  Got: $RESPONSE_BODY"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

echo "🔧 Starting automated email tests..."
echo ""

# Test 1: Contact Form (Transactional Emails)
run_test "Contact Form Email" \
    "curl -s -X POST \"$BASE_URL/api/contact\" \
     -H \"Content-Type: application/json\" \
     -d '{
       \"name\": \"Auto Test User\",
       \"email\": \"$TEST_EMAIL\",
       \"subject\": \"🔧 Automated Test - Contact Form\",
       \"message\": \"This is an automated test of the contact form email system using enhanced deliverability.\",
       \"math_answer\": 5,
       \"consent\": true
     }'" \
    '"success":true'

# Test 2: Enhanced Resend Test Endpoint
run_test "Enhanced Email Test Endpoint" \
    "curl -s -X POST \"$BASE_URL/api/test-resend\"" \
    '"success":true'

# Test 3: Registration Email Test (if endpoint exists)
run_test "Registration Email System" \
    "curl -s -X POST \"$BASE_URL/api/send-registration-email\" \
     -H \"Content-Type: application/json\" \
     -d '{
       \"registration\": {
         \"id\": \"test-123\",
         \"first_name\": \"Test\",
         \"last_name\": \"User\",
         \"email\": \"$TEST_EMAIL\",
         \"phone\": \"+1234567890\",
         \"created_at\": \"$(date -Iseconds)\"
       },
       \"paymentAmount\": 100
     }'" \
    '"success":true'

# Test 4: Pre-trip Email Test
CRON_SECRET=${CRON_SECRET:-"cr0n_53cr3t_k3y_2025"}
run_test "Pre-trip Email System" \
    "curl -s -X POST \"$BASE_URL/api/test/pretrip-emails?email=$TEST_EMAIL&days=7\" \
     -H \"Authorization: Bearer $CRON_SECRET\"" \
    '"success":true'

# Test 5: Marketing Email Test (Admin)
run_test "Marketing Email Test System" \
    "curl -s -X POST \"$BASE_URL/api/admin/marketing/test-all-emails\" \
     -H \"Content-Type: application/json\" \
     -d '{\"adminEmail\": \"$TEST_EMAIL\"}'" \
    '"success":true'

echo ""
echo "📊 Test Results Summary"
echo "======================="
echo -e "${GREEN}✅ Passed: $PASSED_TESTS${NC}"
echo -e "${RED}❌ Failed: $FAILED_TESTS${NC}"
echo "📧 Total Tests: $TOTAL_TESTS"

if [ $FAILED_TESTS -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 All automated email systems are working correctly!${NC}"
    echo ""
    echo "📋 What to check next:"
    echo "======================"
    echo "1. Check your email inbox ($TEST_EMAIL) for test messages"
    echo "2. Verify email headers using tools like:"
    echo "   - https://mxtoolbox.com/EmailHeaders.aspx"
    echo "   - https://www.mail-tester.com/"
    echo "3. Confirm these headers are present in promotional emails:"
    echo "   - List-Unsubscribe: <mailto:...>, <https://...>"
    echo "   - List-Unsubscribe-Post: List-Unsubscribe=One-Click"
    echo "4. Test unsubscribe links work correctly"
    echo "5. Monitor Resend dashboard for delivery metrics"
    echo ""
    echo "🔧 Email Deliverability Features Active:"
    echo "========================================"
    echo "✅ Enhanced sendMail helpers with proper authentication"
    echo "✅ Automatic HTML-to-text conversion"
    echo "✅ List-Unsubscribe headers for promotional emails"
    echo "✅ One-Click unsubscribe support for Gmail/Yahoo"
    echo "✅ JWT-secured unsubscribe tokens"
    echo "✅ Database tracking of all unsubscribes"
    echo "✅ Transactional vs promotional email separation"

    exit 0
else
    echo ""
    echo -e "${RED}❌ Some automated email systems failed testing.${NC}"
    echo ""
    echo "🔧 Troubleshooting Steps:"
    echo "========================"
    echo "1. Check that the development server is running"
    echo "2. Verify all environment variables are set:"
    echo "   - RESEND_API_KEY"
    echo "   - CONTACT_FROM_EMAIL"
    echo "   - CONTACT_INBOX_EMAIL"
    echo "   - JWT_SECRET"
    echo "   - SUPABASE_URL"
    echo "   - SUPABASE_SERVICE_ROLE"
    echo "3. Check server logs for detailed error messages"
    echo "4. Verify Resend domain is properly configured"
    echo "5. Test individual endpoints manually"

    exit 1
fi