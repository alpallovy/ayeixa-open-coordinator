import { IntentParser } from '../src/IntentParser';

describe('IntentParser', () => {
  const parser = new IntentParser();

  it('classifies bug fix intent with proper keywords and low risk', () => {
    const res = parser.parse('Fix null pointer crash in local parser');
    expect(res.taskType).toBe('BUG_FIX');
    expect(res.riskLevel).toBe('LOW');
    expect(res.requiresApproval).toBe(false);
  });

  it('identifies refactoring intent with database risk', () => {
    const res = parser.parse('Refactor and clean database layer');
    expect(res.taskType).toBe('REFACTOR');
    expect(res.riskLevel).toBe('HIGH');
    expect(res.requiresApproval).toBe(true);
  });

  it('flags destructive operations as CRITICAL and requiring approval', () => {
    const res = parser.parse('Drop database table and purge secrets');
    expect(res.riskLevel).toBe('CRITICAL');
    expect(res.requiresApproval).toBe(true);
  });

  it('classifies documentation and testing accurately', () => {
    expect(parser.parse('Update architecture documentation').taskType).toBe('DOCUMENTATION');
    expect(parser.parse('Add Jest unit tests for coordinator').taskType).toBe('TEST');
  });
});
