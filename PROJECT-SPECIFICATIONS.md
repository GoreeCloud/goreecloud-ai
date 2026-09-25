# GoreeCloud AI — Project Specifications

**Repository:** `GoreeCloud/goreecloud-ai`  
**Project type:** First-party artificial-intelligence application and platform  
**Lifecycle:** Development  
**Repository visibility:** Public  
**Default branch:** `main`  
**Migration baseline:** `e2e2804244f0551d0e2429b5c00da3f32448aff0`  
**License:** AGPL-3.0  
**Initial replaceable model runtime:** Ollama  
**Canonical authority:** This file is the authoritative project specification once accepted on the default branch.

## Authority and migration boundary

This file migrates the normative product vision and planned requirements from Google Drive **Project Specification — AI** (Drive file `1_5XiZg2BW8LiM3sPw-t9UlTcm_xsmE-o`) into the repository.

The Drive source also describes a large unmerged Development candidate in Draft PR #1. Those candidate implementation statements are **not** promoted into authoritative `main` state by this migration. Current implementation truth is established by the default branch and accepted repository evidence. Draft PR #1 remains candidate evidence until separately reviewed, accepted, merged, and read back from `main`.

## Project vision

GoreeCloud AI is GoreeCloud’s first-party artificial intelligence platform, designed to provide private AI conversations, reasoning, research, knowledge management, content creation, automation, tools, agents, and intelligent assistance across the GoreeCloud ecosystem.
GoreeCloud AI is not intended to be a clone of ChatGPT, Claude, Gemini, Open WebUI, or AnythingLLM. It will be original GoreeCloud software that incorporates successful concepts from modern AI assistants while using GoreeCloud’s own architecture, Glaze UI design language, privacy controls, security systems, services, and product identity.
The long-term goal is for GoreeCloud AI to operate as an intelligence and orchestration layer for GoreeCloud rather than simply as a chatbot.

## Current verified default-branch implementation boundary

At migration baseline `e2e2804244f0551d0e2429b5c00da3f32448aff0`, the default branch contains the first executable Wardveil Security artifact-intake boundary described in [README.md](README.md).

Current accepted source:
- provides a fail-closed staging/release gate for chat uploads, knowledge documents, imported assets, model artifacts, tool artifacts, and generated files;
- requires current authoritative Wardveil clean evidence bound to the exact resource identity and SHA-256 digest before release;
- re-hashes staged bytes before release so changed bytes cannot inherit earlier clean evidence;
- keeps suspicious, malicious, unknown, unsupported, stale, mismatched, malformed, or scanner-unavailable cases fail-closed;
- does not connect directly to ClamAV as product authority; and
- does not treat malware-clean evidence as permission to execute or load active artifacts.

Deployed authenticated Wardveil transport, live scanner/signature health, real application adapters, quarantine execution, Glaze UI acceptance, Privacy Shield acceptance, model-runtime interoperability, Identity integration, recovery, production deployment, and Stable qualification remain separate evidence gates unless and until accepted repository evidence proves them.

## Draft PR #1 boundary

Draft PR #1 contains a much larger Development candidate, including client/backend foundations, Ollama discovery/streaming, persistence, Workspaces, attachment lifecycle controls, model-role/routing work, evidence-envelope work, Platform Contract changes, and related validation.

Those changes remain **Draft / Development / non-authoritative for default-branch implementation state**. This specification may preserve their intended requirements and architecture as planning context, but must not present them as merged implementation.

# Planned Features and Capabilities

The following 50 planned capability sections are migrated from the Drive specification. They define approved direction and requirements; they are not implementation claims unless `IMPLEMENTED-FEATURES.md`, accepted commits, tests, releases, or other authoritative evidence separately establishes implementation.

## 1. AI Model and Runtime Architecture

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

## 2. Advanced AI Conversation

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

## 3. Advanced Reasoning

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

## 4. Persistent Conversations

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

## 5. Temporary and Private Chats

Users will be able to start temporary conversations intentionally separated from normal persistent conversation history. Privacy-sensitive processing will clearly indicate whether a request is:
Fully local
Stored
Temporary
Using external resources
Using Internet research
Using connected GoreeCloud services
GoreeCloud Privacy Shield will govern applicable privacy decisions and processing boundaries.

## 6. Workspaces

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

## 7. AI Memory and Personal Context

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

## 8. File Intelligence

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

## 9. Wardveil-Secured File Intake

Files uploaded to GoreeCloud AI will integrate with Wardveil Security by GoreeCloud. A file being uploaded does not automatically make it trusted.
Planned Security Flow
Upload → Private staging → Wardveil Security inspection → Integrity verification → Permission evaluation → Safe release → Parsing / AI processing
Trust and Runtime Boundaries
Suspicious, malicious, unsupported, stale, mismatched, or unverifiable content can remain blocked or quarantined. Model files, executable content, scripts, tools, generated code, and other active artifacts will require additional runtime authorization beyond malware scanning.

