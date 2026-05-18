# Contact Form QA Protocol

This document outlines the testing and QA requirements for the main Skillary Contact / Inquiry form before allowing live customer traffic.

## 1. System Integration
- [ ] **Formspree Endpoint Verification:** Ensure the `action` attribute on the form component points to the correct production Formspree ID. Avoid leaking test IDs in production.
- [ ] **Spam Protection:** Verify that native Formspree anti-spam (or custom reCAPTCHA if implemented) is actively preventing bot submissions.

## 2. Field Validation
Ensure all expected fields exist and validate properly:
- [ ] `name` (Required, text)
- [ ] `email` (Required, valid email format)
- [ ] `organization` (Required, text)
- [ ] `topic` (Optional/Required based on context, text)
- [ ] `message` (Required, text area, reasonable length limits)

## 3. Query Parameter Prefilling
The form must gracefully handle incoming routing queries to prefill context without breaking the UI. Test the following URLs:
- [ ] `/contact?type=expert` -> Form contextualizes for Expert Partner collaboration.
- [ ] `/contact?type=platform` -> Form contextualizes for Platform/LMS discussion.
- [ ] `/contact?type=assessment` -> Form contextualizes for Certificate/Assessment discussion.

## 4. Submission States
- [ ] **Active State:** Submit button provides visual feedback (e.g., spinner, disabled state) while processing to prevent double-submissions.
- [ ] **Error State:** Network failures or Formspree rejections display a clean, localized error message (e.g., "Gagal mengirim pesan. Silakan coba lagi.").
- [ ] **Success State / Routing:** Upon successful 200 OK from Formspree, the user is immediately routed to `/thank-you`.

## 5. Thank You Page Behavior
- [ ] The `/thank-you` page renders correctly and displays clear next steps.
- [ ] Ensure `/thank-you` has `<meta name="robots" content="noindex" />` to prevent organic search indexing of the success state.

## 6. Expected Email Payload
When testing, check the receiving inbox to verify the payload is structured cleanly for the Sales team:
- [ ] Contains Sender Name & Email
- [ ] Contains Organization Name
- [ ] Contains Context/Topic if provided via query params
- [ ] Contains the full raw message
