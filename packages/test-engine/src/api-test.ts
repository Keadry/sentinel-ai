import type { TestCase } from './types.js';
import { httpRequest } from './http-client.js';
import {
  assertResponseContains,
  assertResponseTime,
  assertStatus,
} from './api-assertions.js';

export interface ApiTestConfig {
  method?: string;
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
  expectedStatus?: number;
  expectedBodyContent?: string;
  maxResponseTime?: number;
}

export function createApiTest(
  id: string,
  name: string,
  config: ApiTestConfig,
): TestCase {
  return {
    id,
    name,
    tags: ['api'],
    execute: async () => {
      const response = await httpRequest({
        url: config.url,
        method: config.method,
        headers: config.headers,
        body: config.body,
      });

      if (config.expectedStatus !== undefined) {
        assertStatus(response.status, config.expectedStatus);
      }

      if (config.expectedBodyContent !== undefined) {
        assertResponseContains(response.body, config.expectedBodyContent);
      }

      if (config.maxResponseTime !== undefined) {
        assertResponseTime(response.duration, config.maxResponseTime);
      }

      return {
        status: 'passed',
        duration: response.duration,
        message: 'API test passed',
      };
    },
  };
}
