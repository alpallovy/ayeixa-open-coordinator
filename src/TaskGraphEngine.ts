import { TaskNode, TaskType } from './types';

export class TaskGraphEngine {
  private tasks: Map<string, TaskNode> = new Map();

  public addTask(task: TaskNode): void {
    if (this.tasks.has(task.id)) {
      throw new Error(`Task with id '${task.id}' already exists in graph.`);
    }
    this.tasks.set(task.id, { ...task, dependencies: [...task.dependencies] });
  }

  public getTask(id: string): TaskNode | undefined {
    return this.tasks.get(id);
  }

  public getAllTasks(): TaskNode[] {
    return Array.from(this.tasks.values());
  }

  public validateAcyclic(): boolean {
    const visited = new Set<string>();
    const recStack = new Set<string>();

    const hasCycle = (nodeId: string): boolean => {
      visited.add(nodeId);
      recStack.add(nodeId);

      const task = this.tasks.get(nodeId);
      if (task) {
        for (const depId of task.dependencies) {
          if (!this.tasks.has(depId)) {
            throw new Error(`Dependency '${depId}' for task '${nodeId}' does not exist in graph.`);
          }
          if (!visited.has(depId)) {
            if (hasCycle(depId)) return true;
          } else if (recStack.has(depId)) {
            return true;
          }
        }
      }

      recStack.delete(nodeId);
      return false;
    };

    for (const taskId of this.tasks.keys()) {
      if (!visited.has(taskId)) {
        if (hasCycle(taskId)) {
          throw new Error("Cycle detected in task dependency graph.");
        }
      }
    }
    return true;
  }

  public resolveExecutionStages(): string[][] {
    this.validateAcyclic();

    const inDegree = new Map<string, number>();
    const dependents = new Map<string, string[]>();

    for (const taskId of this.tasks.keys()) {
      inDegree.set(taskId, 0);
      dependents.set(taskId, []);
    }

    for (const task of this.tasks.values()) {
      for (const dep of task.dependencies) {
        dependents.get(dep)!.push(task.id);
        inDegree.set(task.id, (inDegree.get(task.id) || 0) + 1);
      }
    }

    const stages: string[][] = [];
    const completed = new Set<string>();

    while (completed.size < this.tasks.size) {
      const currentStage: string[] = [];
      for (const [taskId, deg] of inDegree.entries()) {
        if (deg === 0 && !completed.has(taskId)) {
          currentStage.push(taskId);
        }
      }

      if (currentStage.length === 0) {
        throw new Error("Deadlock or unresolved cycle in task dependencies.");
      }

      for (const taskId of currentStage) {
        completed.add(taskId);
        inDegree.set(taskId, -1);
        for (const dependent of dependents.get(taskId)!) {
          inDegree.set(dependent, inDegree.get(dependent)! - 1);
        }
      }

      stages.push(currentStage.sort());
    }

    return stages;
  }
}
