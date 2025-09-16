import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Hr,
  Link,
  Button,
} from '@react-email/components';

interface ContactAcknowledgementProps {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default function ContactAcknowledgement({
  name,
  email,
  phone,
  subject,
  message,
}: ContactAcknowledgementProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>We received your message</Heading>

          <Text style={greeting}>Hi {name},</Text>

          <Text style={text}>
            Thanks for reaching out to Born to Create Project! We've received your message and will reply within one to two business days.
          </Text>

          <Section style={summarySection}>
            <Text style={summaryTitle}>Your message summary:</Text>

            <Text style={label}>Subject:</Text>
            <Text style={value}>{subject}</Text>

            <Text style={label}>Message:</Text>
            <Text style={messageStyle}>{message}</Text>

            <Text style={label}>Contact email:</Text>
            <Text style={value}>{email}</Text>

            {phone && (
              <>
                <Text style={label}>Phone:</Text>
                <Text style={value}>{phone}</Text>
              </>
            )}
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            While you wait, feel free to explore more about our Costa Rica filmmaking retreat:
          </Text>

          <Section style={buttonSection}>
            <Button
              style={button}
              href="https://www.thebtcp.com/faq"
            >
              View FAQ
            </Button>
            <Button
              style={secondaryButton}
              href="https://www.thebtcp.com/register"
            >
              Register for Retreat
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Born to Create Project<br />
            Costa Rica Filmmaking Retreat<br />
            <Link href="https://www.thebtcp.com" style={link}>
              thebtcp.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  fontFamily: '"Segoe UI", Roboto, sans-serif',
  backgroundColor: '#ffffff',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const h1 = {
  color: '#2d5a27',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0',
};

const greeting = {
  color: '#333',
  fontSize: '18px',
  margin: '20px 0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const summarySection = {
  padding: '24px',
  border: '1px solid #e6e6e6',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  margin: '24px 0',
};

const summaryTitle = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const label = {
  color: '#666',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '16px 0 4px 0',
};

const value = {
  color: '#333',
  fontSize: '16px',
  margin: '0 0 8px 0',
};

const messageStyle = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '0 0 8px 0',
  whiteSpace: 'pre-wrap' as const,
  maxHeight: '150px',
  overflow: 'hidden',
};

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#2d5a27',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '0 8px 8px 0',
};

const secondaryButton = {
  backgroundColor: 'transparent',
  border: '2px solid #2d5a27',
  borderRadius: '8px',
  color: '#2d5a27',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '10px 22px',
  margin: '0 8px 8px 0',
};

const hr = {
  borderColor: '#e6e6e6',
  margin: '20px 0',
};

const footer = {
  color: '#666',
  fontSize: '14px',
  textAlign: 'center' as const,
  lineHeight: '1.6',
};

const link = {
  color: '#2d5a27',
  textDecoration: 'underline',
};