# Homepage 2.0 — Motion System Notes

## 1. Motion Principles
- **Subtle & Premium:** The focus is on a calm, confident, and professional feel suitable for B2B/Enterprise buyers. Avoid gamified, bouncy, or excessive floating animations.
- **Performance First:** No heavy animation libraries (like Framer Motion or GSAP) were introduced. The entire system is built on lightweight, native CSS keyframes integrated via Tailwind's `@theme` config and custom utility classes.
- **Accessibility Included:** All animations automatically respect OS-level `prefers-reduced-motion: reduce` settings.

## 2. Added Animations
- **Global CSS Utilities:** Created `.motion-fade-up`, `.motion-scale-in`, `.motion-fade-in`, `.motion-progress-fill`, and `.motion-delay-*` classes.
- **Hero Reveal:** Eyebrow → Headline → Subheadline → CTAs → Value Chips cascade in using `motion-fade-up` and staggered delays. Dashboard frame scales in, followed by a staggered reveal of inner stat cards and progress bars.
- **Batch Flow:** Step icons fade in sequentially, connector lines fade in with a slight delay, followed by the feature cards lifting in via fade-up.
- **Reports & Certificate:** Report panel and certificate preview scale/fade-in. Table rows stagger in, and progress bars smoothly fill from 0 to their target width (`motion-progress-fill`).
- **Microinteractions:** Cards use `.motion-hover-lift` for a subtle Y-axis translate and shadow expansion. Buttons use `.motion-btn` for a 1px translate lift on hover and press-down effect on active.

## 3. Why Animations are Subtle
A corporate platform needs to communicate stability and efficiency. Aggressive animations distract from the core value proposition and create a perceived "heaviness." Subtle easing (e.g., `cubic-bezier(0.22, 1, 0.36, 1)`) ensures transitions feel snappy but smooth, akin to native desktop software.

## 4. Intentionally Avoided Motion
- No infinite looping animations (like floating SVGs).
- No complex scroll-triggered parallax effects (to avoid layout shift and scroll jank).
- No flashy hover glows or neon effects.

## 5. Reduced-Motion Handling
A global `@media (prefers-reduced-motion: reduce)` block in `globals.css` instantly strips all translate, scale, and animation durations. It ensures content is immediately visible for users who require reduced motion for accessibility reasons.

## 6. Performance Notes
- **Zero JS Overhead:** CSS-only animations mean no extra JavaScript bundle size. No `IntersectionObserver` or third-party hooks were used, keeping the homepage fully static (`○`).
- **Hardware Acceleration:** Animations target `opacity` and `transform`, avoiding expensive layout repaints.

## 7. Future QA Checklist
- [ ] Verify staggered entrance timings on the Hero section (desktop & mobile).
- [ ] Check horizontal layout connector lines in the Batch flow on Safari.
- [ ] Confirm `motion-progress-fill` correctly triggers when the element loads.
- [ ] Test button hover states for visual artifacts.
- [ ] Simulate "Reduce Motion" in DevTools to verify immediate content rendering without animation.
