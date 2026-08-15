import { describe, expect, it } from 'vitest';
import { createApiTest } from '../src/api-test.js';
import { TestRunner } from '../src/test-runner.js';

describe('API Test', () => {
  it('should test a real HTTP endpoint', async () => {
    const test = createApiTest('api-001', 'HTTPBin GET', {
      url: 'https://httpbin.org/get',
      expectedStatus: 200,
      expectedBodyContent: 'url',
      maxResponseTime: 5000,
    });

    const runner = new TestRunner();
    const result = await runner.run(test);

    expect(result.status).toBe('passed');
  });
});
