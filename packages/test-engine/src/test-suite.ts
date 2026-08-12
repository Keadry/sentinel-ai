import type { TestCase, TestResult } from './types.js';
import { TestRunner } from './test-runner.js';

export interface TestSuiteResult {
  name: string;
  results: TestResult[];
  passed: number;
  failed: number;
  duration: number;
}

export class TestSuite {
  private readonly runner = new TestRunner();

  constructor(
    private readonly name: string,
    private readonly tests: TestCase[],
  ) {}

  async run(): Promise<TestSuiteResult> {
    const start = performance.now();
    const results: TestResult[] = [];

    for (const test of this.tests) {
      results.push(await this.runner.run(test));
    }

    return {
      name: this.name,
      results,
      passed: results.filter((result) => result.status === 'passed').length,
      failed: results.filter((result) => result.status === 'failed').length,
      duration: performance.now() - start,
    };
  }
}
