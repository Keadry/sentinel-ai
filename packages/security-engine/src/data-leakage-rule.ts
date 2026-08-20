import type { SecurityRule } from './security-rule.js';
import type { SecurityFinding } from './types.js';

const sensitivePatterns = [
  /\b\d{3}-\d{2}-\d{4}\b/,
  /\b\d{16}\b/,
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
];

export class DataLeakageRule implements SecurityRule {
  id = 'SEC-002';

  analyze(input: string): SecurityFinding[] {
    const findings: SecurityFinding[] = [];

    for (const pattern of sensitivePatterns) {
      const match = input.match(pattern);

      if (!match) {
        continue;
      }

      findings.push({
        ruleId: this.id,
        title: 'Potential sensitive data exposure',
        description:
          'The response contains a pattern that may represent sensitive information.',
        severity: 'high',
        category: 'data-leakage',
        matchedText: match[0],
      });
    }

    return findings;
  }
}
