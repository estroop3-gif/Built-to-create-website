import { Text, Heading, Section, Button } from '@react-email/components';
import MarketingBaseTemplate from './MarketingBaseTemplate';

interface Marketing06SoundBasicsProps {
  firstName?: string;
  registerUrl?: string;
}

export default function Marketing06SoundBasics({ 
  firstName = 'Friend',
  registerUrl = `${process.env.BASE_URL || 'https://thebtcp.com'}/register`
}: Marketing06SoundBasicsProps) {
  return (
    <MarketingBaseTemplate previewText="Capturing clean dialogue anywhere">
      <Section>
        <Heading style={h1}>If the audio is bad, the film is broken</Heading>
        
        <Text style={verse}>
          <em>"To answer before listening—that is folly and shame."</em> — Proverbs 18:13
        </Text>
        
        <Text style={paragraph}>
          Hello {firstName},
        </Text>
        
        <Text style={paragraph}>
          Audiences will forgive shaky camera work. They'll tolerate imperfect exposure. But they will not sit through bad audio. Today I'm going to show you how to capture clean, professional sound that serves your story—no matter where you're filming.
        </Text>
        
        <Heading as="h2" style={h2}>The Two Essential Approaches</Heading>
        
        <Section style={approachBox}>
          <Heading as="h3" style={h3}>Lavalier (Lav) Microphones</Heading>
          <Text style={approachText}>
            <strong>Best for:</strong> Mobility, multiple subjects, hands-free operation<br/>
            <strong>Pros:</strong> Consistent level, freedom of movement, invisible to camera<br/>
            <strong>Cons:</strong> Can sound "clipped on," sensitive to clothing noise<br/>
            <strong>Placement:</strong> 6-8 inches below chin, clipped to solid fabric
          </Text>
        </Section>
        
        <Section style={approachBox}>
          <Heading as="h3" style={h3}>Boom Microphones</Heading>
          <Text style={approachText}>
            <strong>Best for:</strong> Natural room tone, multiple people, cinematic sound<br/>
            <strong>Pros:</strong> More natural acoustic space, better for dialogue scenes<br/>
            <strong>Cons:</strong> Requires operator, can get in shot, less mobile<br/>
            <strong>Placement:</strong> Just outside frame, pointed at mouth, not chest
          </Text>
        </Section>
        
        <Heading as="h2" style={h2}>Professional Gain Staging</Heading>
        
        <Text style={paragraph}>
          Proper levels are crucial for clean, professional audio:
        </Text>
        
        <Text style={bulletList}>
          • <strong>Peak levels:</strong> -12dB for digital recording (gives you headroom for unexpected loud moments)<br/>
          • <strong>Average levels:</strong> -18dB to -15dB for normal conversation<br/>
          • <strong>Noise floor:</strong> At least 20dB below your average signal level<br/>
          • <strong>Room tone:</strong> Always record 30 seconds of "silence" for editing
        </Text>
        
        <Text style={paragraph}>
          If you're recording too hot (levels consistently hitting -6dB or above), you'll get digital distortion that can't be fixed in post. Better to record a bit low and boost later.
        </Text>
        
        <Heading as="h2" style={h2}>Dealing with Wind and Crowd</Heading>
        
        <Section style={challengeBox}>
          <Heading as="h3" style={h3}>Wind Protection</Heading>
          <Text style={challengeText}>
            • Foam windscreen for light breeze<br/>
            • Deadcat (furry cover) for stronger wind<br/>
            • Both together for serious weather<br/>
            • Position subject's back to wind when possible
          </Text>
        </Section>
        
        <Section style={challengeBox}>
          <Heading as="h3" style={h3}>Crowd Noise</Heading>
          <Text style={challengeText}>
            • Get closer to subject (inverse square law)<br/>
            • Use directional mics to reject off-axis sound<br/>
            • Record wild sound of crowd separately for mixing<br/>
            • Consider moving to quieter location if story allows
          </Text>
        </Section>
        
        <Heading as="h2" style={h2}>Hiding Lavalier Mics</Heading>
        
        <Text style={paragraph}>
          Professional lav placement that stays invisible:
        </Text>
        
        <Text style={bulletList}>
          • <strong>Breathable tape:</strong> Medical tape or specialized mic tape, never duct tape<br/>
          • <strong>Clothing choice:</strong> Solid fabrics work better than loose weaves<br/>
          • <strong>Never bury:</strong> Don't hide lavs under thick clothing—they'll sound muffled<br/>
          • <strong>Backup placement:</strong> Always have a second position ready if first doesn't work
        </Text>
        
        <Heading as="h2" style={h2}>The Costa Rica Reality</Heading>
        
        <Text style={paragraph}>
          In Costa Rica, you'll be dealing with jungle ambiance, ocean waves, mountain wind, and group activities. Having solid audio fundamentals means you'll capture usable sound even in challenging environments.
        </Text>
        
        <Text style={paragraph}>
          Remember: bad audio makes viewers question the credibility of your entire story. Clean audio makes them lean in and trust what you're showing them.
        </Text>
        
        <Heading as="h2" style={h2}>This Week's Assignment</Heading>
        
        <Text style={bulletList}>
          • Record the same person saying the same line with both lav and boom<br/>
          • Compare the tone, noise floor, and overall quality<br/>
          • Build a pocket wind kit: deadcat, medical tape, small clips<br/>
          • Practice gain staging until you can set levels by ear
        </Text>
        
        <Section style={buttonContainer}>
          <Button
            href={registerUrl}
            style={button}
          >
            Capture Clear Audio in Costa Rica
          </Button>
        </Section>
        
        <Text style={paragraph}>
          Next week: Editing fundamentals. How to turn your carefully captured footage and audio into a story that moves people.
        </Text>
        
        <Text style={signature}>
          Listening carefully,<br/>
          Parker
        </Text>
        
        <Text style={psalm}>
          "Faith comes from hearing the message, and the message is heard through the word about Christ." — Romans 10:17
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
const approachBox = { backgroundColor: '#f0f9ff', padding: '16px', borderRadius: '8px', margin: '0 0 16px 0' };
const approachText = { fontSize: '15px', color: '#334155', margin: '0', lineHeight: '1.6' };
const challengeBox = { backgroundColor: '#fef2f2', padding: '16px', borderRadius: '8px', margin: '0 0 16px 0' };
const challengeText = { fontSize: '15px', color: '#7f1d1d', margin: '0', lineHeight: '1.6' };
const buttonContainer = { textAlign: 'center' as const, margin: '40px 0' };
const button = { backgroundColor: '#059669', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', fontWeight: '600', display: 'inline-block' };
const signature = { fontSize: '16px', color: '#334155', margin: '32px 0 16px 0', lineHeight: '1.5' };
const psalm = { fontSize: '15px', color: '#64748b', fontStyle: 'italic', margin: '24px 0 0 0', padding: '16px', backgroundColor: '#f8fafc', borderLeft: '4px solid #059669', lineHeight: '1.6' };