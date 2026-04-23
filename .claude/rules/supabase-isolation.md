# Rule: Supabase Project Isolation

Each Supabase project is isolated. Never cross-write between projects.

| Project ID | Ventures | Notes |
|------------|---------|-------|
| `yvlapuhrobzexdrhdnix` | WorthMore, Brain, CoS, Forge, CourageRises | Shared project |
| `ujrrpnxfukmuwmsdaasc` | DegreeOS | Dedicated — never cross-write |
| `zivetrnpghruekpuspat` | danielmartin-board | Dedicated — never cross-write |

**Rules:**
- Migrations run against the venture's OWN project only
- `SUPABASE_SERVICE_ROLE_KEY` is the key for THIS venture's project — confirm before use
- Never use a service role key from another venture
- RLS policies must be set to `USING (auth.uid() = user_id)` or equivalent — never `USING (true)`
