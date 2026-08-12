import { describe, expect, it } from 'vitest';
import { TestSuite } from '../src/test-suite.js';

describe('TestSuite', () => {
  it('should execute all tests and calculate summary', async () => {
    const suite = new TestSuite('Authentication Tests', [
      {
        id: 'auth-001',
        name: 'Login succeeds',
        execute: async () => ({
          status: 'passed',
          duration: 0,
        }),
      },
      {
        id: 'auth-002',
        name: 'Invalid password fails',
        execute: async () => ({
          status: 'failed',
          duration: 0,
          message: 'Invalid password',
        }),
      },
    ]);

    const result = await suite.run();

    expect(result.name).toBe('Authentication Tests');
    expect(result.passed).toBe(1);
    expect(result.failed).toBe(1);
    expect(result.results).toHaveLength(2);
  });
});
