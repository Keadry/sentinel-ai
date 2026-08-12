import { describe, expect, it } from 'vitest';
import {
  assertContains,
  assertEqual,
  assertTrue,
  AssertionError,
} from '../src/assertions.js';

describe('Assertions', () => {
  it('should pass equal values', () => {
    expect(() => assertEqual(10, 10)).not.toThrow();
  });

  it('should throw when values differ', () => {
    expect(() => assertEqual(10, 20)).toThrow(AssertionError);
  });

  it('should validate boolean conditions', () => {
    expect(() => assertTrue(true)).not.toThrow();
  });

  it('should validate string content', () => {
    expect(() => assertContains('SentinelAI', 'AI')).not.toThrow();
  });
});
