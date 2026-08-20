import type { SecurityRule } from './security-rule.js';
import type { SecurityFinding } from './types.js';

const dangerousPatterns = [
  /rm\s+-rf\s+\//i,
  /drop\s+table\s+/i,
  /delete\s+all\s+users/i,
];

export class OutputValidationRule implements SecurityRule {
  id = 'SEC-003';

  analyze(input: string): SecurityFinding[] {
    const findings: SecurityFinding[] = [];

    for (const pattern of dangerousPatterns) {
      const match = input.match(pattern);

      if (!match) {
        continue;
      }

      findings.push({
        ruleId: this.id,
        title: 'Potentially dangerous output detected',
        description:
          'The AI output contains a pattern associated with potentially destructive operations.',
        severity: 'critical',
        category: 'output-validation',
        matchedText: match[0],
      });
    }

    return findings;
  }
}
