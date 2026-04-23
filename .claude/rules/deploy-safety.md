# Rule: Deploy Safety

## Before Any Push to This Venture

1. Run `npm run build` — it must exit 0
2. Confirm Daniel has said "ready to deploy" for production changes
3. Preview deploys are always fine; production requires explicit sign-off

## WorthMore-Specific (LIVE product)
- Always run `npm run build` from `~/Desktop/ventures/worthmore` before ANY commit
- Never drop or rename a column without a migration that pairs with immediate Vercel redeploy
- Never change Stripe production keys without Daniel's confirmation

## Database Migrations
- Additive migrations (new tables, new columns) are safe to run
- Destructive migrations (DROP, RENAME COLUMN, TRUNCATE) require Daniel's sign-off
- Every migration file must be committed before the app code that uses it
- Supabase service role key = server only, never in NEXT_PUBLIC_ env vars
