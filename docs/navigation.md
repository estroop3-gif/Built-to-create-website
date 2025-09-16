# Navigation System Documentation

## Overview

The Born to Create Project website uses an always-hamburger navigation pattern across all viewport sizes. This provides a consistent user experience and keeps the header clean while maintaining accessibility.

## Architecture

### Components

- **`src/components/site/NavBar.tsx`** - Main header component with logo, CTA, and hamburger button
- **`src/components/site/MobileDrawer.tsx`** - Slide-out navigation drawer with full accessibility support
- **`src/components/site/HeaderCTA.tsx`** - Reusable "Join the Email List" CTA component
- **`src/lib/navigation.ts`** - Centralized navigation data (NAV_ITEMS)

### Navigation Data

All navigation items are centrally managed in `src/lib/navigation.ts`:

```typescript
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "The Experience", href: "/experience" },
  { label: "Itinerary", href: "/itinerary" },
  { label: "Pricing", href: "/pricing" },
  { label: "Packing", href: "/packing" },
  { label: "Travel", href: "/travel" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
];
```

## Responsive Behavior

### Desktop & Tablet (≥640px)
- **Left**: Site logo
- **Right**: "Join the Email List" CTA + Hamburger button
- All page navigation links are inside the drawer only

### Phone (<640px)
- **Left**: Site logo
- **Right**: Hamburger button only
- "Join the Email List" CTA appears as the first item in the drawer
- "Register Now" button appears at the bottom of the drawer

## CTA Behavior

The "Join the Email List" CTA follows a responsive pattern:

- **Desktop/Tablet**: Shows in header bar (outside drawer)
- **Phone**: Shows as first item inside drawer
- Uses the same component (`HeaderCTA`) with identical styling
- Never appears in both locations simultaneously

## Accessibility Features

### Keyboard Navigation
- **Tab**: Navigate to hamburger button
- **Enter/Space**: Open/close drawer
- **Tab**: Navigate through drawer items when open
- **Shift+Tab**: Navigate backwards
- **Escape**: Close drawer and return focus to hamburger

### Screen Reader Support
- Hamburger button has `aria-expanded` state
- Drawer uses `role="dialog"` and `aria-modal="true"`
- Drawer labeled via `aria-labelledby` pointing to visible "Menu" heading
- Active page marked with `aria-current="page"`
- Focus indicators for all interactive elements

### Focus Management
- Focus traps within drawer when open
- Returns focus to hamburger button when drawer closes
- Strong visual focus indicators throughout
- First focusable element (close button) receives focus on open

### Motion & Animation
- Respects `prefers-reduced-motion` for drawer transitions
- Short, unobtrusive slide-in animation from right
- Smooth backdrop blur effect

### Body Scroll Lock
- Prevents background scrolling when drawer is open
- Restored when drawer closes or on component unmount

## Analytics Integration

### Event Tracking
- **`header_menu_open`** - Fired when hamburger opens drawer
- **`header_menu_close`** - Fired when drawer closes (any method)
- **`header_cta_click`** - Fired when header CTA is clicked
- **`header_link_click`** - Fired when navigation link is clicked in drawer
  - Includes `path` parameter with destination URL

### Event Categories
- **Navigation events**: `event_category: 'navigation'`
- **CTA events**: `event_category: 'engagement'`

## Adding New Pages

To add a new page to the navigation:

1. **Add to NAV_ITEMS** in `src/lib/navigation.ts`:
   ```typescript
   { label: "New Page", href: "/new-page" }
   ```

2. **Consider placement** - items appear in the order defined in the array

3. **Test accessibility** - ensure new links work with keyboard navigation and screen readers

## Maintenance

### Updating Navigation Order
Modify the `NAV_ITEMS` array in `src/lib/navigation.ts`. Changes will automatically apply to the drawer.

### Updating CTA
- **Text/Link**: Modify `HeaderCTA` component
- **Styling**: Update classes in `HeaderCTA` (shared between header and drawer)
- **Analytics**: Update event names in both `HeaderCTA` and `MobileDrawer`

### Accessibility Testing
- Test keyboard-only navigation
- Verify screen reader announcements
- Check focus indicators in all browsers
- Test with various assistive technologies

## Browser Support

- **Modern browsers**: Full feature support including backdrop-filter
- **Older browsers**: Graceful degradation (solid background instead of blur)
- **Motion sensitivity**: Respects user preferences for reduced motion

## Performance Considerations

- Drawer uses `visibility` and `opacity` for smooth transitions
- Focus trap only activates when drawer is open
- Analytics events are debounced to prevent spam
- Component unmounting properly cleans up event listeners and body styles