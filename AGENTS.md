<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SKILLARY PROJECT IDENTITY & RULES (MANDATORY)

## 1. Project Identity & Guardrails
- **Active Project:** Skillary (B2C/B2B Training & Certification Platform)
- **Anti-Contamination Rule:** NEVER write or fallback to "Allman" legacy logic, texts, or tokens. This project is strictly Skillary.
- **Brand Colors:** Use the Skillary warm palette (`rgb(255,138,0)` for primary brand accents). DO NOT use legacy tokens (`#F6C34F`, `#EB6C64`).
- **Semantic UI Rules:** Differentiate strictly between brand gradients/colors and semantic states (e.g., use standard danger colors for "Failed Quiz", not brand gradients).

## 2. LMS Domain Logic: "7-Element Pillar" (MIND Model)
When generating or enriching course curricula (especially Tech Bootcamps and Corporate Training), strictly follow the 7-Element Pillar structure:
1. Comprehensive Overview
2. Technical Code Snippets
3. 5-Question Elaborative Quizzes (with elaborate feedback)
4. Mini-projects
5. Capstone Assessments
6. (Include any other defined MIND model steps)

## 3. Database & Seeding Conventions
- **Prisma Only:** Use Prisma Client (`@prisma/client`) for all DB interactions. No raw SQL unless absolutely necessary.
- **Centralized Seeding:** Never create scratch/one-off seed scripts in root. All mock data and migrations MUST go through `prisma/seed.ts` or the centralized scripts in `scripts/`.

## 4. Auth & API (Next-Auth v5)
- Use `next-auth@beta` conventions.
- Use `auth()` inside Server Components and Route Handlers for session retrieval. Do not use legacy Next-Auth v4 methods.

## 5. UI/UX & Tech Stack
- **Framework:** Next.js 16 (App Router) + Tailwind CSS v4.
- **Missing Libraries Alert:** The project currently lacks a testing framework (Jest/Playwright) and rich text/markdown renderer (`react-markdown`). If requested to build features requiring these, either use native HTML/React solutions or explicitly ask the user for permission to install them.
