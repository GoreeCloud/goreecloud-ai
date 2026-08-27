# GoreeCloud AI Attachment Lifecycle

GoreeCloud AI owns the attachment lifecycle around the Wardveil artifact trust boundary. Storage success, security release, ingestion, indexing, context use, retention, and deletion are separate state transitions.

## Current development flow

```text
upload request
  -> development quota checks
  -> serialized local file mutation
  -> private 0600 staging
  -> SHA-256 / Wardveil trust gate
  -> released or retained staged
  -> metadata index
  -> optional Workspace reference
```

The Wardveil rules documented in `WARDVEIL_ARTIFACT_SECURITY.md` remain authoritative for trust release. Quotas never turn unverified content into clean content and deletion never becomes Wardveil Quarantine.

## Storage limits

The development server enforces three independent limits:

- `MAX_FILE_BYTES` — maximum bytes for one attachment;
- `MAX_FILE_COUNT` — maximum number of attachment records in the local library;
- `MAX_TOTAL_FILE_BYTES` — maximum aggregate attachment bytes recorded by the local library.

The count and aggregate limits are checked before staging when enough request metadata is available and are enforced again while streaming. Quota rejection uses HTTP 507 and removes any partially staged file.

These are local safety limits, not final per-user, per-Workspace, tenant, billing, or retention policy. Production quota policy requires identity-aware storage accounting and shared persistence.

## Mutation serialization

The JSON-file development adapter serializes file-store and file-delete mutations within one Node.js process. This prevents two local mutations from racing the quota calculation or overwriting the file index.

This is not a distributed lock. Multiple application processes or hosts require a production persistence layer with transactional quota accounting and concurrency control before production acceptance.

## Deletion

Deleting an attachment removes both possible byte locations:

- released attachment storage; and
- private Wardveil staging.

After byte/index deletion, the API removes that file ID from persisted Workspace `fileIds` arrays. Workspace reference cleanup is metadata cleanup only; it is not malware quarantine, secure erasure, an Everkeep retention action, or proof that copies do not exist elsewhere.

Everkeep backup/recovery, legal retention, succession, export, and restore semantics remain separate future integrations.

## Trust and active-use boundaries

A released clean attachment may become eligible for safe context-oriented processing only where the Wardveil decision explicitly allows it. Security release does not by itself authorize parsing with unsafe libraries, executing embedded content, loading a model, running code, installing a tool, or publishing data externally.

File ingestion, MIME/content validation, extraction, provenance, chunking, indexing, permission filtering, RAG participation, active-content policy, Privacy Shield evidence, and external-processing disclosure remain separate gates.
