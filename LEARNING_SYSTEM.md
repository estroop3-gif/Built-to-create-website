# Born to Create Project - Learning System

## Overview

The Born to Create Project learning system provides token-gated, unlisted educational content for subscribers. This system delivers comprehensive filmmaking education through structured learning paths while maintaining security and personalization.

## Architecture

### Token-Based Authentication
- **HMAC-SHA256** signed tokens using Web Crypto API
- **30-day expiration** with timing-safe verification
- **Payload format**: `lead:email@example.com` or `lead:leadId`
- **Base64URL encoding** for clean URLs

### Page Structure
```
/vision                 - Mission, values, and Costa Rica overview
/learn/manual-mode     - Camera controls and exposure triangle
/learn/lenses          - Focal length selection and storytelling
/learn/exposure        - Light reading and exposure techniques  
/learn/composition     - Visual storytelling and cinematic rules
/learn/editing         - Post-production workflow and techniques
/learn/lighting        - Natural light mastery and modifiers
```

### Components

#### `LearnLayout` (Shared)
- **Navigation**: Sidebar with progress tracking
- **Analytics**: Automatic page view and CTA tracking
- **CTAs**: UTM-preserving calls to action
- **Personalization**: Shows user email when available

#### Page Components
- **Server-side token validation** on all pages
- **SEO exclusion** via `noindex, nofollow` meta tags
- **Responsive design** with forest/sage color scheme
- **Faith integration** sections in every lesson

## Technical Implementation

### Middleware (`middleware.ts`)
```typescript
// Validates tokens for learning paths
matcher: ['/resources/gear-checklist', '/vision', '/learn/:path*']
```

### Link Generation (`linkToken.ts`)
```typescript
// Generate tokenized links
await linkFor('/vision', 'user@example.com')
// Returns: https://thebtcp.com/vision?t=<signed-token>
```

### Security Features
- **Server-side validation** prevents client-side token manipulation
- **Timing-safe comparison** prevents timing attacks
- **Environment-based secrets** (BORN_TO_CREATE_LINK_SECRET)
- **Automatic 404s** for invalid/expired tokens

## Content Structure

### Learning Progression
1. **Vision** - Establishes mission and motivation
2. **Manual Mode** - Foundation: exposure triangle mastery
3. **Lenses** - Creative tool selection and psychology
4. **Exposure** - Light reading and technical control
5. **Composition** - Visual storytelling principles
6. **Editing** - Post-production workflow and polish
7. **Lighting** - Natural light mastery for Costa Rica

### Educational Elements
- **Practical examples** for each technique
- **Common scenarios** (interviews, B-roll, etc.)
- **Practice exercises** with actionable challenges
- **Faith integration** connecting technique to purpose
- **Progressive complexity** building from basics

## Analytics Integration

### Tracked Events
- `learn_page_view` - Page visits with titles and slugs
- `learn_cta_click` - Registration button clicks
- **UTM preservation** - Maintains source attribution through journey

### Data Points
```javascript
gtag('event', 'learn_page_view', {
  event_category: 'engagement',
  event_label: 'manual-mode',
  page_title: 'Manual Mode Mastery'
});
```

## Email Integration

### Tokenized Links in Templates
Use the `linkFor` helper to generate secure links:

```typescript
// In email templates
const visionUrl = await linkFor('/vision', subscriber.email);
const manualModeUrl = await linkFor('/learn/manual-mode', subscriber.email);
```

### Recommended Email Flow
1. **Welcome series** → Vision page
2. **Technical lessons** → Individual /learn/ pages  
3. **Gear preparation** → Checklist page
4. **Final CTA** → Registration with preserved UTMs

## Development Notes

### Adding New Pages
1. Create page component with token validation
2. Add to `LearnLayout` navigation array
3. Update middleware matcher if needed
4. Include analytics tracking
5. Test token validation thoroughly

### Content Guidelines
- **Practical focus** - Every concept needs application
- **Progressive difficulty** - Build complexity gradually
- **Faith integration** - Connect technique to purpose
- **Visual examples** - Describe camera settings and scenarios
- **Action items** - Include practice exercises

### Design Consistency
- **Color scheme**: Forest primary, sage secondary, ink text
- **Typography**: Headings with emojis, clear hierarchy
- **Layout**: Prose width with sidebar navigation
- **CTAs**: Forest buttons with hover states

## Security Considerations

### Token Handling
- Tokens expire after 30 days automatically
- Invalid tokens return 404 (not 401) to avoid enumeration
- Middleware validation prevents direct page access
- Base64URL encoding handles special characters safely

### Environment Variables
```bash
BORN_TO_CREATE_LINK_SECRET=<256-bit-hex-string>
NODE_ENV=production # Affects base URLs
```

### Best Practices
- Never log tokens or payloads
- Use HTTPS in production (automatic with Vercel)
- Rotate signing secrets periodically
- Monitor for unusual access patterns

## Performance Optimization

### Server Components
- All pages use server-side token validation
- Reduces client-side JavaScript
- Better SEO (though pages are noindex)
- Faster initial page loads

### Caching Strategy
- Pages are not cached due to personalization
- Static assets cached normally
- Token validation is fast (HMAC verification)

## Testing

### Manual Testing
```bash
# Generate test token (requires valid secret)
const token = await signToken('lead:test@example.com');
console.log(`/vision?t=${token}`);
```

### Automated Testing
- Test token expiration handling
- Verify 404s for invalid tokens  
- Check analytics firing
- Validate responsive design
- Test all navigation links

## Deployment Checklist

### Environment Setup
- [ ] `BORN_TO_CREATE_LINK_SECRET` configured
- [ ] Google Analytics ID set
- [ ] Domain whitelist verified

### Page Validation
- [ ] All pages load with valid tokens
- [ ] Invalid tokens return 404
- [ ] Navigation works between pages
- [ ] CTAs preserve UTM parameters
- [ ] Analytics events fire correctly

### Email Integration
- [ ] Welcome series includes tokenized links
- [ ] Links work across email clients
- [ ] Token expiration communicates clearly
- [ ] Fallback for expired tokens

## Future Enhancements

### Potential Features
- **Progress tracking** - Save completion status
- **Downloadable resources** - PDF guides, checklists
- **Video integration** - Embedded tutorials
- **Discussion forums** - Community interaction
- **Mobile app** - Offline access

### Scaling Considerations
- **Database storage** - Track user progress
- **CDN integration** - Faster global delivery  
- **A/B testing** - Optimize conversion rates
- **Advanced analytics** - Completion tracking

---

This learning system provides secure, personalized education that guides subscribers from technical foundations through creative mastery, culminating in registration for the Costa Rica experience.