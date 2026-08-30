# GoreeCloud AI Specifications

## Product boundary

GoreeCloud AI is original GoreeCloud-owned AI application and orchestration software. Ollama is the initial replaceable local model runtime; GoreeCloud AI owns conversations, Workspaces, model-role abstraction, files, knowledge/RAG direction, tools/agents boundaries, research orchestration, and the user-facing product.

## Current development state

The active Milestone 0 foundation includes a React/TypeScript/Vite client, Node.js backend, Ollama model discovery/streaming chat boundary, conversation persistence, model roles, Workspaces, private attachment storage, Wardveil-gated attachment release, attachment quotas/deletion, the first passive-text extraction boundary, and an opt-in live runtime validator for the application-to-Ollama path.

The default development server intentionally has no fabricated Wardveil scanner transport. Without an authenticated scanner adapter, uploads remain private/staged and `unverified` rather than becoming eligible for extraction or AI context.

## Attachment and extraction contract

Attachment intake separates storage from security release. A clean result is accepted only when current authoritative Wardveil evidence is bound to the exact AI resource and SHA-256 digest; released bytes are re-hashed before release.

Text extraction is a second, separate gate. It requires an `available`/`released` attachment whose Wardveil decision allows release and context use. Immediately before parsing, GoreeCloud AI re-hashes the released bytes and requires the digest to match the accepted attachment record.

Initial extraction media types are limited to:

- `text/plain`;
- `text/markdown`;
- `text/x-markdown`; and
- `application/json`.

UTF-8 decoding is fatal, unsupported control bytes fail closed, JSON must parse, and source size is bounded by `MAX_TEXT_EXTRACTION_BYTES`. Extracted records are private mode-0600 application data with source/content digests.

This source foundation does not authorize PDF/Office/HTML/archive parsing, embeddings, indexing, RAG retrieval, model-context use, tool execution, generated-code execution, or external processing.

## Live runtime-validation contract

`npm run validate:runtime` validates the first-party application path rather than connecting a browser client directly to Ollama. The base run checks GoreeCloud AI service health, reported Wardveil scanner configuration state, and Ollama model discovery through `/api/ollama/models`.

When `VALIDATE_OLLAMA_MODEL` explicitly selects an installed model, the validator sends one bounded chat request through `/api/ollama/chat` and requires streamed assistant content plus a terminal `done` event. Generated response content is not printed by the validator.

If the application test endpoint requires the current development bearer, `GOREECLOUD_AI_API_TOKEN` may be supplied through protected runtime configuration. `VALIDATE_REQUIRE_WARDVEIL_SCANNER=true` is an explicit expectation gate: the validator fails if the application reports the Wardveil artifact scanner as unconfigured rather than converting absence into positive evidence.

A passing run proves only the runtime path exercised. It does not establish GoreeCloud Identity, Wardveil, Privacy Shield, Everkeep, Mesh, exact Glaze UI conformance, deployment, recovery, or Stable production acceptance.

## Platform-system requirements

- **Glaze UI:** current mandatory consumer target is Glaze UI 2.0.0. Exact-revision GoreeCloud AI conformance remains pending.
- **Wardveil Security:** source-level artifact trust enforcement exists, but authenticated deployed Scan transport and application production acceptance remain pending. GoreeCloud AI does not connect directly to ClamAV.
- **Privacy Shield:** local-first/minimized processing is a product requirement. Privacy Shield remains authoritative for whether extracted/file/conversation content may be used, retained, transferred, or processed for a declared purpose; runtime acceptance is pending.
- **Everkeep:** export, backup, restore, preservation, portability, succession, attachment/extraction lifecycle, and application recovery acceptance remain pending.
- **GoreeCloud Identity:** production users, sessions, service identity, delegated authority, and durable multi-user boundaries remain pending; the optional API bearer is development-only.
- **GoreeCloud Mesh:** cross-system capability/evidence coordination remains pending and cannot manufacture AI security/privacy/continuity truth.

## Validation

CI validates application TypeScript, server syntax, native server/security/lifecycle tests, production client build, Python Wardveil reference behavior, the AI/Wardveil contract, Python compilation, and syntax of the opt-in runtime validator. Live Ollama interoperability remains a separate target-environment gate until an approved run is executed and recorded.

## Stable boundary

GoreeCloud AI is not Stable or production-ready. Live Ollama/Wardveil interoperability, current Glaze UI 2.0 consumer evidence, Identity-backed multi-user persistence, Privacy Shield acceptance, Everkeep lifecycle/recovery, Mesh integration, safe parsers/RAG, and broader runtime evidence remain required.
