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
  Button,
} from '@react-email/components';

interface NewExperienceNotificationProps {
  name: string;
  title: string;
  description: string;
  date?: string;
  location?: string;
  price?: string;
  ctaUrl: string;
  ctaText: string;
}

export default function NewExperienceNotification({
  name,
  title,
  description,
  date,
  location,
  price,
  ctaUrl,
  ctaText,
}: NewExperienceNotificationProps) {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Heading style={logoStyle}>Born to Create Project</Heading>
          </Section>

          <Section style={contentStyle}>
            <Text style={greetingStyle}>Hey {name},</Text>

            <Text style={textStyle}>
              We have something new coming up and wanted you to be the first to know.
            </Text>

            <Section style={cardStyle}>
              <Heading as="h2" style={titleStyle}>{title}</Heading>
              <Text style={descriptionStyle}>{description}</Text>

              {(date || location || price) && (
                <Section style={detailsStyle}>
                  {date && (
                    <Text style={detailLineStyle}>
                      <strong>When:</strong> {date}
                    </Text>
                  )}
                  {location && (
                    <Text style={detailLineStyle}>
                      <strong>Where:</strong> {location}
                    </Text>
                  )}
                  {price && (
                    <Text style={detailLineStyle}>
                      <strong>Price:</strong> {price}
                    </Text>
                  )}
                </Section>
              )}
            </Section>

            <Section style={ctaContainerStyle}>
              <Button style={ctaButtonStyle} href={ctaUrl}>
                {ctaText}
              </Button>
            </Section>

            <Text style={textStyle}>
              Spots are limited, so if this sounds like something you have been looking for, do not wait too long.
            </Text>

            <Hr style={hrStyle} />

            <Text style={signoffStyle}>
              See you out there,
              <br />
              Parker Stroop
              <br />
              Born to Create Project
            </Text>
          </Section>

          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              You are receiving this because you signed up at thebtcp.com.
              If you no longer want to hear from us, you can unsubscribe at any time.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#f5f3ef',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  margin: 0,
  padding: '20px 0',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#2d5a27',
  padding: '24px 32px',
  borderRadius: '8px 8px 0 0',
};

const logoStyle: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 700,
  margin: 0,
};

const contentStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '32px',
};

const greetingStyle: React.CSSProperties = {
  fontSize: '18px',
  color: '#1a1a1a',
  marginBottom: '16px',
};

const textStyle: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#4a4a4a',
  marginBottom: '16px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#f5f3ef',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '24px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '22px',
  color: '#1a1a1a',
  margin: '0 0 12px 0',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#4a4a4a',
  margin: '0 0 16px 0',
};

const detailsStyle: React.CSSProperties = {
  borderTop: '1px solid #ddd',
  paddingTop: '12px',
};

const detailLineStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#4a4a4a',
  margin: '4px 0',
};

const ctaContainerStyle: React.CSSProperties = {
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const ctaButtonStyle: React.CSSProperties = {
  backgroundColor: '#2d5a27',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 600,
  padding: '14px 32px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-block',
};

const hrStyle: React.CSSProperties = {
  borderColor: '#e5e5e5',
  margin: '24px 0',
};

const signoffStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#4a4a4a',
  lineHeight: '1.8',
};

const footerStyle: React.CSSProperties = {
  backgroundColor: '#f5f3ef',
  padding: '16px 32px',
  borderRadius: '0 0 8px 8px',
};

const footerTextStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#999',
  textAlign: 'center' as const,
};
