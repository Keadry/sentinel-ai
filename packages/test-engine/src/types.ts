export type TestStatus = 'passed' | 'failed';

export interface TestCase {
  id: string;
  name: string;
  description?: string;
  execute: () => Promise<TestResult>;
}

export interface TestResult {
  status: TestStatus;
  duration: number;
  message?: string;
}
