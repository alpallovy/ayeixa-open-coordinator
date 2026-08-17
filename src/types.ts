/**
 * Public types for Ayeixa OpenCoordinator
 */

export type TaskType = 'BUG_FIX' | 'REFACTOR' | 'FEATURE' | 'TEST' | 'DOCUMENTATION';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TaskStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'BLOCKED';

export interface IntentClassification {
  taskType: TaskType;
  riskLevel: RiskLevel;
  confidence: number;
  extractedKeywords: string[];
  requiresApproval: boolean;
}

export interface TaskNode {
  id: string;
  title: string;
  taskType: TaskType;
  dependencies: string[];
  assignedAgentId?: string;
  metadata?: Record<string, unknown>;
}

export interface AgentProfile {
  id: string;
  name: string;
  capabilities: TaskType[];
  maxConcurrency: number;
  currentLoad: number;
}

export interface ExecutionEvent {
  taskId: string;
  previousStatus: TaskStatus;
  newStatus: TaskStatus;
  timestamp: string;
  error?: string;
}

export type ExecutionEventListener = (event: ExecutionEvent) => void;
