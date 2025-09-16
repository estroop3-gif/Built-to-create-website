# The Experience Page Documentation

## Overview

The Experience page provides comprehensive information about the 9-day Costa Rica filmmaking retreat, including who it's for, what's included, and the mission behind the Born to Create Project.

## Page Details

- **Route**: `/experience`
- **Title**: "The Experience — Born to Create Project"
- **Meta Description**: "Discover The Experience: a 9-day Costa Rica filmmaking retreat designed to equip creators with hands-on training, community, and spiritual growth."
- **Location**: `src/app/experience/page.tsx`
- **Redirect**: Old route `/about-retreat` redirects to `/experience`

## Page Structure

### 1. Hero Section
- **Background**: Sage (light green texture)
- **Content**: Large headline "The Experience" with tagline
- **Typography**: Uses h1 with responsive sizing (4xl to 6xl)

### 2. Overview Section
- **Background**: White
- **Headline**: "A 9-Day Creative Pilgrimage in Costa Rica"
- **Content**: Two-paragraph description of the retreat experience
- **Focus**: Blends filmmaking, spiritual formation, and community

### 3. Who The Experience is For Section
- **Background**: Sand (light beige texture)
- **Layout**: Two-column grid on desktop, single column on mobile
- **Content**: Four target audience types with icons:
  - Aspiring Filmmakers (camera icon)
  - Intermediate Creators (check circle icon)
  - Faith-Driven Artists (heart icon)
  - Adventure Seekers (location icon)

### 4. What's Included Section
- **Background**: White
- **Layout**: Two-column checklist grid
- **Content**: 8 key features/inclusions with checkmark icons
- **Highlights**: Gear kit, projects, post-production series, devotionals

### 5. Visual Highlights Section
- **Background**: Cream (light texture)
- **Layout**: Three-column grid of cards
- **Content**: Professional Gear, Costa Rica Locations, Community
- **Style**: White cards with icons, shadows, and brief descriptions

### 6. Mission Section
- **Background**: Sage (light green texture)
- **Headline**: "More Than Just Filmmaking"
- **Content**: Core values and spiritual emphasis
- **Keywords**: Presence Over Performance, Eternal Impact, Spirit-Led Creativity

### 7. Call to Action Section
- **Background**: White
- **Content**: Two-button CTA with analytics tracking
- **Primary Button**: "Register Now" (links to `/register`)
- **Secondary Button**: "View FAQ" (links to `/faq`)

## Design System Compliance

### Typography
- **Headings**: `font-heading` class with bold weights
- **Body Text**: `text-ink-600` and `text-ink-700` for hierarchy
- **Sizing**: Responsive text sizing (3xl to 4xl for h2, xl to 2xl for large text)

### Layout
- **Sections**: Uses `Section` component with proper spacing and backgrounds
- **Container**: Maximum width constraints (4xl, 6xl) for content sections
- **Grid**: Responsive MD breakpoints for two/three column layouts

### Colors
- **Backgrounds**: Alternating white, sand, sage, cream for visual rhythm
- **Text**: Ink color palette for proper contrast
- **Accents**: Forest green for icons and highlights

### Components
- **Section**: Consistent spacing and background textures
- **Button**: Site's primary/secondary button styles
- **Icons**: SVG icons from Heroicons for consistency

## Analytics Integration

The page includes Google Analytics tracking for CTA interactions:

- **Register Button**: Triggers `experience_cta_register` event
- **FAQ Button**: Triggers `experience_cta_faq` event
- **Event Category**: `engagement`
- **Event Label**: `experience_page`

## Navigation Integration

### Main Navigation
- Added "The Experience" between "About" and "Itinerary"
- Responsive behavior matches other nav items
- Mobile hamburger menu includes the new link

### Footer
- Added "The Experience" to Company section (first item)
- Follows existing footer link styling and behavior

## Content Guidelines

### Tone
- Professional yet approachable
- Faith-forward without being exclusionary
- Emphasizes community and spiritual growth
- Clear value propositions for different audience types

### Key Messaging
- 9-day immersive experience in Costa Rica
- Blend of technical skills and spiritual formation
- Professional gear included (worth $2,800+)
- Community-focused with eternal perspective
- Hands-on learning with industry professionals

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy (h1, h2, h3)
- **Alt Text**: All decorative icons have appropriate context
- **Color Contrast**: Meets WCAG guidelines with ink/forest color palette
- **Keyboard Navigation**: All interactive elements are focusable
- **Screen Readers**: Logical content flow and structure

## Responsive Design

### Mobile (< 768px)
- Single column layouts
- Stacked grid items
- Smaller text sizing
- Full-width buttons

### Tablet (768px - 1024px)
- Two-column grids where appropriate
- Medium text sizing
- Balanced spacing

### Desktop (> 1024px)
- Full three-column layouts
- Largest text sizing
- Optimal spacing and proportions

## Content Management

### Updating Content
1. Edit the page component at `src/app/experience/page.tsx`
2. Modify text content directly in JSX
3. Update metadata in the file's metadata export
4. Test changes in development before deploying

### Adding Images
To add Costa Rica landscape or community photos:
1. Place images in `public/` directory
2. Add `<img>` tags with proper alt text
3. Consider using Next.js `Image` component for optimization
4. Maintain consistent styling with existing cards/sections

### Modifying Sections
- Each section uses the `Section` component with background options
- Icons can be replaced with different Heroicons
- Grid layouts can be adjusted by changing Tailwind classes
- Maintain alternating background pattern for visual rhythm

## SEO Optimization

- **Meta Title**: Descriptive and includes key terms
- **Meta Description**: Under 160 characters, compelling copy
- **Heading Structure**: Proper H1-H3 hierarchy
- **Content**: Rich, descriptive text about retreat offerings
- **Internal Links**: Links to Register and FAQ pages for site navigation

## Performance Considerations

- **Optimized Images**: Use Next.js Image component when adding photos
- **Minimal JavaScript**: Page is mostly static with only analytics tracking
- **CSS**: Uses Tailwind utility classes for efficient styling
- **Bundle Size**: Lightweight page with minimal external dependencies

## Future Enhancements

Consider adding:
- Photo gallery of Costa Rica locations
- Video testimonials from past participants
- Interactive map of retreat locations
- Detailed daily schedule breakdown
- Alumni success stories section