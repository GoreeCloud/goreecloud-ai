# GoreeCloud AI

Native GoreeCloud-owned AI application for private conversations, Workspaces, knowledge/RAG direction, research, tools, agents, files, artifacts, and locally operated intelligence.

> **Development status:** Milestone 0 foundation under active development. This repository is not production-ready or Stable-qualified.

## Project records

- [Specifications](SPECIFICATIONS.md)
- [Features](FEATURES.md)
- [Benefits](BENEFITS.md)
- [Competitive objectives](COMPETITIVE-OBJECTIVES.md)
- [User manual](USER-MANUAL.md)
- [Branding authority](BRANDING.md)

## Product boundary

GoreeCloud AI is an original first-party GoreeCloud application rather than a reskinned third-party AI interface. The intended permanent component relationship is:

- **GoreeCloud AI** — conversations, Workspaces, knowledge/RAG, files, tools, agents, artifacts, research orchestration, model-role selection, and the user-facing product.
- **Ollama** — replaceable local model-execution runtime.
- **GoreeCloud Search** — first-party current-information and Internet-research provider.
- **GoreeCloud Identity** — identity, authentication, sessions, credentials, and delegated authority.
- **Wardveil Security** — protection, trust, scanning, policy, verification, and response boundaries.
- **Privacy Shield** — privacy, consent, purpose, data-use, and minimization authority.
- **Everkeep** — backup, restore, recovery, preservation, portability, succession, and continuity authority.
- **GoreeCloud Mesh** — cross-system coordination, governance, and evidence transport.
- **Glaze UI** — visual, interaction, accessibility, responsive, and design-system authority.

Open WebUI, AnythingLLM, SearXNG, individual model names, and individual scanner engines are replacement targets/infrastructure rather than permanent product boundaries.

## Current implementation

The repository includes:

- React + TypeScript + Vite client and responsive conversation shell.
- Adaptive navigation/context panel, system light/dark appearance, reduced-motion support, and first-party dialogs.
- Backend-owned Ollama discovery and streaming NDJSON chat with cancellation, timeout, and upstream failure isolation.
- Stable GoreeCloud model-role abstraction mapped to replaceable installed Ollama models.
- Persistent conversations with rename, delete, edit/resubmit, regeneration, branching, and explicit lineage metadata.
- Native Workspaces with instructions, default model role, file references, knowledge/tool placeholders, and research preferences.
- Private attachment staging, restrictive permissions, SHA-256 binding, metadata, per-file/count/aggregate quotas, storage usage, deletion, and Workspace reference reconciliation.
- Node-native Wardveil artifact trust gate with exact resource/digest binding, current authoritative clean evidence, post-scan rehashing, fail-closed unavailable/unknown behavior, and non-destructive quarantine handoff state.
- Explicit attachment trust states: Verified, Unverified, Held, and Blocked.
- Passive post-Wardveil text extraction for released UTF-8 text, Markdown, and JSON with source-digest revalidation and private derived records.
- Read-only knowledge-eligibility assessment that makes blocking/pending gates visible without authorizing indexing, retrieval, or model context.
- Independent Python Wardveil artifact-intake reference contract and validation suite.
- An opt-in live runtime validator for the first-party health/model-discovery path and optional streamed Ollama chat through the GoreeCloud AI backend.
- Unified GoreeCloud branding authority reference.

The current development server deliberately has no fabricated Wardveil scanner transport. Default uploads therefore remain private/staged and `unverified`; they cannot enter text extraction or AI context.

## Architecture

```text
Browser / native client
        |
        v
GoreeCloud AI backend
        |
        +-- Identity session/service authority                  [planned]
        +-- conversation persistence                            [foundation]
        +-- Workspace persistence                               [foundation]
        +-- private attachment staging + trust state            [foundation]
        +-- Wardveil artifact runtime gate                      [source foundation]
        +-- authenticated Wardveil Scan transport               [planned]
        +-- passive text extraction                             [foundation]
        +-- knowledge-eligibility observation                   [foundation]
        +-- chunking / embeddings / indexing / RAG              [planned]
        +-- Privacy Shield decisions/evidence                   [planned]
        +-- Everkeep lifecycle/recovery                         [planned]
        +-- GoreeCloud Search research                          [planned]
        +-- GoreeCloud Mesh integration                         [planned]
        +-- Ollama adapter                                      [foundation]
                 |
                 v
              Ollama
```

Clients do not connect directly to Ollama or ClamAV.

## Attachment trust and extraction

Upload flow:

```text
untrusted bytes
  -> private staging
  -> SHA-256 binding
  -> Wardveil Scan decision contract
  -> evidence validation
  -> post-scan SHA-256 recheck
  -> released OR retained staged
```

