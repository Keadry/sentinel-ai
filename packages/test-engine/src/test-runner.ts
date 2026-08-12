import type { TestCase, TestResult } from './types.js';

export class TestRunner {
  async run(test: TestCase): Promise<TestResult> {
    const start = performance.now();
    const timeout = test.timeout ?? 5000;

    try {
      const result = await this.withTimeout(test.execute(), timeout);

      return {
        ...result,
        duration: performance.now() - start,
        attempts: 1,
      };
    } catch (error) {
      return {
        status: 'failed',
        duration: performance.now() - start,
        attempts: 1,
        message: error instanceof Error ? error.message : 'Unknown test error',
      };
    }
  }

  private async withTimeout<T>(
    promise: Promise<T>,
    timeout: number,
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Test timed out after ${timeout}ms`));
      }, timeout);

      promise.then(
        (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        (error) => {
          clearTimeout(timer);
          reject(error);
        },
      );
    });
  }
}
