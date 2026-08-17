# Architecting Topological Agent Workflows in TypeScript: Inside Ayeixa OpenCoordinator

## 1. Introduction & Overview
As multi-agent software engineering systems scale, orchestrating dependent subagents requires more than flat sequential loops or ad-hoc callback handlers. Complex tasks—such as simultaneous code generation, schema migration, test authoring, and integration verification—demand deterministic dependency management, cycle prevention, and capability-aware task routing.

**Ayeixa OpenCoordinator** (`@ayeixa/open-coordinator`) is a lightweight multi-agent orchestration spine developed in TypeScript under the permissive **Apache-2.0** license.

- **GitHub Repository**: [https://github.com/alpallovy/ayeixa-open-coordinator](https://github.com/alpallovy/ayeixa-open-coordinator)
- **Status**: Pre-Release (`v0.1.0-alpha`)
- **NPM Status**: Public registry publication is pending; evaluate and build locally.

---

## 2. Core Architecture
OpenCoordinator is structured around three decoupled architectural primitives:

1. **IntentParser**: Extracts domain context, action classifications (`CODE`, `TEST`, `DEPLOY`, `RESEARCH`), and capability constraints from natural language task directives.
2. **TaskGraphEngine**: Constructs an in-memory Directed Acyclic Graph (DAG), executes $O(V + E)$ topological sort, detects dependency cycles deterministically, and groups independent tasks into concurrent execution stages.
3. **ExecutionKernel**: Implements a hermetic state machine managing task lifecycles (`PENDING`, `RUNNING`, `COMPLETED`, `FAILED`, `BLOCKED`) with bounded event-driven transitions and timeout controls.
4. **AgentRouter**: Evaluates agent capability matrices and active load to route tasks to specialized subagents with fallback policies.

---

## 3. Implemented Capabilities & Test Verification
All capabilities are fully implemented in TypeScript and verified with 100% hermetic unit tests (Jest):
- **DAG Resolution**: Topological sorting and stage resolution (`tests/dag.test.ts`).
- **Intent Parsing**: Deterministic action and entity extraction (`tests/intent.test.ts`).
- **Router Matching**: Capability-based candidate scoring (`tests/router.test.ts`).
- **Kernel State**: Timeout handling and error containment (`tests/kernel.test.ts`).

Test Verification Receipt: **9/9 hermetic unit tests passing** (0 failures, 0 skips).

---

## 4. Local Installation & Quick Start
```bash
# 1. Clone repository
git clone https://github.com/alpallovy/ayeixa-open-coordinator.git
cd ayeixa-open-coordinator

# 2. Install dependencies & build
npm ci
npm run build
npm test
```

### Usage Example
```typescript
import { IntentParser, TaskGraphEngine, AgentRouter, ExecutionKernel } from './src';

// Parse intent
const parser = new IntentParser();
const intent = parser.parse("Refactor auth database module to support SQLite");

// Build DAG
const dag = new TaskGraphEngine();
dag.addTask({ id: "task-1", title: "Refactor auth db", taskType: intent.taskType, dependencies: [] });
dag.addTask({ id: "task-2", title: "Add auth tests", taskType: "TEST", dependencies: ["task-1"] });

// Resolve concurrent stages
const stages = dag.resolveExecutionStages();
console.log("Execution stages:", stages);
```

---

## 5. Limitations & Pre-Release Status
- Current version is `v0.1.0-alpha` intended for pre-release evaluation.
- Persistence is currently in-memory; distributed durable queue backends are scheduled on the 2026–2028 roadmap.
- Public npm publication is pending.

---

## 6. Contributing & Community
We welcome issues, feedback, and pull requests! Check out our `good first issue` tagged items on GitHub or open a topic in our GitHub Discussions tab.
- **License**: Apache-2.0
