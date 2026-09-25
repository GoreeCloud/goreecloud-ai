# GoreeCloud AI — Project Record

**Repository:** `GoreeCloud/goreecloud-ai`  
**Lifecycle:** Development  
**Record purpose:** Significant project history, governance transitions, candidate evidence, architectural decisions, and migration evidence  
**Migration baseline:** `e2e2804244f0551d0e2429b5c00da3f32448aff0`  
**Canonical authority:** This file is the repository-local project record once accepted on the default branch.

## 2026-08-25 — Repository and Development foundation

GitHub records the repository as created August 25, 2026. The project was established as GoreeCloud's first-party AI application/platform with a replaceable local-model-runtime strategy and privacy/security boundaries owned by GoreeCloud systems rather than by the underlying model runtime.

## 2026-09-09 — Current default-branch baseline

Default `main` at migration baseline `e2e2804244f0551d0e2429b5c00da3f32448aff0` contains the first executable Wardveil artifact-intake boundary and a legacy `FEATURE-ROADMAP.md` governance file.

The legacy roadmap still states that the Drive Project Specification is authoritative and that a Drive roadmap must remain synchronized. Those statements are governance debt under newer repository-local standards and must not be used to re-establish Drive as the project-specification authority.

## 2026-09-23 — Draft PR #1 Development candidate

Draft PR #1 is an extensive Development candidate based on `main`. Its current head and exact validation state are repository evidence for the candidate only; they are not default-branch implementation state.

The candidate has introduced or evolved client/backend foundations, Ollama integration, Workspaces, attachment and knowledge-security boundaries, model-role/routing work, Platform Contract work, and other AI foundations. Its PR body explicitly retains Development/nonconformant boundaries and lists substantial remaining runtime, security/privacy, recovery, platform-integration, accessibility, deployment, and release gates.

## 2026-09-24 — Project governance migration candidate

This migration:
- creates root `PROJECT-SPECIFICATIONS.md`;
- creates root `PROJECT-RECORD.md`;
- migrates the Drive product vision and the 50 planned capability sections into the canonical specification;
- preserves the full former Drive source below as source-era project history/candidate evidence;
- updates README navigation; and
- changes project-specification authority from Google Drive to the repository once this migration is accepted and read back from `main`.

**Drive migration source:** Project Specification — AI  
**Drive file ID:** `1_5XiZg2BW8LiM3sPw-t9UlTcm_xsmE-o`  
**Drive deletion status:** Blocked until accepted/default-branch readback succeeds and no migration discrepancy remains.

## Related governance debt

The repository still contains legacy `FEATURE-ROADMAP.md`, whose current text points to Drive authority/synchronization. Feature-state/changelog migration is governed separately and should be reconciled without conflating it with this project-specification migration.

# Imported Drive Source Record

The complete Drive source is retained below as migration evidence and historical/candidate context. It contains planning, candidate implementation status, validation checkpoints, and superseded version references. **It does not override newer repository/default-branch truth.**

---

