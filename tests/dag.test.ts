import { TaskGraphEngine } from '../src/TaskGraphEngine';

describe('TaskGraphEngine', () => {
  it('detects circular dependencies fail-closed', () => {
    const engine = new TaskGraphEngine();
    engine.addTask({ id: 't1', title: 'Task 1', taskType: 'FEATURE', dependencies: ['t2'] });
    engine.addTask({ id: 't2', title: 'Task 2', taskType: 'FEATURE', dependencies: ['t1'] });

    expect(() => engine.validateAcyclic()).toThrow(/Cycle detected/);
  });

  it('resolves stages in topological order', () => {
    const engine = new TaskGraphEngine();
    engine.addTask({ id: 'core', title: 'Core', taskType: 'FEATURE', dependencies: [] });
    engine.addTask({ id: 'dep1', title: 'Dep 1', taskType: 'FEATURE', dependencies: ['core'] });
    engine.addTask({ id: 'dep2', title: 'Dep 2', taskType: 'FEATURE', dependencies: ['core'] });
    engine.addTask({ id: 'final', title: 'Final', taskType: 'TEST', dependencies: ['dep1', 'dep2'] });

    const stages = engine.resolveExecutionStages();
    expect(stages).toEqual([
      ['core'],
      ['dep1', 'dep2'],
      ['final']
    ]);
  });
});
