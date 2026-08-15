import { createServer, type Server } from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createApiTest } from '../src/api-test.js';
import { TestRunner } from '../src/test-runner.js';

describe('API Test', () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createServer((request, response) => {
      if (request.url === '/users' && request.method === 'GET') {
        response.writeHead(200, {
          'Content-Type': 'application/json',
        });

        response.end(
          JSON.stringify({
            users: ['alice', 'bob'],
          }),
        );

        return;
      }

      response.writeHead(404, {
        'Content-Type': 'application/json',
      });

      response.end(
        JSON.stringify({
          error: 'Not found',
        }),
      );
    });

    await new Promise<void>((resolve) => {
      server.listen(0, '127.0.0.1', () => {
        const address = server.address();

        if (address && typeof address === 'object') {
          baseUrl = `http://127.0.0.1:${address.port}`;
        }

        resolve();
      });
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });

  it('should test a real HTTP endpoint', async () => {
    const test = createApiTest('api-001', 'Users API', {
      url: `${baseUrl}/users`,
      method: 'GET',
      expectedStatus: 200,
      expectedBodyContent: 'alice',
      maxResponseTime: 5000,
    });

    const runner = new TestRunner();
    const result = await runner.run(test);

    expect(result.status).toBe('passed');
  });
});
