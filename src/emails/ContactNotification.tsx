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
} from '@react-email/components';

interface ContactNotificationProps {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  clientIp?: string;
  userAgent?: string;
}

export default function ContactNotification({
  name,
  email,
  phone,
  subject,
  message,
  createdAt,
  clientIp,
  userAgent,
}: ContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission — {subject}</Heading>

          <Section style={infoSection}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>

            {phone && (
              <>
                <Text style={label}>Phone:</Text>
                <Text style={value}>{phone}</Text>
              </>
            )}

            <Text style={label}>Subject:</Text>
            <Text style={value}>{subject}</Text>

            <Text style={label}>Message:</Text>
            <Text style={messageStyle}>{message}</Text>

            <Hr style={hr} />

            <Text style={label}>Submitted:</Text>
            <Text style={value}>{new Date(createdAt).toLocaleString()}</Text>

            {clientIp && (
              <>
                <Text style={label}>IP Address:</Text>
                <Text style={value}>{clientIp}</Text>
              </>
            )}

            {userAgent && (
              <>
                <Text style={label}>User Agent:</Text>
                <Text style={value}>{userAgent}</Text>
              </>
            )}
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            <Link href="https://www.thebtcp.com/admin" style={link}>
              View in Supabase Dashboard
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
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const infoSection = {
  padding: '24px',
  border: '1px solid #e6e6e6',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
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
};

const hr = {
  borderColor: '#e6e6e6',
  margin: '20px 0',
};

const footer = {
  color: '#666',
  fontSize: '14px',
  textAlign: 'center' as const,
};

const link = {
  color: '#0066cc',
  textDecoration: 'underline',
};