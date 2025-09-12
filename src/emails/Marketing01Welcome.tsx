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
    <MarketingBaseTemplate previewText="A mini workshop using AE/AF Lock, HDR, and the exposure slider">
      <Section>
        <Text style={paragraph}>
          Hey {firstName}
        </Text>
        
        <Heading style={h1}>Exposure you can trust on your phone</Heading>
        
        <Text style={verse}>
          <em>Psalm 119:105</em>
        </Text>
        
        <Heading as="h2" style={h2}>Why this matters</Heading>
        
        <Text style={paragraph}>
          You cannot shape meaning if you cannot control exposure. Your phone already has what you need to get reliable results in any light.
        </Text>
        
        <Heading as="h2" style={h2}>Tools already on your phone</Heading>
        
        <Text style={bulletList}>
          • AE AF Lock long press to lock focus and exposure<br/>
          • Exposure slider drag to brighten or darken after locking<br/>
          • HDR toggle or auto HDR preserves highlights when used wisely<br/>
          • Histogram or zebras if your camera app offers them optional
        </Text>
        
        <Heading as="h2" style={h2}>Two minute setup</Heading>
        
        <Text style={bulletList}>
          • Tap and hold on your subject to lock AE AF then adjust the exposure slider until the face has detail without shiny hotspots<br/>
          • If HDR is available leave it on when you have bright backgrounds and turn it off if it makes skin look flat during low contrast scenes<br/>
          • If your app supports zebras set them near ninety to warn of bright whites clipping
        </Text>
        
        <Heading as="h2" style={h2}>Targets you can trust without a meter</Heading>
        
        <Text style={bulletList}>
          • Faces should show pore level detail in the cheek highlight and never glow like plastic<br/>
          • White shirts should look white with visible folds not pure blank white<br/>
          • Shadows should hold texture when you lift your screen brightness down to normal
        </Text>
        
        <Heading as="h2" style={h2}>How to place faces with only your phone</Heading>
        
        <Text style={bulletList}>
          • Move the person into open shade or turn them so the brightest source is forty five degrees from camera<br/>
          • Lock AE AF on the cheek then slide exposure until the brightest spot on the face keeps detail<br/>
          • If the background is blowing out step sideways to hide the sun behind a tree sign or pillar and try again
        </Text>
        
        <Heading as="h2" style={h2}>Three fast scenarios</Heading>
        
        <Text style={paragraph}>
          <strong>Bright sun</strong><br/>
          • Put the sun behind the subject for a rim and expose for the face using AE AF Lock
        </Text>
        
        <Text style={paragraph}>
          <strong>Backlit window</strong><br/>
          • Step closer and fill the frame with the face lock and lower exposure until the cheeks hold texture
        </Text>
        
        <Text style={paragraph}>
          <strong>Night street</strong><br/>
          • Park the subject near a shop window or sign and keep the background dark rather than pushing ISO with the slider
        </Text>
        
        <Heading as="h2" style={h2}>Drill you can do today</Heading>
        
        <Text style={bulletList}>
          • Record the same ten second clip three times bright sun backlit window night street<br/>
          • In each clip use AE AF Lock and the exposure slider to protect the face<br/>
          • Play back with screen brightness at the middle setting and check for skin detail and controlled highlights
        </Text>
        
        <Heading as="h2" style={h2}>Common pitfalls</Heading>
        
        <Text style={bulletList}>
          • Riding exposure without locking first the meter will drift mid take<br/>
          • Judging only by a bright phone screen lower your screen brightness to center and reassess<br/>
          • Letting auto HDR flatten the scene use it to save windows but still set exposure for faces
        </Text>
        
        <Heading as="h2" style={h2}>About the trip</Heading>
        
        <Text style={paragraph}>
          Nine days in Costa Rica. Daily shoots. Morning devotions. Hands on workshops. You will create from presence and come home with work that carries weight.
        </Text>
        
        <Heading as="h2" style={h2}>What is coming next</Heading>
        
        <Text style={bulletList}>
          • Manual camera made simple<br/>
          • Anatomy of a lens and how to operate it<br/>
          • Lighting that serves the story<br/>
          • Sound basics<br/>
          • Editing basics<br/>
          • Color basics<br/>
          • Story building basics<br/>
          • Interviews that unlock truth<br/>
          • Faith and creativity<br/>
          • Final action plan
        </Text>
        
        <Heading as="h2" style={h2}>Action</Heading>
        
        <Text style={paragraph}>
          • Reply with a screenshot from today's drill and tell me which scenario challenged you most I will send feedback
        </Text>
        
        <Section style={buttonContainer}>
          <Button
            href={registerUrl}
            style={button}
          >
            Register for the Retreat
          </Button>
        </Section>
        
        <Text style={signature}>
          Support parker@thebtcp.com
        </Text>
        
        <Text style={psalm}>
          You can unsubscribe any time
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