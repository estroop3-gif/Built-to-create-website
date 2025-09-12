# QA Checklist - Email Signup

## Desktop Navigation
- [ ] Desktop nav shows "Join the Email List" button
- [ ] Desktop nav button is hidden when hamburger menu is visible
- [ ] Desktop nav button links to /subscribe
- [ ] Desktop nav maintains Register button alongside email list button

## Mobile Menu
- [ ] Mobile menu opens as full screen overlay
- [ ] No content clipping on very small screens
- [ ] Background scroll is locked when menu is open
- [ ] Tab order is trapped within the menu
- [ ] Focus returns to hamburger button on close
- [ ] Menu closes on Escape key
- [ ] Prominent "Join the Email List" button appears near top of menu links

## Subscribe Page Content
- [ ] Page shows the ten-lesson preview section
- [ ] Lesson preview uses bullet points (•) format
- [ ] All 10 lessons are listed with descriptions
- [ ] Trust copy "We never sell your data. You can unsubscribe any time." appears near form

## Form Functionality
- [ ] Form still validates email on client and server
- [ ] Form submits successfully as before
- [ ] Success handling and toasts work unchanged
- [ ] "Get My Free Gear Checklist" button text maintained

## Accessibility
- [ ] Mobile overlay has role="dialog" and aria-modal="true"
- [ ] Mobile overlay has proper aria-labelledby
- [ ] Nav buttons have discernible names
- [ ] Visible focus rings present on interactive elements
- [ ] Screen reader can navigate menu properly

## Visual Design
- [ ] Current page styling preserved
- [ ] No layout shifts or visual regressions
- [ ] Mobile menu backdrop blur effect working
- [ ] Colors and typography consistent with existing design