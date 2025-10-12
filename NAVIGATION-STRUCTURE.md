# Navigation Structure

## Overview
The application now has completely separated navigation layouts for the public website and CRM dashboard.

---

## Structure

### 1. Root Layout (`app/layout.tsx`)
**Purpose:** Base layout for the entire application
**Contains:**
- HTML structure
- ThemeProvider (dark mode support)
- Global styles

**Does NOT contain:**
- Website navigation/footer
- CRM navigation
- Any page-specific UI

---

### 2. Website Layout (`app/(website)/layout.tsx`)
**Purpose:** Layout for all public-facing website pages
**Route Group:** `(website)` - URL path not affected
**Contains:**
- Navbar (public website navigation)
- Footer (company info, links)
- LiveChat widget
- Main content wrapper

**Applies to:**
- Homepage (`/`)
- All future public pages

---

### 3. CRM Layout (`app/crm/layout.tsx`)
**Purpose:** Layout for CRM application
**Contains:**
- SessionProvider (authentication)
- Background styling
- CRM-specific wrapper

**Does NOT contain:**
- Public website navbar/footer
- LiveChat widget

**Applies to:**
- CRM Login (`/crm/login`)
- CRM Dashboard (`/crm/dashboard`)
- All future CRM pages

---

## Visual Differences

### Public Website
```
┌─────────────────────────────────────┐
│          Navbar (Public)            │
├─────────────────────────────────────┤
│                                     │
│        Page Content                 │
│                                     │
├─────────────────────────────────────┤
│          Footer (Public)            │
└─────────────────────────────────────┘
```

### CRM Dashboard
```
┌─────────────────────────────────────┐
│      CRM Header (Dashboard Nav)     │
├─────────────────────────────────────┤
│                                     │
│      CRM Dashboard Content          │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### CRM Login
```
┌─────────────────────────────────────┐
│                                     │
│         Login Form (Centered)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

---

## Benefits

### 1. **Complete Separation**
- CRM doesn't show public website navigation
- Public website doesn't show CRM navigation
- Clean, focused user experience

### 2. **Independent Styling**
- CRM can have its own design system
- Website maintains its brand identity
- No style conflicts

### 3. **Better UX**
- Users in CRM stay focused on tasks
- No confusion between public and admin areas
- Cleaner navigation flow

### 4. **Performance**
- Only load necessary components
- No unnecessary navigation on CRM pages
- Faster page loads

---

## File Structure

```
app/
├── layout.tsx                 # Root layout (minimal)
├── globals.css               # Global styles
│
├── (website)/                # Public website route group
│   ├── layout.tsx           # Website-specific layout
│   └── page.tsx             # Homepage
│
└── crm/                     # CRM application
    ├── layout.tsx           # CRM-specific layout
    ├── login/
    │   └── page.tsx         # Login page
    └── dashboard/
        └── page.tsx         # Dashboard page
```

---

## Key Features

### Public Website Navigation (Navbar)
- Logo and branding
- Service links
- Dark mode toggle
- "Get Quote" CTA
- Smooth scroll navigation
- Mobile responsive menu

### CRM Navigation (Dashboard Header)
- Logo
- Dashboard title
- User info display
- "View Website" link (back to public)
- Sign Out button
- Sticky header for easy access

---

## Adding New Pages

### Adding a Public Website Page
1. Create page in `app/(website)/your-page/page.tsx`
2. Automatically gets Navbar + Footer
3. Has access to LiveChat

### Adding a CRM Page
1. Create page in `app/crm/your-page/page.tsx`
2. Automatically gets CRM layout
3. Has SessionProvider for auth
4. No public navigation

---

## Navigation Links

### From Website to CRM
- Link: `/crm/login`
- Found in: Footer (usually)
- Requires: Authentication

### From CRM to Website
- Link: `/`
- Found in: Dashboard header "View Website" button
- No auth required

---

## Authentication Flow

1. **User visits `/crm/login`**
   - Shows clean login form
   - No website navigation
   - Branded CRM experience

2. **User logs in**
   - Redirected to `/crm/dashboard`
   - Shows CRM header
   - Full dashboard functionality

3. **User clicks "View Website"**
   - Returns to `/`
   - Shows public website navigation
   - Can return to CRM anytime

---

## Dark Mode

Both layouts support dark mode:
- **Website:** Toggle in Navbar
- **CRM:** Same ThemeProvider, persistent across navigation
- Settings saved in localStorage
- Consistent experience

---

## Mobile Responsiveness

### Website (Navbar)
- Hamburger menu on mobile
- Full-screen mobile menu
- Touch-friendly buttons
- Responsive logo

### CRM (Dashboard)
- Responsive header
- Mobile-optimized tables
- Touch-friendly controls
- Collapsible filters

---

## Future Enhancements

Possible additions while maintaining separation:

1. **CRM Sidebar**
   - Add persistent sidebar navigation
   - Keep header for top-level actions

2. **Breadcrumbs**
   - Add to CRM for deep navigation
   - Keep website navigation simple

3. **Admin Menu**
   - Dropdown in CRM header
   - Settings, profile, etc.

4. **Multi-tenant**
   - Different CRM layouts per tenant
   - Shared public website

---

## Maintenance Notes

- Route groups use parentheses `(website)` - don't affect URLs
- SessionProvider only wraps CRM pages
- LiveChat only on public pages
- Each layout is independently maintainable
- No cross-contamination of styles or logic

---

## Summary

✅ **Clean Separation:** Website and CRM are completely independent
✅ **Better UX:** Focused experiences for each user type
✅ **Maintainable:** Each layout can evolve independently
✅ **Performant:** Only load what's needed
✅ **Scalable:** Easy to add new pages to either section
