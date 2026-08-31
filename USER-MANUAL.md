# GoreeCloud AI User Manual

## Status

GoreeCloud AI is under active native development. The current Draft Milestone 0 branch provides the first-party conversational application foundation, backend-owned Ollama access, persistent conversations, model roles, Workspaces, private attachment handling, Wardveil-gated attachment release, quota/deletion controls, bounded passive text extraction, and a read-only knowledge-eligibility assessment.

It is not Stable or production-ready.

## Product Boundary

GoreeCloud AI owns the user-facing AI experience, conversations, Workspaces, files, future knowledge/RAG, research orchestration, tools, artifacts, and model access policy. Ollama is the primary local inference runtime. GoreeCloud Search is the intended first-party current-information and Internet-research provider.

The browser does not call Ollama directly. Model access is routed through the GoreeCloud AI backend so authentication, authorization, Privacy Shield state, Wardveil enforcement, auditing, cancellation, and future runtime changes can remain server-owned.

## Development Commands

Install dependencies and validate the current source with:

```bash
npm install
npm run check
npm run check:server
npm run test:server
npm run build
```

Start the client and backend with the development scripts in `package.json`. Active tokens, credentials, or environment-specific secrets belong in protected runtime configuration and must not be committed to source control.

## Conversations and Models

The current application supports:

- Ollama model discovery through the backend;
- friendly GoreeCloud model-role selection;
- streaming chat responses;
- stop generation;
- Markdown and GitHub-Flavored Markdown rendering;
- persistent conversations;
- rename and edit dialogs;
- retry/recovery behavior;
- conversation branching with parent lineage metadata;
- Workspace association.

Actual model identifiers remain runtime infrastructure and may change independently of the user-facing role names.

## Workspaces

Workspaces currently persist development state including:

- name;
- instructions;
- default model role;
- file references;
- knowledge-collection placeholders;
- tool placeholders;
- research preference state.

Workspace membership and access boundaries are not yet backed by production GoreeCloud Identity multi-user/session enforcement.

## Attachments and Wardveil Trust States

Attachments enter private staging with restrictive local permissions. Storage alone does not make an attachment trusted or eligible for model context.

Current attachment states include:

- **Verified / available** — authoritative Wardveil evidence allowed release and context use for the exact SHA-256-bound artifact;
- **Unverified** — trust could not be established, including when no authenticated scanner transport is configured;
- **Held** — the trust decision requires review;
- **Blocked** — the trust decision requires blocking/quarantine handoff state.

The development application intentionally does not connect directly to ClamAV. Until an authenticated deployed Wardveil Scan transport exists, the scanner adapter remains unconfigured and uploads fail closed in private staging.

## Attachment Quotas and Deletion

The local development attachment library enforces configurable per-file, file-count, and aggregate-byte limits. Local file-store and delete mutations are serialized within one Node.js process.

Deleting a file removes its released or staged bytes, its derived text extraction when present, and stale Workspace file references. This is application cleanup only; it is not Wardveil quarantine, secure erasure, Everkeep retention proof, or proof that no other copies exist.

## Passive Text Extraction

The current post-release extraction boundary accepts only:

- `text/plain`
- `text/markdown`
- `text/x-markdown`
- `application/json`

Extraction requires the source attachment to be released and available, with Wardveil `releaseAllowed` and `useAsContextAllowed` state. GoreeCloud AI re-reads and SHA-256 hashes the released bytes before parsing so changed content cannot inherit prior trust evidence.

The parser uses fatal UTF-8 decoding, rejects unsupported control bytes, validates JSON, and applies a dedicated extraction-byte limit. Derived extraction records remain private and retain source/text digests for binding checks.

PDF, HTML, Office documents, archives, scripts/executables, images, audio, video, model artifacts, tool artifacts, and other parser-complex or active formats are not accepted by this initial extraction boundary.

Extraction does **not** authorize chunking, embeddings, indexing, retrieval, RAG participation, model-context use, tool execution, generated-code execution, research, or external processing.

## Knowledge Eligibility Assessment

