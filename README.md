# GoreeCloud AI

Native GoreeCloud AI platform for private conversations, Workspaces, knowledge and RAG, research, tools, agents, files, artifacts, and locally operated intelligence.

> **Development status:** Milestone 0 foundation under active development. This repository is not yet production-ready or Stable-qualified.

## Purpose

GoreeCloud AI is an original first-party GoreeCloud application built from the ground up. It is intended to become the unified user-facing AI experience and orchestration layer for GoreeCloud rather than a reskinned third-party AI interface.

The application is designed around local-first operation, explicit processing boundaries, first-party platform integration, portability, and the ability to evolve independently of any one model provider or external AI product.

## Product boundary

The intended permanent component relationship is:

- **GoreeCloud AI** — conversations, Workspaces, knowledge, RAG, files, tools, agents, artifacts, research orchestration, model-role selection, and the user-facing AI product.
- **Ollama** — private local model execution runtime.
- **GoreeCloud Search** — first-party current-information and Internet-research provider.
- **GoreeCloud Mesh** — coordination and governance plane for GoreeCloud application and service integration.
- **Glaze UI** — adaptive cross-platform interface and interaction system.
- **Wardveil Security** — evidence-backed security and protection boundaries for models, tools, files, Workspaces, and external content.
- **Privacy Shield** — processing-location, privacy-control, and data-minimization contracts and disclosures.
- **Everkeep** — export, backup, recovery, preservation, portability, succession, and continuity capabilities.

Open WebUI, AnythingLLM, and SearXNG are replacement targets or transitional/historical components rather than permanent dependencies of the intended end state.

## Current implementation

The repository now contains the first executable product foundation:

- React + TypeScript + Vite client and responsive Glaze UI-inspired conversation shell.
- Adaptive navigation/context panel, system light/dark appearance, and reduced-motion support.
- Local-first Privacy Shield processing presentation.
- Model discovery, streaming NDJSON chat, stop-generation support, and functional runtime model selection.
- Stable GoreeCloud model-role abstraction for Assistant, Reasoner, Engineer, Utility, Embeddings, and optional Vision/Second Opinion roles.
- Runtime role resolution that maps approved user-facing roles to installed Ollama models without making the underlying model name the permanent product identity.
- First-party Node.js backend gateway with Ollama model discovery and streaming chat proxies.
- Request validation, body-size limits, cancellation propagation, timeouts, no-store responses, and upstream failure isolation.
- Optional bearer-token protection for direct API access during early development.
- Health endpoint at `/api/health`.
- Persistent conversation storage with list/create/read/update/delete APIs and atomic restrictive local writes.
- Conversation history integrated into the UI with automatic titles, loading, saving, model association, Workspace association, renaming, and deletion.
- Message-level copy, user-message edit-and-resubmit, assistant regeneration, and conversation branching controls.
- Explicit branch lineage metadata linking branched conversations to their parent conversation and branch point.
- Markdown and GitHub-Flavored Markdown rendering for assistant responses, including headings, lists, links, blockquotes, code, and tables.
- Glaze UI-native rename/edit/Workspace dialogs replacing browser-native prompt dialogs.
- Generation interruption recovery with retry state and preservation of the last valid conversation state.
- Native Workspace persistence/API foundation for instructions, default model role, file references, knowledge collections, tools, and research preference state.
- Workspace selection in the conversation context panel with default-role model selection when a matching runtime model is available.
- Native attachment storage/API foundation with streamed local file writes, metadata records, per-file size limits, restrictive permissions, and Workspace association.
- Browser attachment selection and upload flow with local-storage status presentation.
- Repository-local candidate icon and logo artwork with an explicit visual-identity approval gate.

GoreeCloud Identity sessions, file ingestion/parsing, embeddings, indexing, retrieval/RAG, GoreeCloud Search, production Wardveil enforcement, Privacy Shield evidence, Everkeep state, Mesh contracts, and production database migration remain to be implemented.

## Architecture

Clients do **not** connect directly to Ollama. Runtime access belongs behind the GoreeCloud AI backend boundary:

```text
Browser / native client
        |
        v
GoreeCloud AI backend
        |
        +-- GoreeCloud Identity authentication/session boundary [planned]
        +-- conversation persistence                           [foundation]
        +-- Workspace persistence                              [foundation]
        +-- file storage and metadata                          [foundation]
        +-- knowledge ingestion / RAG                          [planned]
        +-- Privacy Shield processing disclosure/evidence      [planned]
        +-- Wardveil Security policy/enforcement               [planned]
        +-- Everkeep export/recovery state                     [planned]
        +-- GoreeCloud Search research                         [planned]
        +-- GoreeCloud Mesh integration                        [planned]
        +-- Ollama adapter                                     [foundation]
                 |
                 v
              Ollama
```

## Model roles

GoreeCloud AI presents stable functional roles while keeping individual model implementations replaceable. The initial role definitions follow the GoreeCloud multi-model strategy:

