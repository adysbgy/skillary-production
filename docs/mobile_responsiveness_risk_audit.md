# Mobile Responsiveness Risk Audit

This document outlines potential layout and responsiveness risks that require physical device or browser DevTools validation before the soft launch.

## 1. Public Marketing Routes
### Homepage (`/`)
- **Risk:** Hero text stacking. Large `h1` elements may overflow viewport width on very small screens (e.g., iPhone SE).
- **Risk:** Grid layouts in "Feature" or "Program" sections must safely collapse to a single column (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).

### `/portfolio` & `/case-studies`
- **Risk:** Long proof URLs. Instagram links inside cards might break flex containers if not properly truncated using `truncate`, `break-all`, or `overflow-hidden`.
- **Risk:** Filter buttons scaling. Horizontal scrolling may be required if there are many category filters.

## 2. Print-Ready Resources
- `/resources/sales-deck`
- `/resources/company-profile`
- `/resources/corporate-proposal`
- **Risk Assessment:** Minimal. These routes enforce a fixed width (`210mm` or `297mm`) meant specifically for PDF rendering. They are not intended for mobile browsing, though they will scale down visually if a user opens them on a phone. No code changes required here.

## 3. Admin / B2B Dashboard Routes
### `/admin/batches/[id]`, `/admin/organizations/[id]`, `/admin/leads`
- **Risk:** Data Table Overflow. Tables containing many columns (Participant Name, Email, Status, Revoke Access buttons) will break the viewport width on mobile.
- **Mitigation:** Ensure all `<table>` elements are wrapped in a container with `overflow-x-auto`. This allows horizontal scrolling within the table area without breaking the main layout.
- **Risk:** Modal dialogs for "Grant Access" or "CSV Import". Ensure modals have `max-h-screen` and `overflow-y-auto` so they remain usable on small screens.

## 4. Required Action
- Developers should open the application locally using Chrome DevTools (Device Toggle) targeting an iPhone SE (375px width) to verify table scrollability in the Admin dashboard and text scaling on the Homepage.
