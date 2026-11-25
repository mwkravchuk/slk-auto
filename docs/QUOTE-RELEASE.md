# Quote system V1

Email-only intake; no database. Demo and live are separate Vercel projects.

## Environment variables
- SLK_SITE_VARIANT: full or holding
- SLK_EMAIL_MODE: test or live; unset disables sending
- SLK_TEST_EMAIL: designated test inbox (demo only)
- SLK_QUOTE_TO_EMAIL: business inbox (live)
- SLK_QUOTE_FROM_EMAIL: verified sender
- RESEND_API_KEY: server-only sending key
- NEXT_PUBLIC_TURNSTILE_SITE_KEY: public widget key
- TURNSTILE_SECRET_KEY: server-only widget secret
- TURNSTILE_EXPECTED_HOSTNAME: exact public hostname

Demo uses a managed widget restricted to demo.slkautorepair.com. Preview URLs are intentionally not enabled. Before merging to main, create a separate production widget for www.slkautorepair.com, configure the production project's variables, and verify sender and recipient. Never commit secrets. For local integration testing use Cloudflare's official test keys and matching test hostname; never deploy them to a public live environment.

## Release checks
- Build/typecheck.
- Submit fictional quote via demo; confirm exactly two test messages arrive at designated inbox and no real customer gets mail.
- Check mobile layout, expired challenge recovery, and blocked-script failure.
- Verify API rejects missing/invalid/replayed token, malformed or oversized payload, and unknown service.
- Retry unchanged submission after simulated lost response, with fresh challenge; verify no duplicate owner/customer messages during Resend idempotency window.
- Check structured logs for submission ID and accepted message IDs, no customer PII.
- Verify Resend delivery events and Reply-To behavior.
- Verify DNS DMARC and choose policy with domain owner.
- Evaluate Vercel firewall rate limiting before production; Turnstile is not a request quota.
- Confirm demo and production deployment targets before promotion.

## Known limits
Submission IDs are held in the mounted browser form, not persisted across reloads. Resend idempotency is time-limited. Owner email acceptance is the success criterion; confirmation failure is logged, not retried automatically. No durable lead record exists if delivery later fails. No extra storage is intentionally used. 
