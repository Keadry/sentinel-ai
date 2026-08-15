import { AssertionError } from './assertions.js';

export function assertStatus(actual: number, expected: number): void {
  if (actual !== expected) {
    throw new AssertionError(
      `Expected HTTP ${expected}, received HTTP ${actual}`,
    );
  }
}

export function assertResponseContains(body: unknown, expected: string): void {
  const serialized = JSON.stringify(body);

  if (!serialized.includes(expected)) {
    throw new AssertionError(`Response does not contain "${expected}"`);
  }
}

export function assertResponseTime(duration: number, maximum: number): void {
  if (duration > maximum) {
    throw new AssertionError(
      `Response took ${duration.toFixed(2)}ms, maximum allowed is ${maximum}ms`,
    );
  }
}
