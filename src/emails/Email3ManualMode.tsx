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

interface Email3ManualModeProps {
  firstName?: string;
  registerUrl: string;
  unsubscribeUrl: string;
}

export default function Email3ManualMode({
  firstName = 'there',
  registerUrl,
  unsubscribeUrl,
}: Email3ManualModeProps) {
  return (
    <Html>
      <Head />
      <Preview>Manual Mode made simple</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>Born to Create Project</Heading>
            <Text style={tagline}>Costa Rica Filmmaking Retreat</Text>
          </Section>

          <Section style={content}>
            <Text style={greeting}>Hello {firstName},</Text>
            
            <Text style={paragraphBold}>Take control of the image with three settings:</Text>

            <Section style={settingsBox}>
              <Text style={settingItem}>
                <Text style={settingName}>Shutter speed:</Text> motion character. 
                Faster is crisper. Slower adds blur.
              </Text>
              <Text style={settingItem}>
                <Text style={settingName}>Aperture:</Text> depth of field. 
                Lower f numbers blur backgrounds. Higher keeps more in focus.
              </Text>
              <Text style={settingItem}>
                <Text style={settingName}>ISO:</Text> sensor gain. 
                Lower is cleaner. Higher adds noise.
              </Text>
            </Section>

            <Section style={tipBox}>
              <Text style={tipTitle}>Workflow:</Text>
              <Text style={tipText}>
                • Set shutter near double your frame rate. At 24fps start at 1/50.<br />
                • Pick aperture for depth. Portraits often f2 to f2.8. Landscapes f5.6 to f8.<br />
                • Raise ISO only as needed.
              </Text>
            </Section>

            <Text style={paragraph}>
              <Text style={drillTitle}>Drill:</Text> Film a moving subject at three shutter speeds. 
              Compare motion feel.
            </Text>

            <Text style={paragraphBold}>Commit to the craft in Costa Rica:</Text>

            <Section style={buttonContainer}>
              <Button style={button} href={registerUrl}>
                Register for the retreat
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

const settingsBox = {
  backgroundColor: '#f9fafb',
  padding: '20px',
  borderRadius: '8px',
  margin: '24px 0',
  border: '1px solid #e5e7eb',
};

const settingItem = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0 0 12px 0',
};

const settingName = {
  fontWeight: 'bold',
};

const tipBox = {
  backgroundColor: '#f5f1e8',
  padding: '20px',
  borderRadius: '8px',
  margin: '24px 0',
};

const tipTitle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#2d5016',
  margin: '0 0 8px 0',
};

const tipText = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0',
};

const drillTitle = {
  fontWeight: 'bold',
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