## 10. Knowledge Library

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

## 11. Native RAG

GoreeCloud AI will include a first-party Retrieval-Augmented Generation system so approved private knowledge can be retrieved without placing the entire source collection into every prompt.
Planned Pipeline
Document → Security validation → Safe extraction → Authorization → Chunking → Embeddings → Indexing → Retrieval → Model context → Citation

## 12. Embeddings and Semantic Search

GoreeCloud AI will support embedding models through approved local model infrastructure. Embedding models may be selected independently from conversational models.
Semantic document search
Knowledge retrieval
Similar-content discovery
Workspace search
Conversation retrieval
RAG
Document relationships
Research organization

## 13. Citations and Source Verification

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

## 14. GoreeCloud Search Integration

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

## 15. Deep Research

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

## 16. Research Workspaces

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

## 17. Coding Assistant

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

## 18. GoreeCloud Code Integration

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

## 19. AI Agents

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

## 20. Multi-Agent Workflows

Future versions may allow one AI task to delegate work among specialized agents.
Example Delegation
Primary Agent → Research Agent → Coding Agent → Document Agent → Data Agent → Verification Agent
The primary agent could combine their results into a final response or artifact.

## 21. Tools

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

## 22. Skills

Reusable Skills may package prompts, tools, instructions, workflows, and policies for particular activities without permanently expanding the default assistant context.
Research Skill
Coding Skill
Document Skill
Spreadsheet Skill
Network Troubleshooting Skill
GoreeCloud Administration Skill
Writing Skill
Data Analysis Skill

## 23. Workflow Automation

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

## 24. Scheduled AI Tasks

Users may eventually schedule GoreeCloud AI tasks at a specific time or on supported daily, weekly, monthly, or other recurring schedules.
Morning briefing
Weekly project summary
Research update
System report
Reminder
Knowledge synchronization
Repository summary

## 25. Conditional Monitoring

Approved agents may monitor a condition and notify users when something meaningful occurs. Monitoring will remain permission-bound and auditable.
Service state changes
New research findings
Repository events
New messages
Scheduled-event changes
System alerts

## 26. GoreeCloud Ecosystem Integration

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

## 27. Universal GoreeCloud Assistant

Over time, GoreeCloud AI may become the conversational interface for performing authorized operations throughout GoreeCloud. The AI layer would determine which approved GoreeCloud services are required.
Example Requests
“Find the document I was working on yesterday and summarize it.”
“Show me my tasks due this week.”
“Research this topic and save the report to Drive.”
“Create a spreadsheet from these numbers.”
“Review this repository.”
“Prepare a presentation from this Workspace.”

## 28. Artifact Workspace

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

## 29. Document Creation

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

## 30. Spreadsheet Intelligence

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

## 31. Presentation Creation

Integration with GoreeCloud Presentations may allow users to request editable presentation outputs.
Presentation outlines
Full slide decks
Speaker notes
Charts
Diagrams
Research-backed presentations
Image-supported slides

## 32. Data Analysis

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

## 33. Image Understanding

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

## 34. Conversational Image Generation

Image generation is planned as a native GoreeCloud AI capability. Users may request images directly through normal conversation, and generated assets may be retained as GoreeCloud AI artifacts.
“Create a concept image for GoreeCloud.”
“Generate artwork for this presentation.”
“Create an icon concept.”
“Visualize this idea.”

## 35. Image Transformation

Where supported by approved image models and security boundaries, users may provide an existing image and request changes. Advanced professional manual editing may eventually be handed to a dedicated GoreeCloud creative application.
Object removal
Object addition
Background changes
Restyling
Recomposition
Image enhancement
Variations
Concept transformation

## 36. Voice Conversations

Future GoreeCloud AI versions are planned to support voice interaction.
Speech-to-text
Natural spoken conversations
Text-to-speech responses
Voice interruption
Hands-free interaction
Voice commands
Voice-based GoreeCloud actions

## 37. Screen and Camera Intelligence

Future multimodal capabilities may allow users to share approved screen or camera context with GoreeCloud AI. Camera and screen access must remain explicitly permission-controlled.
Technical support
Interface assistance
Visual question answering
Document explanation
Troubleshooting
Object recognition
Step-by-step guidance

## 38. Future Audio and Multimedia Intelligence

Additional multimodal capabilities may eventually be introduced only where justified by available models, privacy requirements, infrastructure, and product scope.
Audio understanding
Audio transcription
Speaker-aware summaries
Generated narration
Podcast-style summaries
Multimedia analysis

## 39. Custom Assistants

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

## 40. Personal Daily Brief

GoreeCloud AI may provide an optional daily briefing generated from approved sources. The user will control which sources may contribute.
Calendar
Tasks
Messages
Project updates
Research updates
Reminders
System notifications
Relevant GoreeCloud activity

