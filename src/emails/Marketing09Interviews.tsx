import { Text, Heading, Section, Button } from '@react-email/components';
import MarketingBaseTemplate from './MarketingBaseTemplate';

export default function Marketing09Interviews({ firstName = 'Friend', registerUrl = `${process.env.BASE_URL || 'https://thebtcp.com'}/register` }) {
  return (
    <MarketingBaseTemplate previewText="Questions that go below the surface">
      <Section>
        <Heading style={h1}>Draw the deep water</Heading>
        <Text style={verse}><em>"The purposes of a person's heart are deep waters, but one who has insight draws them out."</em> — Proverbs 20:5</Text>
        <Text style={paragraph}>Hello {firstName},</Text>
        <Text style={paragraph}>Great interviews reveal character, not just information. Today I'll show you how to ask questions that unlock authentic stories and create moments that move your audience.</Text>
        
        <Heading as="h2" style={h2}>Interview Preparation</Heading>
        <Text style={bulletList}>• <strong>Build a ladder from easy memory to risk and reflection</strong> — Start safe, go deeper gradually<br/>• <strong>Ask for stories, not opinions</strong> — "Tell me about a time when..." not "What do you think about..."<br/>• <strong>Sit in silence after answers</strong> — The second answer is often the gold<br/>• <strong>Follow up with specifics</strong> — "What did that look like?" "How did that feel?"</Text>
        
        <Heading as="h2" style={h2}>Technical Setup</Heading>
        <Text style={bulletList}>• <strong>Framing:</strong> Short side with negative space for contemplation<br/>• <strong>Eye line:</strong> Just off lens, not directly into camera<br/>• <strong>Depth:</strong> Shallow to isolate subject from distractions<br/>• <strong>B-roll ready:</strong> Keep cutaway shots handy for editing</Text>
        
        <Heading as="h2" style={h2}>Questions That Work</Heading>
        <Text style={paragraph}>These prompts consistently produce authentic, emotional responses:</Text>
        <Text style={bulletList}>• "Tell me about the moment you first realized..."<br/>• "What's something you wish people understood about..."<br/>• "Describe what it was like before and after..."<br/>• "If you could tell your younger self one thing..."<br/>• "What would you want people to remember about..."</Text>
        
        <Heading as="h2" style={h2}>This Week's Assignment</Heading>
        <Text style={bulletList}>• Write five prompts that cannot be answered with yes or no<br/>• Record a five-minute practice interview with someone you trust<br/>• Focus on listening, not your next question<br/>• Practice comfortable silence after responses</Text>
        
        <Section style={buttonContainer}>
          <Button href={registerUrl} style={button}>Interview Real People in Costa Rica</Button>
        </Section>
        
        <Text style={signature}>Drawing deep waters,<br/>Parker</Text>
        <Text style={psalm}>"Let your conversation be always full of grace, seasoned with salt." — Colossians 4:6</Text>
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