import { Text, Heading, Section, Button } from '@react-email/components';
import MarketingBaseTemplate from './MarketingBaseTemplate';

interface Marketing04StoryBasicsProps {
  firstName?: string;
  registerUrl?: string;
}

export default function Marketing04StoryBasics({ 
  firstName = 'Friend',
  registerUrl = `${process.env.BASE_URL || 'https://thebtcp.com'}/register`
}: Marketing04StoryBasicsProps) {
  return (
    <MarketingBaseTemplate previewText="A simple structure you can shoot today">
      <Section>
        <Heading style={h1}>Build a spine before you shoot</Heading>
        
        <Text style={verse}>
          <em>"Write down the revelation and make it plain on tablets so that a herald may run with it."</em> — Habakkuk 2:2
        </Text>
        
        <Text style={paragraph}>
          Hello {firstName},
        </Text>
        
        <Text style={paragraph}>
          Great cinematography serves great storytelling. You can have perfect exposure, flawless focus, and gorgeous bokeh—but if your story doesn't work, none of it matters. Today I'm going to give you a bulletproof structure that works for any story, from 30-second testimonies to feature documentaries.
        </Text>
        
        <Heading as="h2" style={h2}>The Universal Story Framework</Heading>
        
        <Text style={paragraph}>
          Every compelling story answers these three questions:
        </Text>
        
        <Text style={bulletList}>
          • <strong>Who wants what and why now?</strong> — Character, goal, and urgency<br/>
          • <strong>What stands in the way?</strong> — Obstacles, conflict, tension<br/>
          • <strong>What changes by the end?</strong> — Transformation, resolution, new normal
        </Text>
        
        <Text style={paragraph}>
          This works whether you're documenting a missions trip, filming a church testimony, or creating a fundraising video. The structure scales from 30 seconds to 30 minutes.
        </Text>
        
        <Heading as="h2" style={h2}>Beat Plan for Short-Form Documentary</Heading>
        
        <Text style={paragraph}>
          Here's how to structure a 3-5 minute piece that actually impacts viewers:
        </Text>
        
        <Section style={beatBox}>
          <Heading as="h3" style={h3}>1. Open on Intention</Heading>
          <Text style={beatText}>
            Lead with a compelling visual paired with a single line of truth. Don't waste time with slow builds—hook them immediately with why this story matters.
          </Text>
        </Section>
        
        <Section style={beatBox}>
          <Heading as="h3" style={h3}>2. Rising Tension</Heading>
          <Text style={beatText}>
            Reveal the problem, challenge, or need. This is what your subject is up against. Without conflict, there's no story—just footage.
          </Text>
        </Section>
        
        <Section style={beatBox}>
          <Heading as="h3" style={h3}>3. Decision Point</Heading>
          <Text style={beatText}>
            Show the moment when the cost becomes clear. What will it take to overcome the challenge? This is where we see character revealed.
          </Text>
        </Section>
        
        <Section style={beatBox}>
          <Heading as="h3" style={h3}>4. Resolution</Heading>
          <Text style={beatText}>
            End with visible change. Don't just tell us what happened—show us the new normal. What's different now?
          </Text>
        </Section>
        
        <Heading as="h2" style={h2}>Coverage Checklist</Heading>
        
        <Text style={paragraph}>
          For every story, make sure you capture:
        </Text>
        
        <Text style={bulletList}>
          • <strong>Establishing shots with meaning</strong> — Context that serves the story, not just pretty visuals<br/>
          • <strong>Character action in close and wide</strong> — Show them doing, not just talking<br/>
          • <strong>Cutaways that advance narrative</strong> — Details that reveal character or advance the plot<br/>
          • <strong>Reaction shots</strong> — How others respond tells us about impact<br/>
          • <strong>Hands and objects</strong> — What people hold and touch reveals their heart
        </Text>
        
        <Heading as="h2" style={h2}>The Ministry Application</Heading>
        
        <Text style={paragraph}>
          Christian storytelling isn't about manipulation—it's about revelation. We're documenting God's work that's already happening. Our job is to structure it in a way that helps others see clearly.
        </Text>
        
        <Text style={paragraph}>
          In Costa Rica, you'll be documenting real ministry happening in real time. Having a clear story framework means you'll know exactly what shots to prioritize when moments unfold quickly.
        </Text>
        
        <Heading as="h2" style={h2}>This Week's Practice</Heading>
        
        <Text style={bulletList}>
          • Write a one-sentence logline for a story in your own life<br/>
          • Build a six-shot list that proves the change from beginning to end<br/>
          • Film a 60-second story using only those six shots<br/>
          • Watch it back—does it work without explanation?
        </Text>
        
        <Text style={paragraph}>
          Don't overthink it. Pick something simple: making coffee, helping a neighbor, solving a small problem. The framework works at any scale.
        </Text>
        
        <Section style={calloutBox}>
          <Text style={calloutText}>
            <strong>Pro tip:</strong> If you can't explain your story in one sentence, you don't have a story yet—you have footage. Keep refining until the spine is crystal clear.
          </Text>
        </Section>
        
        <Section style={buttonContainer}>
          <Button
            href={registerUrl}
            style={button}
          >
            Document Real Stories in Costa Rica
          </Button>
        </Section>
        
        <Text style={paragraph}>
          Next week: Lighting fundamentals. Because even the best story needs to be seen clearly to have maximum impact.
        </Text>
        
        <Text style={signature}>
          Structuring for impact,<br/>
          Parker
        </Text>
        
        <Text style={psalm}>
          "Plans are established by counsel; by wise guidance wage war." — Proverbs 20:18
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
const beatBox = { backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', margin: '0 0 16px 0', borderLeft: '4px solid #0ea5e9' };
const beatText = { fontSize: '15px', color: '#475569', margin: '0', lineHeight: '1.6' };
const calloutBox = { backgroundColor: '#fef3c7', padding: '16px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #f59e0b' };
const calloutText = { fontSize: '15px', color: '#92400e', margin: '0', lineHeight: '1.6' };
const buttonContainer = { textAlign: 'center' as const, margin: '40px 0' };
const button = { backgroundColor: '#059669', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', fontWeight: '600', display: 'inline-block' };
const signature = { fontSize: '16px', color: '#334155', margin: '32px 0 16px 0', lineHeight: '1.5' };
const psalm = { fontSize: '15px', color: '#64748b', fontStyle: 'italic', margin: '24px 0 0 0', padding: '16px', backgroundColor: '#f8fafc', borderLeft: '4px solid #059669', lineHeight: '1.6' };