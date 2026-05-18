# Skillary Final Design System Tokens

## 1. Final Brand Tokens
- **Primary Brand Orange**: `rgb(255, 138, 0)` (Vibrant, high energy)
- **Secondary Brand Pink/Red**: `rgb(255, 90, 95)` (Warm, modern)
- **Primary Gradient**: `linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))`
- **Focus Rings**: `focus:ring-[rgb(255,138,0)]`

*Usage:* Primary CTA buttons, background aesthetic blobs, marketing card highlights, icon containers, and interactive hover states.

## 2. Final Semantic Tokens
Instead of introducing new, fragmented color codes, Skillary intentionally utilizes its vibrant brand colors for specific semantic states to maintain visual harmony.
- **Success/Completed**: `bg-green-100 text-green-700` or `text-green-600`
- **Warning/Progress**: `rgb(255, 138, 0)` (Brand Orange)
  - *Usage*: Dashboard progress bars, "In Progress" badges, missing link warnings.
- **Danger/Failure**: `rgb(255, 90, 95)` (Brand Pink/Red)
  - *Usage*: "Failed Quiz" badges, "Live Monitor" alerts, required field error text.

## 3. Where Each Token Should Be Used
- **Buttons (`Button.tsx`)**: Use the primary gradient for main actions. Use solid black (`#181818`) or ghost white (`bg-white border`) for secondary actions.
- **Admin & Dashboards**: Use standard black/white surfaces (`#FFFDF9`) and rely on brand tokens only for specific metric highlights (e.g., Active Fails in Red, Quiz Averages in Orange).
- **Text Highlights**: Use text clip backgrounds with the primary gradient only for major headings (e.g., Homepage Heroes, Checkout Total).

## 4. Anti-Patterns
- **DO NOT** use `#F6C34F` (legacy muted yellow/orange) or `#EB6C64` (legacy muted pink/orange). They have been fully purged from the codebase.
- **DO NOT** use generic Tailwind colors like `text-red-500` for alerts when `text-[rgb(255,90,95)]` perfectly bridges the gap between branding and alert semantics.

## 5. Remaining Exceptions
- Neutral background surfaces still utilize some specialized hexes like `#FFFDF9` or `#FFF8EC` to create a warm paper-like aesthetic. These are intentional and should not be forced into pure `#FFFFFF`.
- External link colors in dark mode (like the video URLs in `LessonClient.tsx`) use solid `rgb(255,138,0)` for accessibility against black backgrounds, without needing a full gradient.

## 6. Future Guardrails
- **Tailwind Config**: In the future, we recommend migrating these inline `rgb(...)` values into the `tailwind.config.ts` as standard names (e.g., `skillary-orange`, `skillary-pink`) to prevent manual hex drift.
- **Accessibility**: While the primary gradient is compliant with white text for large buttons, ensure any thin text placed directly on these colors remains bold or large enough to meet WCAG contrast ratios.
