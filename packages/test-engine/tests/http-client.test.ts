import { describe, expect, it } from 'vitest';
import { httpRequest } from '../src/http-client.js';

describe('HTTP Client', () => {
  it('should send a GET request', async () => {
    const response = await httpRequest({
      url: 'https://httpbin.org/get',
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.duration).toBeGreaterThanOrEqual(0);
  });
});
