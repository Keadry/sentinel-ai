export class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AssertionError';
  }
}

export function assertEqual<T>(
  actual: T,
  expected: T,
  message = 'Values are not equal',
): void {
  if (actual !== expected) {
    throw new AssertionError(
      `${message}: expected ${String(expected)}, received ${String(actual)}`,
    );
  }
}

export function assertTrue(
  value: boolean,
  message = 'Expected value to be true',
): void {
  if (!value) {
    throw new AssertionError(message);
  }
}

export function assertContains(
  value: string,
  expected: string,
  message = 'String does not contain expected value',
): void {
  if (!value.includes(expected)) {
    throw new AssertionError(
      `${message}: expected "${value}" to contain "${expected}"`,
    );
  }
}
