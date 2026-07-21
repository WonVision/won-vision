# Graph Report - won-vision  (2026-07-11)

## Corpus Check
- 78 files · ~560,407 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 190 nodes · 192 edges · 55 communities (49 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `52ba91e5`
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
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]

## God Nodes (most connected - your core abstractions)
1. `Wordmark()` - 12 edges
2. `set_font()` - 10 edges
3. `update()` - 7 edges
4. `buildPrompt()` - 6 edges
5. `priceForEditing()` - 5 edges
6. `clampRoomCount()` - 5 edges
7. `buildEditingPayload()` - 5 edges
8. `slugifyAddress()` - 5 edges
9. `patch()` - 4 edges
10. `add_para()` - 4 edges

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

## Communities (55 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.19
Nodes (10): blankState(), bump(), initialState(), patch(), setMode(), toggle(), buildEditingPayload(), clampRoomCount() (+2 more)

### Community 1 - "Community 1"
Cohesion: 0.18
Nodes (16): body(), bullet(), display(), eyebrow(), h2(), h3(), p(), quote() (+8 more)

### Community 2 - "Community 2"
Cohesion: 0.21
Nodes (11): addPhotoToVideo(), addReel(), addSite(), editLabel(), editScope(), fmt(), remove(), removeEditing() (+3 more)

### Community 4 - "Community 4"
Cohesion: 0.26
Nodes (6): buildDuskPrompt(), buildSkyPrompt(), generate(), generateFromHelper(), pickModel(), buildPrompt()

### Community 5 - "Community 5"
Cohesion: 0.25
Nodes (7): add_eyebrow(), add_para(), add_section_title(), Generates Won Vision Brand Book.docx — a designer-facing brand document with the, Fill a table cell with a flat colour., set_run_font(), shade_cell()

### Community 6 - "Community 6"
Cohesion: 0.48
Nodes (5): ensureFolder(), getAccessToken(), move(), rpc(), uploadFromUrl()

### Community 7 - "Community 7"
Cohesion: 0.73
Nodes (4): buildIntakePath(), buildProcessingPath(), buildReviewPath(), slugifyAddress()

### Community 8 - "Community 8"
Cohesion: 0.6
Nodes (3): esc(), handler(), inject()

### Community 14 - "Community 14"
Cohesion: 0.83
Nodes (3): exchangeAuthCode(), main(), refreshAccessToken()

## Knowledge Gaps
- **7 isolated node(s):** `Build Won Vision — Listing Video Scripts.docx Branded per docs/BRAND.md: Sora, p`, `ALL CAPS Sora 500 — H1 / brand voice carrier.`, `Pull-quote — for verbatim transcript lines.`, `Fill-in script — same indent as quotes, slightly larger.`, `Black 1px horizontal rule via bottom border.` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Wordmark()` connect `Community 3` to `Community 2`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `update()` connect `Community 2` to `Community 10`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `__wvBoot()` connect `Community 10` to `Community 2`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `buildPrompt()` (e.g. with `buildDuskPrompt()` and `buildSkyPrompt()`) actually correct?**
  _`buildPrompt()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Build Won Vision — Listing Video Scripts.docx Branded per docs/BRAND.md: Sora, p`, `ALL CAPS Sora 500 — H1 / brand voice carrier.`, `Pull-quote — for verbatim transcript lines.` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._