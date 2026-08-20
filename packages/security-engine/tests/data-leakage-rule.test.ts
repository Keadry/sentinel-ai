import { describe, expect, it } from 'vitest';
import { DataLeakageRule } from '../src/data-leakage-rule.js';

describe('DataLeakageRule', () => {
  const rule = new DataLeakageRule();

  it('should detect an email address', () => {
    const findings = rule.analyze(
      'Contact user@example.com for more information.',
    );

    expect(findings.length).toBeGreaterThan(0);
    expect(findings[0]?.category).toBe('data-leakage');
  });

  it('should not flag normal text', () => {
    const findings = rule.analyze('The application is running normally.');

    expect(findings).toHaveLength(0);
  });
});
