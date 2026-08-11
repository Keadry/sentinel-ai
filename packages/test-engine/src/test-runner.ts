import type { TestCase, TestResult } from './types.js';

export class TestRunner {
  async run(test: TestCase): Promise<TestResult> {
    const start = performance.now();

    try {
      const result = await test.execute();

      return {
        ...result,
        duration: performance.now() - start,
      };
    } catch (error) {
      return {
        status: 'failed',
        duration: performance.now() - start,
        message: error instanceof Error ? error.message : 'Unknown test error',
      };
    }
  }
}
