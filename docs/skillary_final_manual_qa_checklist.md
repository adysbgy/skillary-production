# Skillary Final Manual QA Checklist

## 1. Pages to Test

### A. Landing / Public Pages
- [ ] Homepage Desktop
- [ ] Homepage Mobile (390px / iPhone size)
- [ ] Homepage Mobile (320px / small screen)
- [ ] Program Catalog (`/program-catalog`)
- [ ] Program Detail (`/program/[id]`)
- [ ] Portfolio (`/portfolio`)
- [ ] Case Studies (`/case-studies`)
- [ ] Resources (`/resources`)
- [ ] Contact (`/contact`)
- [ ] Services (`/services`)
- [ ] Reports (`/reports`)
- [ ] Certificates (`/certificates`)
- [ ] About (`/about`)
- [ ] Auth Pages (`/login`, `/register`, `/forgot-password`, `/reset-password`)

### B. Internal Product Pages
- [ ] Dashboard (`/dashboard`)
- [ ] Dashboard Courses (`/dashboard/courses`)
- [ ] Dashboard Settings (`/dashboard/settings`)
- [ ] Learn Lesson Page (`/learn/[courseSlug]/[lessonSlug]`)
- [ ] Admin Overview (`/admin/revenue`)
- [ ] Admin Leads (`/admin/leads`)
- [ ] Admin Courses (`/admin/courses`)
- [ ] Admin Batches (`/admin/batches`)
- [ ] Admin Organizations (`/admin/organizations`)
- [ ] Checkout (`/checkout/[orderId]`)

## 2. Exact Viewport Checklist
- [ ] **Desktop (1440px):** Check max-width constraints, grid alignments, and hero typography scale.
- [ ] **Tablet (768px):** Ensure 3-column layouts collapse to 2-column or 1-column gracefully.
- [ ] **Mobile (390px):** Verify mobile menu functionality, touch targets (min 44px), and horizontal scrolling overflow.
- [ ] **Small Mobile (320px):** Verify no horizontal scrollbars on root body, buttons don't clip.

## 3. Visual Consistency Checks
- [ ] **Accents:** All primary CTAs use the `linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))` or solid `rgb(255, 138, 0)`.
- [ ] **Card Radius:** Consistent rounded corners (`rounded-2xl` or `rounded-xl`).
- [ ] **Shadows:** Soft shadows (`shadow-sm` or `shadow-lg` on hover) with no harsh dark outlines.
- [ ] **Button Hierarchy:** Primary (Gradient/Black) vs Secondary (Ghost/Outline).
- [ ] **Focus Rings:** Ensure `focus-visible:ring-[rgb(255,138,0)]` appears clearly on keyboard navigation.
- [ ] **Hover Behavior:** Cards translate slightly up (`-translate-y-1`) with deeper shadows.
- [ ] **Dark/Light Contrast:** Text legibility is maintained across `#FFFDF9` surfaces and `#181818` buttons.
- [ ] **Legacy Tokens:** NO `#F6C34F` or `#EB6C64` or `#E68052` visible anywhere in the UI.

## 4. Semantic State Checks
- [ ] **Progress Clarity:** Dashboard progress bars clearly use the vibrant orange/pink gradient.
- [ ] **Danger/Fail Alerts:** "Live Monitor", "Failed Quizzes", and form validation errors strictly use `rgb(255, 90, 95)` (Vibrant Pink/Red).
- [ ] **Success/Complete:** Completed courses and success badges use `green-500` or `green-100/green-700`.

## 5. Suspicious File Sanity Check Result
- **File Checked:** `src/app/api/auth/forgot-password/route.ts`
- **Result:** **Category A (Safe/Expected)**. The script replaced `#E68052` with `rgb(255,138,0)` inside the HTML email template inline styles (`<a style="background: rgb(255,138,0);">`). No backend logic or API routing was broken. The email template will correctly render the new brand orange.

## 6. Final Checkpoint Recommendation
The system is stabilized, verified by TypeScript and build checks. Once this manual QA is completed, the visual design system is officially locked. Proceed to checkpoint commit.
