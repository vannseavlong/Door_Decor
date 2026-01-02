# 🔥 Firebase Integration Guide

## Overview
This guide shows you how to connect your landing page to Firebase data. All components are now **translation-ready** and **Firebase-ready**.

---

## ✅ What's Already Prepared

### 1. **Translation System** ✅
All components now support English/Khmer bilingual content:
- `Hero` - Uses translations from locale files
- `ProductsSection` - Supports translated UI text
- `Blog` - Shows installation data in both languages
- Translation files updated with all needed keys

### 2. **Performance Optimizations** ✅
- ISR enabled on homepage (60s revalidation)
- ISR enabled on product pages (120s revalidation)
- React Query caching in admin panel
- Optimized Firebase query functions ready

### 3. **Data Structure** ✅
Components expect data in this format:

**Installation (for Blog section):**
```typescript
{
  id: string;
  title: string;
  title_km?: string;          // Khmer translation
  description: string;
  description_km?: string;     // Khmer translation
  image: string;
  tag?: string;                // "Residential", "Commercial", etc.
  location?: string;           // "Phnom Penh, Cambodia"
  date?: string;               // "January 2026"
  href?: string;               // Link to product/detail
}
```

**Product:**
```typescript
{
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  // ... other fields
}
```

---

## 🚀 How to Connect Firebase Data

### Option 1: Update Homepage (Recommended)

Replace dummy data with real Firebase data in homepage:

**File: `app/(website)/page.tsx`**

```typescript
import { getHomePageData } from "./actions";

// ISR already enabled - data cached for 60 seconds
export const revalidate = 60;

export default async function Page() {
  // Fetch data from Firebase
  const { installations } = await getHomePageData();
  
  return (
    <div>
      <Hero />
      <ProductsSection />
      
      {/* Pass real data to Blog component */}
      <Blog posts={installations} />
      
      <NewContactUs />
    </div>
  );
}
```

### Option 2: Update Individual Components

If you prefer to keep components fetching their own data:

**File: `components/website/Blog.tsx`**

Add at the top:
```typescript
import { getInstallationsOptimized } from "@/lib/firebase/optimized-queries";

export default async function Blog() {
  // Fetch installations from Firebase
  const posts = await getInstallationsOptimized(6);
  
  // ... rest of component
}
```

---

## 📝 Translation Integration

### How Translations Work

1. **User switches language** using `LanguageSwitcher`
2. **Locale stored in cookie** (persists across sessions)
3. **Components use `useTranslate()` hook** to get translated text

### Example Usage

```typescript
import { useTranslate } from "@/lib/utils/useTranslate";

export default function MyComponent() {
  const { t, locale } = useTranslate();
  
  return (
    <div>
      <h1>{t("heroTitle")}</h1>
      
      {/* For data from Firebase with bilingual fields */}
      {installation.title_km && locale === 'kh' 
        ? installation.title_km 
        : installation.title}
    </div>
  );
}
```

### Adding New Translation Keys

**File: `locales/English/en.json`**
```json
{
  "newKey": "English text",
  ...
}
```

**File: `locales/Khmer/kh.json`**
```json
{
  "newKey": "ខ្មែរ",
  ...
}
```

Then use: `{t("newKey")}`

---

## 🔌 Step-by-Step Firebase Connection

### Step 1: Verify Firebase Admin SDK Setup

Check that `.env.local` has:
```bash
FIREBASE_ADMIN_KEY='{"type":"service_account",...}'
```

### Step 2: Test Firebase Connection

Run this in admin panel to verify Firebase works:
1. Go to `/dashboard`
2. Click "Categories" or "Installations" tab
3. If data loads, Firebase is connected ✅

### Step 3: Connect Blog Section

**Option A: Via Homepage** (Recommended - uses ISR)

```typescript
// app/(website)/page.tsx
import { getInstallationsOptimized } from "@/lib/firebase/optimized-queries";

export const revalidate = 60;

export default async function Page() {
  const installations = await getInstallationsOptimized(6);
  
  return (
    <div>
      <Hero />
      <ProductsSection />
      <Blog posts={installations} />
      <NewContactUs />
    </div>
  );
}
```

**Option B: Convert Blog to Server Component**

```typescript
// components/website/Blog.tsx
// Remove "use client" directive
import { getInstallationsOptimized } from "@/lib/firebase/optimized-queries";

export default async function Blog() {
  const posts = await getInstallationsOptimized(6);
  const { t } = useTranslate(); // Move to client wrapper if needed
  
  // ... rest
}
```

### Step 4: Connect Products Section

Update homepage to pass real products:

```typescript
// app/(website)/page.tsx
import { getProductsListOptimized } from "@/lib/firebase/optimized-queries";

export default async function Page() {
  const products = await getProductsListOptimized();
  
  return (
    <div>
      <Hero />
      <ProductsSection products={products} />
      <Blog />
      <NewContactUs />
    </div>
  );
}
```

