# Design System Documentation

This document outlines the design system used across the Wonder Door Industrial website.

## Color Palette

### Brand Colors

| Color Name | Hex Value | Usage | CSS Variable |
|------------|-----------|-------|--------------|
| **Primary Orange** | `#f7941d` | Primary brand color, CTAs, highlights | `--brand-primary` |
| **Secondary Blue** | `#2c5aa0` | Professional complement, links, accents | `--brand-secondary` |
| **Accent Orange** | `#fdb44b` | Lighter accent, hover states | `--brand-accent` |
| **Dark** | `#1a1a1a` | Text, headings | `--brand-dark` |
| **Light** | `#f8f9fa` | Backgrounds, sections | `--brand-light` |

### Usage Examples

```tsx
// Using CSS classes
<h1 className="text-brand-primary">Heading</h1>
<div className="bg-brand-primary">Button</div>
<button className="hover-brand-primary">Link</button>

// Using CSS variables
<div style={{ color: 'var(--brand-primary)' }}>Text</div>
```

## Typography

### Font Families

- **Primary (Latin)**: Geist Sans
- **Monospace**: Geist Mono
- **Khmer**: Noto Sans Khmer

### Font Weights

| Name | Value | CSS Variable |
|------|-------|--------------|
| Light | 300 | `--font-light` |
| Normal | 400 | `--font-normal` |
| Medium | 500 | `--font-medium` |
| Semibold | 600 | `--font-semibold` |
| Bold | 700 | `--font-bold` |
| Extrabold | 800 | `--font-extrabold` |

### Font Sizes (Responsive)

| Class Name | Mobile | Tablet (768px+) | Desktop (1024px+) | Usage |
|------------|--------|-----------------|-------------------|-------|
| `text-xs` | 12px | 12px | 12px | Captions, small text |
| `text-sm` | 14px | 14px | 14px | Secondary text |
| `text-base` | 16px | 16px | 16px | Body text |
| `text-lg` | 18px | 18px | 18px | Large body text |
| `text-xl` | 20px | 20px | 20px | Small headings |
| `text-2xl` | 24px | 24px | 24px | H5 |
| `text-3xl` | 30px | 36px | 40px | H4 |
| `text-4xl` | 36px | 44px | 48px | H3 |
| `text-5xl` | 48px | 56px | 64px | H2 |
| `text-6xl` | 60px | 72px | 80px | H1 |

### Typography Classes

Use these semantic classes for consistent typography:

```tsx
// Headings
<h1 className="heading-1">Main Page Title</h1>
<h2 className="heading-2">Section Title</h2>
<h3 className="heading-3">Subsection Title</h3>
<h4 className="heading-4">Card Title</h4>
<h5 className="heading-5">Small Heading</h5>
<h6 className="heading-6">Tiny Heading</h6>

// Body text
<p className="body-lg">Large body text</p>
<p className="body-base">Normal body text</p>
<p className="body-sm">Small body text</p>
<span className="caption">Caption text</span>
```

### Line Heights

| Name | Value | CSS Variable |
|------|-------|--------------|
| None | 1 | `--leading-none` |
| Tight | 1.25 | `--leading-tight` |
| Snug | 1.375 | `--leading-snug` |
| Normal | 1.5 | `--leading-normal` |
| Relaxed | 1.625 | `--leading-relaxed` |
| Loose | 2 | `--leading-loose` |

## Spacing Scale

| CSS Variable | Value | Pixels |
|--------------|-------|--------|
| `--space-1` | 0.25rem | 4px |
| `--space-2` | 0.5rem | 8px |
| `--space-3` | 0.75rem | 12px |
| `--space-4` | 1rem | 16px |
| `--space-5` | 1.25rem | 20px |
| `--space-6` | 1.5rem | 24px |
| `--space-8` | 2rem | 32px |
| `--space-10` | 2.5rem | 40px |
| `--space-12` | 3rem | 48px |
| `--space-16` | 4rem | 64px |
| `--space-20` | 5rem | 80px |
| `--space-24` | 6rem | 96px |