`server/artifact-security.mjs` enforces the native trust transition. Unknown, unsupported, stale, expired, malformed, mismatched, non-authoritative, or scanner-unavailable evidence fails closed. Suspicious content is held. Malicious content is blocked and can produce a non-destructive quarantine handoff request that still requires separate executor authority.

A clean malware result is not permission to execute code, load models, run tools, deserialize unsafe content, or publish data.

### Passive text extraction

`POST /api/files/:id/extraction` is a separate post-release gate. It accepts only attachments that are `available`, stored in `released` state, and whose Wardveil decision allows both release and context-oriented use.

Before parsing, the released bytes are re-hashed and must still match the accepted attachment digest. The initial media-type allowlist is intentionally small:

- `text/plain`
- `text/markdown`
- `text/x-markdown`
- `application/json`

The parser uses fatal UTF-8 decoding, rejects unsupported control bytes, requires JSON to parse, and enforces `MAX_TEXT_EXTRACTION_BYTES`. Extracted text is stored as private mode-`0600` application data bound to the source resource/digest plus its own SHA-256 digest.

PDF, HTML, Office documents, archives, scripts, executables, models, tools, images, audio, video, and other parser-complex/active formats are excluded from this first boundary.

Extraction is not chunking, embedding, indexing, retrieval, RAG eligibility, model-context authorization, Privacy Shield authorization, or external-processing permission.

### Knowledge eligibility observation

`GET /api/files/:id/knowledge-eligibility` reports the current gates that would have to be satisfied before a future knowledge pipeline could use an attachment. It is read-only and does not create derived content or advance the file into another lifecycle stage.

The current response reports Wardveil state, safe-extraction state, GoreeCloud Identity authorization state, Privacy Shield authorization state, and whether indexing, retrieval, and model-context stages exist. Even when Wardveil release and a digest-bound extraction are satisfied, the current source reports:

- `eligibleForIndexing: false`
- `eligibleForRetrieval: false`
- `eligibleForModelContext: false`

Identity and Privacy Shield authorization remain pending; indexing, retrieval, and model-context authorization remain disabled/not implemented. This prevents a readiness display from becoming an accidental authorization bypass.

See `docs/WARDVEIL_ARTIFACT_SECURITY.md`, `docs/ATTACHMENT_LIFECYCLE.md`, and `USER-MANUAL.md`.

## API foundation

```text
GET    /api/health
GET    /api/ollama/models
POST   /api/ollama/chat

GET    /api/conversations
POST   /api/conversations
GET    /api/conversations/:id
PATCH  /api/conversations/:id
DELETE /api/conversations/:id

GET    /api/workspaces
POST   /api/workspaces
GET    /api/workspaces/:id
PATCH  /api/workspaces/:id
DELETE /api/workspaces/:id

GET    /api/files
POST   /api/files
GET    /api/files/:id
DELETE /api/files/:id
POST   /api/files/:id/extraction
GET    /api/files/:id/extraction
GET    /api/files/:id/knowledge-eligibility
```

The current JSON/local-file adapters are development persistence boundaries, not the final multi-user database design.

## Model roles

GoreeCloud AI presents stable functional roles while keeping individual model implementations replaceable:

| GoreeCloud role | Intended function | Initial candidate family |
| --- | --- | --- |
| GoreeCloud Assistant | General conversation and assistance | Qwen 3.5 |
| GoreeCloud Reasoner | Complex reasoning, architecture, and research | GPT-OSS |
| GoreeCloud Engineer | Infrastructure engineering, coding, and configuration | Qwen3-Coder |
| GoreeCloud Utility | Lightweight and recurring AI processing | Qwen3 |
| GoreeCloud Embeddings | Semantic retrieval and future RAG indexing | Qwen3-Embedding |
| GoreeCloud Vision | Optional specialized visual analysis | Gemma-family candidate |
| GoreeCloud Second Opinion | Optional independent reasoning/validation | DeepSeek-R1-family candidate |

Candidate models are not permanent dependencies.

## Environment

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `8787` | Local backend port. |
| `OLLAMA_URL` | `http://127.0.0.1:11434` | Ollama address visible to the backend. |
| `GOREECLOUD_AI_API_TOKEN` | unset | Optional development direct-API bearer; not final Identity. |
| `GOREECLOUD_AI_DATA_DIR` | `./data` | Local private persistence/staging/released/extraction root. |
| `MAX_BODY_BYTES` | `1000000` | Maximum JSON request body. |
| `MAX_FILE_BYTES` | `26214400` | Maximum attachment size. |
| `MAX_FILE_COUNT` | `1000` | Development attachment-record limit. |
| `MAX_TOTAL_FILE_BYTES` | `1073741824` | Development aggregate attachment limit. |
| `MAX_TEXT_EXTRACTION_BYTES` | `2097152` | Maximum source bytes accepted by passive extraction. |
| `REQUEST_TIMEOUT_MS` | `120000` | Ollama upstream timeout. |

