import { Text, Heading, Section, Button } from '@react-email/components';
import MarketingBaseTemplate from './MarketingBaseTemplate';

export default function Marketing08ColorBasics({ firstName = 'Friend', registerUrl = `${process.env.BASE_URL || 'https://thebtcp.com'}/register` }) {
  return (
    <MarketingBaseTemplate previewText="A simple pipeline you can repeat">
      <Section>
        <Heading style={h1}>Start with exposure, not looks</Heading>
        <Text style={verse}><em>"Come now, let us settle the matter. Though your sins are like scarlet, they shall be as white as snow; though they are red as crimson, they shall be like wool."</em> — Isaiah 1:18</Text>
        <Text style={paragraph}>Hello {firstName},</Text>
        <Text style={paragraph}>Color grading can make or break your story's emotional impact. But most beginners start with "looks" and end up with muddy, unnatural images. Today I'll show you the professional pipeline that ensures clean, consistent results every time.</Text>
        
        <Heading as="h2" style={h2}>The Professional Pipeline</Heading>
        <Text style={bulletList}>• <strong>Set white balance consistently in camera</strong> — Fix it at the source, not in post<br/>• <strong>Normalize exposure in primary correction</strong> — Get proper contrast and exposure first<br/>• <strong>Balance skin with vectorscope and parade</strong> — Skin tones are your anchor point<br/>• <strong>Add shaping with contrast and selective saturation</strong> — Enhance mood without destroying reality<br/>• <strong>Export a viewing LUT if needed</strong> — Maintain consistency across devices</Text>
        
        <Heading as="h2" style={h2}>Skin Tone is Sacred</Heading>
        <Text style={paragraph}>Everything else can be stylized, but skin tones must feel natural. Use the vectorscope to ensure skin falls along the proper flesh tone line. If skin looks wrong, nothing else in your image will feel right.</Text>
        
        <Heading as="h2" style={h2}>This Week's Practice</Heading>
        <Text style={bulletList}>• Grade a closeup portrait to natural skin, then build mood with contrast only<br/>• Check your work on phone, laptop, and TV if available<br/>• Study three films and identify their color schemes<br/>• Practice white balance correction until it becomes instinctive</Text>
        
        <Section style={buttonContainer}>
          <Button href={registerUrl} style={button}>Master Professional Grading in Costa Rica</Button>
        </Section>
        
        <Text style={signature}>Painting with pixels,<br/>Parker</Text>
        <Text style={psalm}>"He has made everything beautiful in its time." — Ecclesiastes 3:11</Text>
      </Section>
    </MarketingBaseTemplate>
  );
}

const h1 = { fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 24px 0', lineHeight: '1.2' };
const h2 = { fontSize: '22px', fontWeight: '600', color: '#1e293b', margin: '32px 0 16px 0', lineHeight: '1.3' };
const paragraph = { fontSize: '16px', color: '#334155', lineHeight: '1.7', margin: '0 0 16px 0' };
const verse = { fontSize: '15px', color: '#64748b', fontStyle: 'italic', margin: '0 0 24px 0', padding: '16px', backgroundColor: '#f8fafc', borderLeft: '4px solid #059669', lineHeight: '1.6' };
const bulletList = { fontSize: '16px', color: '#334155', lineHeight: '1.7', margin: '0 0 16px 0' };
const buttonContainer = { textAlign: 'center' as const, margin: '40px 0' };
const button = { backgroundColor: '#059669', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', fontWeight: '600', display: 'inline-block' };
const signature = { fontSize: '16px', color: '#334155', margin: '32px 0 16px 0', lineHeight: '1.5' };
const psalm = { fontSize: '15px', color: '#64748b', fontStyle: 'italic', margin: '24px 0 0 0', padding: '16px', backgroundColor: '#f8fafc', borderLeft: '4px solid #059669', lineHeight: '1.6' };