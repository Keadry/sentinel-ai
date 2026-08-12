import { describe, expect, it } from 'vitest';
import { TestRunner } from '../src/test-runner.js';
import { assertEqual } from '../src/assertions.js';

describe('TestRunner', () => {
  it('should execute a successful test', async () => {
    const runner = new TestRunner();

    const result = await runner.run({
      id: 'test-001',
      name: 'Basic health check',
      description: 'Checks whether the service is healthy',
      tags: ['smoke', 'health'],
      priority: 'high',
      execute: async () => ({
        status: 'passed',
        duration: 0,
        message: 'Health check passed',
      }),
    });

    expect(result.status).toBe('passed');
    expect(result.message).toBe('Health check passed');
    expect(result.duration).toBeGreaterThanOrEqual(0);
  });

  it('should handle failed tests', async () => {
    const runner = new TestRunner();

    const result = await runner.run({
      id: 'test-002',
      name: 'Intentional failure',
      execute: async () => ({
        status: 'failed',
        duration: 0,
        message: 'Expected failure',
      }),
    });

    expect(result.status).toBe('failed');
    expect(result.message).toBe('Expected failure');
  });

  it('should fail when an assertion throws', async () => {
    const runner = new TestRunner();

    const result = await runner.run({
      id: 'test-003',
      name: 'Response validation',
      execute: async () => {
        assertEqual('error', 'success', 'API response mismatch');

        return {
          status: 'passed',
          duration: 0,
        };
      },
    });

    expect(result.status).toBe('failed');
    expect(result.message).toContain('API response mismatch');
  });

  it('should fail when a test exceeds timeout', async () => {
    const runner = new TestRunner();

    const result = await runner.run({
      id: 'test-timeout',
      name: 'Slow test',
      timeout: 20,
      execute: async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));

        return {
          status: 'passed',
          duration: 0,
        };
      },
    });

    expect(result.status).toBe('failed');
    expect(result.message).toContain('timed out');
  });

  it('should retry a failed test', async () => {
    const runner = new TestRunner();

    let attempts = 0;

    const result = await runner.run({
      id: 'test-retry',
      name: 'Flaky test',
      retries: 2,
      execute: async () => {
        attempts++;

        if (attempts < 3) {
          return {
            status: 'failed',
            duration: 0,
            message: 'Temporary failure',
          };
        }

        return {
          status: 'passed',
          duration: 0,
          message: 'Recovered',
        };
      },
    });

    expect(result.status).toBe('passed');
    expect(result.attempts).toBe(3);
  });
});
