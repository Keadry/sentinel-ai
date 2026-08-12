export type TestStatus = 'passed' | 'failed';

export type TestPriority = 'low' | 'medium' | 'high' | 'critical';

export interface TestCase {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  priority?: TestPriority;
  timeout?: number;
  retries?: number;
  execute: () => Promise<TestResult>;
}

export interface TestResult {
  status: TestStatus;
  duration: number;
  message?: string;
  attempts?: number;
}
