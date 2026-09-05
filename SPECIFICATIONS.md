# GoreeCloud AI Specifications

## Product boundary

GoreeCloud AI is original GoreeCloud-owned AI application and orchestration software. Ollama is the initial replaceable local model runtime; GoreeCloud AI owns conversations, Workspaces, model-role abstraction, files, knowledge/RAG direction, tools/agents boundaries, research orchestration, and the user-facing product.

## Current development state

The active Milestone 0 foundation includes a React/TypeScript/Vite client, Node.js backend, Ollama model discovery/streaming chat boundary, conversation persistence, model roles, Workspaces, private attachment storage, Wardveil-gated attachment release, attachment quotas/deletion, passive-text extraction, read-only knowledge eligibility, bounded Identity/application + Privacy Shield authorization-input assessment, and an opt-in live runtime validator.

The default development server intentionally has no fabricated Wardveil scanner transport. Without an authenticated scanner adapter, uploads remain private/staged and `unverified` rather than becoming eligible for extraction or AI context.

## Attachment and extraction contract

Attachment intake separates storage from security release. A clean result is accepted only when current authoritative Wardveil evidence is bound to the exact AI resource and SHA-256 digest; released bytes are re-hashed before release.

Text extraction is a second, separate gate. It requires an `available`/`released` attachment whose Wardveil decision allows release and context use. Immediately before parsing, GoreeCloud AI re-hashes the released bytes and requires the digest to match the accepted attachment record.

Initial extraction media types are limited to `text/plain`, `text/markdown`, `text/x-markdown`, and `application/json`. UTF-8 decoding is fatal, unsupported control bytes fail closed, JSON must parse, and source size is bounded by `MAX_TEXT_EXTRACTION_BYTES`. Extracted records are private mode-0600 application data with source/content digests.

This source foundation does not authorize PDF/Office/HTML/archive parsing, embeddings, indexing, RAG retrieval, model-context use, tool execution, generated-code execution, or external processing.

## Knowledge-eligibility observation contract

`GET /api/files/:id/knowledge-eligibility` is a read-only assessment surface. It does not create extraction, embeddings, chunks, indexes, retrieval entries, model context, authorization state, or external processing.

It reports Wardveil release/context-use state, safe text-extraction eligibility/binding, Identity/application-authorization state, Privacy Shield authorization state, and whether indexing/retrieval/model-context stages exist. Without supplied authorization assessment, Identity and Privacy Shield remain pending.

The source always reports `eligibleForIndexing: false`, `eligibleForRetrieval: false`, and `eligibleForModelContext: false` because the downstream stages are still disabled and no authenticated production authorization adapters are connected.

## Knowledge authorization-input assessment contract

`POST /api/files/:id/knowledge-authorization-assessment` accepts bounded JSON and performs a **non-persistent, non-executable assessment** against the current attachment/extraction state.

GoreeCloud Identity's current architecture establishes authenticated identity/claims while each application remains responsible for its own authorization. Therefore the source uses GoreeCloud AI application-local operation identifiers rather than inventing central Identity scopes:

- `goreecloud-ai.knowledge.index`;
- `goreecloud-ai.knowledge.retrieve`; and
- `goreecloud-ai.knowledge.model-context`.

Identity input must be time-valid, authenticated, resource-bound, and paired with GoreeCloud AI application authorization permitting the selected operation.

Privacy input is structurally aligned to the current Privacy Shield decision contract. Request/decision binding, resource, operation, requester/acting-user, processing zone, destination, permitted operations, decision expiration, optional request-retention expiration, and obligations are checked. Malformed optional retention expiration fails closed. `DENY` blocks. `REQUIRE_USER_DECISION` remains pending. `ALLOW` and `ALLOW_WITH_CONSTRAINTS` can become structurally satisfied only when checked constraints agree.

These local operation names are not new canonical Privacy Shield capability IDs. Privacy Shield capability-registry adoption remains separately governed.

Even when both inputs are structurally satisfied, the result explicitly remains non-authoritative:

- `sourceTrust.productionTrustedInput: false`;
- `persistentAuthorizationCreated: false`;
- `executionAuthorized: false`.

Authenticated Identity/Privacy runtime adapters, operation-bound capability/signature verification, durable authorization/evidence state, revocation/replay handling, and production acceptance are not connected. Client-supplied JSON cannot manufacture production authority.

A satisfied structural assessment may produce `pending_stage_implementation`, but indexing, retrieval, and model-context booleans remain false. See `docs/KNOWLEDGE-AUTHORIZATION.md`.

## Live runtime-validation contract

`npm run validate:runtime` validates the first-party application path rather than connecting a browser client directly to Ollama. The base run checks GoreeCloud AI service health, reported Wardveil scanner configuration state, and Ollama model discovery through `/api/ollama/models`.

When `VALIDATE_OLLAMA_MODEL` explicitly selects an installed model, the validator sends one bounded chat request through `/api/ollama/chat` and requires streamed assistant content plus a terminal `done` event. Generated response content is not printed by the validator.

If the application test endpoint requires the current development bearer, `GOREECLOUD_AI_API_TOKEN` may be supplied through protected runtime configuration. `VALIDATE_REQUIRE_WARDVEIL_SCANNER=true` is an explicit expectation gate: the validator fails if the application reports the Wardveil artifact scanner as unconfigured rather than converting absence into positive evidence.

A passing run proves only the runtime path exercised. It does not establish GoreeCloud Identity, Wardveil, Privacy Shield, Everkeep, Mesh, exact Glaze UI conformance, deployment, recovery, or Stable production acceptance.

## Platform-system requirements

- **Glaze UI:** current mandatory consumer target is Stable **GLAZE UI V1.1 / 1.1.0**. GoreeCloud AI remains migration/reconciliation-required until exact-revision 1.1.0 consumer acceptance is completed; existing 2.x-labeled source is historical migration input and is not current conformance evidence.
- **Wardveil Security:** source-level artifact trust enforcement exists, but authenticated deployed Scan transport and application production acceptance remain pending. GoreeCloud AI does not connect directly to ClamAV.
- **Privacy Shield:** the current decision contract is consumed for structural assessment, but authenticated runtime enforcement, trusted capabilities/evidence, durable state, and AI consumer acceptance remain pending. A structurally satisfied supplied decision is not production authority.
- **Everkeep:** export, backup, restore, preservation, portability, succession, attachment/extraction/derived-knowledge lifecycle, and application recovery acceptance remain pending.
- **GoreeCloud Identity:** Identity provides authenticated identity/claims while GoreeCloud AI owns application authorization. Current assessment validates supplied identity/application context but no authenticated production Identity adapter or durable multi-user boundary is connected.
- **GoreeCloud Mesh:** cross-system capability/evidence coordination remains pending and cannot manufacture AI security/privacy/continuity truth.

## Validation

CI validates application TypeScript, server syntax including authorization/eligibility modules, native server/security/lifecycle/knowledge tests, production client build, Python Wardveil reference behavior, the AI/Wardveil contract, Python compilation, and syntax of the opt-in runtime validator. Live Ollama/Identity/Privacy/Wardveil interoperability remains separate target-environment evidence.

## Stable boundary

GoreeCloud AI is not Stable or production-ready. Live Ollama/Wardveil interoperability, migration/reconciliation to current Stable GLAZE UI V1.1 / 1.1.0 and consumer evidence, Identity-backed multi-user/application authorization, Privacy Shield runtime acceptance, Everkeep lifecycle/recovery, Mesh integration, safe parsers/RAG stages, and broader runtime/deployment evidence remain required.
