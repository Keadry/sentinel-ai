import type { TestCase, TestResult } from './types.js';

export class TestRunner {
  async run(test: TestCase): Promise<TestResult> {
    const start = performance.now();
    const timeout = test.timeout ?? 5000;
    const retries = test.retries ?? 0;

    let lastResult: TestResult | undefined;

    for (let attempt = 1; attempt <= retries + 1; attempt++) {
      try {
        const result = await this.withTimeout(test.execute(), timeout);

        lastResult = {
          ...result,
          duration: performance.now() - start,
          attempts: attempt,
        };

        if (result.status === 'passed') {
          return lastResult;
        }
      } catch (error) {
        lastResult = {
          status: 'failed',
          duration: performance.now() - start,
          attempts: attempt,
          message:
            error instanceof Error ? error.message : 'Unknown test error',
        };
      }
    }

    return lastResult!;
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
