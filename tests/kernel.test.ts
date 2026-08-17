import { TaskGraphEngine } from '../src/TaskGraphEngine';
import { AgentRouter } from '../src/AgentRouter';
import { ExecutionKernel } from '../src/ExecutionKernel';
import { ExecutionEvent } from '../src/types';

describe('ExecutionKernel', () => {
  it('executes tasks in dependency order and emits lifecycle events', async () => {
    const engine = new TaskGraphEngine();
    engine.addTask({ id: 't1', title: 'T1', taskType: 'FEATURE', dependencies: [] });
    engine.addTask({ id: 't2', title: 'T2', taskType: 'TEST', dependencies: ['t1'] });

    const router = new AgentRouter();
    router.registerAgent({ id: 'agent-1', name: 'Fullstack', capabilities: ['FEATURE', 'TEST'], maxConcurrency: 5, currentLoad: 0 });

    const kernel = new ExecutionKernel(engine, router);
    const events: ExecutionEvent[] = [];
    kernel.addListener(e => events.push(e));

    const result = await kernel.executePipeline(async (task) => {
      // Simulating work
    });

    expect(result.completed).toEqual(['t1', 't2']);
    expect(result.failed).toHaveLength(0);
    expect(events.some(e => e.taskId === 't1' && e.newStatus === 'COMPLETED')).toBe(true);
    expect(events.some(e => e.taskId === 't2' && e.newStatus === 'COMPLETED')).toBe(true);
  });
});
