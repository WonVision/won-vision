# Graph Report - wv-polish  (2026-05-26)

## Corpus Check
- 73 files · ~235,723 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 340 nodes · 395 edges · 89 communities (75 shown, 14 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 30 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f13db448`
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
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]

## God Nodes (most connected - your core abstractions)
1. `Wordmark()` - 25 edges
2. `processPhoto()` - 17 edges
3. `buildPrompt()` - 10 edges
4. `processProperty()` - 10 edges
5. `buildProcessingPath()` - 9 edges
6. `buildReviewPath()` - 9 edges
7. `createDraft()` - 9 edges
8. `submitProperty()` - 9 edges
9. `generate()` - 8 edges
10. `uploadFromUrl()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `generateIntermediate()` --calls--> `generate()`  [INFERRED]
  lib/workflow/process-photo.ts → /Users/kiranc/Code/won-vision/lib/fal/client.ts
- `generateAndUploadVariant()` --calls--> `generate()`  [INFERRED]
  lib/workflow/process-photo.ts → /Users/kiranc/Code/won-vision/lib/fal/client.ts
- `ensureDropboxFolders()` --calls--> `ensureFolder()`  [INFERRED]
  lib/workflow/process-property.ts → /Users/kiranc/Code/won-vision/lib/dropbox/client.ts
- `intakePhoto()` --calls--> `uploadFromUrl()`  [INFERRED]
  lib/workflow/process-property.ts → /Users/kiranc/Code/won-vision/lib/dropbox/client.ts
- `processPhoto()` --calls--> `buildProcessingPath()`  [INFERRED]
  lib/workflow/process-photo.ts → /Users/kiranc/Code/won-vision/lib/dropbox/paths.ts

## Communities (89 total, 14 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (4): BookPage(), WonVisionMark(), Wordmark(), TermsPage()

### Community 1 - "Community 1"
Cohesion: 0.17
Nodes (13): buildIntakePath(), buildProcessingPath(), buildReviewPath(), slugifyAddress(), batch(), orderServices(), ensureDropboxFolders(), intakePhoto() (+5 more)

### Community 2 - "Community 2"
Cohesion: 0.18
Nodes (20): ensureFolder(), getAccessToken(), getTemporaryLink(), move(), rpc(), uploadFromUrl(), qaVariant(), finalisePhotoStatus() (+12 more)

### Community 3 - "Community 3"
Cohesion: 0.15
Nodes (8): attachPhoto(), createDraft(), requireEditor(), submitProperty(), isStylePreset(), handleSubmit(), onCreateDraft(), onSubmit()

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (7): onTilt(), open(), schedule(), setHidden(), step(), update(), __wvBoot()

### Community 5 - "Community 5"
Cohesion: 0.2
Nodes (6): buildDuskPrompt(), buildSkyPrompt(), generate(), generateFromHelper(), pickModel(), buildPrompt()

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (6): onTilt(), open(), schedule(), setHidden(), step(), update()

### Community 7 - "Community 7"
Cohesion: 0.15
Nodes (6): onTilt(), open(), schedule(), setHidden(), step(), update()

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (3): formatAddress(), ensureDraft(), handleContinue()

### Community 9 - "Community 9"
Cohesion: 0.35
Nodes (10): add_eyebrow(), add_para(), add_section_title(), hr(), page_break(), Generates Won Vision Brand Book.docx — a designer-facing brand document with the, Fill a table cell with a flat colour., remove_table_borders() (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.48
Nodes (5): pruneSeen(), sign(), verify(), bad(), POST()

### Community 11 - "Community 11"
Cohesion: 0.53
Nodes (4): onKeyDown(), onPointerDown(), onPointerMove(), onPointerUp()

### Community 13 - "Community 13"
Cohesion: 0.6
Nodes (3): esc(), handler(), inject()

### Community 15 - "Community 15"
Cohesion: 0.8
Nodes (3): exchangeAuthCode(), main(), refreshAccessToken()

## Knowledge Gaps
- **1 isolated node(s):** `Fill a table cell with a flat colour.`
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `generate()` connect `Community 5` to `Community 2`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `processPhoto()` (e.g. with `buildProcessingPath()` and `buildReviewPath()`) actually correct?**
  _`processPhoto()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `buildPrompt()` (e.g. with `buildDuskPrompt()` and `buildSkyPrompt()`) actually correct?**
  _`buildPrompt()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `buildProcessingPath()` (e.g. with `ensureDropboxFolders()` and `processPhoto()`) actually correct?**
  _`buildProcessingPath()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Fill a table cell with a flat colour.` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._