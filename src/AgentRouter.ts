import { AgentProfile, TaskNode, TaskType } from './types';

export class AgentRouter {
  private agents: Map<string, AgentProfile> = new Map();

  public registerAgent(agent: AgentProfile): void {
    this.agents.set(agent.id, { ...agent });
  }

  public routeTask(task: TaskNode): AgentProfile {
    const capable = Array.from(this.agents.values()).filter(a =>
      a.capabilities.includes(task.taskType) && a.currentLoad < a.maxConcurrency
    );

    if (capable.length === 0) {
      // Check if any agent has the capability even if loaded
      const fallback = Array.from(this.agents.values()).filter(a =>
        a.capabilities.includes(task.taskType)
      ).sort((a, b) => a.currentLoad - b.currentLoad)[0];

      if (fallback) return fallback;
      throw new Error(`No suitable agent found for task type '${task.taskType}'.`);
    }

    // Pick agent with lowest current load
    capable.sort((a, b) => a.currentLoad - b.currentLoad);
    return capable[0];
  }

  public releaseAgentLoad(agentId: string): void {
    const agent = this.agents.get(agentId);
    if (agent && agent.currentLoad > 0) {
      agent.currentLoad -= 1;
    }
  }

  public acquireAgentLoad(agentId: string): void {
    const agent = this.agents.get(agentId);
    if (agent) {
      agent.currentLoad += 1;
    }
  }
}
