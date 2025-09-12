import { Text, Heading, Section, Button } from '@react-email/components';
import MarketingBaseTemplate from './MarketingBaseTemplate';

interface Marketing07EditingBasicsProps {
  firstName?: string;
  registerUrl?: string;
}

export default function Marketing07EditingBasics({ 
  firstName = 'Friend',
  registerUrl = `${process.env.BASE_URL || 'https://thebtcp.com'}/register`
}: Marketing07EditingBasicsProps) {
  return (
    <MarketingBaseTemplate previewText="A calm path from mess to message">
      <Section>
        <Heading style={h1}>Cut for meaning, not for timeline speed</Heading>
        
        <Text style={verse}>
          <em>"For God has not given us a spirit of fear, but of power, of love and of sound mind."</em> — 2 Timothy 1:7
        </Text>
        
        <Text style={paragraph}>
          Hello {firstName},
        </Text>
        
        <Text style={paragraph}>
          Editing is where you discover the story hidden in your footage. It's equal parts technical craft and spiritual discernment—knowing what to keep, what to cut, and how to shape emotion through rhythm and pacing.
        </Text>
        
        <Heading as="h2" style={h2}>The Professional Workflow</Heading>
        
        <Section style={stepBox}>
          <Heading as="h3" style={h3}>1. Organize and Label</Heading>
          <Text style={stepText}>
            Ingest and label clips by scene, take, person, and location. Use consistent naming. Create bins for interviews, B-roll, and audio. Future you will thank present you.
          </Text>
        </Section>
        
        <Section style={stepBox}>
          <Heading as="h3" style={h3}>2. Build Selects</Heading>
          <Text style={stepText}>
            Watch everything with fresh eyes. Mark the honest reactions and specific actions that reveal character. Look for moments of change, not just information.
          </Text>
        </Section>
        
        <Section style={stepBox}>
          <Heading as="h3" style={h3}>3. Create Radio Cut</Heading>
          <Text style={stepText}>
            Make your story work in audio-only first. If it doesn't make sense without visuals, your story structure needs work. Fix the spine before adding pictures.
          </Text>
        </Section>
        
        <Section style={stepBox}>
          <Heading as="h3" style={h3}>4. Add Picture Rhythm</Heading>
          <Text style={stepText}>
            Layer in visuals that enhance meaning. Use J and L cuts to let dialogue breathe. Cut on action for seamless flow. Every edit should be motivated by story need.
          </Text>
        </Section>
        
        <Section style={stepBox}>
          <Heading as="h3" style={h3}>5. Score with Purpose</Heading>
          <Text style={stepText}>
            Add licensed music before color correction. Music affects emotional pacing, so lock it early. Don't use music to manipulate—use it to clarify emotion that's already present.
          </Text>
        </Section>
        
        <Heading as="h2" style={h2}>Advanced Cutting Techniques</Heading>
        
        <Text style={bulletList}>
          • <strong>Cut on action:</strong> Movement masks cuts and creates seamless flow<br/>
          • <strong>Match cuts:</strong> Similar shapes or movements connect different shots<br/>
          • <strong>L and J cuts:</strong> Let audio lead or follow picture for natural conversation<br/>
          • <strong>Reaction shots:</strong> Show impact, not just information<br/>
          • <strong>Cutaway strategy:</strong> Cover edits while advancing the story
        </Text>
        
        <Heading as="h2" style={h2}>Color and Audio Finishing</Heading>
        
        <Section style={finishingBox}>
          <Heading as="h3" style={h3}>Color Workflow</Heading>
          <Text style={finishingText}>
            1. Correct first (fix white balance, match exposures)<br/>
            2. Grade second (create mood and style)<br/>
            3. Check on multiple monitors if possible<br/>
            4. Don't over-saturate skin tones
          </Text>
        </Section>
        
        <Section style={finishingBox}>
          <Heading as="h3" style={h3}>Audio Mix</Heading>
          <Text style={finishingText}>
            1. Dialogue is king—everything else serves clarity<br/>
            2. Music should support, not compete<br/>
            3. Room tone fills gaps and smooths transitions<br/>
            4. Export at broadcast levels (-23 LUFS for online)
          </Text>
        </Section>
        
        <Text style={paragraph}>
          Remember: editing is rewriting. Your first assembly will never be your final cut. Be willing to kill your darlings if they don't serve the larger story.
        </Text>
        
        <Heading as="h2" style={h2}>This Week's Practice</Heading>
        
        <Text style={bulletList}>
          • Create a two-minute radio cut from recent footage<br/>
          • Replace one montage sequence with a single real-time moment<br/>
          • Practice J and L cuts until they become instinctive<br/>
          • Study your favorite documentary: how does it use music?
        </Text>
        
        <Section style={buttonContainer}>
          <Button
            href={registerUrl}
            style={button}
          >
            Perfect Your Editing in Costa Rica
          </Button>
        </Section>
        
        <Text style={paragraph}>
          Next week: Color fundamentals. How to make your images breathe life and support your story's emotional arc.
        </Text>
        
        <Text style={signature}>
          Cutting with purpose,<br/>
          Parker
        </Text>
        
        <Text style={psalm}>
          "The simple believe anything, but the prudent give thought to their steps." — Proverbs 14:15
        </Text>
      </Section>
    </MarketingBaseTemplate>
  );
}

const h1 = { fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 24px 0', lineHeight: '1.2' };
const h2 = { fontSize: '22px', fontWeight: '600', color: '#1e293b', margin: '32px 0 16px 0', lineHeight: '1.3' };
const h3 = { fontSize: '18px', fontWeight: '600', color: '#334155', margin: '0 0 8px 0' };
const paragraph = { fontSize: '16px', color: '#334155', lineHeight: '1.7', margin: '0 0 16px 0' };
const verse = { fontSize: '15px', color: '#64748b', fontStyle: 'italic', margin: '0 0 24px 0', padding: '16px', backgroundColor: '#f8fafc', borderLeft: '4px solid #059669', lineHeight: '1.6' };
const bulletList = { fontSize: '16px', color: '#334155', lineHeight: '1.7', margin: '0 0 16px 0' };
const stepBox = { backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', margin: '0 0 16px 0', borderLeft: '4px solid #8b5cf6' };
const stepText = { fontSize: '15px', color: '#475569', margin: '0', lineHeight: '1.6' };
const finishingBox = { backgroundColor: '#fef3c7', padding: '16px', borderRadius: '8px', margin: '0 0 16px 0' };
const finishingText = { fontSize: '15px', color: '#92400e', margin: '0', lineHeight: '1.6' };
const buttonContainer = { textAlign: 'center' as const, margin: '40px 0' };
const button = { backgroundColor: '#059669', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', fontWeight: '600', display: 'inline-block' };
const signature = { fontSize: '16px', color: '#334155', margin: '32px 0 16px 0', lineHeight: '1.5' };
const psalm = { fontSize: '15px', color: '#64748b', fontStyle: 'italic', margin: '24px 0 0 0', padding: '16px', backgroundColor: '#f8fafc', borderLeft: '4px solid #059669', lineHeight: '1.6' };