import assert from 'node:assert/strict'
import test from 'node:test'
import { assessKnowledgeEligibility } from './knowledge-eligibility.mjs'

function record(overrides = {}) {
  return {
    id: '11111111-1111-4111-8111-111111111111',
    resourceId: 'goreecloud-ai-file:11111111-1111-4111-8111-111111111111',
    digestSha256: 'a'.repeat(64),
    mediaType: 'text/plain',
    status: 'available',
    storageState: 'released',
    security: {
      releaseAllowed: true,
      useAsContextAllowed: true,
    },
    ...overrides,
  }
}

function extraction(overrides = {}) {
  return {
    version: 1,
    fileId: '11111111-1111-4111-8111-111111111111',
    sourceResourceId: 'goreecloud-ai-file:11111111-1111-4111-8111-111111111111',
    sourceDigestSha256: 'a'.repeat(64),
    state: 'extracted',
    ...overrides,
  }
}

test('blocks knowledge eligibility when Wardveil has not released the attachment', () => {
  const assessment = assessKnowledgeEligibility(record({
    status: 'unverified',
    storageState: 'staged',
    security: { releaseAllowed: false, useAsContextAllowed: false },
  }))

  assert.equal(assessment.assessment, 'blocked_security')
  assert.equal(assessment.gates.wardveil.status, 'blocked')
  assert.equal(assessment.eligibleForIndexing, false)
  assert.equal(assessment.eligibleForRetrieval, false)
  assert.equal(assessment.eligibleForModelContext, false)
})

test('reports safe text extraction as pending without creating derived content', () => {
  const assessment = assessKnowledgeEligibility(record())
  assert.equal(assessment.assessment, 'pending_extraction')
  assert.equal(assessment.gates.wardveil.status, 'satisfied')
  assert.deepEqual(assessment.gates.extraction, {
    status: 'pending',
    reason: 'safe_text_extraction_required',
  })
})

test('blocks unsupported parser formats even when Wardveil release is satisfied', () => {
  const assessment = assessKnowledgeEligibility(record({ mediaType: 'application/pdf' }))
  assert.equal(assessment.assessment, 'blocked_parser_or_extraction')
  assert.equal(assessment.gates.wardveil.status, 'satisfied')
  assert.deepEqual(assessment.gates.extraction, {
    status: 'blocked',
    reason: 'media_type_not_supported',
  })
})

test('keeps indexing, retrieval, and model context disabled after a bound extraction', () => {
  const assessment = assessKnowledgeEligibility(record(), extraction())
  assert.equal(assessment.assessment, 'pending_authorization')
  assert.equal(assessment.gates.wardveil.status, 'satisfied')
  assert.equal(assessment.gates.extraction.status, 'satisfied')
  assert.equal(assessment.gates.identity.status, 'pending')
  assert.equal(assessment.gates.privacy.status, 'pending')
  assert.equal(assessment.gates.indexing.status, 'disabled')
  assert.equal(assessment.gates.retrieval.status, 'disabled')
  assert.equal(assessment.gates.modelContext.status, 'disabled')
  assert.equal(assessment.eligibleForIndexing, false)
  assert.equal(assessment.eligibleForRetrieval, false)
  assert.equal(assessment.eligibleForModelContext, false)
})

test('fails the extraction gate when derived evidence is not bound to the current source', () => {
  const assessment = assessKnowledgeEligibility(record(), extraction({ sourceDigestSha256: 'b'.repeat(64) }))
  assert.equal(assessment.assessment, 'blocked_parser_or_extraction')
  assert.deepEqual(assessment.gates.extraction, {
    status: 'blocked',
    reason: 'extraction_binding_mismatch',
  })
})
