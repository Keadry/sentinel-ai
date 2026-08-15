/// <reference types="node" />
import { createServer, type Server } from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { httpRequest } from '../src/http-client.js';

describe('HTTP Client', () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createServer((request, response) => {
      if (request.url === '/health' && request.method === 'GET') {
        response.writeHead(200, {
          'Content-Type': 'application/json',
        });

        response.end(
          JSON.stringify({
            status: 'ok',
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

  it('should send a GET request', async () => {
    const response = await httpRequest({
      url: `${baseUrl}/health`,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
    });
    expect(response.duration).toBeGreaterThanOrEqual(0);
  });
});
