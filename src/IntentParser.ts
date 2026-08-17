import { IntentClassification, TaskType, RiskLevel } from './types';

export class IntentParser {
  public parse(input: string): IntentClassification {
    const text = (input || '').toLowerCase();
    const keywords: string[] = [];

    // Classify Task Type
    let taskType: TaskType = 'FEATURE';
    if (/\b(fix|bug|defect|issue|patch|error|crash)\b/.test(text)) {
      taskType = 'BUG_FIX';
      keywords.push('fix');
    } else if (/\b(refactor|clean|restructure|rename|optimize)\b/.test(text)) {
      taskType = 'REFACTOR';
      keywords.push('refactor');
    } else if (/\b(test|spec|coverage|jest|benchmark)\b/.test(text)) {
      taskType = 'TEST';
      keywords.push('test');
    } else if (/\b(doc|docs|readme|guide|architecture|manual)\b/.test(text)) {
      taskType = 'DOCUMENTATION';
      keywords.push('documentation');
    } else {
      keywords.push('feature');
    }

    // Assess Risk Level
    let riskLevel: RiskLevel = 'LOW';
    let requiresApproval = false;

    if (/\b(drop|delete|destroy|purge|truncate|rm\s+-rf|secret|token|credential)\b/.test(text)) {
      riskLevel = 'CRITICAL';
      requiresApproval = true;
      keywords.push('critical_operation');
    } else if (/\b(auth|permission|migration|schema|database|production|deploy)\b/.test(text)) {
      riskLevel = 'HIGH';
      requiresApproval = true;
      keywords.push('security_or_persistence');
    } else if (/\b(api|network|protocol|router|interface)\b/.test(text)) {
      riskLevel = 'MEDIUM';
    }

    // Confidence Calculation
    const confidence = keywords.length > 1 ? 0.95 : 0.85;

    return {
      taskType,
      riskLevel,
      confidence,
      extractedKeywords: keywords,
      requiresApproval
    };
  }
}
