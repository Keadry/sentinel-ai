import { describe, expect, it } from 'vitest';
import { OutputValidationRule } from '../src/output-validation-rule.js';

describe('OutputValidationRule', () => {
  const rule = new OutputValidationRule();

  it('should detect dangerous output', () => {
    const findings = rule.analyze('rm -rf /');

    expect(findings).toHaveLength(1);
    expect(findings[0]?.severity).toBe('critical');
  });

  it('should allow normal output', () => {
    const findings = rule.analyze(
      'Here is a safe explanation of Linux commands.',
    );

    expect(findings).toHaveLength(0);
  });
});
