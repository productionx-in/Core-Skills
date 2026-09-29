# Working rules

Skill toolkit: 100 skills in `.claude/skills/`, published as a plugin marketplace
(`.claude-plugin/marketplace.json`). Keep this file short — it loads every session.

## Pick the profile, not everything

Installing `one-man-army` costs ~13,500 tokens of skill descriptions every
session. Focused plugins cost a fraction, with no loss of depth in their area:

| Work | Install | Cost | Saving |
| --- | --- | --- | --- |
| Backend / API / infra | `backend` | ~370 | 98% |
| Design / UI | `design` | ~620 | 96% |
| Brand identity | `brand` | ~3,750 | 73% |
| Growth / campaigns | `marketing` | ~8,500 | 38% |
| Utilities only | `toolkit` | ~265 | 99% |
| Mixed / unknown | `one-man-army` | ~13,500 | — |

Combine narrow ones rather than defaulting to everything: `brand` + `design` for
identity work, `backend` + `toolkit` for a build with browser testing.

The bodies are the real weight (~249k tokens across all 100, median ~2,200 each)
but load one at a time on trigger. Breadth is cheap; **loading the wrong skill is
not** — that is a whole body wasted plus a wrong answer.

## Invoke skills by name when you know which

With 100 skills sharing vocabulary, description-matching sometimes picks a
neighbour. When the target is known, name it: `/cro`, `/postgres-patterns`,
`/brand-voice`. Reserve description-matching for genuine discovery.

Known near-neighbours. Each pair below now carries an explicit pointer in its
description, so routing is usually automatic — name one directly only if the
wrong one still fires:

- `brand` ↔ `brand-voice` / `brand-messaging` / `brand-identity` /
  `brand-guidelines` — applying an existing brand vs defining a new one
- `ads` ↔ `google-ads` / `meta-ads` — cross-platform strategy vs platform execution
- `marketing-research` ↔ `customer-research` / `competitor-profiling` —
  researching a market from scratch vs analysing material you already hold
- `cro` ↔ `signup` ↔ `onboarding` — page conversion vs registration vs activation
- `competitors` ↔ `competitor-profiling` — comparison pages vs research dossiers
- `copywriting` ↔ `copy-editing` — new copy vs improving existing

Brand work starts with `/brand-context` — the other 26 brand skills read the file
it creates, and skipping it makes each re-ask the same questions.

## MCP servers cost more than skills

Connected servers expose several hundred tools. That dwarfs the entire skill
budget. Disconnecting servers a project does not use saves more than any skill
pruning — check this before optimising skills.

## Maintenance

`marketplace.json` lists all 100 skill paths explicitly. **Regenerate it whenever
skills are added or removed** — a path pointing at a deleted directory is the
likely failure mode. Verify after any change:

```bash
python3 -c "import json,os;m=json.load(open('.claude-plugin/marketplace.json'));\
print([s for p in m['plugins'] if isinstance(p['source'],str) for s in p.get('skills',[]) \
if not os.path.isfile(os.path.join(s[2:],'SKILL.md'))] or 'all paths OK')"
```

Provenance, licences and rejected-repo notes live in `.claude/skills/README.md`.
Three skills are unlicensed upstream — fine locally, but drop them from
`marketplace.json` before sharing the marketplace publicly.
