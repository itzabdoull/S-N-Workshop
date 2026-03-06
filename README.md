# S-N-Workshop

## Environment variables

This project is a static frontend, which means real secret API keys must **not** be placed in `index.html`, `script.js`, or any client-side code.

### Safe setup

1. Copy `.env.example` to `.env`
2. Put only non-sensitive values in frontend config
3. Keep real API keys in a backend or serverless function
4. Make frontend requests to your backend using `API_BASE_URL`

### Important

- `.env` is ignored by git in `.gitignore`
- `.env.example` is safe to commit because it contains placeholders only
- Any key used directly in browser JavaScript is exposed to users

### Recommended pattern

- Frontend: calls your own API endpoint
- Backend/serverless: reads secrets from environment variables
- Third-party API: called only from the backend

## Security

- Client-side rendering has been hardened to avoid direct HTML injection
- Browser-side policy tags are set in `index.html`
- Deployment header guidance lives in `SECURITY.md`
