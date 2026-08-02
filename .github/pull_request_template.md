## Scope
- [ ] Change is limited to the stated goal
- [ ] No synthetic proof, testimonial, metric, or credential was introduced

## Security and data
- [ ] Authentication, authorization, validation, and rate limiting reviewed
- [ ] No secret, PII, signed URL, or provider payload is logged/returned
- [ ] Migration is backward-compatible and has a rollback/restore point

## Verification
- [ ] `npm run quality:gate:core`
- [ ] `npm run build`
- [ ] Critical browser flow tested
- [ ] Accessibility and responsive behavior reviewed

## Release
- [ ] Environment variables documented
- [ ] Feature flags remain fail closed unless separately approved
- [ ] Monitoring and rollback owner identified
