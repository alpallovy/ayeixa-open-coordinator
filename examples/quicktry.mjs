/**
 * 10-minute try: parse intent and resolve a tiny task DAG.
 * Run: npm run quicktry  (builds first)
 */
import { IntentParser, TaskGraphEngine } from '../dist/index.js';

const parser = new IntentParser();
const taskText = process.argv[2] ?? 'Add Jest unit tests for the auth module';

const intent = parser.parse(taskText);
const graph = new TaskGraphEngine();

graph.addTask({
  id: 'core',
  title: 'Implement core change',
  taskType: intent.taskType === 'TEST' ? 'FEATURE' : intent.taskType,
  dependencies: [],
});
graph.addTask({
  id: 'verify',
  title: 'Add or run verification',
  taskType: 'TEST',
  dependencies: ['core'],
});

const stages = graph.resolveExecutionStages();

console.log('--- OpenCoordinator quicktry ---');
console.log('Input:', taskText);
console.log('Parsed taskType:', intent.taskType);
console.log('Risk level:', intent.riskLevel);
console.log('Requires approval:', intent.requiresApproval);
console.log('Execution stages:', JSON.stringify(stages));
console.log('');
console.log('Try another phrase: npm run quicktry -- "Refactor database migration layer"');
console.log('Feedback: https://github.com/alpallovy/ayeixa-open-coordinator/discussions/5');
