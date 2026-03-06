# Security notes

## Current status

- No database is used in this frontend, so SQL injection is not applicable here
- Real secrets are not stored in committed source files
- Dynamic UI rendering avoids direct HTML injection for content cards and FAQ items

## Recommended deployment headers

If you deploy this app behind a web server or hosting platform, also send these HTTP headers:

- `Content-Security-Policy`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security` on HTTPS deployments

## Secrets

- Keep API keys in server-side environment variables only
- Do not place secrets in `index.html`, `script.js`, or client-exposed JSON
- Use `.env.example` only for placeholders
