# Ayeixa OpenCoordinator

> Lightweight multi-agent orchestration spine and intent routing framework for autonomous TypeScript systems.

## Status: Pre-Release (v0.1.0-alpha)
*Note: Public npm registry publication is pending. To use or evaluate this package, clone and build locally.*

**10-minute try:** see [`TRY_10MIN.md`](./TRY_10MIN.md) → `npm run quicktry`

## Features
- **Task Intent Classification**: Deterministic classification of requests into `BUG_FIX`, `REFACTOR`, `FEATURE`, `TEST`, and `DOCUMENTATION` with confidence & risk scoring.
- **DAG Execution Engine**: Directed Acyclic Graph topology manager with cycle detection, topological ordering, and parallel execution stage batching.
- **Capability-Based Agent Router**: Matches tasks to specialized agent profiles based on capability matrix, load, and fallback policies.
- **Hermetic Execution Kernel**: Lifecycle state machine (`PENDING`, `RUNNING`, `COMPLETED`, `FAILED`, `BLOCKED`) with event-driven execution and timeout controls.

## Installation & Local Build
```bash
# Clone the repository
git clone https://github.com/alpallovy/ayeixa-open-coordinator.git
cd ayeixa-open-coordinator

# Install dependencies and build
npm install
npm run build
npm test
```

## Quick Start
```typescript
import { IntentParser, TaskGraphEngine, AgentRouter, ExecutionKernel } from './src';

// 1. Parse intent
const parser = new IntentParser();
const intent = parser.parse("Refactor auth database module to support SQLite");

// 2. Build DAG
const dag = new TaskGraphEngine();
dag.addTask({ id: "task-1", title: "Refactor auth db", taskType: intent.taskType, dependencies: [] });
dag.addTask({ id: "task-2", title: "Add auth tests", taskType: "TEST", dependencies: ["task-1"] });

// 3. Resolve stages
const stages = dag.resolveExecutionStages();
console.log("Execution stages:", stages);
```

## Feedback & real-world use

If you try this project in a real workflow, share **concrete** technical feedback in [Discussions](https://github.com/alpallovy/ayeixa-open-coordinator/discussions/5) or a [GitHub issue](https://github.com/alpallovy/ayeixa-open-coordinator/issues). Case-study consent hub (after genuine use): [Discussion #6](https://github.com/alpallovy/ayeixa-open-coordinator/discussions/6). Stars and vague interest do not count.

## License
Distributed under the **Apache-2.0** License. See `LICENSE` for details.

## Engineering blog

- [OpenCoordinator DAG execution queue](https://alpallovy.github.io/ayeixa-blog/blog/opencoordinator-dag-execution-queue)
- [How to evaluate AYEIXA OSS](https://alpallovy.github.io/ayeixa-blog/blog/how-to-evaluate-ayeixa-oss)
- [Execution receipts in OSS utilities](https://alpallovy.github.io/ayeixa-blog/blog/execution-receipts-runtime-truth-oss)
- [DEV Community intro](https://dev.to/alp_allovi_45214d2d8316a1/introducing-ayeixa-opencoordinator-multi-agent-dag-orchestration-for-typescript-2o86)
