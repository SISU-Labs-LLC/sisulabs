# Rule: Model Routing

All Claude API calls in this venture must follow the Sisu Labs model routing policy.

| Model | Use cases | Never use for |
|-------|-----------|---------------|
| `claude-haiku-4-5-20251001` | Monitoring, classification, triage, bulk, low-cost | Agent decisions, writing |
| `claude-sonnet-4-6` | Writing, strategy, customer-facing agents, code gen | Routine classification |
| `claude-opus-4-6` | ONLY explicitly approved WorthMore ROV paths (R07) | Any automated/cron agent |

**How to apply:**
```ts
// Good
const CLASSIFY_MODEL = 'claude-haiku-4-5-20251001';
const WRITE_MODEL    = 'claude-sonnet-4-6';

// Bad — Opus in a cron
const model = 'claude-opus-4-6'; // ❌ not approved for this venture
```

If you find an Opus call in a cron or automated agent in this codebase, flag it and replace with Sonnet.
