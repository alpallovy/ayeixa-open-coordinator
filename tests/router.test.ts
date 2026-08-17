import { AgentRouter } from '../src/AgentRouter';

describe('AgentRouter', () => {
  it('routes task to agent with matching capability and lowest load', () => {
    const router = new AgentRouter();
    router.registerAgent({ id: 'dev1', name: 'Dev 1', capabilities: ['FEATURE', 'BUG_FIX'], maxConcurrency: 2, currentLoad: 1 });
    router.registerAgent({ id: 'dev2', name: 'Dev 2', capabilities: ['FEATURE'], maxConcurrency: 2, currentLoad: 0 });

    const assigned = router.routeTask({ id: 't1', title: 'Build feature', taskType: 'FEATURE', dependencies: [] });
    expect(assigned.id).toBe('dev2');
  });

  it('throws error when no capable agent is registered', () => {
    const router = new AgentRouter();
    router.registerAgent({ id: 'docAgent', name: 'Doc Agent', capabilities: ['DOCUMENTATION'], maxConcurrency: 1, currentLoad: 0 });

    expect(() => router.routeTask({ id: 't1', title: 'Bug', taskType: 'BUG_FIX', dependencies: [] })).toThrow(/No suitable agent found/);
  });
});
