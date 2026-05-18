# Live Smoke Test Checklist

Execute this checklist route-by-route in the live production environment.

## 1. Public Routes
| Route | Expected Result | Pass/Fail | Notes | Owner |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Hero loads, CTAs direct correctly, mobile layout stacks. | [ ] | | |
| `/about` | Legacy story visible, formatting correct. | [ ] | | |
| `/platform` | Features listed clearly, no broken images. | [ ] | | |
| `/services` | Service options render correctly. | [ ] | | |
| `/program-catalog` | Topics display properly. | [ ] | | |
| `/demo` | Demo form renders and functions. | [ ] | | |
| `/reports` | Capabilities visible. | [ ] | | |
| `/learning-paths` | Journeys are visible. | [ ] | | |
| `/portfolio` | Legacy portfolio cards load, proof badges show correct validation status. | [ ] | | |
| `/case-studies` | Curated case studies load, modal or expand features work. | [ ] | | |
| `/resources` | Print-ready links work and open correctly. | [ ] | | |
| `/proposal` | Proposal intake form loads and validates required fields. | [ ] | | |
| `/contact` | Contact form loads and validates required fields. | [ ] | | |

## 2. Admin Routes (Require Login)
| Route | Expected Result | Pass/Fail | Notes | Owner |
| :--- | :--- | :--- | :--- | :--- |
| `/admin` | Overview dashboard loads, role-scoped to ADMIN. | [ ] | | |
| `/admin/leads` | CRM table renders, pagination works, no mobile overflow breaking the page. | [ ] | | |
| `/admin/organizations` | Org list renders, create new org functions. | [ ] | | |
| `/admin/batches` | Batch list renders, batch detail pages load correctly. | [ ] | | |

## 3. Critical API & Actions
| Action | Expected Result | Pass/Fail | Notes | Owner |
| :--- | :--- | :--- | :--- | :--- |
| Contact Form Submit | Submits successfully, redirects or shows success state, receives email. | [ ] | | |
| Lead Status Update | Can change lead status (e.g., from 'New' to 'Contacted') in admin. | [ ] | | |
| Organization Create | New B2B client created successfully. | [ ] | | |
| Batch Create | New training batch created under an organization. | [ ] | | |
| Participant Add | Manual participant addition succeeds. | [ ] | | |
| Participant CSV Import | Bulk upload works, errors on invalid rows gracefully. | [ ] | | |
| Grant Access | Triggers enrollment creation accurately. | [ ] | | |
| Revoke Access | Revokes access safely (doesn't revoke PAID source). | [ ] | | |
| Batch Report CSV Export | File downloads correctly with expected headers and data. | [ ] | | |