Do not commit `.env`, `data/`, or reusable credentials.

## Local development

```bash
npm install
cp .env.example .env
npm run dev:server
```

Run the Vite client separately:

```bash
npm run dev
```

## Validation

```bash
npm run check
npm run check:server
npm run test:server
npm run build
python3 scripts/test_ai_artifact_security.py
python3 scripts/validate_wardveil_ai_integration.py
```

Native tests cover Wardveil clean release, unavailable scanner behavior, malicious handoff, expired evidence, post-scan mutation, restrictive storage, quotas, deletion/reference cleanup, passive-text extraction eligibility, digest mismatch, invalid UTF-8/JSON, parser allowlist behavior, extraction cleanup, and non-authorizing knowledge-eligibility gate behavior.

### Live application/runtime validation

Run the first-party runtime validator against an approved test endpoint:

```bash
GOREECLOUD_AI_URL=http://127.0.0.1:8787 npm run validate:runtime
```

The base validation requires GoreeCloud AI health and Ollama model discovery through the application backend. If the backend uses the current development direct-API bearer, provide `GOREECLOUD_AI_API_TOKEN` through protected runtime configuration; the validator does not print it.

To exercise one real streamed model request through the backend, explicitly select an installed model:

```bash
VALIDATE_OLLAMA_MODEL='<installed-model-id>' npm run validate:runtime
```

The validator requires assistant content chunks plus a terminal `done` event but does not print the generated model response. `VALIDATE_REQUIRE_WARDVEIL_SCANNER=true` can be used only in an environment that is expected to expose an authenticated Wardveil scanner transport; the validator fails if the application reports the scanner as unconfigured instead of manufacturing positive evidence.

`npm run check:server` syntax-checks the runtime validator and knowledge-eligibility module alongside the server modules.

Successful source checks or runtime validation do not establish Wardveil/Privacy Shield/Everkeep/Identity/Mesh production acceptance, recoverability, exact Glaze UI conformance, deployment readiness, or Stable qualification.

## Platform-system acceptance

- **Glaze UI:** mandatory target is current Stable Glaze UI 2.0.0; GoreeCloud AI exact-revision consumer acceptance remains pending.
- **Wardveil Security:** source trust enforcement exists; deployed authenticated Scan transport and AI consumer production acceptance remain pending.
- **Privacy Shield:** remains authoritative for whether files/extractions/conversations may be used, retained, transferred, sent to models, researched, or externally processed. The knowledge-eligibility surface explicitly leaves this authorization pending.
- **Everkeep:** attachment/extraction retention, export, backup, restore, recovery, preservation, portability, and succession remain pending application-specific acceptance.
- **GoreeCloud Identity:** production sessions, service identity, multi-user authorization, and delegated authority remain pending. The knowledge-eligibility surface explicitly leaves this authorization pending.
- **GoreeCloud Mesh:** cross-system capability/evidence coordination remains pending.

## Roadmap

1. Execute and record live application-to-Ollama validation in the intended environment using the bounded runtime validator.
2. Implement authenticated GoreeCloud AI-to-Wardveil Scan transport and exact-runtime clean/malicious/unavailable acceptance without bypassing the native trust gate.
3. Complete GoreeCloud Identity-backed authenticated sessions and production persistence boundaries.
4. Continue Glaze UI 2.0.0 migration and collect exact consumer conformance evidence.
5. Add separately reviewed parsers and provenance only for content formats whose security/privacy boundaries are defined.
6. Implement Privacy Shield and Identity authorization inputs for the future knowledge pipeline before enabling chunking, embeddings, indexing, retrieval, citations, or model-context use.
7. Implement native RAG with Workspace/permission filtering only after those gates are authoritative.
8. Integrate GoreeCloud Search for current-information research.
9. Add Wardveil-governed tools and agents.
10. Implement Everkeep export, backup, restore, retention, portability, and continuity state.
11. Connect GoreeCloud Mesh contracts and broader first-party interoperability.
12. Complete visual-identity approval and synchronized derivatives through the unified branding repository.
13. Add runtime/interaction tests, deployment, monitoring, and production-readiness evidence.

## Visual identity

The canonical branding authority is `GoreeCloud/goreecloud-branding-assets`; see `BRANDING.md`. Local artwork is a synchronized consumer derivative and does not establish capability or release claims.

## License

GNU Affero General Public License v3.0. See `LICENSE`.