Project Specification — AI
Planned Features and Capabilities
GoreeCloud AI — private intelligence, reasoning, research, creation, knowledge, and automation for the GoreeCloud ecosystem.
Product Vision
GoreeCloud AI is GoreeCloud’s first-party artificial intelligence platform, designed to provide private AI conversations, reasoning, research, knowledge management, content creation, automation, tools, agents, and intelligent assistance across the GoreeCloud ecosystem.
GoreeCloud AI is not intended to be a clone of ChatGPT, Claude, Gemini, Open WebUI, or AnythingLLM. It will be original GoreeCloud software that incorporates successful concepts from modern AI assistants while using GoreeCloud’s own architecture, Glaze UI design language, privacy controls, security systems, services, and product identity.
The long-term goal is for GoreeCloud AI to operate as an intelligence and orchestration layer for GoreeCloud rather than simply as a chatbot.
Current Verified Implementation State
The active source repository is GoreeCloud/goreecloud-ai on GitHub, with development continuing through a Draft pull request while GoreeCloud Code is developed as the first-party long-term source-control and developer-platform boundary. Forgejo is preferred initial replaceable forge infrastructure behind GoreeCloud Code; GoreeCloud AI should not hard-code a permanent Gitea or Forgejo dependency.
Implemented source foundations now include a React/TypeScript/Vite client, Node.js backend, backend-owned Ollama discovery and streaming chat, conversation persistence, model-role abstraction, Workspaces, private attachment storage, quota/deletion lifecycle controls, a Node-native Wardveil artifact trust gate, passive post-Wardveil text extraction, a read-only non-authorizing knowledge-eligibility assessment, and an opt-in live runtime validator for first-party service health, Ollama discovery, and an explicitly selected streamed model request through the GoreeCloud AI backend. The current Draft branch also includes a separately unit-tested, side-effect-free approved-model selector for 13 planned functional roles with explicit installed-model matching, administrator role approvals, manual selection within approval, and deterministic Gemma/Qwen family preferences. It has not been wired into live model discovery or chat routing. The Draft branch additionally contains an isolated, development-only backend preflight seam that accepts only a requested role, an optional exact model preference and cancellation; retrieves a backend-supplied policy snapshot; checks bounded policy freshness and validity; obtains installed-model discovery through an injected adapter; and fails closed on invalid approval data, unavailable or malformed model inventory, timeouts and cancellation. The preflight is not connected to the existing live chat endpoint and all returned selections remain inferenceAuthorized=false and development-unverified. The verified Draft branch additionally includes a protected local policy-file reader, loopback-only discovery, an operator-gated read-only routing diagnostic, and a pure operator-declared model capability/resource-fit assessor. The latter checks exact selected model and role, requested modalities, declared tool-use support, estimated context and memory budgets, concurrency headroom and bounded snapshot freshness. An additional opt-in operator resource diagnostic now composes the protected readers, preflight and candidate assessor, samples free local system RAM, and reports only sanitized non-authorizing decisions. The source components remain disconnected from live chat and user-facing routes and do not establish real GPU capacity, model capability, authenticated policy provenance or execution authority.
Attachment storage is not equivalent to trust. Without an authenticated deployed Wardveil Scan transport, uploads remain private/staged and unverified. Released content must be bound to current authoritative clean evidence and a matching SHA-256 digest.
The first post-release extraction boundary accepts only text/plain, text/markdown, text/x-markdown, and application/json; requires Wardveil release/context-use permission; re-hashes the released source bytes; uses fatal UTF-8 decoding; rejects unsupported control bytes; validates JSON; applies a dedicated source-byte limit; and stores derived extraction records privately with source and text digests.
PDF, HTML, Office, archive, executable/script, media, model, and other complex or active formats remain outside this parser boundary. Extraction does not authorize embeddings, indexing, RAG retrieval, model-context use, tool execution, external processing, or Privacy Shield data use.
The source branch also contains the required root repository records README.md, SPECIFICATIONS.md, FEATURES.md, BENEFITS.md, COMPETITIVE-OBJECTIVES.md, USER-MANUAL.md and BRANDING.md using the unified GoreeCloud branding authority. The repository-root USER-MANUAL.md is the sole authoritative project user manual under the current GitHub-only manual-storage standard; historical Google Drive copies are not authoritative.
GLAZE UI V1.5 / 1.5.1 is the current mandatory Stable consumer target. Earlier 1.1.0, 1.4.1, and experimental 2.x references are historical or superseded migration input, not current conformance. GoreeCloud AI remains migration/reconciliation-required until it implements 1.5.1 and completes product-specific exact-revision acceptance.
Source validation covers application TypeScript, server syntax including the runtime-validation and knowledge-eligibility modules, native attachment-security/lifecycle/extraction/knowledge-eligibility tests, production client build, Python Wardveil reference behavior, contract validation, and source compilation. The opt-in runtime validator checks GoreeCloud AI service health and Ollama discovery through the first-party backend and can exercise one explicitly selected streamed model request; it can also fail when an expected Wardveil scanner transport is reported unconfigured rather than manufacturing acceptance. The existence or source validation of this tool is not live interoperability evidence. Recorded live application-to-Ollama validation, live authenticated Wardveil interoperability, GoreeCloud Identity-backed multi-user boundaries, Privacy Shield runtime acceptance, Everkeep application lifecycle/recovery acceptance, Mesh integration, and Stable qualification remain outstanding. As of September 23, 2026, the new selector passed 15 local Node.js unit tests and both exact-head GitHub Actions workflows on candidate 105494f2227f94acaa8ccb4f8d1408bfd360aff2; this is source/repository validation only, not live model-routing acceptance. The subsequent exact Draft candidate 95f570ec93a708b51203bd23cbd1a312568cbfa9 adds the isolated preflight and 17 additional tests. On this head, 32 combined model-routing tests passed locally and both exact-head CI workflows passed: Validate GoreeCloud AI run 35839573719 and Platform Contract run 35839574698. No live model-routing, runtime interoperability or production authorization is established by this source validation.
Capability Map
Section Index
Planned Features and Capabilities
1. AI Model and Runtime Architecture
GoreeCloud AI will use a stable first-party AI abstraction over approved model runtimes and model families so the product experience is not permanently coupled to one runtime or model identifier.
Ollama Integration
GoreeCloud AI will use Ollama as a third-party model-runtime foundation for running approved local AI models. Ollama is infrastructure rather than GoreeCloud AI’s product identity. GoreeCloud AI will provide its own stable model abstraction so users and other GoreeCloud applications do not need to interact directly with Ollama APIs. The architecture will allow Ollama to be replaced or supplemented by another model runtime in the future without requiring GoreeCloud AI’s user experience or application interfaces to be redesigned.
Primary Model Family — Gemma
The Gemma model family will be one of GoreeCloud AI’s two primary model families. Gemma models may be assigned roles including:
Advanced reasoning
General-purpose conversation
Writing and rewriting
Summarization
Planning
Question answering
Knowledge work
Instruction following
Lightweight local assistance
Multimodal capabilities where supported
Primary Model Family — Qwen
The Qwen model family will be the second primary model family. Qwen models may be assigned roles including:
Advanced reasoning
Complex problem solving
Coding
Mathematics
Technical assistance
Agent workflows
Tool use
Structured data processing
Long-context tasks
General-purpose conversation
Multimodal work where supported
Model Roles
Instead of exposing only a long list of model names, GoreeCloud AI will support model roles. Planned roles include:
Reasoning
Fast
General
Coding
Research
Writing
Vision
Multimodal
Embedding
Agent
Creative
Image
Experimental
Automatic Model Routing
GoreeCloud AI is planned to eventually select the most appropriate approved model based on the requested task. Gemma and Qwen will initially be prioritized for the core Reasoning and general intelligence roles. Exact variants remain replaceable as capabilities, hardware requirements, licensing, and quality change.
User request → GoreeCloud AI Router → Model Role → Approved Model → Ollama
A coding request may route to a coding-oriented Qwen model, while general writing or reasoning may use an appropriate Gemma or Qwen model. Users may still be allowed to select models manually when desired.
2. Advanced AI Conversation
GoreeCloud AI will provide a modern conversational AI experience with streamed responses rather than requiring users to wait for the entire response.
General questions and answers
Natural multi-turn conversations
Brainstorming
Explanations
Planning
Writing
Rewriting
Summarization
Technical assistance
Mathematical assistance
Coding assistance
Architecture assistance
GoreeCloud administration assistance
Structured output
Markdown
Tables
Code blocks
Syntax highlighting
3. Advanced Reasoning
GoreeCloud AI will provide dedicated reasoning capabilities for complex problems.
Multi-step problem solving
Mathematical reasoning
Scientific reasoning
Logical analysis
Software architecture
Technical troubleshooting
Planning
Decision analysis
Data interpretation
Complex document analysis
Fast
For ordinary questions and low-latency interaction.
Reasoning
For problems requiring additional analysis.
Deep Reasoning
For especially difficult technical, mathematical, scientific, planning, or research tasks. Gemma and Qwen will be the primary model families evaluated and assigned to these roles.
4. Persistent Conversations
GoreeCloud AI will support persistent conversation history and branching without destroying the original conversation.
Conversation titles
Conversation search
Conversation folders or organization
Rename
Archive
Delete
Export
Pinning
Branching
Continue previous conversations
Edit and resubmit messages
Retry responses
Regenerate responses
Continue generation
Switch compatible models within conversations
5. Temporary and Private Chats
Users will be able to start temporary conversations intentionally separated from normal persistent conversation history. Privacy-sensitive processing will clearly indicate whether a request is:
Fully local
Stored
Temporary
Using external resources
Using Internet research
Using connected GoreeCloud services
GoreeCloud Privacy Shield will govern applicable privacy decisions and processing boundaries.
6. Workspaces
GoreeCloud AI will provide Workspaces for persistent projects. Workspaces will keep AI context organized around long-running goals rather than isolated conversations.
Conversations
Instructions
Documents
Images
Files
Knowledge collections
Research
Generated content
Artifacts
Sources
Tools
Workspace-specific memory
Workspace-specific model settings
Example Workspaces
GoreeCloud Development
Home Infrastructure
Research
School
Software Project
Writing Project
Business Planning
7. AI Memory and Personal Context
GoreeCloud AI is planned to support controlled long-term context. Memory must remain transparent and manageable, Privacy Shield will govern persistent personal context, and Workspace knowledge will remain logically distinct from user memory.
User preferences
Preferred formatting
Writing preferences
Frequently used applications
Project context
Workspace knowledge
Repeated instructions
User-approved facts
Workflow preferences
8. File Intelligence
Users will be able to attach files to conversations and Workspaces. Complex formats will enter AI processing only after required security, parsing, authorization, and privacy boundaries are implemented and accepted.
Planned Content Types
Plain text
Markdown
JSON
PDF
Documents
Spreadsheets
Presentations
Images
Source code
Configuration files
Data files
Archives where safely supported
Planned File Operations
Read documents
Summarize them
Explain them
Extract information
Compare documents
Answer questions about them
Find relationships between files
Use approved files as AI context
9. Wardveil-Secured File Intake
Files uploaded to GoreeCloud AI will integrate with Wardveil Security by GoreeCloud. A file being uploaded does not automatically make it trusted.
Planned Security Flow
Upload → Private staging → Wardveil Security inspection → Integrity verification → Permission evaluation → Safe release → Parsing / AI processing
Trust and Runtime Boundaries
Suspicious, malicious, unsupported, stale, mismatched, or unverifiable content can remain blocked or quarantined. Model files, executable content, scripts, tools, generated code, and other active artifacts will require additional runtime authorization beyond malware scanning.
10. Knowledge Library
GoreeCloud AI will provide a native Library for creating reusable knowledge collections. Collections can be associated with individual Workspaces or used as approved reusable sources.
Product documentation
Research papers
GoreeCloud documentation
Manuals
Project files
Technical references
Notes
Books
Policies
Software documentation
11. Native RAG
GoreeCloud AI will include a first-party Retrieval-Augmented Generation system so approved private knowledge can be retrieved without placing the entire source collection into every prompt.
Planned Pipeline
Document → Security validation → Safe extraction → Authorization → Chunking → Embeddings → Indexing → Retrieval → Model context → Citation
12. Embeddings and Semantic Search
GoreeCloud AI will support embedding models through approved local model infrastructure. Embedding models may be selected independently from conversational models.
Semantic document search
Knowledge retrieval
Similar-content discovery
Workspace search
Conversation retrieval
RAG
Document relationships
Research organization
13. Citations and Source Verification
GoreeCloud AI will provide citations for information obtained through approved retrieval systems and will help users distinguish model-generated knowledge from retrieved, source-backed information.
Citation Sources
Local documents
Workspace knowledge
GoreeCloud Search
Research sources
Connected services
Source Cards
Source name
Document
Page or section
Website
Relevant excerpt
Retrieval origin
Date
Citation
14. GoreeCloud Search Integration
GoreeCloud Search will be the first-party Internet research provider for GoreeCloud AI. GoreeCloud AI should not expose search-provider infrastructure as its product contract.
Planned Architecture
User → GoreeCloud AI → GoreeCloud Search → Approved Internet sources → GoreeCloud AI research synthesis
Capabilities
Current-information lookup
Web search
Source discovery
News research
Technical research
Documentation lookup
Multi-source comparison
Citation generation
15. Deep Research
GoreeCloud AI will provide a dedicated research capability for larger research requests and may combine approved Internet sources, Workspace files, Library documents, and GoreeCloud data.
Research Workflow
Interpret the research objective.
Develop a research plan.
Search through GoreeCloud Search.
Inspect multiple sources.
Follow relevant references.
Compare evidence.
Analyze contradictions.
Organize findings.
Generate a structured report.
Provide citations.
16. Research Workspaces
Long-running research projects may maintain persistent research state, making GoreeCloud AI a research environment rather than only a question-answering interface.
Research questions
Search history
Saved sources
Notes
Citations
Documents
Generated reports
Research conversations
Findings
Artifacts
17. Coding Assistant
GoreeCloud AI will provide software-development assistance. Qwen models are planned to play an important role in coding and technical model roles.
Generate code
Explain code
Review code
Debug
Refactor
Generate tests
Write documentation
Explain errors
Work with configuration
Architecture planning
API design
Database design
Shell commands
Regular expressions
Infrastructure configuration
18. GoreeCloud Code Integration
Future integration with GoreeCloud Code will allow GoreeCloud AI to operate within GoreeCloud’s first-party development environment. All source-changing operations remain subject to repository, review, security, and authorization requirements.
Repository understanding
Code search
Issue analysis
Pull request assistance
Change generation
Test generation
Documentation updates
Code review
Repository-aware questions
Development planning
Agentic coding tasks
19. AI Agents
GoreeCloud AI will support approved AI agents capable of completing bounded multi-step tasks. Agents will operate through explicit permissions rather than unrestricted access to the GoreeCloud environment.
Develop a task plan
Search for information
Retrieve files
Analyze documents
Use approved tools
Generate artifacts
Perform calculations
Interact with permitted GoreeCloud services
Execute bounded workflows
Return results
20. Multi-Agent Workflows
Future versions may allow one AI task to delegate work among specialized agents.
Example Delegation
Primary Agent → Research Agent → Coding Agent → Document Agent → Data Agent → Verification Agent
The primary agent could combine their results into a final response or artifact.
21. Tools
GoreeCloud AI will support approved tools that extend model capabilities. Models will request tools through GoreeCloud AI rather than receiving unrestricted system access.
Search
Calculator
Code execution
File operations
Database queries
Document generation
Spreadsheet operations
GoreeCloud service integrations
Research tools
Developer tools
Image tools
22. Skills
Reusable Skills may package prompts, tools, instructions, workflows, and policies for particular activities without permanently expanding the default assistant context.
Research Skill
Coding Skill
Document Skill
Spreadsheet Skill
Network Troubleshooting Skill
GoreeCloud Administration Skill
Writing Skill
Data Analysis Skill
23. Workflow Automation
GoreeCloud AI is planned to support reusable automated workflows.
Example Flow
Research topic → Search → Collect sources → Analyze → Produce report → Save report → Notify user
Other Examples
Document processing
Weekly reports
Project summaries
Repository checks
Inbox summaries
Data analysis
Knowledge ingestion
Administrative workflows
24. Scheduled AI Tasks
Users may eventually schedule GoreeCloud AI tasks at a specific time or on supported daily, weekly, monthly, or other recurring schedules.
Morning briefing
Weekly project summary
Research update
System report
Reminder
Knowledge synchronization
Repository summary
25. Conditional Monitoring
Approved agents may monitor a condition and notify users when something meaningful occurs. Monitoring will remain permission-bound and auditable.
Service state changes
New research findings
Repository events
New messages
Scheduled-event changes
System alerts
26. GoreeCloud Ecosystem Integration
GoreeCloud AI is intended to eventually work across approved GoreeCloud applications. Integrations must use first-party application contracts instead of bypassing GoreeCloud services to access their infrastructure directly.
GoreeCloud Drive
GoreeCloud Mail
GoreeCloud Calendar
GoreeCloud Tasks
GoreeCloud Notes
GoreeCloud Documents
GoreeCloud Spreadsheet
GoreeCloud Presentations
GoreeCloud Research Library
GoreeCloud Search
GoreeCloud Code
GoreeCloud Manager
GoreeCloud GitHub Dashboard
GoreeCloud Photos
GoreeCloud Location
GoreeCloud Maps
GoreeCloud Home
Other approved GoreeCloud services
27. Universal GoreeCloud Assistant
Over time, GoreeCloud AI may become the conversational interface for performing authorized operations throughout GoreeCloud. The AI layer would determine which approved GoreeCloud services are required.
Example Requests
“Find the document I was working on yesterday and summarize it.”
“Show me my tasks due this week.”
“Research this topic and save the report to Drive.”
“Create a spreadsheet from these numbers.”
“Review this repository.”
“Prepare a presentation from this Workspace.”
28. Artifact Workspace
GoreeCloud AI will support persistent generated Artifacts rather than treating every generated result as disposable chat text. Artifacts may be displayed beside the conversation using an adaptive contextual workspace.
Documents
Code
Reports
Tables
Charts
Diagrams
Research reports
Images
Structured data
Web interfaces
Application prototypes
Presentations
Spreadsheets
29. Document Creation
GoreeCloud AI will eventually work with GoreeCloud Documents to create polished editable content so users can move from conversation to an editable document without manual copy and paste.
Reports
Letters
Proposals
Documentation
Manuals
Research papers
Project specifications
Meeting notes
Plans
30. Spreadsheet Intelligence
Integration with GoreeCloud Spreadsheet may provide:
Spreadsheet generation
Formula creation
Data cleaning
Data analysis
Forecasting
Summaries
Charts
Tables
Statistical calculations
Natural-language spreadsheet editing
31. Presentation Creation
Integration with GoreeCloud Presentations may allow users to request editable presentation outputs.
Presentation outlines
Full slide decks
Speaker notes
Charts
Diagrams
Research-backed presentations
Image-supported slides
32. Data Analysis
GoreeCloud AI will provide data-analysis capabilities for approved datasets.
CSV analysis
Spreadsheet analysis
Statistics
Trends
Aggregation
Data cleaning
Visualization
Forecasting
Pattern detection
Natural-language queries over structured data
33. Image Understanding
Multimodal models may allow GoreeCloud AI to understand supported visual information.
Photos
Screenshots
Diagrams
Charts
Documents
Interfaces
Receipts
Scanned material
Other supported visual information
Example Requests
“What is happening in this image?”
“Explain this chart.”
“Find the problem in this screenshot.”
“Extract the information from this diagram.”
34. Conversational Image Generation
Image generation is planned as a native GoreeCloud AI capability. Users may request images directly through normal conversation, and generated assets may be retained as GoreeCloud AI artifacts.
“Create a concept image for GoreeCloud.”
“Generate artwork for this presentation.”
“Create an icon concept.”
“Visualize this idea.”
35. Image Transformation
Where supported by approved image models and security boundaries, users may provide an existing image and request changes. Advanced professional manual editing may eventually be handed to a dedicated GoreeCloud creative application.
Object removal
Object addition
Background changes
Restyling
Recomposition
Image enhancement
Variations
Concept transformation
36. Voice Conversations
Future GoreeCloud AI versions are planned to support voice interaction.
Speech-to-text
Natural spoken conversations
Text-to-speech responses
Voice interruption
Hands-free interaction
Voice commands
Voice-based GoreeCloud actions
37. Screen and Camera Intelligence
Future multimodal capabilities may allow users to share approved screen or camera context with GoreeCloud AI. Camera and screen access must remain explicitly permission-controlled.
Technical support
Interface assistance
Visual question answering
Document explanation
Troubleshooting
Object recognition
Step-by-step guidance
38. Future Audio and Multimedia Intelligence
Additional multimodal capabilities may eventually be introduced only where justified by available models, privacy requirements, infrastructure, and product scope.
Audio understanding
Audio transcription
Speaker-aware summaries
Generated narration
Podcast-style summaries
Multimedia analysis
39. Custom Assistants
Users may eventually create specialized GoreeCloud AI assistants. These remain GoreeCloud AI configurations rather than independent AI products.
Configurable Elements
Name
Instructions
Model role
Knowledge
Workspace
Tools
Skills
Permissions
Behavioral configuration
Examples
Coding Assistant
Research Assistant
GoreeCloud Administrator
Writing Assistant
Study Assistant
Home Assistant
40. Personal Daily Brief
GoreeCloud AI may provide an optional daily briefing generated from approved sources. The user will control which sources may contribute.
Calendar
Tasks
Messages
Project updates
Research updates
Reminders
System notifications
Relevant GoreeCloud activity
41. Proactive Intelligence
Beyond responding to prompts, GoreeCloud AI may eventually identify useful actions or information based on explicitly authorized context. Proactive assistance must remain user-controllable and should not become uncontrolled background surveillance.
Upcoming deadline
Unfinished project
Related document
Duplicate task
New relevant research
Service problem
Unanswered message
42. Security Architecture
Wardveil Security by GoreeCloud will govern GoreeCloud AI security boundaries. Security decisions must fail closed when required authoritative evidence is unavailable.
Uploaded files
Generated files
Model artifacts
Tool artifacts
Executable content
Agent actions
Image inputs
External providers
Runtime access
Sensitive operations
43. Privacy Architecture
GoreeCloud Privacy Shield will govern privacy-sensitive AI processing.
Local
Processing remains within approved GoreeCloud-controlled infrastructure.
External
Information would leave the local GoreeCloud processing boundary and requires applicable Privacy Shield authorization. Users should be clearly informed when external processing is proposed.
44. Identity and Permission Controls
GoreeCloud Identity will provide authenticated identity. GoreeCloud AI will remain responsible for application-specific authorization, and AI models themselves will not determine user authorization.
Conversations
Workspaces
Files
Knowledge
Models
Tools
Agents
Artifacts
Operations
45. Everkeep Integration
Everkeep will provide applicable resilience and preservation capabilities.
Backup
Recovery
Export
Portability
Provenance
Retention
Generated asset preservation
Workspace recovery
Data lifecycle support
46. Observability
GoreeCloud AI will integrate with GoreeCloud Observability for approved operational insight without unnecessarily exposing private conversation contents.
Service health
Model runtime health
Request latency
Failed requests
Tool failures
Agent failures
Search failures
Model availability
Resource consumption
Error reporting
47. Responsive Glaze UI Experience
GoreeCloud AI will use the current accepted Glaze UI design system. Tablet and mobile versions will adapt surfaces into appropriate drawers, sheets, panels, and dedicated views rather than merely shrinking the desktop interface.
Collapsible navigation
Large conversation surface
Persistent composer
Model-role selection
Context panel
Workspaces
Library
Search and Research
Conversation history
48. Cross-Device GoreeCloud AI
GoreeCloud AI is intended to eventually provide a consistent experience across supported form factors. Workspaces, conversations, artifacts, permissions, and approved context may follow users between devices.
Desktop
Web
Tablet
Mobile
Other supported GoreeCloud form factors
49. Local-First Intelligence
A major GoreeCloud AI design objective is maximizing the usefulness of local AI. External AI providers should not become mandatory dependencies for the core product.
Local Ollama models
Local embeddings
Local knowledge processing
GoreeCloud-controlled services
Private GoreeCloud infrastructure
50. Replaceable AI Infrastructure
GoreeCloud AI will avoid permanently binding the product to any one model, runtime, vector database, search provider, or inference implementation. Individual components may evolve while GoreeCloud AI remains the stable product users interact with.
Intended Abstraction
GoreeCloud AI → Model Runtime Adapter → Ollama initially
GoreeCloud AI → Model Role → Gemma / Qwen / other approved models
GoreeCloud AI → Search Adapter → GoreeCloud Search
GoreeCloud AI → Retrieval Layer → Approved GoreeCloud storage/index infrastructure
Strategic Position
GoreeCloud AI should ultimately combine the major capability classes users expect from leading AI systems while remaining aligned with GoreeCloud principles. Competitor references describe capability inspirations, not product identity or a requirement to copy their implementations.
The resulting product should not be defined by those competitors. It should be defined as:
Core Technical Direction
Guiding Architecture
GoreeCloud AI owns the experience.
Ollama runs approved models.
Gemma and Qwen provide primary intelligence roles.
GoreeCloud services provide the ecosystem.
Wardveil and Privacy Shield protect the boundaries.
Development Checkpoints and Verification History
August 30, 2026 — Knowledge-Eligibility Observation Extension
GoreeCloud AI now exposes GET /api/files/:id/knowledge-eligibility as a read-only assessment of the gates required before a future knowledge pipeline may use an attachment. It reports Wardveil release/context-use state, safe text-extraction support/binding, GoreeCloud Identity authorization state, Privacy Shield authorization state, and indexing/retrieval/model-context stage state.
The current source always reports eligibleForIndexing=false, eligibleForRetrieval=false, and eligibleForModelContext=false. Even when Wardveil release and safe extraction are satisfied, Identity and Privacy Shield authorization remain pending and indexing, retrieval, and model-context stages remain disabled/not implemented. The surface can report blocked_security, blocked_parser_or_extraction, pending_extraction, or pending_authorization; none of those states is permission to advance the attachment.
This addition does not implement chunking, embeddings, indexing, retrieval, RAG, model-context authorization, external processing, or production multi-user authorization. Live authenticated Ollama/Wardveil interoperability, Privacy Shield runtime acceptance, Everkeep lifecycle/recovery, GoreeCloud Identity integration, Mesh integration, exact Glaze UI conformance, deployment, and broader production-readiness evidence remain outstanding.
August 30, 2026 — Knowledge Authorization Input Assessment and Historical Glaze Migration Record
GoreeCloud AI now exposes POST /api/files/:id/knowledge-authorization-assessment as a bounded, non-persistent assessment of supplied identity/application and privacy authorization inputs against the current attachment/extraction state. It does not create persistent authorization, chunks, embeddings, indexes, retrieval state, model context, research work, or external transfers.
Current GoreeCloud Identity architecture was reconciled before implementation: Identity establishes authenticated identity and approved claims while GoreeCloud AI remains responsible for its own resource/Workspace authorization. The source therefore uses application-local operation identifiers goreecloud-ai.knowledge.index, goreecloud-ai.knowledge.retrieve, and goreecloud-ai.knowledge.model-context rather than inventing GoreeCloud-wide Identity permission scopes. Identity/application input is checked for actor identity/type, authenticated state, exact attachment resource binding, permitted application operation, non-future observation time, valid observation/expiration ordering, and expiration.
Privacy input is structurally aligned to the current Privacy Shield decision request/response contract. The assessment validates request/decision binding, resource, application-local operation, requester/acting-user binding, processing zone, destination, permitted operations, current effective_scope field, obligations, and expiration. DENY blocks; REQUIRE_USER_DECISION remains pending; ALLOW and ALLOW_WITH_CONSTRAINTS may become structurally satisfied only when checked constraints agree. These application-local operation names are not additions to the canonical Privacy Shield capability registry.
Even when supplied Identity/application and Privacy Shield inputs are structurally satisfied, the source explicitly returns sourceTrust.productionTrustedInput=false, persistentAuthorizationCreated=false, and executionAuthorized=false because authenticated runtime Identity/Privacy adapters, operation-bound capability/signature verification, durable authorization/evidence handling, and production acceptance are not connected. eligibleForIndexing, eligibleForRetrieval, and eligibleForModelContext remain false. A structurally satisfied assessment may report pending_stage_implementation; Privacy Shield REQUIRE_USER_DECISION reports pending_privacy_user_decision.
Troubleshooting: intermediate exact head e734dfd100febfac3164ef9baebde7926080adc6 failed validation run 33349160014 because the newly tightened expired-authorization test fixture used expiresAt earlier than observedAt. The implementation correctly rejected the impossible ordering before reaching the intended expiration assertion. The fixture was corrected to use a valid historical observation/expiration window; no production check was weakened.
The current authoritative Stable consumer target is GLAZE UI V1.1 / 1.1.0. Earlier GoreeCloud AI 2.x targets are historical migration input, and the application remains migration/reconciliation-required until it targets 1.1.0 and completes product-specific exact-revision acceptance.
Exact Draft Pull Request #1 head d1f9aaf1b349188a52629c4cb5ac7f71545546eb passes validation run 33349222617. Live Ollama/Wardveil interoperability, authenticated Identity integration plus GoreeCloud AI application authorization, authenticated Privacy Shield enforcement/capability/evidence, Everkeep lifecycle/recovery, Mesh integration, actual safe knowledge/RAG stages, GLAZE UI V1.1 / 1.1.0 application acceptance, deployment, and broader production-readiness evidence remain outstanding. No Stable or production-ready claim is made.
September 5, 2026 — Privacy Shield Request-Retention Validation
Exact Draft Pull Request #1 head 2569e91fadec6e20d3d0575b8afda4d6fd9c6229 passes validation run 33977098029. The knowledge-authorization assessment now validates optional Privacy Shield request retention.expires_at as a date-time when present and fails closed on malformed values. This does not create production-trusted authorization, persistent authorization, or execution authority; indexing, retrieval, and model-context eligibility remain false.
The authoritative Stable consumer target has been reconciled to GLAZE UI V1.1 / 1.1.0. Live Ollama/Wardveil interoperability, authenticated Identity/application authorization, authenticated Privacy Shield enforcement/capability/evidence, Everkeep lifecycle/recovery, Mesh integration, actual safe knowledge/RAG stages, Glaze UI 1.1.0 application acceptance, deployment, and broader production-readiness evidence remain outstanding. No Stable or production-ready claim is made.
September 5, 2026 — Privacy Shield Closed-Schema Structural Validation
Exact Draft Pull Request #1 head 748c576704f9e76725096311f7b628daf4de765e passes validation run 33977934840. The bounded knowledge-authorization assessor now rejects unknown properties at Privacy Shield request, requester, request-retention, and decision boundaries where the authoritative privacy-shield.decision.schema.json contract uses additionalProperties=false, and type-checks supported optional contract fields. Resource extensibility and the unconstrained internal decision-retention shape remain as allowed by the current authoritative schema.
This remains non-authorizing source validation: productionTrustedInput=false, persistentAuthorizationCreated=false, executionAuthorized=false, and indexing/retrieval/model-context eligibility stay false. Authenticated Identity/Privacy adapters, Wardveil, Everkeep, Mesh, actual RAG stages, GLAZE UI V1.1 / 1.1.0 consumer acceptance, deployment, and production-readiness evidence remain outstanding. No Stable or production-ready claim is made
Current verified development checkpoint — Knowledge Authorization Temporal Fail-Closed Hardening
Exact Draft Pull Request #1 head e7e1f971b9f2c5085a68cd15340b40ed2ad0e1aa passes validation run 34001443300. The bounded knowledge-authorization assessor now rejects non-finite assessment clocks so temporal gates cannot be bypassed with NaN or infinity, and an otherwise structurally valid Privacy Shield request is blocked when request.retention.expires_at is already expired. Future valid request-retention expiry remains structurally eligible, while decision expiration continues to be checked separately.
This remains explicitly non-authorizing: sourceTrust.productionTrustedInput=false, persistentAuthorizationCreated=false, executionAuthorized=false, and indexing/retrieval/model-context eligibility remain false. Authenticated Identity/Privacy adapters, Wardveil, Everkeep, Mesh, actual RAG stages, GLAZE UI V1.1 / 1.1.0 consumer acceptance, deployment, and production-readiness evidence remain outstanding. No Stable or production-ready claim is made.
Current verified development checkpoint — Authenticated runtime-adapter readiness boundary
Exact Draft Pull Request #1 head d3583fcc1c6ee9628f41a81404aba01a473c7eb6 passes Validate GoreeCloud AI run #87 (34035763719).
The source now contains an explicit runtime-adapter readiness contract for the future knowledge boundary. It enumerates the authenticated Identity transport/source/actor and application-resource-authorization evidence, Privacy Shield authenticated decision and request/resource/operation/expiration bindings, and Wardveil authenticated resource/operation evidence that a future real adapter must supply. Unknown evidence fields and non-object input fail closed, and missing evidence is reported deterministically.
Even when every readiness flag is true, the contract deliberately keeps productionTrustedInput=false, persistentAuthorizationCreated=false, executionAuthorized=false, and indexing/retrieval/model-context eligibility false. This module cannot manufacture trust from caller-supplied JSON and is not an authenticated runtime adapter. Live Identity, Privacy Shield, and Wardveil transports/evidence, durable authorization/revocation/replay handling, actual RAG stages, Everkeep, Mesh, Glaze UI consumer acceptance, deployment, and production-readiness evidence remain outstanding. GoreeCloud AI remains Development and Draft.
September 6, 2026 — Runtime Evidence Envelope Binding
Exact Draft Pull Request #1 head 6c5ac1ec905962ec6904dd12981fea8a3a43abbf passes Validate GoreeCloud AI run 34037208462. The Development source now defines a strict version-1 runtime evidence envelope assessment for future authenticated Identity, Privacy Shield, and Wardveil adapter records. The closed envelope binds authority, bounded resource identity, bounded application-local operation, observation time, and expiry to an expected application context. Authority/resource/operation mismatches, unknown fields, malformed identifiers, malformed timestamps, future observations, impossible validity intervals, and expired evidence fail closed.
A structurally bound and current envelope is still not production authority. The helper always reports productionTrustedInput=false, persistentAuthorizationCreated=false, executionAuthorized=false, and indexing/retrieval/model-context eligibility false. Real authenticated adapters, capability/signature/provenance verification, durable authorization/evidence handling, revocation/replay semantics, Wardveil/Privacy Shield/Identity target-runtime acceptance, actual knowledge/RAG stages, Everkeep, Mesh, Glaze UI, deployment, recovery, RC, Stable, and production readiness remain outstanding.
Development checkpoint — September 7, 2026
Exact Development head `137a881302c241ffaef311cfb47adcbf5ea12e7f` passed Validate GoreeCloud AI #91 (`34149989132`). A new Runtime Evidence Replay Precondition v1 requires a bounded exact evidence identifier and exact request identifier binding before future authenticated runtime evidence can even be considered for use. Cross-request rebinding, malformed identifiers, and unknown fields fail closed. Crucially, exact request binding is explicitly necessary but insufficient: `durableSingleUseRegistryPresent`, `replayProtectionSatisfied`, `productionTrustedInput`, `persistentAuthorizationCreated`, `executionAuthorized`, and indexing/retrieval/model-context eligibility all remain false. Continue only by implementing an authenticated durable single-use/revocation registry and integrating real GoreeCloud Identity, Privacy Shield, and Wardveil evidence adapters before any knowledge execution path is enabled. This checkpoint creates no anti-replay claim, model-context permission, RAG execution, production trust, RC, or Stable status.
Development continuation checkpoint — September 7, 2026
Exact Development head `bb3d9e7859a0c725de1e790018bd3f9500ba7a3f` passes Validate GoreeCloud AI #93 (`34160106095`). A Development-only durable runtime-evidence use registry now persists hashed evidence/request identifiers only in a restrictive bounded JSONL file, fsyncs reservations and revocations, survives restart, detects same-request and cross-request evidence replay, prevents later reservation of revoked evidence, and fails closed on malformed durable state. Raw evidence/request identifiers are not persisted. This registry is necessary replay state, not authenticated provenance: `productionTrustedInput`, execution, indexing, retrieval, and model-context authority remain false. Authenticated producers, provenance/signature/capability verification, accepted real adapters, and integration of this registry into those flows remain open. GoreeCloud AI remains Development; this checkpoint does not establish RAG eligibility, production acceptance, RC, or Stable status.
September 17, 2026 — Platform Contract 0.4 Nine-System Migration Checkpoint
Exact Draft Pull Request #1 head `16c3c3c7dfc2b933d8af288cb85d834b7e72d022` passed Validate GoreeCloud AI run `35285866902` (#96) and GoreeCloud AI Platform Contract run `35285867760` (#2). The Draft line now declares Platform Contract `0.4`, evaluates exactly nine Integral Platform Systems, adds GoreeCloud Policy and GoreeCloud Observability as applicable-blocked, pins the reusable validator to accepted central Contract 0.4 revision `6cb150d512647a0401b4da9e4741d7591693dee0`, and updates the current Stable Glaze UI target to `1.5.1`. This is a conformance/governance migration only; no application-specific Platform-System integration has been accepted by this change.
The branch remains Development, Draft, and nonconformant. Glaze UI 1.5.1 consumer acceptance; live Ollama interoperability; authenticated Identity, Privacy Shield, and Wardveil integration; Everkeep recovery/portability; Manager and Mesh acceptance; Policy decision/enforcement evidence; Observability health/telemetry evidence; governed RAG stages; representative runtime; release; deployment; and Stable qualification remain outstanding. No production-ready or Stable claim is made.
September 23, 2026 — Approved Model-Role Routing Source Foundation
Draft PR #1 head 105494f2227f94acaa8ccb4f8d1408bfd360aff2 adds a 13-role, side-effect-free approved-model selector, 15 unit tests, and model-routing implementation notes. Exact-head GitHub Actions Validate GoreeCloud AI 35838512749 and Platform Contract 35838513352 both passed. Model selection requires exact installed-model and administrator role approvals; manual choices cannot bypass them.
The selector is not yet wired into chat or runtime model discovery. It does not grant authorizations, load models, access external providers, or enable RAG or tools. All existing nine-system acceptance, live interoperability, security/privacy, recovery, and release gates remain outstanding. Ongoing work is tracked in GoreeCloud/Tasks Management/AI — Implementation Task List.docx.
September 23, 2026 — Bounded Backend Model-Routing Preflight
Draft PR #1 head 95f570ec93a708b51203bd23cbd1a312568cbfa9 adds an isolated backend preflight module, 17 negative/positive tests and an explicit development integration contract. The module uses injected backend-owned policy and model-discovery adapters and rejects invalid role requests, client-supplied approvals, stale or invalid policy, unauthorized model choices, malformed discovery results, timeouts and cancellation. The prior selector and new preflight together passed 32 local Node.js tests.
Exact-head GitHub Actions Validate GoreeCloud AI 35839573719 and Platform Contract 35839574698 both passed. No new HTTP route was registered, the existing manual chat path remains unchanged, and the result explicitly marks inferenceAuthorized=false and policyTrust=development-unverified. The source label server-local-config is structural metadata, not proof of authenticated policy provenance. All live inference, security/privacy/identity, recovery, nine-system conformance and release gates remain pending; the next integration obligation remains active in GoreeCloud/Tasks Management/AI — Implementation Task List.docx.
September 23, 2026 — Local Adapters and Operator Diagnostic
Adapter head cbd713022c6881e44eb726b83941b238ad292f52 added a private, bounded local model-policy reader and strict literal-loopback-only read-only model discovery. The reader rejects symlinks, extra hardlinks, improper owner or permission bits, oversized policy files and changed files; discovery refuses remote/DNS destinations, redirects, oversized streamed responses and invalid catalogs. Both adapter-head workflows passed (Validate 35858074636 and Platform Contract 35858075552). The later repository-documentation alignment head fcfd1499877f9d3ba82ca281d8eb06d71d04b402 corrected current Glaze UI 1.5.1 and GitHub-only user-manual references and passed Validate 35858311254 and Platform Contract 35858312251.
Current exact head 60cc783383cbbf07d60e7d3b735384c9a51adb22 adds an explicit Development-only command that requires an operator opt-in, a private absolute policy path and role. It composes the adapters and selector, makes only a loopback /api/tags discovery call, refuses a remote target or unauthorized manual model, and prints bounded sanitized selection results. A successful selection remains non-authorizing. Both current-head workflows passed (Validate 35858824571; Platform Contract 35858825263). Live model inference, authenticated administrative policy authority, real host interoperability, human security review, and current-platform acceptance remain separate open obligations; the Draft PR has not been merged, deployed or declared Stable.
September 23, 2026 — Declared Model Resource Candidate Guard
Exact Draft head 8ed67c09725fda1d343e53986611aa3c076b29fc adds the isolated server/model-resource-readiness.mjs assessment and 16 unit tests. The evaluator binds a Development preflight selection to a strictly structured local-only workload, operator-reviewed model profile, and operator-observed host snapshot. It checks explicit role/model and input modality compatibility, tool-call declaration, combined input/output context fit, estimated memory plus reserve, concurrency headroom, source labels and freshness. Malformed, mismatched, stale or insufficient inputs fail closed. A positive response is only an operator-declared, development-unverified candidate; it never authorizes inference, tool execution, or runtime claims. Exact-head GitHub Actions passed: Validate 35861142455 and Platform Contract 35861143024.
The next exact Draft head afa3c9d613c5477d608ea5a905ada3c0837759e5 adds a separately opt-in local resource diagnostic which composes protected model policy/profile inputs, read-only literal-loopback discovery, bounded preflight, candidate assessment and a free-system-RAM sample. Nine CLI subprocess/loopback tests check refusals, sanitized output and discovery-only network use. This CLI does not measure GPU VRAM, establish model capability or execute inference. Its exact-head Validate 35861767722 and Platform Contract 35861768436 both passed. Repository-documentation alignment head a3b9742f7644d478b042c8ec7f590f1e5bb90c38 reconciles README, FEATURES and SPECIFICATIONS with this verified Development source; Validate 35861922829 and Platform Contract 35861923871 both passed. No live HTTP/chat route, production setting or authorization changed; nine-system and actual hardware/runtime acceptance remain pending.
Document Maintenance and Governing Boundary
This document is the authoritative Drive project specification for GoreeCloud AI within its defined scope.
Live GitHub remains authoritative for current repository, branch, pull-request, commit, workflow, and other provider-native development state.
Planned capabilities must not be represented as implemented until authoritative implementation evidence supports that claim.
Model variants, runtimes, vector/index technologies, and implementation details remain replaceable unless separately fixed by controlling GoreeCloud governance.
Security, privacy, identity, resilience, and cross-service actions remain governed by their respective first-party authorities and application-specific authorization boundaries.
Material specification changes require version updates, authoritative Drive writeback, and verification of the stored DOCX.
Revision Record
Document Owner
LaDamian Goree
Version
v0.9
Status
Draft — Milestone 0 native foundation under active development; production acceptance pending
Created
August 25, 2026
Last Revised
September 23, 2026
Classification
Internal
Document Type
Software Project Specification and Implementation Blueprint
Project Name
GoreeCloud AI
Current Repository
GoreeCloud/goreecloud-ai on GitHub; long-term developer-platform boundary: GoreeCloud Code
Development Model
Original GoreeCloud-owned software development
Primary Model Runtime
Ollama — third-party and replaceable
Primary Model Families
Gemma and Qwen
Internet Research Provider
GoreeCloud Search
Design Language
GLAZE UI V1.5 / 1.5.1 — current Stable target; product conformance not yet accepted
Platform Contract
0.4 — nine-system authority; application-specific integrations remain evidence-gated
Security Identity
Wardveil Security by GoreeCloud
Privacy Identity
GoreeCloud Privacy Shield
Identity
GoreeCloud Identity
Resilience and Preservation
Everkeep
Authoritative Record
Yes
Planning status
Sections labeled “Planned Features and Capabilities” describe intended product direction and do not, by themselves, establish implementation, production acceptance, runtime interoperability, or Stable qualification. Verified implementation state and dated development evidence are maintained separately in this document.
Verified GitHub checkpoint — September 23, 2026
Draft PR #1 remains open and unmerged at exact candidate a3b9742f7644d478b042c8ec7f590f1e5bb90c38 on agent/milestone-0-foundation. Development-only additions include the fail-closed approved 13-role selector, bounded backend preflight, private policy-file and literal-loopback discovery adapters, an explicit read-only role diagnostic, a pure operator-declared model capability/resource-fit assessor, and a second opt-in resource diagnostic that samples free local system RAM. The latest source documentation is aligned in README.md, FEATURES.md and SPECIFICATIONS.md. Exact-head GitHub Actions passed: Validate 35861922829; Platform Contract 35861923871. Neither diagnostic uses live application HTTP/chat routing, model inference or tool execution; free system RAM does not establish available GPU VRAM, genuine model capabilities or production authorization. Positive resource candidates explicitly retain inferenceAuthorized=false, toolExecutionAuthorized=false and runtimeValidated=false. Application version remains 0.1.0-dev.0, Platform Contract 0.4 and Stable Glaze UI consumer target 1.5.1. Lifecycle Development / Draft / nonconformant; target-host runtime proof, authenticated administrator policy, Identity, Privacy Shield, Wardveil and all nine platform-system acceptances, recovery, release, deployment and Stable remain outstanding.
Navigation
The planned baseline below is organized into 50 numbered capability areas. Related capabilities are grouped here for fast scanning; the numbered headings remain the authoritative section structure.
Capability group
Sections
Scope
Models and conversation
1–5
Runtime, model families and roles, routing, conversation, reasoning, persistence, temporary/private chat
Knowledge and research
6–16
Workspaces, memory, files, security intake, Library, RAG, embeddings, citations, Search, Deep Research
Development, agents and automation
17–25
Coding, GoreeCloud Code, agents, tools, skills, workflows, scheduling, monitoring
Ecosystem and artifacts
26–32
First-party integrations, universal assistant, artifacts, documents, spreadsheets, presentations, data analysis
Multimodal and personal assistance
33–41
Vision, image generation/editing, voice, screen/camera, audio, custom assistants, briefs, proactive intelligence
Platform controls and experience
42–50
Security, privacy, identity, Everkeep, observability, Glaze UI, cross-device, local-first, replaceable infrastructure
1. AI Model and Runtime Architecture
26. GoreeCloud Ecosystem Integration
2. Advanced AI Conversation
27. Universal GoreeCloud Assistant
3. Advanced Reasoning
28. Artifact Workspace
4. Persistent Conversations
29. Document Creation
5. Temporary and Private Chats
30. Spreadsheet Intelligence
6. Workspaces
31. Presentation Creation
7. AI Memory and Personal Context
32. Data Analysis
8. File Intelligence
33. Image Understanding
9. Wardveil-Secured File Intake
34. Conversational Image Generation
10. Knowledge Library
35. Image Transformation
11. Native RAG
36. Voice Conversations
12. Embeddings and Semantic Search
37. Screen and Camera Intelligence
13. Citations and Source Verification
38. Future Audio and Multimedia Intelligence
14. GoreeCloud Search Integration
39. Custom Assistants
15. Deep Research
40. Personal Daily Brief
16. Research Workspaces
41. Proactive Intelligence
17. Coding Assistant
42. Security Architecture
18. GoreeCloud Code Integration
43. Privacy Architecture
19. AI Agents
44. Identity and Permission Controls
20. Multi-Agent Workflows
45. Everkeep Integration
21. Tools
46. Observability
22. Skills
47. Responsive Glaze UI Experience
23. Workflow Automation
48. Cross-Device GoreeCloud AI
24. Scheduled AI Tasks
49. Local-First Intelligence
25. Conditional Monitoring
50. Replaceable AI Infrastructure
Status boundary
Everything in Sections 1–50 is planned or intended unless the same capability is separately identified in Current Verified Implementation State or a dated verified development checkpoint. Exact model variants, infrastructure components, and integration details remain replaceable and evidence-gated.
ChatGPT-style
Conversational versatility and agentic workflows
Claude-style
Workspaces, artifacts, coding, tool use, and knowledge workflows
Gemini-style
Multimodal interaction, ecosystem intelligence, and proactive assistance
GoreeCloud
Local-first infrastructure, security, privacy, integrations, and product ownership
Product identity
GoreeCloud AI — the private intelligence, reasoning, research, creation, knowledge, and automation layer of GoreeCloud.
First-party product
GoreeCloud AI
Primary runtime
Ollama, third-party and replaceable
Primary reasoning model families
Gemma and Qwen
Internet research
GoreeCloud Search
Knowledge
Native GoreeCloud AI RAG and retrieval
Development integration
GoreeCloud Code
Design
Glaze UI
Security
Wardveil Security
Privacy
GoreeCloud Privacy Shield
Identity
GoreeCloud Identity
Resilience
Everkeep
Platform integration
GoreeCloud first-party services
Historical interpretation
These checkpoints are preserved for traceability. Words such as “current” inside an older checkpoint refer to the state at that checkpoint date; they do not supersede the Current Verified Implementation State near the beginning of this document.
Version
Date
Status
Change
v0.9
September 23, 2026
Draft
Recorded opt-in resource diagnostic, nine CLI tests and repo documentation alignment; exact-head CI passed. No live or production authority.
v0.8
September 23, 2026
Draft
Recorded exact-head Development-only capability and resource-fit candidate assessor (16 tests; Validate 35861142455 and Platform Contract 35861143024 passed); no live or production authorization.
v0.7
September 23, 2026
Draft
Verified Development-only protected local policy/discovery adapters and explicit operator-gated routing diagnostic; reconciled source records and current Glaze/manual authority; exact-head workflows passed. No live chat, production authorization, deployment or Stable claim.
v0.6
September 23, 2026
Draft
Recorded exact-head Development-only backend preflight addition; 17 new tests, 32 combined local tests and both exact-head CI workflows passed. The chat endpoint and production authorization remain unchanged.
v0.5
September 23, 2026
Draft
Recorded verified exact-head development addition of the fail-closed 13-role approved-model selector with 15 local tests and both exact-head CI workflows passing; clarified that runtime integration, authentication, and deployment remain pending.
v0.4
September 23, 2026
Draft
Expanded the planned product baseline to 50 capability areas; established Gemma and Qwen as primary model families; added model roles/routing, research, agents, automation, artifacts, multimodal capabilities, ecosystem integrations, security/privacy/identity/resilience direction, and replaceable infrastructure; preserved verified implementation state and historical development checkpoints.
v0.3
Prior to September 23, 2026
Draft
Milestone 0 project specification and implementation blueprint baseline; current-state and checkpoint history preserved in this revision.
Final governing statement
GoreeCloud AI owns the user-facing intelligence and orchestration experience. Ollama initially runs approved models. Gemma and Qwen provide primary intelligence roles. GoreeCloud services provide the ecosystem. Wardveil Security and GoreeCloud Privacy Shield protect the boundaries, with GoreeCloud Identity and Everkeep providing identity and resilience within their respective authority domains.

---

## Ongoing record maintenance

Update this record for significant architecture, governance, repository, security/privacy, model/runtime strategy, production/recovery, release-state, migration, split/merge/rename, deprecation, or retirement events. Routine feature/fix chronology belongs primarily in the repository changelog once that mandatory record is established.
