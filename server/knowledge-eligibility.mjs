import { getFileRecord } from './files.mjs'
import { getTextExtraction, textExtractionEligibility } from './text-extraction.mjs'

function wardveilGate(record) {
  if (record.status !== 'available' || record.storageState !== 'released') {
    return { status: 'blocked', reason: 'file_not_security_released' }
  }
  if (record.security?.releaseAllowed !== true || record.security?.useAsContextAllowed !== true) {
    return { status: 'blocked', reason: 'wardveil_context_use_not_allowed' }
  }
  return { status: 'satisfied', reason: 'wardveil_release_and_context_use_allowed' }
}

function extractionGate(record, extraction) {
  const eligibility = textExtractionEligibility(record)
  if (!eligibility.allowed) {
    return { status: 'blocked', reason: eligibility.reason }
  }
  if (!extraction) {
    return { status: 'pending', reason: 'safe_text_extraction_required' }
  }
  if (
    extraction.version !== 1 ||
    extraction.fileId !== record.id ||
    extraction.sourceResourceId !== record.resourceId ||
    extraction.sourceDigestSha256 !== record.digestSha256 ||
    extraction.state !== 'extracted'
  ) {
    return { status: 'blocked', reason: 'extraction_binding_mismatch' }
  }
  return { status: 'satisfied', reason: 'safe_text_extraction_bound' }
}

export function assessKnowledgeEligibility(record, extraction = null) {
  const wardveil = wardveilGate(record)
  const extractionGateState = extractionGate(record, extraction)

  let assessment = 'pending_authorization'
  if (wardveil.status !== 'satisfied') assessment = 'blocked_security'
  else if (extractionGateState.status === 'blocked') assessment = 'blocked_parser_or_extraction'
  else if (extractionGateState.status !== 'satisfied') assessment = 'pending_extraction'

  return {
    version: 1,
    fileId: record.id,
    assessment,
    eligibleForIndexing: false,
    eligibleForRetrieval: false,
    eligibleForModelContext: false,
    gates: {
      wardveil,
      extraction: extractionGateState,
      identity: {
        status: 'pending',
        authority: 'GoreeCloud Identity',
        reason: 'identity_authorization_not_implemented',
      },
      privacy: {
        status: 'pending',
        authority: 'Privacy Shield',
        reason: 'privacy_authorization_not_implemented',
      },
      indexing: {
        status: 'disabled',
        reason: 'knowledge_indexing_not_implemented',
      },
      retrieval: {
        status: 'disabled',
        reason: 'knowledge_retrieval_not_implemented',
      },
      modelContext: {
        status: 'disabled',
        reason: 'model_context_authorization_not_implemented',
      },
    },
  }
}

export async function getKnowledgeEligibility(id) {
  const record = await getFileRecord(id)
  if (!record) return null
  const extraction = await getTextExtraction(id)
  return assessKnowledgeEligibility(record, extraction)
}
