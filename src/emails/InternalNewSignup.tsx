import { Html, Head, Body, Container, Text, Heading, Section, Hr, Link } from '@react-email/components';

interface InternalNewSignupProps {
  email: string;
  firstName?: string;
  timestamp: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  referrer?: string;
  source?: string;
}

export default function InternalNewSignup({
  email,
  firstName,
  timestamp,
  utmSource,
  utmMedium,
  utmCampaign,
  utmContent,
  referrer,
  source
}: InternalNewSignupProps) {
  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Email List Signup</Heading>
          
          <Section style={section}>
            <Text style={text}>
              A new person has signed up for the Born to Create Project email list.
            </Text>
          </Section>

          <Section style={section}>
            <Heading style={h2}>Subscriber Details</Heading>
            <Text style={detail}>
              <strong>Email:</strong> {email}
            </Text>
            {firstName && (
              <Text style={detail}>
                <strong>First Name:</strong> {firstName}
              </Text>
            )}
            <Text style={detail}>
              <strong>Signup Time:</strong> {formattedDate}
            </Text>
            {source && (
              <Text style={detail}>
                <strong>Source:</strong> {source}
              </Text>
            )}
          </Section>

          {(utmSource || utmMedium || utmCampaign || utmContent || referrer) && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading style={h2}>Marketing Attribution</Heading>
                {utmSource && (
                  <Text style={detail}>
                    <strong>UTM Source:</strong> {utmSource}
                  </Text>
                )}
                {utmMedium && (
                  <Text style={detail}>
                    <strong>UTM Medium:</strong> {utmMedium}
                  </Text>
                )}
                {utmCampaign && (
                  <Text style={detail}>
                    <strong>UTM Campaign:</strong> {utmCampaign}
                  </Text>
                )}
                {utmContent && (
                  <Text style={detail}>
                    <strong>UTM Content:</strong> {utmContent}
                  </Text>
                )}
                {referrer && (
                  <Text style={detail}>
                    <strong>Referrer:</strong> {referrer}
                  </Text>
                )}
              </Section>
            </>
          )}

          <Hr style={hr} />
          
          <Section style={section}>
            <Text style={text}>
              The subscriber has been automatically added to the email sequence and will receive the welcome email with the gear checklist.
            </Text>
            <Text style={text}>
              <Link href={`https://thebtcp.com/admin/leads?email=${encodeURIComponent(email)}`} style={link}>
                View in Admin Dashboard
              </Link>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This is an automated notification from the Born to Create Project email system.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Plain text version for email clients that don't support HTML
export function InternalNewSignupText({
  email,
  firstName,
  timestamp,
  utmSource,
  utmMedium,
  utmCampaign,
  utmContent,
  referrer,
  source
}: InternalNewSignupProps): string {
  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  let text = `New Email List Signup - Born to Create Project

A new person has signed up for the email list.

SUBSCRIBER DETAILS:
Email: ${email}`;

  if (firstName) {
    text += `\nFirst Name: ${firstName}`;
  }
  
  text += `\nSignup Time: ${formattedDate}`;
  
  if (source) {
    text += `\nSource: ${source}`;
  }

  // Add marketing attribution if available
  if (utmSource || utmMedium || utmCampaign || utmContent || referrer) {
    text += `\n\nMARKETING ATTRIBUTION:`;
    
    if (utmSource) text += `\nUTM Source: ${utmSource}`;
    if (utmMedium) text += `\nUTM Medium: ${utmMedium}`;
    if (utmCampaign) text += `\nUTM Campaign: ${utmCampaign}`;
    if (utmContent) text += `\nUTM Content: ${utmContent}`;
    if (referrer) text += `\nReferrer: ${referrer}`;
  }

  text += `\n\nThe subscriber has been automatically added to the email sequence and will receive the welcome email with the gear checklist.

View in Admin Dashboard: https://thebtcp.com/admin/leads?email=${encodeURIComponent(email)}

--
This is an automated notification from the Born to Create Project email system.`;

  return text;
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const section = {
  padding: '0 48px',
};

const h1 = {
  color: '#2d5016',
  fontSize: '28px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
  padding: '0 48px',
};

const h2 = {
  color: '#2d5016',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '28px',
  margin: '20px 0 12px',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  margin: '0 0 12px',
};

const detail = {
  color: '#525f7f',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'left' as const,
  margin: '0 0 8px',
};

const link = {
  color: '#2d5016',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  padding: '0 48px',
  marginTop: '32px',
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
  margin: '0',
};