import { describe, expect, it } from 'vitest';
import {
  assertResponseContains,
  assertResponseTime,
  assertStatus,
} from '../src/api-assertions.js';

describe('API Assertions', () => {
  it('should validate HTTP status', () => {
    expect(() => assertStatus(200, 200)).not.toThrow();
  });

  it('should detect incorrect status', () => {
    expect(() => assertStatus(404, 200)).toThrow();
  });

  it('should validate response content', () => {
    expect(() =>
      assertResponseContains({ message: 'Hello SentinelAI' }, 'SentinelAI'),
    ).not.toThrow();
  });

  it('should validate response time', () => {
    expect(() => assertResponseTime(100, 500)).not.toThrow();
  });
});
