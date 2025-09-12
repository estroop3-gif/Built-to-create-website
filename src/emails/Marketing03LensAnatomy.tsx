import { Text, Heading, Section, Button } from '@react-email/components';
import MarketingBaseTemplate from './MarketingBaseTemplate';

interface Marketing03LensAnatomyProps {
  firstName?: string;
  registerUrl?: string;
}

export default function Marketing03LensAnatomy({ 
  firstName = 'Friend',
  registerUrl = `${process.env.BASE_URL || 'https://thebtcp.com'}/register`
}: Marketing03LensAnatomyProps) {
  return (
    <MarketingBaseTemplate previewText="Focal length, focus, aperture, stabilization">
      <Section>
        <Heading style={h1}>Know your glass</Heading>
        
        <Text style={verse}>
          <em>"The beginning of wisdom is this: Get wisdom, and whatever you get, get insight."</em> — Proverbs 4:7
        </Text>
        
        <Text style={paragraph}>
          Hello {firstName},
        </Text>
        
        <Text style={paragraph}>
          Your lens is your voice. Every focal length tells the story differently, every aperture setting changes how your audience feels. Today I'm going to break down exactly what matters when choosing and operating your glass.
        </Text>
        
        <Heading as="h2" style={h2}>What Actually Matters</Heading>
        
        <Text style={bulletList}>
          • <strong>Focal length</strong> — Changes perspective and subject size in frame<br/>
          • <strong>Maximum aperture</strong> — Sets low-light capability and background separation potential<br/>
          • <strong>Focus throw and breathing</strong> — Affects smooth pulls and reframing during shots<br/>
          • <strong>Image stabilization</strong> — Can help, but proper technique matters more
        </Text>
        
        <Heading as="h2" style={h2}>Prime vs Zoom: The Real Difference</Heading>
        
        <Section style={comparisonBox}>
          <Heading as="h3" style={h3}>Prime Lenses (Fixed Focal Length)</Heading>
          <Text style={bulletList}>
            • Faster maximum apertures (f/1.4, f/1.8, f/2.8)<br/>
            • Better low-light performance<br/>
            • More character and rendering quality<br/>
            • Forces you to move and think about framing<br/>
            • Generally sharper at equivalent apertures
          </Text>
        </Section>
        
        <Section style={comparisonBox}>
          <Heading as="h3" style={h3}>Zoom Lenses (Variable Focal Length)</Heading>
          <Text style={bulletList}>
            • Speed of coverage in changing situations<br/>
            • Flexibility when you can't move closer/farther<br/>
            • Easier for solo shooting and run-and-gun<br/>
            • One lens covers multiple focal lengths<br/>
            • More convenient for travel and mobility
          </Text>
        </Section>
        
        <Heading as="h2" style={h2}>Professional Operation Drills</Heading>
        
        <Text style={paragraph}>
          These techniques separate amateur from professional operation:
        </Text>
        
        <Text style={bulletList}>
          • <strong>Parfocal test</strong> — Zoom in tight, nail focus, zoom back out. If it holds focus, your lens is parfocal<br/>
          • <strong>Back focus check</strong> — On adapted lenses, ensure infinity focus hits exactly at the hard stop<br/>
          • <strong>Handheld stance</strong> — Feet apart, elbows tucked in, viewfinder pressed to your eye socket<br/>
          • <strong>Follow focus marks</strong> — Use gaffer tape to mark critical focus points for repeatable pulls
        </Text>
        
        <Heading as="h2" style={h2}>Focal Length Psychology</Heading>
        
        <Text style={paragraph}>
          Different focal lengths create different emotional responses in your viewer:
        </Text>
        
        <Section style={focalBox}>
          <Text style={focalText}>
            <strong>24-35mm Wide Angle:</strong> Environmental context, inclusion, community feeling
          </Text>
        </Section>
        
        <Section style={focalBox}>
          <Text style={focalText}>
            <strong>50mm Standard:</strong> Natural perspective, honest documentation, relatability
          </Text>
        </Section>
        
        <Section style={focalBox}>
          <Text style={focalText}>
            <strong>85-135mm Portrait:</strong> Intimacy, emotional connection, subject isolation
          </Text>
        </Section>
        
        <Text style={paragraph}>
          In Costa Rica, you'll be shooting testimonies, group activities, and stunning landscapes. Understanding which lens serves each moment is crucial for effective storytelling.
        </Text>
        
        <Heading as="h2" style={h2}>This Week's Assignment</Heading>
        
        <Text style={bulletList}>
          • Shoot the same subject at three different focal lengths (24mm, 50mm, 85mm)<br/>
          • Notice how perspective and emotional feeling changes<br/>
          • Practice smooth rack focus pulls using gaffer tape marks<br/>
          • Test your lenses for parfocal accuracy if using zooms
        </Text>
        
        <Text style={paragraph}>
          Pay attention to how each focal length makes you <em>feel</em> about the subject differently. That's the power of lens choice—it's not just technical, it's emotional.
        </Text>
        
        <Section style={buttonContainer}>
          <Button
            href={registerUrl}
            style={button}
          >
            Master Advanced Techniques in Costa Rica
          </Button>
        </Section>
        
        <Text style={paragraph}>
          Next week: Story structure fundamentals. Because all the technical skill in the world means nothing if you don't know how to serve a compelling narrative.
        </Text>
        
        <Text style={signature}>
          Seeing clearly,<br/>
          Parker
        </Text>
        
        <Text style={psalm}>
          "Open my eyes that I may see wonderful things in your law." — Psalm 119:18
        </Text>
      </Section>
    </MarketingBaseTemplate>
  );
}

const h1 = { fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 24px 0', lineHeight: '1.2' };
const h2 = { fontSize: '22px', fontWeight: '600', color: '#1e293b', margin: '32px 0 16px 0', lineHeight: '1.3' };
const h3 = { fontSize: '18px', fontWeight: '600', color: '#334155', margin: '0 0 12px 0', lineHeight: '1.3' };
const paragraph = { fontSize: '16px', color: '#334155', lineHeight: '1.7', margin: '0 0 16px 0' };
const verse = { fontSize: '15px', color: '#64748b', fontStyle: 'italic', margin: '0 0 24px 0', padding: '16px', backgroundColor: '#f8fafc', borderLeft: '4px solid #059669', lineHeight: '1.6' };
const bulletList = { fontSize: '16px', color: '#334155', lineHeight: '1.7', margin: '0 0 16px 0' };
const comparisonBox = { backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', margin: '0 0 16px 0', border: '1px solid #e2e8f0' };
const focalBox = { backgroundColor: '#f1f5f9', padding: '12px 16px', borderRadius: '6px', margin: '0 0 12px 0' };
const focalText = { fontSize: '15px', color: '#475569', margin: '0', lineHeight: '1.5' };
const buttonContainer = { textAlign: 'center' as const, margin: '40px 0' };
const button = { backgroundColor: '#059669', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', fontWeight: '600', display: 'inline-block' };
const signature = { fontSize: '16px', color: '#334155', margin: '32px 0 16px 0', lineHeight: '1.5' };
const psalm = { fontSize: '15px', color: '#64748b', fontStyle: 'italic', margin: '24px 0 0 0', padding: '16px', backgroundColor: '#f8fafc', borderLeft: '4px solid #059669', lineHeight: '1.6' };