## 41. Proactive Intelligence

Beyond responding to prompts, GoreeCloud AI may eventually identify useful actions or information based on explicitly authorized context. Proactive assistance must remain user-controllable and should not become uncontrolled background surveillance.
Upcoming deadline
Unfinished project
Related document
Duplicate task
New relevant research
Service problem
Unanswered message

## 42. Security Architecture

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

## 43. Privacy Architecture

GoreeCloud Privacy Shield will govern privacy-sensitive AI processing.
Local
Processing remains within approved GoreeCloud-controlled infrastructure.
External
Information would leave the local GoreeCloud processing boundary and requires applicable Privacy Shield authorization. Users should be clearly informed when external processing is proposed.

## 44. Identity and Permission Controls

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

## 45. Everkeep Integration

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

## 46. Observability

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

## 47. Responsive Glaze UI Experience

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

## 48. Cross-Device GoreeCloud AI

GoreeCloud AI is intended to eventually provide a consistent experience across supported form factors. Workspaces, conversations, artifacts, permissions, and approved context may follow users between devices.
Desktop
Web
Tablet
Mobile
Other supported GoreeCloud form factors

## 49. Local-First Intelligence

A major GoreeCloud AI design objective is maximizing the usefulness of local AI. External AI providers should not become mandatory dependencies for the core product.
Local Ollama models
Local embeddings
Local knowledge processing
GoreeCloud-controlled services
Private GoreeCloud infrastructure

## 50. Replaceable AI Infrastructure

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

# Cross-Cutting Requirements

## Security

- Wardveil Security remains the governing security integration for artifact trust and applicable runtime security evidence.
- File intake, active artifacts, tools, models, generated code, deserialization, and execution require explicit bounded security authority; a malware-clean result is not execution permission.
- Model/runtime, tool, file, and service integrations must fail closed when required authority, freshness, integrity, or authentication cannot be established.
- Secrets, provider credentials, tokens, and protected runtime configuration must not be committed to ordinary Git history.
- Supply-chain, dependency, model-artifact, and tool-artifact risk must be reviewed and evidenced before production acceptance.

## Privacy

- Privacy Shield governs applicable personal-data, retention, purpose, external-processing, memory, context, telemetry, and connected-service boundaries.
- Private/local processing is preferred where practical.
- External resources, Internet research, connected services, persistent memory, and third-party providers must be explicit and understandable to the user.
- User data must remain exportable and deletable according to applicable GoreeCloud standards.
- AI functionality must remain optional in other GoreeCloud applications; GoreeCloud AI must not become a prerequisite for ordinary unrelated application functions.

## Data and storage

- Conversation, Workspace, file, knowledge, memory, retrieval, artifact, and configuration storage must use explicit authority and lifecycle boundaries.
- Backups, restore, export, retention, deletion, and migration must be documented and tested before production/Stable acceptance.
- Derived data such as extracted text, embeddings, indexes, caches, and summaries must remain traceable to their source and applicable authority.

## Integrations

Each material integration must identify its owning authority, permissions, authentication, data exchanged, failure behavior, privacy/security restrictions, and evidence required for acceptance. GoreeCloud AI may orchestrate approved capabilities but must not manufacture Identity, Privacy Shield, Wardveil, Everkeep, Mesh, Policy, Observability, Search, Code, or other provider-owned truth.

## User interface and accessibility

Applicable user-facing surfaces must use the current accepted Glaze UI target and GoreeCloud branding, while completing product-specific rendered, accessibility, responsive, reduced-effects, localization/RTL, and representative-device/browser acceptance before claiming conformance.

## Deployment and operations

Production deployment must document runtime placement, model runtime connectivity, storage, configuration, secrets, monitoring, logging, health checks, backup/restore, upgrades, rollback, resource requirements, and service exposure. Development source and CI are not production acceptance.

## Testing and acceptance

The project must distinguish source implementation, automated validation, live interoperability, target-environment verification, security/privacy/recovery acceptance, Release Candidate state, production deployment, and Stable qualification. Green CI alone is not sufficient for production or Stable claims.

## Maintenance and retirement

Major runtime/provider transitions, repository changes, architecture changes, model-family strategy changes, security/privacy authority changes, and service retirement must be reflected in this specification and in `PROJECT-RECORD.md`. Replaceable infrastructure must not be treated as permanent product identity without an explicit governance decision.

## Related repository documentation

- [README.md](README.md)
- [PROJECT-RECORD.md](PROJECT-RECORD.md)
- [FEATURE-ROADMAP.md](FEATURE-ROADMAP.md) — legacy roadmap control that requires separate reconciliation under current feature-tracking governance.
- [LICENSE](LICENSE)
- [BRANDING.md](BRANDING.md)
- [docs/](docs/)
- [contracts/](contracts/)