For an existing attachment, the development API exposes:

`GET /api/files/:id/knowledge-eligibility`

This is a read-only inspection endpoint. It does not create an extraction, chunk data, compute embeddings, index content, retrieve content, insert model context, invoke research, or transfer data externally.

The assessment reports the current state of these gates:

- **Wardveil** — whether the exact attachment has been security-released and allowed for context-oriented use;
- **Safe extraction** — whether the file type is supported and a digest-bound extraction exists;
- **GoreeCloud Identity** — currently pending because production user/session/authorization integration is not implemented;
- **Privacy Shield** — currently pending because authoritative purpose/data-use authorization is not implemented;
- **Indexing** — disabled/not implemented;
- **Retrieval** — disabled/not implemented;
- **Model context** — disabled/not implemented.

The assessment can report `blocked_security`, `blocked_parser_or_extraction`, `pending_extraction`, or `pending_authorization`.

Even when Wardveil release and safe extraction are satisfied, the current response keeps all of these false:

- `eligibleForIndexing`
- `eligibleForRetrieval`
- `eligibleForModelContext`

Do not interpret `pending_authorization` as approval. It means the local security/extraction prerequisites may be ready, but required Identity and Privacy Shield authority still does not exist and the downstream knowledge stages remain disabled.

## Live Runtime Validation

The repository includes:

```bash
npm run validate:runtime
```

By default the validator targets `http://127.0.0.1:8787`; set `GOREECLOUD_AI_URL` for an approved alternate test endpoint. If the API requires its development bearer, provide `GOREECLOUD_AI_API_TOKEN` in protected runtime configuration.

The validator checks:

1. the GoreeCloud AI health endpoint and service identity;
2. reported Wardveil artifact-scanner configuration state;
3. Ollama model discovery through the GoreeCloud AI backend.

Set `VALIDATE_OLLAMA_MODEL=<installed-model-id>` to additionally send one bounded streamed chat request through the application backend. The validator requires assistant content chunks and a terminal done event but does not print the generated response content.

Set `VALIDATE_REQUIRE_WARDVEIL_SCANNER=true` only when validating an environment that is expected to have an authenticated Wardveil scanner transport. The check fails rather than treating an unconfigured scanner as acceptable evidence.

A passing runtime validation proves only the application/runtime path exercised by that run. It does not establish GoreeCloud Identity, Wardveil, Privacy Shield, Everkeep, Mesh, Glaze UI, deployment, recovery, or Stable production acceptance.

## Privacy and External Processing

Privacy Shield remains authoritative for whether conversation, attachment, extracted, knowledge, or research data may be used for a purpose, retained, sent to a model, searched, or transferred externally. The knowledge-eligibility assessment deliberately reports Privacy Shield authorization as pending rather than fabricating a positive decision.

GoreeCloud Search research integration and external-processing disclosure are not yet production-accepted. A Search outage must eventually remain isolated from local conversations and local knowledge workflows.

## Recovery and Portability

Everkeep remains authoritative for conversation/Workspace export, backup, restore, portability, preservation, retention, recovery evidence, continuity, and succession. Current local persistence and deletion behavior do not establish Everkeep recovery acceptance.

## Current Acceptance Gaps

The Draft branch still requires, among other evidence:

- live authenticated Ollama interoperability evidence in the intended environment;
- a deployed authenticated Wardveil scanner transport, scanner/signature health, and controlled clean/malicious runtime validation;
- GoreeCloud Identity-backed multi-user/session boundaries and knowledge authorization;
- Privacy Shield runtime acceptance and knowledge/data-use authorization;
- Everkeep application lifecycle and recovery acceptance;
- GoreeCloud Mesh integration where required;
- additional safe parser decisions before broader ingestion;
- explicit authoritative gates before chunking, embeddings, indexing, retrieval, RAG, or model-context use;
- exact current Glaze UI consumer conformance evidence;
- deployment and broader production-readiness validation.

Do not represent successful source checks, a knowledge-eligibility response, or local runtime validation as Stable or production-ready evidence.
