# Rule: No Hardcoded Secrets

Never write API keys, tokens, passwords, or connection strings directly in code files.

**Required pattern:**
```ts
const key = process.env.MY_SECRET_KEY;
if (!key) throw new Error('MY_SECRET_KEY is not set');
```

**Banned patterns:**
- `const key = "sk-ant-..."` — hardcoded string
- `const key = "sbp_..."` — Supabase key
- `NEXT_PUBLIC_` prefix on any service-role key or private token

**Secrets management:**
- Local dev: `.env.local` (gitignored)
- Production: Vercel dashboard env vars
- Storage: Bitwarden (`~/.bitwarden/add-secret.sh`)
- Retrieval: `~/.bitwarden/get-secret.sh KEY_NAME`

Any new key that appears during a session must be saved to Bitwarden immediately.
