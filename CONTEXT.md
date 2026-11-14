# Facebook Wall — Context

A 2008-style Facebook Wall built for the capm.us challenge (Test 2).

## Glossary

- **Wall** — the single, public, shared feed. Everyone who opens the app sees the same wall; there are no per-user walls.
- **Post** — one message on the Wall. At most 280 characters, immutable once shared (no edit, no delete).
- **Share** — the act of publishing a Post to the Wall.
- **Author** — the self-declared display name attached to a Post. Not an account: there is no authentication, and the name is whatever the visitor typed. A Post shared with no name is authored by **"Anonymous"**. `user_id` on a Post is always null in this version.
- **Wall owner** — the person whose Wall this is (Juan Rodriguez). Purely presentational: the owner has no special powers, and everyone posts on the same Wall.
- **Feed** — the Posts of the Wall in reverse chronological order (newest first), updating live without a page refresh.
