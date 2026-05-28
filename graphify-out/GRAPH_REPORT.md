# Graph Report - won-vision  (2026-05-28)

## Corpus Check
- 69 files · ~249,277 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 132 nodes · 115 edges · 47 communities (43 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a332f670`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]

## God Nodes (most connected - your core abstractions)
1. `Wordmark()` - 12 edges
2. `update()` - 6 edges
3. `buildPrompt()` - 6 edges
4. `slugifyAddress()` - 5 edges
5. `add_para()` - 4 edges
6. `rpc()` - 4 edges
7. `buildSkyPrompt()` - 4 edges
8. `buildDuskPrompt()` - 4 edges
9. `add_eyebrow()` - 3 edges
10. `add_section_title()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `__wvBoot()` --calls--> `update()`  [INFERRED]
  public/script.js → app/book/cart/page.tsx
- `__wvBoot()` --calls--> `update()`  [INFERRED]
  public/script.js → app/components/OperateConveyor.tsx
- `buildPrompt()` --calls--> `buildDuskPrompt()`  [INFERRED]
  lib/fal/prompts.ts → lib/editor/dusk-variations.ts
- `buildPrompt()` --calls--> `buildSkyPrompt()`  [INFERRED]
  lib/fal/prompts.ts → lib/editor/sky-variations.ts
- `generateFromHelper()` --calls--> `buildPrompt()`  [INFERRED]
  lib/fal/client.ts → lib/fal/prompts.ts

## Communities (47 total, 4 thin omitted)

### Community 1 - "Community 1"
Cohesion: 0.26
Nodes (6): buildDuskPrompt(), buildSkyPrompt(), generate(), generateFromHelper(), pickModel(), buildPrompt()

### Community 2 - "Community 2"
Cohesion: 0.25
Nodes (7): add_eyebrow(), add_para(), add_section_title(), Generates Won Vision Brand Book.docx — a designer-facing brand document with the, Fill a table cell with a flat colour., set_run_font(), shade_cell()

### Community 3 - "Community 3"
Cohesion: 0.33
Nodes (5): addReel(), addSite(), remove(), update(), writeCart()

### Community 4 - "Community 4"
Cohesion: 0.48
Nodes (5): ensureFolder(), getAccessToken(), move(), rpc(), uploadFromUrl()

### Community 5 - "Community 5"
Cohesion: 0.73
Nodes (4): buildIntakePath(), buildProcessingPath(), buildReviewPath(), slugifyAddress()

### Community 6 - "Community 6"
Cohesion: 0.6
Nodes (3): esc(), handler(), inject()

### Community 10 - "Community 10"
Cohesion: 0.83
Nodes (3): exchangeAuthCode(), main(), refreshAccessToken()

## Knowledge Gaps
- **2 isolated node(s):** `Generates Won Vision Brand Book.docx — a designer-facing brand document with the`, `Fill a table cell with a flat colour.`
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Wordmark()` connect `Community 0` to `Community 3`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `update()` connect `Community 3` to `Community 8`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `__wvBoot()` connect `Community 8` to `Community 3`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `buildPrompt()` (e.g. with `buildDuskPrompt()` and `buildSkyPrompt()`) actually correct?**
  _`buildPrompt()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Generates Won Vision Brand Book.docx — a designer-facing brand document with the`, `Fill a table cell with a flat colour.` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._