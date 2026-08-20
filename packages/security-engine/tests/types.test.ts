import { describe, expect, it } from 'vitest';
import type { SecurityFinding, SecuritySeverity } from '../src/types.js';

describe('Security types', () => {
  it('should represent a security finding', () => {
    const severity: SecuritySeverity = 'high';

    const finding: SecurityFinding = {
      ruleId: 'SEC-001',
      title: 'Prompt injection pattern detected',
      description: 'A suspicious instruction pattern was detected.',
      severity,
      category: 'prompt-injection',
    };

    expect(finding.ruleId).toBe('SEC-001');
    expect(finding.severity).toBe('high');
  });
});