### Usage

```tsx
// Using inline styles for custom spacing
<div style={{ marginTop: 'var(--space-6)' }}>Content</div>
<div style={{ padding: 'var(--space-4)' }}>Content</div>
```

## Khmer Font Support

For Khmer text, use the `font-khmer` class:

```tsx
<h1 className="heading-1 font-khmer">ចំណងជើង</h1>
<p className="body-base font-khmer">អត្ថបទ</p>
```

This ensures proper rendering of Khmer characters using Noto Sans Khmer.

## Responsive Design

### Breakpoints

- **Mobile**: < 768px (base styles)
- **Tablet**: ≥ 768px (`md:` prefix in Tailwind)
- **Desktop**: ≥ 1024px (`lg:` prefix in Tailwind)

### Responsive Typography

Font sizes automatically scale up at larger breakpoints. Use the defined classes for automatic responsive behavior:

```tsx
// This will be 36px on mobile, 44px on tablet, 48px on desktop
<h2 className="heading-2">Responsive Heading</h2>
```

## Component Patterns

### Buttons

```tsx
// Primary button
<button className="px-4 py-2 bg-brand-primary text-white hover:brightness-95 transition-all body-base font-medium">
  Click Me
</button>

// Secondary button
<button className="px-4 py-2 bg-brand-secondary text-white hover:brightness-95 transition-all body-base font-medium">
  Secondary Action
</button>
```

### Links

```tsx
// With hover effect
<a href="#" className="text-brand-dark hover-brand-primary transition-colors">
  Link Text
</a>

// Secondary colored link
<a href="#" className="text-brand-secondary hover-brand-primary transition-colors">
  Link Text
</a>
```

### Cards

```tsx
<div className="bg-white rounded-lg shadow-sm overflow-hidden">
  <div className="p-4">
    <h3 className="heading-5 text-brand-dark">Card Title</h3>
    <p className="body-sm text-gray-600 mt-2">Card description</p>
  </div>
</div>
```

### Sections

```tsx
<section className="w-full py-12 md:py-16">
  <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
    <h2 className="heading-2 text-brand-dark mb-6">Section Title</h2>
    {/* Section content */}
  </div>
</section>
```

## Best Practices

1. **Always use semantic typography classes** (`heading-1`, `body-base`, etc.) instead of raw Tailwind classes
2. **Use CSS variables** for colors (`--brand-primary`) instead of hardcoded hex values
3. **Add `font-khmer` class** for any Khmer language content
4. **Use spacing variables** (`var(--space-6)`) for consistent spacing
5. **Include transition classes** (`transition-colors`, `transition-all`) for smooth interactions
6. **Follow the responsive patterns** - mobile first, then enhance for larger screens
7. **Maintain the max-width of 1440px** for content containers
8. **Add proper hover states** using `hover-brand-primary` or similar classes

## Examples

### Complete Component Example

```tsx
export default function ExampleSection() {
  return (
    <section className="w-full py-12 md:py-16 bg-brand-light">
      <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
        <h2 className="heading-2 text-brand-dark font-khmer mb-4">
          សេវាកម្មរបស់យើង
        </h2>
        <p className="body-lg text-gray-600 font-khmer" style={{ marginBottom: 'var(--space-8)' }}>
          យើងផ្តល់សេវាកម្មគុណភាពខ្ពស់
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="heading-5 text-brand-dark mb-3">Service 1</h3>
            <p className="body-sm text-gray-600">Description text here</p>
            <button className="mt-4 px-4 py-2 bg-brand-primary text-white hover:brightness-95 transition-all body-base font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Migration Checklist

When updating existing components:

- [ ] Replace hardcoded colors with CSS variables or utility classes
- [ ] Replace font size classes with semantic typography classes
- [ ] Add `font-khmer` to text elements
- [ ] Update spacing to use consistent scale
- [ ] Add transition effects to interactive elements
- [ ] Ensure responsive padding and margins
- [ ] Test on mobile, tablet, and desktop viewports
- [ ] Verify Khmer text renders correctly
