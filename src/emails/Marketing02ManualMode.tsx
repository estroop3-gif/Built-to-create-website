import { Text, Heading, Section, Button } from '@react-email/components';
import MarketingBaseTemplate from './MarketingBaseTemplate';

interface Marketing02ManualModeProps {
  firstName?: string;
  registerUrl?: string;
}

export default function Marketing02ManualMode({ 
  firstName = 'Friend',
  registerUrl = `${process.env.BASE_URL || 'https://thebtcp.com'}/register`
}: Marketing02ManualModeProps) {
  return (
    <MarketingBaseTemplate previewText="Master exposure with three decisions">
      <Section>
        <Heading style={h1}>Manual mode in three moves</Heading>
        
        <Text style={verse}>
          <em>"Let the favor of the Lord our God be upon us, and establish the work of our hands upon us; yes, establish the work of our hands!"</em> — Psalm 90:17
        </Text>
        
        <Text style={paragraph}>
          Hello {firstName},
        </Text>
        
        <Text style={paragraph}>
          Manual is about intention. Control the frame and you control the feeling. Today I'm going to teach you the exposure triangle that every professional filmmaker masters—and how to use it to create images that serve your story.
        </Text>
        
        <Heading as="h2" style={h2}>The Exposure Triangle</Heading>
        
        <Text style={paragraph}>
          Three settings control every image you capture. Understanding their relationship unlocks creative freedom:
        </Text>
        
        <Text style={bulletList}>
          • <strong>Aperture (f-stop)</strong> — Controls depth of field and light<br/>
          • <strong>Shutter Speed</strong> — Controls motion blur and light<br/>
          • <strong>ISO</strong> — Controls sensor sensitivity and image noise
        </Text>
        
        <Text style={paragraph}>
          Each setting affects both exposure (brightness) and creative elements (depth, motion, grain). Master this relationship and you'll never struggle with exposure again.
        </Text>
        
        <Heading as="h2" style={h2}>Starting Points for Every Situation</Heading>
        
        <Section style={scenarioBox}>
          <Heading as="h3" style={h3}>Bright Outdoor Interview</Heading>
          <Text style={settingsText}>
            <strong>f/4, 1/50s, ISO 100 + ND filter</strong><br/>
            Always use ND filter to maintain the 180° rule for natural motion blur
          </Text>
        </Section>
        
        <Section style={scenarioBox}>
          <Heading as="h3" style={h3}>Indoor Window Light</Heading>
          <Text style={settingsText}>
            <strong>f/2.8, 1/50s, ISO 800-1600</strong><br/>
            Shallow depth, natural motion at 180° rule, manageable noise
          </Text>
        </Section>
        
        <Section style={scenarioBox}>
          <Heading as="h3" style={h3}>Evening/Night Street</Heading>
          <Text style={settingsText}>
            <strong>f/1.8, 1/50s, ISO 3200+</strong><br/>
            Maximum light gathering while maintaining 180° shutter rule
          </Text>
        </Section>
        
        <Heading as="h2" style={h2}>The 180° Shutter Rule for Video</Heading>
        
        <Text style={paragraph}>
          For video, your shutter speed should always be double your frame rate. Shooting 24fps? Use 1/50s. Shooting 30fps? Use 1/60s. This creates natural motion blur that matches how our eyes perceive movement.
        </Text>
        
        <Text style={paragraph}>
          In bright outdoor situations, never crank your shutter speed to reduce exposure. This creates unnatural, jarring motion that looks amateur. Instead, use ND (Neutral Density) filters to reduce light while maintaining proper shutter speed.
        </Text>
        
        <Text style={bulletList}>
          • <strong>Correct approach:</strong> f/4, 1/50s, ISO 100 + ND8 filter<br/>
          • <strong>Wrong approach:</strong> f/4, 1/500s, ISO 100 (creates choppy motion)<br/>
          • <strong>Emergency only:</strong> Higher shutter if no ND available (but plan better next time)
        </Text>
        
        <Heading as="h2" style={h2}>The Professional Focus Drill</Heading>
        
        <Text style={paragraph}>
          Focus is where most beginners struggle. Here's the technique that works every time:
        </Text>
        
        <Text style={bulletList}>
          • Use focus peaking or magnification (never trust the screen alone)<br/>
          • Rock focus past your subject, then slowly return until it snaps sharp<br/>
          • Practice three-point pulls: foreground → subject → background<br/>
          • Set focus before you start rolling, not during
        </Text>
        
        <Heading as="h2" style={h2}>Why Manual Mode Matters for Ministry</Heading>
        
        <Text style={paragraph}>
          Automatic modes guess what you want. Manual mode lets you make intentional choices that serve your story. When documenting God's work, every frame should be purposeful.
        </Text>
        
        <Text style={paragraph}>
          In Costa Rica, you'll be shooting in constantly changing light—from jungle canopies to beach sunrise to mountain fog. Auto mode will fight you. Manual mode will give you creative control to capture the beauty exactly as you see it.
        </Text>
        
        <Heading as="h2" style={h2}>This Week's Practice Assignment</Heading>
        
        <Text style={bulletList}>
          • Shoot one complete scene using only manual mode<br/>
          • Change your aperture between f/1.8, f/4, and f/8 on the same subject<br/>
          • Review your shots and note how depth of field changes<br/>
          • Practice the focus drill until it becomes muscle memory
        </Text>
        
        <Text style={paragraph}>
          Don't worry about perfect exposure yet. Focus on understanding the relationship between the three settings. Every professional went through this learning curve—the difference is having a clear system to follow.
        </Text>
        
        <Section style={buttonContainer}>
          <Button
            href={registerUrl}
            style={button}
          >
            Master This in Costa Rica
          </Button>
        </Section>
        
        <Text style={paragraph}>
          Next week, I'll show you how different lenses completely change the emotional impact of your shots. But first, get comfortable with manual exposure. This is the foundation everything else builds on.
        </Text>
        
        <Text style={signature}>
          Shooting with intention,<br/>
          Parker
        </Text>
        
        <Text style={psalm}>
          "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters." — Colossians 3:23
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

const h3 = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#334155',
  margin: '0 0 8px 0',
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

const scenarioBox = {
  backgroundColor: '#f1f5f9',
  padding: '16px',
  borderRadius: '8px',
  margin: '0 0 16px 0',
  border: '1px solid #e2e8f0',
};

const settingsText = {
  fontSize: '15px',
  color: '#475569',
  margin: '0',
  lineHeight: '1.5',
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