import { Text, Heading, Section, Button } from '@react-email/components';
import MarketingBaseTemplate from './MarketingBaseTemplate';

interface Marketing01WelcomeProps {
  firstName?: string;
  registerUrl?: string;
  unsubscribeUrl?: string;
}

export default function Marketing01Welcome({ 
  firstName = 'Friend', 
  registerUrl = `${process.env.BASE_URL || 'https://thebtcp.com'}/register`,
  unsubscribeUrl 
}: Marketing01WelcomeProps) {
  return (
    <MarketingBaseTemplate previewText="Start here and build with us">
      <Section>
        <Heading style={h1}>Create from presence, not pressure</Heading>
        
        <Text style={verse}>
          <em>"And I have filled him with the Spirit of God, with wisdom, with understanding, with knowledge and with all kinds of skills—to make artistic designs for work in gold, silver and bronze, to cut and set stones, to work in wood, and to engage in all kinds of crafts."</em> — Exodus 31:3-5
        </Text>
        
        <Text style={paragraph}>
          Hello {firstName},
        </Text>
        
        <Text style={paragraph}>
          You were born to create. Not for applause. For impact. This retreat is an invitation to create with God and to ship real work that lasts.
        </Text>
        
        <Text style={paragraph}>
          Over the next several weeks, I'm going to share the foundational filmmaking techniques that will transform your ability to tell compelling stories. Each lesson builds on the last, taking you from technical basics to creative mastery.
        </Text>
        
        <Heading as="h2" style={h2}>Core Ideas to Remember</Heading>
        
        <Text style={bulletList}>
          • Identity first, output second — who you are in Christ shapes what you create<br/>
          • Excellence as worship — technical skill honors God and serves others<br/>
          • Eternal impact over trends — focus on stories that matter beyond the moment
        </Text>
        
        <Heading as="h2" style={h2}>Why Costa Rica?</Heading>
        
        <Text style={paragraph}>
          February 20–28, 2026, we're gathering in one of the world's most beautiful locations to put these principles into practice. You'll work alongside other called creatives, learning advanced techniques while documenting real stories of God's work in Costa Rica.
        </Text>
        
        <Text style={paragraph}>
          This isn't just a filmmaking workshop—it's a calling intensive. You'll return home with:
        </Text>
        
        <Text style={bulletList}>
          • Professional-level technical skills<br/>
          • A completed short documentary<br/>
          • Clear vision for your creative ministry<br/>
          • A community of like-minded creators<br/>
          • Renewed passion for your calling
        </Text>
        
        <Heading as="h2" style={h2}>Your Action Steps This Week</Heading>
        
        <Text style={bulletList}>
          • Block one hour this week for focused practice with your camera<br/>
          • Choose one simple story to capture before sunset today<br/>
          • Reply to this email with one sentence about why you feel called to create
        </Text>
        
        <Text style={paragraph}>
          The techniques I'm about to share with you aren't just theory—they're the same methods I've used to create content viewed by millions, work with major brands, and train storytellers around the world. More importantly, they're grounded in the understanding that we create because we're made in the image of the Creator.
        </Text>
        
        <Section style={buttonContainer}>
          <Button
            href={registerUrl}
            style={button}
          >
            Reserve Your Spot in Costa Rica
          </Button>
        </Section>
        
        <Text style={signature}>
          Creating with purpose,<br/>
          Parker Winder<br/>
          <em>Born to Create Project</em>
        </Text>
        
        <Text style={psalm}>
          "May the favor of the Lord our God rest on us; establish the work of our hands for us—yes, establish the work of our hands." — Psalm 90:17
        </Text>
      </Section>
    </MarketingBaseTemplate>
  );
}

const h1 = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#0f172a',
  margin: '0 0 24px 0',
  lineHeight: '1.2',
  letterSpacing: '-0.5px',
};

const h2 = {
  fontSize: '22px',
  fontWeight: '600',
  color: '#1e293b',
  margin: '32px 0 16px 0',
  lineHeight: '1.3',
};

const paragraph = {
  fontSize: '16px',
  color: '#334155',
  lineHeight: '1.7',
  margin: '0 0 16px 0',
};

const verse = {
  fontSize: '15px',
  color: '#64748b',
  fontStyle: 'italic',
  margin: '0 0 24px 0',
  padding: '16px',
  backgroundColor: '#f8fafc',
  borderLeft: '4px solid #059669',
  lineHeight: '1.6',
};

const bulletList = {
  fontSize: '16px',
  color: '#334155',
  lineHeight: '1.7',
  margin: '0 0 16px 0',
  paddingLeft: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '40px 0',
};

const button = {
  backgroundColor: '#059669',
  color: '#ffffff',
  padding: '14px 28px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '600',
  display: 'inline-block',
  letterSpacing: '0.5px',
};

const signature = {
  fontSize: '16px',
  color: '#334155',
  margin: '32px 0 16px 0',
  lineHeight: '1.5',
};

const psalm = {
  fontSize: '15px',
  color: '#64748b',
  fontStyle: 'italic',
  margin: '24px 0 0 0',
  padding: '16px',
  backgroundColor: '#f8fafc',
  borderLeft: '4px solid #059669',
  lineHeight: '1.6',
};