import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface Email1WelcomeProps {
  firstName?: string;
  checklistUrl: string;
  registerUrl: string;
  unsubscribeUrl: string;
}

export default function Email1Welcome({
  firstName = 'there',
  checklistUrl,
  registerUrl,
  unsubscribeUrl,
}: Email1WelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Born to Create Project - Your free gear checklist is here!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>Born to Create Project</Heading>
            <Text style={tagline}>Costa Rica Filmmaking Retreat</Text>
          </Section>

          <Section style={content}>
            <Text style={greeting}>Hello {firstName},</Text>
            
            <Text style={paragraph}>
              You're in. You just joined a community of filmmakers and storytellers who believe 
              creativity is a calling.
            </Text>

            <Text style={paragraph}>
              Here is your free download:{' '}
              <Link href={checklistUrl} style={checklistLink}>
                The Filmmaker's Essential Gear Checklist
              </Link>. Inside you'll find a lightweight kit that travels well and covers camera, 
              audio, and light so you can focus on the story.
            </Text>

            <Text style={paragraph}>
              Over the next few weeks I will send short, practical lessons to level up your craft. 
              If Costa Rica is on your heart, this training will get you ready before you arrive.
            </Text>

            <Text style={paragraphBold}>Ready to take the next step?</Text>

            <Section style={buttonContainer}>
              <Button style={button} href={registerUrl}>
                Register for the Costa Rica Filmmaking Retreat
              </Button>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Parker at Born to Create Project<br />
              parker@thebtcp.com
            </Text>
            <Text style={footerLinks}>
              <Link href={unsubscribeUrl} style={unsubscribeLink}>Unsubscribe</Link> | {' '}
              <Link href="https://thebtcp.com" style={footerLink}>thebtcp.com</Link>
            </Text>
            <Text style={footerText}>
              Second Watch Network, San José, Costa Rica
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f7faf7',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  maxWidth: '640px',
};

const header = {
  textAlign: 'center' as const,
  marginBottom: '32px',
};

const logo = {
  color: '#2d5016',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
};

const tagline = {
  color: '#6b7280',
  fontSize: '16px',
  margin: '0',
};

const content = {
  marginBottom: '32px',
};

const greeting = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#374151',
  margin: '0 0 16px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0 0 16px 0',
};

const paragraphBold = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '16px 0',
  fontWeight: 'bold',
};

const checklistLink = {
  color: '#2d5016',
  fontWeight: '600',
  textDecoration: 'underline',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '24px 0',
};

const button = {
  backgroundColor: '#2d5016',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '0',
};

const footer = {
  borderTop: '1px solid #e5e7eb',
  paddingTop: '24px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0 0 8px 0',
  lineHeight: '1.4',
};

const footerLinks = {
  fontSize: '14px',
  margin: '8px 0',
};

const unsubscribeLink = {
  color: '#6b7280',
  textDecoration: 'underline',
};

const footerLink = {
  color: '#6b7280',
};