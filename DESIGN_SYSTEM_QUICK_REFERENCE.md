# Design System Quick Reference

A quick cheat sheet for developers using the Wonder Door Industrial design system.

## 🎨 Colors

```tsx
// Text Colors
className="text-brand-primary"    // #f7941d (orange)
className="text-brand-secondary"  // #2c5aa0 (blue)
className="text-brand-dark"       // #1a1a1a (almost black)

// Background Colors
className="bg-brand-primary"      // Orange background
className="bg-brand-secondary"    // Blue background
className="bg-brand-light"        // #f8f9fa Light gray

// Hover Effects
className="hover-brand-primary"   // Hover turns text orange
className="hover-brand-secondary" // Hover turns text blue
```

## 📝 Typography

```tsx
// Headings
<h1 className="heading-1">...</h1>  // 48-80px (responsive)
<h2 className="heading-2">...</h2>  // 36-48px (responsive)
<h3 className="heading-3">...</h3>  // 30-40px (responsive)
<h4 className="heading-4">...</h4>  // 24px
<h5 className="heading-5">...</h5>  // 20px
<h6 className="heading-6">...</h6>  // 18px

// Body Text
<p className="body-lg">...</p>      // 18px
<p className="body-base">...</p>    // 16px (default)
<p className="body-sm">...</p>      // 14px
<span className="caption">...</span> // 12px

// Khmer Font
<p className="font-khmer">...</p>   // Use for Khmer text
```

## 🌍 Common Patterns

### Section Container
```tsx
<section className="w-full py-12 md:py-16">
  <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
    {/* Content */}
  </div>
</section>
```

### Heading with Description
```tsx
<h2 className="heading-2 text-brand-dark font-khmer">Title</h2>
<p className="body-base text-gray-600 font-khmer" style={{ marginTop: 'var(--space-2)' }}>
  Description text
</p>
```

### Primary Button
```tsx
<button className="px-4 py-2 bg-brand-primary text-white hover:brightness-95 transition-all body-base font-medium">
  Button Text
</button>
```

### Secondary Button
```tsx
<button className="px-4 py-2 bg-brand-secondary text-white hover:brightness-95 transition-all body-base font-medium">
  Button Text
</button>
```

### Text Link
```tsx
<a href="#" className="text-brand-secondary hover-brand-primary transition-colors">
  Link Text
</a>
```

## 📏 Spacing

```tsx
// Using CSS Variables
style={{ marginTop: 'var(--space-2)' }}   // 8px
style={{ marginTop: 'var(--space-4)' }}   // 16px
style={{ marginTop: 'var(--space-6)' }}   // 24px
style={{ marginTop: 'var(--space-8)' }}   // 32px
style={{ marginTop: 'var(--space-12)' }}  // 48px

// Or use Tailwind
className="mt-2"  // 8px
className="mt-4"  // 16px
className="mt-6"  // 24px
className="mt-8"  // 32px
```

## 📱 Responsive Classes

```tsx
// Mobile first approach
className="py-12 md:py-16"        // 48px mobile, 64px tablet+
className="text-base md:text-lg"  // 16px mobile, 18px tablet+
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

// Breakpoints
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
```

## ✅ Do's

✓ Use semantic classes (`heading-2`, `body-base`)  
✓ Use CSS color variables (`text-brand-primary`)  
✓ Add `font-khmer` for Khmer text  
✓ Add transitions (`transition-colors`, `transition-all`)  
✓ Use spacing variables for consistency  
✓ Test on mobile, tablet, and desktop  

## ❌ Don'ts

✗ Don't use hardcoded hex colors (#f7941d)  
✗ Don't use raw Tailwind text sizes (text-4xl)  
✗ Don't forget Khmer font support  
✗ Don't skip hover states on interactive elements  
✗ Don't use arbitrary spacing values  

## 🔧 Common Fixes

**Replace hardcoded colors:**
```tsx
// Before
className="bg-[#f7941d]"
// After
className="bg-brand-primary"
```

**Replace raw text sizes:**
```tsx
// Before
className="text-2xl font-bold"
// After
className="heading-3 text-brand-dark"
```

**Add Khmer font:**
```tsx
// Before
<h1 className="heading-1">ចំណងជើង</h1>
// After
<h1 className="heading-1 font-khmer">ចំណងជើង</h1>
```

**Add transitions:**
```tsx
// Before
className="hover:text-orange-500"
// After
className="hover-brand-primary transition-colors"
```

## 📦 Complete Component Example

```tsx
export default function ExampleCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <h3 className="heading-5 text-brand-dark font-khmer mb-3">
          Card Title
        </h3>
        <p className="body-base text-gray-600 font-khmer mb-4">
          Card description text goes here.
        </p>
        <button className="px-4 py-2 bg-brand-primary text-white hover:brightness-95 transition-all body-base font-medium w-full">
          Learn More
        </button>
      </div>
    </div>
  );
}
```
