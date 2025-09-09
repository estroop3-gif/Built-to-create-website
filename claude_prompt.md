I am building a website called Built to Create, a filmmaking and storytelling retreat. Generate the initial site structure and design in Next.js with Tailwind CSS, styled similar to Parks Project’s clean, outdoor, nature-inspired vibe.

Scope
• Use App Router. Organize code under src/app and src/components.
• Create pages: Home, About, Schedule, Register.
• Create shared components: NavBar, Footer, Button, Section, Hero.
• Add a responsive layout with sensible spacing, clean typography, and accessible color contrast.

Content and structure
Home
• Hero with headline: “Where creativity meets calling”
• Subheadline: “A retreat for filmmakers, photographers, and storytellers to refine craft and encounter purpose”
• CTA buttons: “Join the Retreat” linking to /register and “Explore Schedule” linking to /schedule
• 3 feature cards about presence, community, and excellence
• Testimonial placeholder
• Simple newsletter signup section

About
• Mission and Vision sections with full-bleed image placeholders
• Short paragraph on the retreat experience and outcomes
• Two-column block with copy and image

Schedule
• 5-day grid or timeline with sample blocks for workshops, shoots, devotionals, and review sessions
• Each item has title, time, short description

Register
• Form with name, email, phone, questions
• Submit handler stub and success state
• Payment placeholder section with a note to integrate Stripe later

Design direction
• Neutral earthy palette: greens, sand, off-black
• Clean sans serif fonts
• Rounded buttons with subtle hover transitions
• Subtle paper or fabric texture background option
• Card components with soft shadow and rounded corners
• Mobile-first responsive behavior

Implementation details
• Create Tailwind-styled components
• Use metadata exports for SEO titles and descriptions
• Wire up NavBar links: Home, About, Schedule, Register
• Footer with social icon placeholders and copyright
• Add simple form validation for required fields
• Provide example content for schedule blocks

Deliverables
• src/app/layout.tsx
• src/app/page.tsx
• src/app/about/page.tsx
• src/app/schedule/page.tsx
• src/app/register/page.tsx
• src/components/NavBar.tsx
• src/components/Footer.tsx
• src/components/Hero.tsx
• src/components/Button.tsx
• src/components/Section.tsx
• Any needed utility files or styles

Please output complete file contents ready to be pasted in, including imports. Use Tailwind classes throughout.