| GoreeCloud role | Intended function | Initial candidate family |
| --- | --- | --- |
| GoreeCloud Assistant | General conversation and assistance | Qwen 3.5 |
| GoreeCloud Reasoner | Complex reasoning, architecture, and research | GPT-OSS |
| GoreeCloud Engineer | Infrastructure engineering, coding, and configuration | Qwen3-Coder |
| GoreeCloud Utility | Lightweight and recurring AI processing | Qwen3 |
| GoreeCloud Embeddings | Semantic retrieval and RAG indexing | Qwen3-Embedding |
| GoreeCloud Vision | Optional specialized visual analysis | Gemma-family candidate |
| GoreeCloud Second Opinion | Optional independent reasoning and validation | DeepSeek-R1-family candidate |

Candidate models are not permanent dependencies. GoreeCloud AI resolves roles against installed runtime models and can still expose unmatched installed models in the advanced model picker.

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
```

The current conversation and Workspace APIs use repository-independent JSON persistence adapters under `GOREECLOUD_AI_DATA_DIR`. This is an early native persistence boundary, not the final multi-user database design. Attachment bytes are stored separately from their metadata and are not committed to source control.

`POST /api/files` currently accepts one raw file body with `X-File-Name` and optional `X-Workspace-Id` headers. This is a development attachment contract; ingestion, malware/content scanning, MIME verification, document parsing, image processing, indexing, and RAG participation are separate future stages and must not be inferred from successful storage alone.

## Local development

Requirements: a current Node.js runtime with built-in `fetch`, npm, and Ollama reachable by the backend.

```bash
npm install
cp .env.example .env
npm run dev:server
```

Start the Vite client in a second terminal:

```bash
npm run dev
```

The backend binds to loopback by default. Production publication and reverse-proxy configuration are intentionally not established by this development slice.

## Environment

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `8787` | Local GoreeCloud AI backend port. |
| `OLLAMA_URL` | `http://127.0.0.1:11434` | Ollama runtime address visible to the backend. |
| `GOREECLOUD_AI_API_TOKEN` | unset | Optional early-development bearer token; not the final GoreeCloud Identity design. |
| `GOREECLOUD_AI_DATA_DIR` | `./data` | Local development persistence and attachment directory. |
| `MAX_BODY_BYTES` | `1000000` | Maximum accepted JSON request body size. |
| `MAX_FILE_BYTES` | `26214400` | Maximum accepted attachment size in bytes for the current development endpoint. |
| `REQUEST_TIMEOUT_MS` | `120000` | Upstream request timeout. |

Do not commit `.env`, `data/`, or reusable credentials.

## Validation

```bash
npm run check
npm run check:server
npm run build
```

Successful source checks do not by themselves establish production readiness, security acceptance, Stable qualification, safe file-ingestion behavior, or correct behavior against a live Ollama runtime.

## Visual identity

Candidate identity source assets live under [`public/artwork/`](public/artwork/). They are repository-local by design and are not represented as approved final artwork yet.

See [`docs/visual-identity.md`](docs/visual-identity.md) for the concept, asset ownership, cross-platform continuity requirements, and approval gate.

## Development roadmap

1. Harden Workspace and attachment behavior, including deletion coordination, quotas, validated media types, ingestion state, and accessibility/interaction tests.
2. Complete backend hardening and GoreeCloud Identity-backed authenticated sessions.
3. Add richer Ollama runtime capability metadata such as context, multimodal/embedding compatibility, loaded state, and validated resource information where the runtime safely exposes it.
4. Implement native file ingestion, extraction, normalization, chunking, and provenance metadata.
5. Implement embeddings, indexing, retrieval, citations, and native RAG with Workspace and permission filtering.
6. Integrate GoreeCloud Search for current-information research and source citations.
7. Add tool and agent execution boundaries governed by Wardveil Security.
8. Implement Privacy Shield processing evidence and user-facing controls.
9. Implement Everkeep export, backup, restore, portability, and continuity state.
10. Connect GoreeCloud Mesh contracts and broader first-party application interoperability.
11. Produce platform artwork derivatives after visual-identity approval.
12. Add automated tests, CI, release qualification, deployment, monitoring, and production-readiness evidence.

## Security and privacy direction

The current backend is intentionally narrow. It validates chat payload shape, limits JSON and attachment request size, isolates upstream failures, supports cancellation, applies timeouts, avoids cacheable API responses, and writes development conversation, Workspace, file metadata, and attachment state with restrictive local permissions. These are development controls, not a claim that Wardveil Security or Privacy Shield implementation is complete.

The intended production design will replace temporary direct-token handling with GoreeCloud Identity-backed sessions and attach evidence-backed Wardveil Security, Privacy Shield, Everkeep, and Mesh state to relevant runtime operations. Stored attachments will require explicit trust, validation, ingestion, indexing, retention, and deletion behavior before production use.

## License

GNU Affero General Public License v3.0. See [`LICENSE`](LICENSE).
