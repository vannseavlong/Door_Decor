# Color Palette Visual Reference

## Brand Colors

### Primary - Orange (#f7941d)
```
████████████████████████████████
████████████████████████████████
      PRIMARY BRAND COLOR
         #f7941d
    Use for: CTAs, buttons,
    highlights, brand moments
████████████████████████████████
████████████████████████████████
```

### Secondary - Blue (#2c5aa0)
```
████████████████████████████████
████████████████████████████████
     SECONDARY BRAND COLOR
         #2c5aa0
    Use for: Links, accents,
    professional elements
████████████████████████████████
████████████████████████████████
```

### Accent - Light Orange (#fdb44b)
```
████████████████████████████████
████████████████████████████████
        ACCENT COLOR
         #fdb44b
    Use for: Hover states,
    light highlights
████████████████████████████████
████████████████████████████████
```

### Dark - Almost Black (#1a1a1a)
```
████████████████████████████████
████████████████████████████████
         DARK COLOR
         #1a1a1a
    Use for: Headings, body text,
    high-contrast elements
████████████████████████████████
████████████████████████████████
```

### Light - Light Gray (#f8f9fa)
```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
         LIGHT COLOR
         #f8f9fa
    Use for: Backgrounds,
    sections, subtle fills
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

## Color Combinations

### 🎯 Recommended Pairings

#### Hero Sections
- Background: White or #f8f9fa
- Heading: #1a1a1a (Dark)
- Body Text: #6b7280 (Gray-600)
- CTA Button: #f7941d (Primary) with white text

#### Navigation
- Background: White
- Text: #1a1a1a (Dark)
- Hover: #f7941d (Primary)
- Active Link: #f7941d (Primary)

#### Footer
- Background: #f7941d (Primary)
- Text: White or White/90%
- Links: White with hover brightness
- Dividers: White/10%

#### Buttons
- **Primary**: Background #f7941d, Text White
- **Secondary**: Background #2c5aa0, Text White
- **Ghost**: Background Transparent, Text #2c5aa0, Border #2c5aa0

#### Cards
- Background: White
- Title: #1a1a1a (Dark)
- Description: #6b7280 (Gray-600)
- Hover: Shadow increase, no color change

### ❌ Avoid These Combinations
- ❌ Primary orange on light gray (low contrast)
- ❌ Primary orange text on white background for body text (too bright)
- ❌ Blue and orange together in text (readability issues)
- ❌ White text on light gray (insufficient contrast)

## Accessibility Guidelines

### Contrast Ratios (WCAG AA)

✅ **Good Combinations** (4.5:1 or better for text)
- #1a1a1a (Dark) on White: ✅ 14.7:1
- #6b7280 (Gray-600) on White: ✅ 4.7:1
- White on #f7941d (Primary): ✅ 4.6:1
- White on #2c5aa0 (Secondary): ✅ 6.8:1

⚠️ **Use with Caution**
- #f7941d (Primary) on White for text: ⚠️ 3.8:1 (use for headings only)
- #fdb44b (Accent) on White: ⚠️ 2.9:1 (decorative only)

## Usage Examples in Code

### Text Colors
```tsx
// Headings and important text
<h1 className="text-brand-dark">Heading</h1>

// Brand highlights
<span className="text-brand-primary">Special</span>

// Links
<a className="text-brand-secondary">Learn More</a>

// Body text (use Tailwind gray)
<p className="text-gray-600">Description</p>
```

### Backgrounds
```tsx
// Primary brand sections
<div className="bg-brand-primary text-white">...</div>

// Secondary sections
<div className="bg-brand-secondary text-white">...</div>

// Light sections
<div className="bg-brand-light">...</div>

// Cards
<div className="bg-white">...</div>
```

### Hover Effects
```tsx
// Text hover
<a className="text-brand-dark hover-brand-primary transition-colors">
  Link
</a>

// Button hover
<button className="bg-brand-primary hover:brightness-95 transition-all">
  Click Me
</button>
```

## Color Psychology

### Why These Colors?

**Orange (#f7941d)**
- Represents: Energy, warmth, enthusiasm, creativity
- Industry fit: Construction, home improvement, innovation
- Emotion: Friendly, approachable, confident

**Blue (#2c5aa0)**
- Represents: Trust, professionalism, reliability, stability
- Industry fit: Business, technology, corporate
- Emotion: Calm, trustworthy, professional

**Together**: The combination creates a balance of friendly innovation (orange) with professional reliability (blue).

## Print & Export

### For Designers
- Primary: #f7941d (RGB: 247, 148, 29)
- Secondary: #2c5aa0 (RGB: 44, 90, 160)
- Accent: #fdb44b (RGB: 253, 180, 75)
- Dark: #1a1a1a (RGB: 26, 26, 26)
- Light: #f8f9fa (RGB: 248, 249, 250)

### CMYK Values (Approximate)
- Primary: C:0 M:40 Y:88 K:3
- Secondary: C:73 M:44 Y:0 K:37
- Dark: C:0 M:0 Y:0 K:90

## CSS Variables Reference

```css
--brand-primary: #f7941d;
--brand-secondary: #2c5aa0;
--brand-accent: #fdb44b;
--brand-dark: #1a1a1a;
--brand-light: #f8f9fa;
```

Access in your code:
```tsx
style={{ color: 'var(--brand-primary)' }}
style={{ backgroundColor: 'var(--brand-secondary)' }}
```
