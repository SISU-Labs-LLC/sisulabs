# SisuLabs.llc

The Sisu Labs corporate site — public-facing portfolio listing all active ventures and Daniel's founder story at sisulabs.llc.

## Stack
- Next.js 14 (App Router) on Vercel
- Supabase project: shared — prefix `sl_`
- Stripe: no
- Shared packages: @sisu-labs-llc/auth, @sisu-labs-llc/supabase, @sisu-labs-llc/rate-limit

## Layout
- app/           # routes
- lib/           # venture-specific utilities
- .claude/rules/ # lazy-loaded rules (globs: frontmatter)
- AGENTS.md      # symlink → CLAUDE.md

## Commands
- npm run dev    # local dev
- npm run build  # verify build
- npm test       # run tests
- vercel --prod  # manual deploy (CI handles normal deploys)

## Conventions
- Named exports only
- Zod validation on every route handler input
- Never commit .env files
- Shared utilities go to sisu-ops/packages/ — never inline duplicate
- Cron schedules live in vercel.json, not in code

## Cascade
- Global:  ~/.claude/CLAUDE.md
- Org:     sisu-ops/CLAUDE.md (load via: /add-dir ~/Desktop/sisu-ops)
- Venture: this file
- Lazy:    .claude/rules/*.md (globs: frontmatter)

## Don't
- Don't use @-imports in ~/.claude/CLAUDE.md (Claude Code issue #8765)
- Don't use `paths:` in rule frontmatter — use `globs:` only
- Don't upgrade @sisu-labs-llc/* packages without updating sisu-ops/packages/<pkg>/CHANGELOG.md

## Links
- Vercel:   https://vercel.com/sisu-labs/sisulabs
- Supabase: https://supabase.com/dashboard (ask Daniel for project URL)
- Ops:      https://github.com/SISU-Labs-LLC/sisu-ops
