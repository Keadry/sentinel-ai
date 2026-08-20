import type { SecurityRule } from './security-rule.js';
import type { SecurityFinding } from './types.js';

const suspiciousPatterns = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /ignore\s+(the\s+)?system\s+instructions/i,
  /disregard\s+(all\s+)?previous\s+instructions/i,
  /reveal\s+(the\s+)?system\s+prompt/i,
];

export class PromptInjectionRule implements SecurityRule {
  id = 'SEC-001';

  analyze(input: string): SecurityFinding[] {
    const findings: SecurityFinding[] = [];

    for (const pattern of suspiciousPatterns) {
      const match = input.match(pattern);

      if (!match) {
        continue;
      }

      findings.push({
        ruleId: this.id,
        title: 'Potential prompt injection detected',
        description:
          'The input contains a pattern commonly associated with instruction override or system prompt extraction attempts.',
        severity: 'high',
        category: 'prompt-injection',
        matchedText: match[0],
      });
    }

    return findings;
  }
}
