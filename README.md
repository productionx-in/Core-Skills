<h1 align="center">Production X · Skills</h1>

<p align="center"><sub>productionxin/Assets · maintained by Production X</sub></p>

<p align="center">
  <strong>Production X's working toolkit — 100 skills for brand, marketing, design and backend, installable into any project as a Claude Code plugin.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Production%20X-toolkit-C9A84C.svg" alt="Production X toolkit"/>
  <img src="https://img.shields.io/badge/skills-100-8A2BE2.svg" alt="100 skills"/>
  <img src="https://img.shields.io/badge/install-plugin%20marketplace-blue.svg" alt="Plugin marketplace"/>
  <img src="https://img.shields.io/badge/licences-MIT%20%2F%20Apache--2.0-brightgreen.svg" alt="Licences"/>
</p>

---

## Install

Run these once, from any project:

```
/plugin marketplace add productionxin/Assets
/plugin install one-man-army@productionx-skills
```

All 100 skills are then available on that machine. `/plugin marketplace update` pulls later changes.

Working inside this repository, they load automatically — no install needed.

## What's in it

| Group | Count | Covers |
| --- | --- | --- |
| **Marketing** | 51 | SEO, ads, copywriting, email, CRO, pricing, positioning, analytics, social, PR, lifecycle, competitor research, CRM automation |
| **Brand** | 27 | Strategy, architecture, naming, identity, voice, messaging, story, audit, measurement, rebranding, launch, D2C/B2B/personal-brand playbooks |
| **Backend** | 10 | API design, PostgreSQL, Redis, migrations, FastAPI, Docker, deployment, CI/CD, DevOps |
| **Design** | 7 | UI/UX intelligence (84 styles, 161 palettes, 73 font pairings), Tailwind/shadcn, design tokens, slides, banners |
| **Research** | 3 | Competitor ad extraction, domain brainstorming, tweet optimisation |
| **Build & test** | 2 | Playwright web-app testing, artifact theming |

👉 **[Full catalogue, grouped by topic →](.claude/skills/README.md)**
👉 **[See it in action — a Production X landing page →](examples/)**

The marketing skills draw on [`.claude/tools/`](.claude/tools/) — a 161-file integration reference (Google Ads, GA4, Segment, Customer.io, Apollo, Clay and more) indexed by [`REGISTRY.md`](.claude/tools/REGISTRY.md). It isn't a skill, and must stay at that path for the skills' relative links to resolve.

## Install only what a project needs

`one-man-army` loads all 100 — measured at ~13,700 tokens of descriptions per session. On a focused project, install a narrower plugin:

| Work you're doing | Install | Skills | Always-on cost | Saving |
| --- | --- | --- | --- | --- |
| Backend, API, infra | `backend@productionx-skills` | 10 | ~370 | **98%** |
| Utilities only | `toolkit@productionx-skills` | 5 | ~265 | **99%** |
| Design, UI | `design@productionx-skills` | 7 | ~720 | **95%** |
| Brand identity | `brand@productionx-skills` | 27 | ~3,750 | **73%** |
| Growth, campaigns | `marketing@productionx-skills` | 51 | ~8,500 | **38%** |
| Mixed or unknown | `one-man-army@productionx-skills` | 100 | ~13,700 | — |

Costs are measured, not estimated. Depth inside a plugin is identical to the full set — you lose reach, never quality. Combining two narrow ones still wins: `brand` + `design` is ~4,370 against ~13,500.

**The bigger lever is MCP servers.** Connected servers expose several hundred tools, which dwarfs the entire skill budget. Disconnecting ones a project doesn't use saves more than any skill pruning.

See [`CLAUDE.md`](CLAUDE.md) for the working rules — profile selection, naming skills directly to avoid mis-triggering, and known near-neighbour pairs.

## One external plugin

```
/plugin install digital-marketing-pro@productionx-skills
```

[digital-marketing-pro](https://github.com/indranilbanerjee/digital-marketing-pro) (158 skills, MIT) is **referenced from upstream, not copied here** — it's a coupled platform with its own `~/.claude-marketing/` state, so forking it would break and freeze it. It adds client/agency operations, CRM sync, localisation and reputation management.

Install it *instead of* `marketing` on a given project, not alongside — they overlap heavily and together run to ~244 skills. See [the notes](.claude/skills/README.md#external-plugins).

## Notes

- **No dependencies.** Marketing and brand skills are pure markdown; the design skills' Python uses the standard library only.
- **`.claude/tools/` travels with the plugin** — all 96 integration links resolve from the installed copy, verified against a fresh checkout.
- **Manual alternative.** `cp -r Assets/.claude/skills/* ~/.claude/skills/` and `cp -r Assets/.claude/tools ~/.claude/tools` works too, but it's per-machine, unversioned, and needs redoing on every update.
- **Three skills are unlicensed upstream** — fine locally, but drop them from `marketplace.json` before sharing the marketplace publicly. See [the notes](.claude/skills/README.md#unlicensed-skills).
- **Two skills were audited out** — `design` (duplicated `slides`/`banner-design`, needed a Gemini API key) and `agentic-command-center` (declines to write code for the rest of any conversation it enters). See [the audit notes](.claude/skills/README.md#removed-after-audit).

## Licence

The toolkit is **© 2026 Production X**, MIT — see [`LICENSE`](LICENSE). That covers what Production X built: the curation, the plugin marketplace, the working rules, the documentation and the examples.

The individual skills are third-party works redistributed under their own licences, which are kept intact in [`.claude/skills/`](.claude/skills/). Assembling and maintaining the toolkit is Production X's; the components are credited below.

## Credits

Skills are vendored verbatim from permissively licensed projects. Each source, version and licence is recorded in [`.claude/skills/README.md`](.claude/skills/README.md), along with what was rejected and why. [marketingskills](https://github.com/coreyhaines31/marketingskills) (Corey Haines) · [Brand-building-skills](https://github.com/arnabbagxd/Brand-building-skills) (Arnab Bag) · [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (nextlevelbuilder) · [everything-claude-code](https://github.com/affaan-m/everything-claude-code) · [claude-office-skills](https://github.com/claude-office-skills/skills) · [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) · [claude-marketing-research-skill](https://github.com/ishwarjha/claude-marketing-research-skill)

