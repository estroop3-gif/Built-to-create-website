import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Font,
  Preview
} from '@react-email/components';

interface MarketingBaseTemplateProps {
  children: React.ReactNode;
  previewText: string;
}

export default function MarketingBaseTemplate({ children, previewText }: MarketingBaseTemplateProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="system-ui"
          fallbackFontFamily="Arial"
        />
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={brandTitle}>Born to Create Project</Text>
            <Text style={tagline}>Where creativity meets calling</Text>
          </Section>
          
          <Hr style={hr} />
          
          {/* Main Content */}
          <Section style={content}>
            {children}
          </Section>
          
          <Hr style={hr} />
          
          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Born to Create Project • Costa Rica Retreat
            </Text>
            <Text style={footerText}>
              February 20–28, 2026 • Transform your creative calling
            </Text>
            <Text style={footerLinks}>
              <Link href={`${process.env.BASE_URL || 'https://thebtcp.com'}/unsubscribe`} style={unsubscribeLink}>
                Unsubscribe
              </Link>
              {' • '}
              <Link href={`${process.env.BASE_URL || 'https://thebtcp.com'}`} style={link}>
                Visit Website
              </Link>
              {' • '}
              <Link href={`${process.env.BASE_URL || 'https://thebtcp.com'}/register`} style={link}>
                Register Now
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  color: '#1a1a1a',
  lineHeight: '1.6',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 40px',
  maxWidth: '640px',
  width: '100%',
};

const header = {
  textAlign: 'center' as const,
  marginBottom: '32px',
  paddingTop: '20px',
};

const brandTitle = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#0f172a',
  margin: '0 0 8px 0',
  lineHeight: '1.2',
  letterSpacing: '-0.5px',
};

const tagline = {
  fontSize: '16px',
  color: '#64748b',
  margin: '0 0 16px 0',
  fontStyle: 'italic',
  fontWeight: '400',
};

const content = {
  padding: '0 24px',
  fontSize: '16px',
  lineHeight: '1.7',
};

const hr = {
  border: 'none',
  borderTop: '1px solid #e2e8f0',
  margin: '32px 0',
};

const footer = {
  textAlign: 'center' as const,
  padding: '0 24px',
  marginTop: '32px',
};

const footerText = {
  fontSize: '14px',
  color: '#64748b',
  margin: '4px 0',
  lineHeight: '1.4',
};

const footerLinks = {
  fontSize: '14px',
  margin: '16px 0 8px 0',
  lineHeight: '1.4',
};

const unsubscribeLink = {
  color: '#64748b',
  textDecoration: 'underline',
};

const link = {
  color: '#059669',
  textDecoration: 'underline',
  fontWeight: '500',
};