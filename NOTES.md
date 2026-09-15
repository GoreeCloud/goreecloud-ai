# GoreeCloud AI — Notes

**Document version:** 0.1  
**Lifecycle:** Development

## Current verified repository state

GoreeCloud AI is under active Milestone 0 development in Draft PR #1 on branch `agent/milestone-0-foundation`.

Before this repository-governance update, exact head `bb3d9e7859a0c725de1e790018bd3f9500ba7a3f` passed Validate GoreeCloud AI run `34160106095` (#93). That exact-head evidence is historical once this file set is committed; the new head must pass validation again.

Current source version is `0.1.0-dev.0`. The application is not Stable, production-ready, or accepted as a current-Stable Glaze UI consumer.

## Current implemented foundations

- React / TypeScript / Vite client.
- First-party Node.js backend bound to loopback by default.
- Backend-owned Ollama model discovery and streaming chat.
- Conversation and Workspace persistence.
- Private attachment storage with quotas and deletion handling.
- Wardveil-gated attachment release model and reference tests.
- Bounded safe-text extraction for approved passive text formats.
- Read-only knowledge eligibility and non-authorizing knowledge-authorization assessment.
- Strict runtime-evidence envelope assessment.
- Development-only durable hashed evidence/request use and revocation registry for replay state.
- Opt-in live runtime validator for backend health, Ollama discovery, and an explicitly selected streamed request.

## Current blockers / non-claims

The following are not established by current source alone:

- current Stable Glaze UI `1.4.1` implementation and GoreeCloud AI-specific acceptance;
- authenticated GoreeCloud Identity transport and production application authorization;
- authenticated Privacy Shield enforcement, capability/evidence authority, durable authorization, revocation and replay acceptance;
- accepted live Wardveil transport/runtime evidence;
- GoreeCloud Manager acceptance;
- Everkeep backup/restore/export/portability acceptance;
- GoreeCloud Mesh integration and acceptance;
- production RAG, embeddings, indexing, retrieval, model-context authorization, or research integration;
- supported deployment, signing/package/release, representative runtime, or Stable evidence.

A structurally valid caller-supplied trust record remains non-authoritative. `productionTrustedInput`, `persistentAuthorizationCreated`, `executionAuthorized`, and knowledge-stage eligibility must remain fail-closed until real authority is established.

## Governance correction

This repository must use Platform Contract `0.2` with exactly seven Integral Platform Systems: GoreeCloud Manager, Privacy Shield, Wardveil Security, Everkeep, Glaze UI, GoreeCloud Mesh, and GoreeCloud Identity. GoreeCloud Sync is separately governed and must not appear as an eighth `platform_systems` entry.

The current Stable Glaze UI target is `1.4.1`. Older GoreeCloud AI references to Glaze UI `1.1.0` or experimental `2.x` targets are historical/stale current-state material and must be reconciled without relabeling old evidence as current acceptance.

## Release boundary

Keep Draft PR #1 in Development until exact-head validation and all applicable runtime, platform-system, privacy, security, recovery, accessibility, deployment, release, and representative acceptance gates are complete. Merge, release, and Stable are separate decisions.
