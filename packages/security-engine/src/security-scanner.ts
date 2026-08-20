import type { SecurityRule } from './security-rule.js';
import type { SecurityScanResult } from './types.js';

export class SecurityScanner {
  constructor(private readonly rules: SecurityRule[]) {}

  scan(input: string): SecurityScanResult {
    const start = performance.now();

    const findings = this.rules.flatMap((rule) => rule.analyze(input));

    const score = this.calculateScore(findings);

    return {
      findings,
      duration: performance.now() - start,
      score,
    };
  }

  private calculateScore(findings: SecurityScanResult['findings']): number {
    const penalties = {
      info: 1,
      low: 5,
      medium: 15,
      high: 30,
      critical: 50,
    };

    const penalty = findings.reduce(
      (total, finding) => total + penalties[finding.severity],
      0,
    );

    return Math.max(0, 100 - penalty);
  }
}
