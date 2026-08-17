import { TaskNode, TaskStatus, ExecutionEvent, ExecutionEventListener } from './types';
import { TaskGraphEngine } from './TaskGraphEngine';
import { AgentRouter } from './AgentRouter';

export class ExecutionKernel {
  private taskStatuses: Map<string, TaskStatus> = new Map();
  private listeners: ExecutionEventListener[] = [];

  constructor(
    private graphEngine: TaskGraphEngine,
    private router: AgentRouter
  ) {}

  public addListener(listener: ExecutionEventListener): void {
    this.listeners.push(listener);
  }

  private emit(event: ExecutionEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  public getStatus(taskId: string): TaskStatus {
    return this.taskStatuses.get(taskId) || 'PENDING';
  }

  public async executePipeline(
    taskRunner: (task: TaskNode, agentId: string) => Promise<void>
  ): Promise<{ completed: string[]; failed: string[] }> {
    const stages = this.graphEngine.resolveExecutionStages();
    const completed: string[] = [];
    const failed: string[] = [];

    for (const stage of stages) {
      const promises = stage.map(async (taskId) => {
        const task = this.graphEngine.getTask(taskId);
        if (!task) throw new Error(`Task '${taskId}' not found.`);

        // Check if any dependency failed
        for (const dep of task.dependencies) {
          if (this.getStatus(dep) !== 'COMPLETED') {
            this.taskStatuses.set(taskId, 'BLOCKED');
            this.emit({ taskId, previousStatus: 'PENDING', newStatus: 'BLOCKED', timestamp: new Date().toISOString() });
            failed.push(taskId);
            return;
          }
        }

        const agent = this.router.routeTask(task);
        this.router.acquireAgentLoad(agent.id);

        this.taskStatuses.set(taskId, 'RUNNING');
        this.emit({ taskId, previousStatus: 'PENDING', newStatus: 'RUNNING', timestamp: new Date().toISOString() });

        try {
          await taskRunner(task, agent.id);
          this.taskStatuses.set(taskId, 'COMPLETED');
          this.emit({ taskId, previousStatus: 'RUNNING', newStatus: 'COMPLETED', timestamp: new Date().toISOString() });
          completed.push(taskId);
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : String(err);
          this.taskStatuses.set(taskId, 'FAILED');
          this.emit({ taskId, previousStatus: 'RUNNING', newStatus: 'FAILED', timestamp: new Date().toISOString(), error: errMsg });
          failed.push(taskId);
        } finally {
          this.router.releaseAgentLoad(agent.id);
        }
      });

      await Promise.all(promises);
    }

    return { completed, failed };
  }
}
