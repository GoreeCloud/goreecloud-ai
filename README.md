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

- React + TypeScript + Vite client.
- Responsive Glaze UI-inspired conversation shell.
- Adaptive navigation and contextual side panel.
- System light/dark appearance and reduced-motion support.
- Local-first Privacy Shield processing presentation.
- Model discovery and streaming NDJSON chat client.
- Stop-generation support.
- First-party Node.js backend gateway.
- Ollama model-discovery proxy through `/api/ollama/models`.
- Ollama streaming-chat proxy through `/api/ollama/chat`.
- Request validation, body-size limits, cancellation propagation, timeouts, no-store responses, and upstream failure isolation.
- Optional bearer-token protection for direct API access during early development.
- Health endpoint at `/api/health`.
- Repository-local candidate icon and logo artwork with an explicit visual-identity approval gate.

This is still a foundation: persistent identity sessions, conversations, Workspaces, knowledge, RAG, GoreeCloud Search, production Wardveil enforcement, Privacy Shield evidence, Everkeep state, and Mesh contracts remain to be implemented.

## Architecture

Clients do **not** connect directly to Ollama. Runtime access belongs behind the GoreeCloud AI backend boundary:

```text
Browser / native client
        |
        v
GoreeCloud AI backend
        |
        +-- GoreeCloud Identity authentication/session boundary [planned]
        +-- conversation/workspace persistence              [planned]
        +-- Privacy Shield processing disclosure/evidence    [planned]
        +-- Wardveil Security policy/enforcement              [planned]
        +-- Everkeep export/recovery state                    [planned]
        +-- GoreeCloud Search research                        [planned]
        +-- GoreeCloud Mesh integration                       [planned]
        +-- Ollama adapter                                    [implemented foundation]
                 |
                 v
              Ollama
```

Keeping Ollama behind this boundary allows GoreeCloud AI to own authentication, authorization, request controls, auditability, processing disclosures, cancellation, runtime location, future provider abstraction, and security policy rather than exposing the model runtime directly to browsers.

## API foundation

Current development endpoints:

```text
GET  /api/health
GET  /api/ollama/models
POST /api/ollama/chat
```

`POST /api/ollama/chat` accepts an Ollama-style model and message array and streams Ollama-compatible NDJSON back to the client. The gateway deliberately forwards only the fields currently required by GoreeCloud AI rather than acting as an unrestricted Ollama pass-through.

## Local development

Requirements for the current slice:

- A current Node.js runtime with built-in `fetch` support.
- npm.
- Ollama reachable by the backend, defaulting to `http://127.0.0.1:11434`.

Install the client dependencies:

```bash
npm install
```

Copy the development environment template if configuration changes are needed:

```bash
cp .env.example .env
```

Start the backend:

```bash
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
| `GOREECLOUD_AI_API_TOKEN` | unset | Optional early-development bearer token for direct API clients. This is not the final GoreeCloud Identity session design. |
| `MAX_BODY_BYTES` | `1000000` | Maximum accepted JSON request body size. |
| `REQUEST_TIMEOUT_MS` | `120000` | Upstream request timeout. |

Do not commit `.env` or reusable credentials. `.env.example` contains non-secret examples only.

## Validation

Static validation commands:

```bash
npm run check
npm run check:server
npm run build
```

Successful source checks do not by themselves establish production readiness, security acceptance, Stable qualification, or correct behavior against a live Ollama runtime. Those require runtime and release validation.

## Visual identity

Candidate identity source assets live under [`public/artwork/`](public/artwork/). They are repository-local by design and are not represented as approved final artwork yet.

See [`docs/visual-identity.md`](docs/visual-identity.md) for the concept, asset ownership, cross-platform continuity requirements, and approval gate.

## Development roadmap

Near-term implementation sequence:

1. Complete backend hardening and GoreeCloud Identity-backed authenticated sessions.
2. Add persistent conversations, message history, regeneration, editing, and branching.
3. Add model-role abstraction and runtime capability metadata.
4. Build Workspaces and the native file/attachment library.
5. Implement ingestion, embeddings, indexing, retrieval, citations, and native RAG.
6. Integrate GoreeCloud Search for current-information research and source citations.
7. Add tool and agent execution boundaries governed by Wardveil Security.
8. Implement Privacy Shield processing evidence and user-facing controls.
9. Implement Everkeep export, backup, restore, portability, and continuity state.
10. Connect GoreeCloud Mesh contracts and broader first-party application interoperability.
11. Produce platform artwork derivatives after visual-identity approval.
12. Add automated tests, CI, release qualification, deployment, monitoring, and production-readiness evidence.

## Security and privacy direction

The current backend is intentionally narrow. It validates chat payload shape, limits request-body size, isolates upstream failures, supports cancellation, applies timeouts, and avoids cacheable API responses. These are development controls, not a claim that Wardveil Security or Privacy Shield implementation is complete.

The intended production design will replace temporary direct-token handling with GoreeCloud Identity-backed sessions and will attach evidence-backed Wardveil Security, Privacy Shield, Everkeep, and Mesh state to the relevant runtime operations.

## License

GNU Affero General Public License v3.0. See [`LICENSE`](LICENSE).