### Step 5: Test Translation

1. Click language switcher (🇺🇸 / 🇰🇭)
2. Verify text changes to Khmer
3. For installation titles/descriptions:
   - Add `title_km` and `description_km` fields in admin panel
   - Blog component will automatically show Khmer version

---

## 🎨 UI is Ready For:

### ✅ Bilingual Content
- All static text translated
- Dynamic data (from Firebase) supports `_km` suffix fields
- Automatic language detection and switching

### ✅ Firebase Data
- Blog component accepts `posts` prop
- ProductsSection accepts `products` prop
- Both fall back to dummy data if not provided
- All Firebase queries optimized for performance

### ✅ Empty States
- Blog shows placeholder when no installations
- Products section handles empty categories
- Graceful fallback to dummy data

---

## 🔥 Quick Migration Checklist

- [ ] Verify Firebase Admin SDK is configured
- [ ] Test admin panel loads data successfully
- [ ] Add installation data via admin panel "Installations" tab
- [ ] Add Khmer translations (`title_km`, `description_km`) to installations
- [ ] Update homepage to fetch installations
- [ ] Test language switcher works
- [ ] Verify ISR caching (check `.next/server/app` after build)
- [ ] Add products via admin panel (optional, already has dummy data)

---

## 🚦 Testing Checklist

### Test Firebase Connection
```bash
# 1. Login to admin panel
# 2. Go to Installations tab
# 3. Click "Add Installation"
# 4. Fill form with bilingual data
# 5. Save and verify it appears in table
```

### Test Translation
```bash
# 1. Go to homepage
# 2. Click language switcher (top right)
# 3. Verify all text changes to Khmer
# 4. Check Blog section shows Khmer titles
```

### Test Performance
```bash
# Build for production
npm run build

# Start production server
npm start

# Test page load speed (should be <500ms)
# Check browser DevTools → Network tab
```

---

## 📊 Data Flow Diagram

```
┌─────────────────┐
│  Admin Panel    │
│  (Dashboard)    │
└────────┬────────┘
         │ Admin adds/edits
         │ via React Query
         ▼
┌─────────────────┐
│    Firebase     │
│   (Firestore)   │
└────────┬────────┘
         │ ISR fetches
         │ every 60-120s
         ▼
┌─────────────────┐
│  Customer Pages │
│  (Next.js ISR)  │
└────────┬────────┘
         │ User visits
         ▼
┌─────────────────┐
│  CDN Cache      │ ← Ultra-fast delivery
│  (Edge)         │
└─────────────────┘
```

---

## 🎯 Best Practices

### When Adding Data via Admin Panel

1. **Always fill both English AND Khmer fields**
   - Title (English) + Title (Khmer)
   - Description (English) + Description (Khmer)

2. **Upload high-quality images**
   - Recommended: 1200x800px minimum
   - Format: WebP or JPG
   - Size: <1MB per image

3. **Use consistent tag names**
   - "Residential"
   - "Commercial"  
   - "Customer Review"

### For Developers

1. **Always use optimized queries**
   ```typescript
   ✅ getInstallationsOptimized(6)
   ❌ adminDb.collection("installations").get()
   ```

2. **Always add ISR to customer pages**
   ```typescript
   export const revalidate = 60; // Add this line
   ```

3. **Always use translation hook**
   ```typescript
   const { t } = useTranslate();
   return <h1>{t("heroTitle")}</h1>;
   ```

---

## 🆘 Troubleshooting

### Issue: Blog section shows dummy data
**Solution**: 
- Check if homepage is fetching installations
- Verify Firebase has installation data
- Check browser console for errors

### Issue: Khmer text not showing
**Solution**:
- Verify `font-khmer` class is applied
- Check translation files have `_km` keys
- Ensure Noto Sans Khmer font is loaded

### Issue: Images not loading
**Solution**:
- Verify image URLs are valid
- Check Firebase Storage CORS settings
- Use `next/image` component (already implemented)

### Issue: Slow loading
**Solution**:
- Verify ISR is enabled (`export const revalidate`)
- Check React Query is caching (admin panel)
- Run `npm run build` to test production performance

---

## 📚 Summary

**Everything is ready for Firebase connection!**

### What You Have:
✅ Translation system (English/Khmer)  
✅ Performance optimizations (ISR + React Query)  
✅ Firebase-ready components  
✅ Optimized query functions  
✅ Empty state handling  
✅ Bilingual data support  

### What You Need to Do:
1. Add data via admin panel
2. Update homepage to fetch from Firebase (3 lines of code)
3. Test language switching
4. Deploy and enjoy fast, bilingual website!

**Next Steps**: Follow "Quick Migration Checklist" above to connect Firebase data.
