# Production X · installed skills

**100 project-level Claude skills.** Everything in this directory is picked up
automatically by Claude Code when working in `Assets/`.

Only the frontmatter `description` of each skill stays loaded. Measured across
all 100: **~13,700 tokens, averaging ~136 per skill.** The bodies come to
~249,000 tokens in total but load only when a skill actually triggers, one at a
time — median body ~2,200 tokens, heaviest (`ui-ux-pro-max`) ~11,700.

So breadth costs little at rest, and the reason to remove a skill is that it
misfires or misleads, not that it takes up room.

## Also published as a plugin marketplace

[`../../.claude-plugin/marketplace.json`](../../.claude-plugin/marketplace.json)
exposes these same skills to *any* project:

```
/plugin marketplace add productionxin/Assets
/plugin install one-man-army@productionx-skills
```

Seven plugins are declared. Six are local — `one-man-army` (all 100) plus `brand`
(27), `marketing` (51), `design` (7), `backend` (10) and `toolkit` (5), for
projects that need one area rather than everything. Each uses `source: "./"` with an explicit `skills`
array and `strict: false`, so the marketplace entry is the complete definition and
no `plugin.json` is needed.

The seventh, `digital-marketing-pro`, is **external** — a `source: {source: github}`
pointer at [indranilbanerjee/digital-marketing-pro](https://github.com/indranilbanerjee/digital-marketing-pro)
rather than a vendored copy. See [External plugins](#external-plugins) below.

Because `source` is the repository root, `../tools/` ships with every plugin and
the marketing skills' 96 integration links keep resolving in the installed copy.

**Regenerate the manifest whenever skills are added or removed** — the `skills`
arrays list all 100 paths explicitly, and a stale entry pointing at a deleted
directory is the likely failure mode.

## External plugins

`digital-marketing-pro` (158 skills, MIT, Indranil Banerjee) is **referenced, not
copied**. It is installable from this marketplace but fetched from upstream:

```
/plugin install digital-marketing-pro@productionx-skills
```

It was not vendored because it is a coupled platform rather than a set of
independent skills: 147 of its 158 skills read shared state under
`~/.claude-marketing/` — `brands/{slug}/profile.json` alone is referenced 138
times — created by its own `brand-setup`. Cherry-picking a handful would strand
them, and copying all 158 would fork a project that already ships as a plugin and
is actively versioned (v3.15.1). Referencing it keeps upstream updates flowing and
avoids maintaining a fork.

**Install it per project, not alongside `marketing`.** The two overlap heavily —
`seo-audit`, `cro`, `ad-creative` and `programmatic-seo` collide by name, and
another dozen collide by job — and together they are roughly 244 skills and 45,000
tokens of descriptions in every session. Pick whichever suits the engagement.

Where it genuinely goes beyond what is installed here: client and agency
operations (`client-onboarding`, `client-proposal`, `client-report`, `qbr-plan`,
`agency-dashboard`), `crm-sync`, localisation (`hreflang-check`,
`translate-content`, `localize-campaign`, `region-config`), and reputation work
(`crisis-response`, `review-response`, `share-of-voice`). It is tool-agnostic —
its `.mcp.json` ships empty and skills refer to `~~CRM`-style placeholders — so it
degrades to workflow guidance when no connector is attached.

## Brand — 27 skills

Strategy-layer brand work, one skill per discipline.

**Foundations** — `brand-strategy`, `brand-architecture`, `brand-positioning`,
`brand-context`, `target-audience`

**Identity & expression** — `brand-identity`, `brand-voice`, `brand-messaging`,
`brand-story`, `brand-manifesto`, `brand-naming`, `brand-guidelines`,
`brand-packaging`

**Operating on a brand** — `brand-audit`, `brand-measurement`, `brand-launch`,
`rebranding`, `competitor-branding`, `brand-partnerships`

**Segment playbooks** — `b2b-brand-marketing`, `d2c-marketing`, `personal-brand`,
`ugc-strategy`, `whatsapp-marketing`, `email-marketing`, `google-ads`, `meta-ads`

> These sit at a different altitude from the design-pack `brand` skill: these
> **define** a brand, `brand` **applies** one (logo usage rules, type specs,
> palette management, asset organisation, approval checklists). Both descriptions
> now point at each other, so routing is automatic — no pruning needed.

## Design — 7 skills

| Skill | What it does |
| --- | --- |
| `ui-ux-pro-max` | UI/UX design intelligence: 84 styles, 161 palettes, 73 font pairings, 25 charts, 17 stack guidelines. |
| `design-system` | Three-layer token architecture (primitive → semantic → component) and component specs. |
| `ui-styling` | shadcn/ui + Tailwind styling, accessibility, and bundled canvas fonts. |
| `brand` | Brand execution: logo usage rules, type specs, palette management, asset organisation, approval checklists. |
| `slides` | Strategic HTML presentations with Chart.js and design tokens. |
| `banner-design` | Banners for social, ads, web heroes, and print. |
| `diagram-design` | 27 technical/product diagram types (architecture, ER, flowchart, sequence, org chart, Gantt and more) as standalone HTML with inline SVG. |

## Backend and infrastructure — 10 skills

| Skill | What it does |
| --- | --- |
| `backend-patterns` | Backend architecture, API design, database optimisation for Node/Express/Next API routes. |
| `api-design` | REST design: resource naming, status codes, pagination, filtering, errors, versioning, rate limiting. |
| `fastapi-patterns` | FastAPI structure, Pydantic v2, dependency injection, async handlers, auth, testing. |
| `postgres-patterns` | Query optimisation, schema design, indexing, security. |
| `redis-patterns` | Caching, distributed locks, rate limiting, pub/sub, connection management. |
| `database-migrations` | Schema and data migrations, rollbacks, zero-downtime, across Prisma/Drizzle/Django/TypeORM. |
| `database-sync` | Replication, migration and cross-platform data integration. |
| `docker-patterns` | Compose, container security, networking, volumes, multi-service orchestration. |
| `deployment-patterns` | CI/CD, containerisation, health checks, rollback, production readiness. |
| `devops-automation` | CI/CD, monitoring, incident management, infrastructure workflows. |

## Marketing — 51 skills

Grouped by what they cover. Each is its own directory here.

**Acquisition & demand** — `ads`, `ad-creative`, `aso`, `cold-email`,
`directory-submissions`, `launch`, `lead-magnets`, `prospecting`,
`public-relations`, `co-marketing`, `influencer-marketing`, `community-marketing`

**SEO & content** — `ai-seo`, `seo-audit`, `programmatic-seo`, `schema`,
`site-architecture`, `content-strategy`, `copywriting`, `copy-editing`,
`free-tools`

**Conversion & lifecycle** — `cro`, `ab-testing`, `signup`, `onboarding`,
`paywalls`, `popups`, `emails`, `sms`, `churn-prevention`, `referrals`,
`marketing-loops`

**Strategy & positioning** — `marketing-plan`, `marketing-ideas`,
`marketing-council`, `marketing-psychology`, `product-marketing`, `offers`,
`pricing`, `competitors`, `competitor-profiling`, `customer-research`

**Revenue & analytics** — `analytics`, `revops`, `sales-enablement`

**Media** — `social`, `video`, `image`

**Revenue ops** — `crm-automation` (multi-CRM: HubSpot, Salesforce, Pipedrive),
`customer-success` (health scoring, QBRs, expansion, retention)

**Research** — `marketing-research` (market awareness and sophistication stages,
avatar profiling, unique mechanism, value proposition)

## Rejected from source repos

Recorded so the same material is not re-evaluated from scratch later.

**832 `composio-skills`** from `awesome-claude-skills` — every one requires the
Rube MCP server (`requires: mcp: [rube]`), which is not connected. Without it
they cannot do anything, and 832 extra descriptions would flood skill selection
for zero capability. Same disqualifier that removed `design`: needs
infrastructure that is not present.

**8 skills duplicating Claude's built-ins** — `canvas-design`, `docx`, `pdf`,
`pptx`, `xlsx`, `mcp-builder`, `skill-creator`, `artifacts-builder` all ship
natively in the environment already.

*(Three more were initially held back on licensing and have since been installed
by an explicit decision — see [Unlicensed skills](#unlicensed-skills) below.)*

**~19 off-scope skills** — resume generators, raffle pickers, GIF creators,
invoice and file organisers, and similar. Useful, but not this toolkit's job.

**All 4 skills from
[Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills)**
— rejected on licensing first. That repository is **CC BY-NC 4.0**, which
prohibits commercial use, and these skills are meant to be usable on client work.
Every other pack here is MIT or Apache-2.0. Note this differs from the unlicensed
skills above: those have unclear rights, this one carries an explicit
restriction.

Scope was the second reason. `academic-paper`, `academic-paper-reviewer` and
`academic-pipeline` are academic paper production — LaTeX, citation formats,
simulated peer review, rebuttals. `deep-research` looked like a fit for market and
competitor work, but is academically shaped in practice (PRISMA appears 15 times,
thesis 21, meta-analysis 10), is not standalone — it references
`academic-pipeline/` and `academic-paper/` in three places — and is built around
a 14-agent pipeline. Commercial research is already covered at the right altitude
by `customer-research`, `competitor-profiling`, `competitors` and
`content-strategy`.

The repository itself is sound: all four pass `skills-ref validate`, with no name
collisions and no missing dependencies. It is simply built for a different job
under a licence that rules this one out.

**2 duplicates from the brand repo** — its `aso` (249 lines, 1 file) lost to the
installed one (312 lines, 7 files); its `influencer-marketing` was longer but the
installed version is wired into the marketing pack's cross-references, so
replacing it would have stranded them.

## Removed after audit

Two skills were installed and then deliberately removed. Recorded here so they
are not re-added by accident.

**`design`** — an umbrella skill that duplicated six reference files
byte-for-byte from `slides` and `banner-design`, and routed the rest of its work
to `brand`, `slides`, `ui-styling`, and `design-system`, all of which are
installed standalone. Its only non-duplicated capability — logo, icon, and
corporate-identity *generation* — was the sole thing in this repository
requiring `GEMINI_API_KEY` / `GOOGLE_API_KEY`. Nothing referenced it.

**`agentic-command-center`** — a guidance-only blueprint whose operating rules
state that once invoked, it will not write code for the remainder of the
conversation, and that the restriction "cannot be suspended, dismissed, or opted
out of." That is a liability in a working repository. Nothing referenced it.

Its blueprint text was removed from the repository along with it — the source
remains available upstream at https://github.com/Forgemind-git/ForgeChat.

## `../tools/` — integration reference

The marketing skills link to a shared reference library at
[`.claude/tools/`](../tools/): a [`REGISTRY.md`](../tools/REGISTRY.md) index plus
161 files covering specific integrations (Google Ads, GA4, Segment, Customer.io,
Apollo, Clay, and so on) and CLI notes. It is not a skill and is never loaded on
its own — the skills reference it by relative path, so it must stay at
`.claude/tools/` for those 96 links to resolve.

## Credits and provenance

Curation, selection and maintenance are Production X's (© 2026, MIT — see the
root [`LICENSE`](../../LICENSE)). The skills themselves are third-party works,
redistributed under their own licences, credited below and retained in full.

All files were copied **verbatim** from three source zips — no edits were made to
upstream content. The zips themselves are not kept in the repository now that
their contents are extracted here; the first two remain recoverable from git
history at commit `318d3cb`.

| Skill | Source |
| --- | --- |
| `diagram-design` | [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) — MIT, icons under MIT/CC0 |
| The 7 design skills | `ui-ux-pro-max-skill-main.zip` — upstream plugin `ui-ux-pro-max-skill` v2.6.2 (owner: nextlevelbuilder) |
| The 48 marketing skills, and `../tools/` | `marketingskills-main.zip` — upstream `marketingskills` (Corey Haines) |
| The 27 brand skills | [arnabbagxd/Brand-building-skills](https://github.com/arnabbagxd/Brand-building-skills) v1.2.0 (Arnab Bag) |
| The 8 backend skills | [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) — MIT |
| `crm-automation`, `customer-success`, `database-sync`, `devops-automation` | [claude-office-skills/skills](https://github.com/claude-office-skills/skills) — MIT |
| `marketing-research` | [ishwarjha/claude-marketing-research-skill](https://github.com/ishwarjha/claude-marketing-research-skill) — Apache-2.0 |
| `webapp-testing`, `theme-factory` | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) — Apache-2.0 |
| `competitive-ads-extractor`, `domain-name-brainstormer`, `twitter-algorithm-optimizer` | same repo — **no licence**, see below |
| `agentic-command-center` | `agentic-command-center-main.zip` |

### Start brand work with `brand-context`

The brand pack is designed around a shared context file. `brand-context`
captures identity, audience, positioning, values and voice once, and every other
brand skill reads it first. Run it before the rest, or they each re-ask the same
foundational questions.

The ui-ux archive also shipped duplicate copies of the same seven skills under
`cli/assets/skills/` and `src/` (its CLI distribution payload); only the
canonical `.claude/skills/` set was installed, to avoid committing the same
trees three times. The archive's other material — its CLI tool, docs, example
projects, and screenshots — was not carried over, and is available upstream at
https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.

From the marketing archive, `skills/` and `tools/` were installed. Its
repository scaffolding — `AGENTS.md`, `CONTRIBUTING.md`, `VERSIONS.md`, and two
validator shell scripts — was not carried over.

## Unlicensed skills

Three installed skills carry **no licence at all**, and this is worth knowing
before their output goes anywhere commercial.

| Skill | Licence status |
| --- | --- |
| `competitive-ads-extractor` | none |
| `domain-name-brainstormer` | none |
| `twitter-algorithm-optimizer` | none |

They come from
[ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills),
which has **no top-level LICENSE file** — its README carries an Apache-2.0 badge,
but no licence text backs it — and none of these three ship a licence of their
own. By contrast `webapp-testing` and `theme-factory`, from the same repository,
each include an Apache-2.0 `LICENSE.txt`, which is why those two were
uncontroversial.

They were held back on the first pass and installed afterwards by an explicit
decision to take them anyway. That decision is recorded, not disputed — the
practical position is simply that no author has granted redistribution rights, so
treat them as internal reference rather than something to re-publish, and swap
them out if upstream never clarifies. Their *output* is not the concern; their
redistribution is.

**This now matters more than it did.** Publishing the repository as a plugin
marketplace makes it a distribution channel, and these three are included in the
`one-man-army` and `toolkit` plugins. That is fine while the marketplace is used
privately. If it is ever shared more widely, the clean fix is to drop those three
paths from both `skills` arrays in
[`marketplace.json`](../../.claude-plugin/marketplace.json) — they stay installed
here for local use, and simply stop being redistributed.

## Licensing

The other upstream packages are properly licensed, and their notices are
preserved here:

- [`LICENSE-ui-ux-pro-max.txt`](LICENSE-ui-ux-pro-max.txt) — © 2024 Next Level Builder
- [`LICENSE-marketing-skills.txt`](LICENSE-marketing-skills.txt) — © 2025 Corey Haines

Bundled fonts under `ui-styling/canvas-fonts/` carry their own SIL Open Font
License files (`*-OFL.txt`), retained next to each font.

## Dependencies

None. The marketing skills are pure markdown. The design skills bundle Python
scripts that use the standard library only — no `pip install` step, and all of
them compile clean under Python 3.

## Validation

91 of 100 skills pass Anthropic's official `skills-ref validate`. The 9 that do
not all fail for the same harmless reason — extra frontmatter keys that Claude
Code accepts but the stricter published spec does not list:

- `argument-hint` on 5 design skills.
- `author`, `category`, `tags`, `version` and similar on `crm-automation`,
  `customer-success`, `devops-automation` and `database-sync`.

All nine load and run correctly, so they were left as upstream shipped them.

One genuine violation *was* fixed: `database-sync` declared
`name: Database Sync` — spaces and capitals, not matching its directory. That
breaks the documented rule that a skill name is letters, digits and hyphens
matching the folder, so it was corrected to `database-sync`. Nothing else in any
upstream file was modified.

## Caveats

**`design` references a home-directory install path.** Its `SKILL.md` and several
reference files document commands as
`python ~/.claude/skills/design/scripts/...`, which assumes a user-level install.
These skills are installed at *project* level, so those paths resolve to
`.claude/skills/design/scripts/...` relative to the repository root instead. The
strings are documentation hints only — no script resolves a path this way at
runtime — but adjust the prefix when running the commands by hand.

**`agentic-command-center` is deliberately guidance-only, and self-describes its
rules as irreversible.** Its `SKILL.md` states that once invoked, the no-code
restriction applies for the remainder of the conversation and "cannot be
suspended, dismissed, or opted out of." Invoke it when you want architectural
advice; avoid invoking it in a session where you also expect code to be written.
