# GoreeCloud AI

Native GoreeCloud AI platform for private conversations, Workspaces, RAG, research, tools, and local Ollama-powered intelligence.

> **Development status:** Milestone 0 foundation. This repository is not yet production-ready.

## Product direction

GoreeCloud AI is an original GoreeCloud application built from the ground up. It is intended to become the user-facing AI and orchestration layer for GoreeCloud rather than a reskinned third-party AI interface.

Its permanent product boundary is:

- **GoreeCloud AI** — conversations, Workspaces, knowledge, RAG, files, tools, agents, artifacts, and orchestration.
- **Ollama** — private local model runtime.
- **GoreeCloud Search** — current-information and Internet-research provider.
- **Self-hosted Gitea** — long-term source-control and development integration for repository-aware engineering workflows.

Open WebUI, AnythingLLM, SearXNG, and GitHub are transitional or historical dependencies rather than required components of the intended end state.

## Milestone 0 foundation

This first implementation slice establishes:

- React + TypeScript + Vite application foundation.
- Responsive Glaze UI-inspired conversation shell.
- Adaptive left navigation and contextual side panel.
- Dark/light system appearance support.
- Reduced-motion behavior.
- Local-first privacy status presentation.
- Browser-to-backend Ollama adapter boundary.
- Ollama model discovery contract.
- Streaming NDJSON chat client.
- Stop-generation support.
- Candidate GoreeCloud AI icon and logo artwork stored in-repository.
- Explicit visual-identity approval gate.

## Architecture boundary

The browser does **not** connect directly to Ollama. It targets a first-party GoreeCloud AI backend gateway:

```text
Browser / native client
        |
        v
GoreeCloud AI backend
        |
        +-- authentication and authorization
        +-- conversation/workspace persistence
        +-- Privacy Shield processing disclosure
        +-- Wardveil Security tool and model boundaries
        +-- Everkeep export/recovery state
        +-- GoreeCloud Search integration
        +-- Ollama adapter
                 |
                 v
              Ollama
```

The current development UI expects these backend endpoints:

```text
GET  /api/ollama/models
POST /api/ollama/chat
```

The chat endpoint should proxy Ollama-compatible streaming NDJSON while retaining GoreeCloud AI's security, privacy, audit, timeout, and cancellation controls.

## Development

```bash
npm install
npm run dev
```

Type-check and build:

```bash
npm run check
npm run build
```

## Visual identity

Candidate identity source assets live under [`public/artwork/`](public/artwork/). They are repository-local by design and are not yet represented as approved final artwork.

See [`docs/visual-identity.md`](docs/visual-identity.md) for concept, asset ownership, cross-platform requirements, and the approval gate.

## Next implementation slices

1. First-party backend service and authenticated Ollama proxy.
2. Persistent conversations and branching.
3. Model-role abstraction and runtime capability metadata.
4. Workspaces and file library.
5. Native ingestion, embeddings, indexing, retrieval, and RAG.
6. GoreeCloud Search research integration with source citations.
7. Gitea integration for repository-aware engineering workflows.
8. Wardveil Security, Privacy Shield, Everkeep, and Mesh contracts at runtime.
9. Platform artwork derivatives after identity approval.

## License

GNU Affero General Public License v3.0. See [`LICENSE`](LICENSE).
