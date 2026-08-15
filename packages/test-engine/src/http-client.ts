export interface HttpRequest {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
}

export interface HttpResponse {
  status: number;
  headers: Record<string, string>;
  body: unknown;
  duration: number;
}

export async function httpRequest(request: HttpRequest): Promise<HttpResponse> {
  const start = performance.now();

  const response = await fetch(request.url, {
    method: request.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...request.headers,
    },
    body: request.body !== undefined ? JSON.stringify(request.body) : undefined,
  });

  const contentType = response.headers.get('content-type') ?? '';

  const body = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  const headers: Record<string, string> = {};

  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return {
    status: response.status,
    headers,
    body,
    duration: performance.now() - start,
  };
}
