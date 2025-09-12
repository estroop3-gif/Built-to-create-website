# Vision Workshop Page Setup

## Overview

The `/vision` route is a token-gated workshop page titled "Our Vision for Creators" designed for Email 2 of the sequence. It provides a comprehensive workshop experience for filmmakers and storytellers.

## Generating Signed Links for Email 2

To create a tokenized link for the vision workshop page, use the existing `linkFor` helper:

```typescript
import { linkFor } from '@/lib/linkToken';

// Generate link for a specific lead
const visionUrl = await linkFor('/vision', 'leadId123');
// Returns: https://thebtcp.com/vision?t=<signed-token>

// For email templates, you can use:
const visionUrl = await linkFor('/vision', leadId);
```

## Usage in Email Templates

Add this to your Email 2 template:

```typescript
const workshopLink = await linkFor('/vision', leadId);

// In your email JSX:
<a href={workshopLink}>
  Access Your Workshop: Our Vision for Creators
</a>
```

## Page Features

- **Token Protection**: HMAC-SHA256 signed tokens with 30-day expiration
- **SEO Exclusion**: `noindex, nofollow` meta tags and X-Robots-Tag header
- **UTM Preservation**: Maintains existing UTM parameters while adding defaults
- **Analytics Tracking**: Google Analytics events for page views and CTA clicks
- **Conditional Back Button**: Appears only when referred from gear checklist
- **Responsive Design**: Clean, minimal layout with Tailwind CSS

## UTM Parameters

The register CTA preserves existing UTMs and adds these defaults:
- `utm_source=email`
- `utm_medium=crm`
- `utm_campaign=retreat_seq`
- `utm_content=learn_vision`

## Security & Access Control

- Server-side token validation
- 404 responses for invalid/missing tokens (no redirects)
- X-Robots-Tag header set by middleware
- No caching due to personalization

## Testing

```bash
# Generate a test token (requires BORN_TO_CREATE_LINK_SECRET)
const testToken = await signToken('lead:test@example.com');
console.log(`http://localhost:3000/vision?t=${testToken}`);
```

The page will only be accessible with valid tokens and includes all workshop content as specified.