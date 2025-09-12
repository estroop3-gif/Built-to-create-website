import { Text, Heading, Section, Button } from '@react-email/components';
import MarketingBaseTemplate from './MarketingBaseTemplate';

export default function Marketing10FaithAndAction({ firstName = 'Friend', registerUrl = `${process.env.BASE_URL || 'https://thebtcp.com'}/register` }) {
  return (
    <MarketingBaseTemplate previewText="Bold creativity begins with obedience">
      <Section>
        <Heading style={h1}>It is time to step out in faith</Heading>
        <Text style={verse}><em>"You are the light of the world. A town built on a hill cannot be hidden. Neither do people light a lamp and put it under a bowl. Instead they put it on its stand, and it gives light to everyone in the house. In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven."</em> — Matthew 5:14-16</Text>
        <Text style={verse}><em>"I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing."</em> — John 15:5</Text>
        
        <Text style={paragraph}>Hello {firstName},</Text>
        
        <Text style={paragraph}>Over the past nine weeks, I've shared the technical foundations of professional filmmaking. But technique without calling is just craft. Today I want to talk about the intersection of skill and obedience—where your creativity becomes ministry.</Text>
        
        <Heading as="h2" style={h2}>You Are Not Waiting on Perfect Conditions</Heading>
        <Text style={paragraph}>You are stewarding a call. The technical skills I've taught you are tools for Kingdom work, not ends in themselves. God meets you in motion, not in preparation.</Text>
        
        <Text style={paragraph}>The stories around you—in your church, your community, your family—are waiting for someone with both the heart to see and the skill to capture them well. That someone is you.</Text>
        
        <Heading as="h2" style={h2}>What Costa Rica Offers</Heading>
        <Text style={paragraph}>February 20–28, 2026, isn't just about improving your technique. It's about stepping into the fullness of your creative calling alongside others who understand that art and ministry aren't separate categories.</Text>
        
        <Text style={bulletList}>• <strong>Advanced technical training</strong> with professional equipment in stunning locations<br/>• <strong>Real ministry documentation</strong> that serves ongoing Kingdom work<br/>• <strong>Community with other called creatives</strong> who will become lifelong collaborators<br/>• <strong>Spiritual formation</strong> that aligns your gifts with God's heart<br/>• <strong>Completed work</strong> that you'll use for years to open doors</Text>
        
        <Heading as="h2" style={h2}>Before You Go</Heading>
        <Text style={paragraph}>Whether you join us in Costa Rica or continue growing where you are, here's what I want you to commit to:</Text>
        
        <Text style={bulletList}>• <strong>Pick one story to finish this month</strong> — Apply everything you've learned to complete one meaningful project<br/>• <strong>Book the retreat or set a decision deadline</strong> — Don't let indecision rob you of clarity<br/>• <strong>Tell one friend about your creative calling</strong> — You weren't meant to walk this path alone</Text>
        
        <Heading as="h2" style={h2}>Your Next Step</Heading>
        <Text style={paragraph}>I want to hear from you. Reply to this email with:</Text>
        <Text style={bulletList}>• Your one-sentence logline for the story you're going to finish<br/>• One specific way you want to grow as a visual storyteller<br/>• Whether you're ready to join us in Costa Rica</Text>
        
        <Text style={paragraph}>I read every response personally and often reply with specific guidance for your situation.</Text>
        
        <Section style={urgencyBox}>
          <Heading as="h3" style={h3}>Costa Rica Registration Closes Soon</Heading>
          <Text style={urgencyText}>We're accepting applications for the February 2026 retreat now. Spots are limited to ensure personalized attention and strong community. Early registration includes bonus pre-trip training and equipment consultations.</Text>
        </Section>
        
        <Section style={buttonContainer}>
          <Button href={registerUrl} style={button}>Register for Costa Rica Today</Button>
        </Section>
        
        <Text style={paragraph}>Your creative calling isn't a someday thing. It's a right now thing. The technical skills are just the beginning—the real work is using them to shine light in dark places and tell stories that matter for eternity.</Text>
        
        <Text style={signature}>Ready to create with purpose,<br/>Parker Winder<br/><em>Born to Create Project</em></Text>
        
        <Text style={psalm}>"Commit to the Lord whatever you do, and he will establish your plans." — Proverbs 16:3</Text>
      </Section>
    </MarketingBaseTemplate>
  );
}

const h1 = { fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 24px 0', lineHeight: '1.2' };
const h2 = { fontSize: '22px', fontWeight: '600', color: '#1e293b', margin: '32px 0 16px 0', lineHeight: '1.3' };
const h3 = { fontSize: '18px', fontWeight: '600', color: '#dc2626', margin: '0 0 8px 0' };
const paragraph = { fontSize: '16px', color: '#334155', lineHeight: '1.7', margin: '0 0 16px 0' };
const verse = { fontSize: '15px', color: '#64748b', fontStyle: 'italic', margin: '0 0 16px 0', padding: '16px', backgroundColor: '#f8fafc', borderLeft: '4px solid #059669', lineHeight: '1.6' };
const bulletList = { fontSize: '16px', color: '#334155', lineHeight: '1.7', margin: '0 0 16px 0' };
const urgencyBox = { backgroundColor: '#fef2f2', padding: '20px', borderRadius: '8px', margin: '32px 0', border: '2px solid #dc2626' };
const urgencyText = { fontSize: '16px', color: '#7f1d1d', margin: '0', lineHeight: '1.6' };
const buttonContainer = { textAlign: 'center' as const, margin: '40px 0' };
const button = { backgroundColor: '#dc2626', color: '#ffffff', padding: '16px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '18px', fontWeight: '700', display: 'inline-block' };
const signature = { fontSize: '16px', color: '#334155', margin: '32px 0 16px 0', lineHeight: '1.5' };
const psalm = { fontSize: '15px', color: '#64748b', fontStyle: 'italic', margin: '24px 0 0 0', padding: '16px', backgroundColor: '#f8fafc', borderLeft: '4px solid #059669', lineHeight: '1.6' };