import { Text, Heading, Section, Button } from '@react-email/components';
import MarketingBaseTemplate from './MarketingBaseTemplate';

interface Marketing05LightingBasicsProps {
  firstName?: string;
  registerUrl?: string;
}

export default function Marketing05LightingBasics({ 
  firstName = 'Friend',
  registerUrl = `${process.env.BASE_URL || 'https://thebtcp.com'}/register`
}: Marketing05LightingBasicsProps) {
  return (
    <MarketingBaseTemplate previewText="Shape contrast, not just exposure">
      <Section>
        <Heading style={h1}>Light for emotion and clarity</Heading>
        
        <Text style={verse}>
          <em>"Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows."</em> — James 1:17
        </Text>
        
        <Text style={paragraph}>
          Hello {firstName},
        </Text>
        
        <Text style={paragraph}>
          Light is the raw material of visual storytelling. Direction defines shape, size controls softness, distance sets intensity, and contrast carries mood. Today I'm going to teach you to see light like a painter and use it like a cinematographer.
        </Text>
        
        <Heading as="h2" style={h2}>The Four Qualities of Light</Heading>
        
        <Section style={qualityBox}>
          <Text style={qualityText}>
            <strong>Direction:</strong> Where light comes from determines the shape and mood of your subject
          </Text>
        </Section>
        
        <Section style={qualityBox}>
          <Text style={qualityText}>
            <strong>Size:</strong> Large light sources create soft shadows, small sources create hard shadows
          </Text>
        </Section>
        
        <Section style={qualityBox}>
          <Text style={qualityText}>
            <strong>Distance:</strong> Closer light is softer and more intense, farther light is harder and dimmer
          </Text>
        </Section>
        
        <Section style={qualityBox}>
          <Text style={qualityText}>
            <strong>Color Temperature:</strong> Warm light feels intimate, cool light feels distant or clinical
          </Text>
        </Section>
        
        <Heading as="h2" style={h2}>Small Kit, Big Impact</Heading>
        
        <Text style={paragraph}>
          You don't need expensive lights to create professional results. Here are three setups that work anywhere:
        </Text>
        
        <Section style={setupBox}>
          <Heading as="h3" style={h3}>Window Key Light</Heading>
          <Text style={setupText}>
            Position subject facing large window for beautiful soft key light. Use white foam core opposite the window to fill shadows. Add practical lights (lamps) in background for depth.
          </Text>
        </Section>
        
        <Section style={setupBox}>
          <Heading as="h3" style={h3}>Single LED Panel</Heading>
          <Text style={setupText}>
            One LED panel bounced off white wall or through diffusion creates gorgeous soft light. Add rim light from small clamp light behind subject for separation.
          </Text>
        </Section>
        
        <Section style={setupBox}>
          <Heading as="h3" style={h3}>Golden Hour Backlight</Heading>
          <Text style={setupText}>
            Position subject between camera and low sun. Use large white reflector to bounce warm light back into their face. Creates ethereal rim lighting naturally.
          </Text>
        </Section>
        
        <Heading as="h2" style={h2}>Understanding Ratios</Heading>
        
        <Text style={paragraph}>
          Lighting ratio is the difference between your key light and fill light. It controls mood and emotion:
        </Text>
        
        <Text style={bulletList}>
          • <strong>1:1 Ratio (Flat lighting):</strong> Even exposure, corporate/informational feel<br/>
          • <strong>2:1 Ratio (Natural):</strong> Gentle contrast, perfect for most interviews<br/>
          • <strong>4:1 Ratio (Dramatic):</strong> Strong shadows, emotional or artistic content<br/>
          • <strong>8:1 Ratio (High contrast):</strong> Very dramatic, thriller or intense moments
        </Text>
        
        <Heading as="h2" style={h2}>Reading Natural Light</Heading>
        
        <Text style={paragraph}>
          In Costa Rica, you'll work primarily with natural light. Here's how to read it like a pro:
        </Text>
        
        <Text style={bulletList}>
          • <strong>Golden Hour:</strong> Warm, directional, flattering—perfect for beauty shots and inspiration<br/>
          • <strong>Blue Hour:</strong> Cool, even, atmospheric—great for establishing shots and mood<br/>
          • <strong>Overcast:</strong> Soft, even, forgiving—ideal for interviews and emotional content<br/>
          • <strong>Harsh Sun:</strong> Hard, contrasty—use for drama or find open shade
        </Text>
        
        <Text style={paragraph}>
          The key is matching your lighting choice to your story's emotional needs. Gentle testimony? Soft window light. Powerful declaration? Dramatic directional sun.
        </Text>
        
        <Heading as="h2" style={h2}>This Week's Practice</Heading>
        
        <Text style={bulletList}>
          • Recreate a still from your favorite film using one light source and one reflector<br/>
          • Shoot the same portrait with window light, then with negative fill (blocking light)<br/>
          • Practice reading the quality of light throughout one full day<br/>
          • Film a 30-second testimony using only natural light
        </Text>
        
        <Section style={buttonContainer}>
          <Button
            href={registerUrl}
            style={button}
          >
            Master Natural Light in Costa Rica
          </Button>
        </Section>
        
        <Text style={paragraph}>
          Next week: Sound fundamentals. Because if people can't hear your story clearly, all the beautiful lighting in the world won't save it.
        </Text>
        
        <Text style={signature}>
          Painting with light,<br/>
          Parker
        </Text>
        
        <Text style={psalm}>
          "The light shines in the darkness, and the darkness has not overcome it." — John 1:5
        </Text>
      </Section>
    </MarketingBaseTemplate>
  );
}

const h1 = { fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 24px 0', lineHeight: '1.2' };
const h2 = { fontSize: '22px', fontWeight: '600', color: '#1e293b', margin: '32px 0 16px 0', lineHeight: '1.3' };
const h3 = { fontSize: '18px', fontWeight: '600', color: '#334155', margin: '0 0 8px 0', lineHeight: '1.3' };
const paragraph = { fontSize: '16px', color: '#334155', lineHeight: '1.7', margin: '0 0 16px 0' };
const verse = { fontSize: '15px', color: '#64748b', fontStyle: 'italic', margin: '0 0 24px 0', padding: '16px', backgroundColor: '#f8fafc', borderLeft: '4px solid #059669', lineHeight: '1.6' };
const bulletList = { fontSize: '16px', color: '#334155', lineHeight: '1.7', margin: '0 0 16px 0' };
const qualityBox = { backgroundColor: '#fef3c7', padding: '12px 16px', borderRadius: '6px', margin: '0 0 12px 0' };
const qualityText = { fontSize: '15px', color: '#92400e', margin: '0', lineHeight: '1.5' };
const setupBox = { backgroundColor: '#f0f9ff', padding: '16px', borderRadius: '8px', margin: '0 0 16px 0', borderLeft: '4px solid #0ea5e9' };
const setupText = { fontSize: '15px', color: '#0c4a6e', margin: '0', lineHeight: '1.6' };
const buttonContainer = { textAlign: 'center' as const, margin: '40px 0' };
const button = { backgroundColor: '#059669', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', fontWeight: '600', display: 'inline-block' };
const signature = { fontSize: '16px', color: '#334155', margin: '32px 0 16px 0', lineHeight: '1.5' };
const psalm = { fontSize: '15px', color: '#64748b', fontStyle: 'italic', margin: '24px 0 0 0', padding: '16px', backgroundColor: '#f8fafc', borderLeft: '4px solid #059669', lineHeight: '1.6' };