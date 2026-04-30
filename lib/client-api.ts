"use client";

export const TOKEN_KEY = "bavio_token";

export type ApiResponse<T> = {
  data: T;
  status: number;
  ok: boolean;
  headers: Headers;
};

type ApiRequestConfig = Omit<RequestInit, "body" | "method"> & {
  headers?: HeadersInit;
};

class ApiError extends Error {
  response: {
    data: any;
    status: number;
    headers: Headers;
  };

  constructor(message: string, response: { data: any; status: number; headers: Headers }) {
    super(message);
    this.name = "ApiError";
    this.response = response;
  }
}

function normalizeBaseUrl(url?: string | null) {
  return url ? url.replace(/\/+$/, "") : "";
}

export const BACKEND_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SITE_URL || ""
);

function buildUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return BACKEND_URL ? `${BACKEND_URL}${normalizedPath}` : normalizedPath;
}

function buildHeaders(headers?: HeadersInit) {
  const nextHeaders = new Headers(headers || {});

  if (typeof window !== "undefined" && !nextHeaders.has("Authorization")) {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
      nextHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  return nextHeaders;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const headers = buildHeaders(config.headers);
  const hasBody = body !== undefined && body !== null;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  if (hasBody && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildUrl(path), {
    ...config,
    method,
    headers,
    credentials: config.credentials || "include",
    cache: config.cache || "no-store",
    body: hasBody ? (isFormData ? (body as FormData) : JSON.stringify(body)) : undefined
  });

  const raw = await response.text();
  let payload: any = null;

  if (raw) {
    try {
      payload = JSON.parse(raw);
    } catch {
      payload = raw;
    }
  }

  if (!response.ok) {
    const errorPayload =
      payload && typeof payload === "object"
        ? payload
        : { success: false, error: typeof payload === "string" ? payload : `Request failed with status ${response.status}` };

    throw new ApiError(errorPayload.error || errorPayload.message || "Request failed.", {
      data: errorPayload,
      status: response.status,
      headers: response.headers
    });
  }

  return {
    data: payload as T,
    status: response.status,
    ok: response.ok,
    headers: response.headers
  };
}

export const clientApi = {
  get<T>(path: string, config?: ApiRequestConfig) {
    return request<T>("GET", path, undefined, config);
  },
  post<T>(path: string, body?: unknown, config?: ApiRequestConfig) {
    return request<T>("POST", path, body, config);
  },
  put<T>(path: string, body?: unknown, config?: ApiRequestConfig) {
    return request<T>("PUT", path, body, config);
  },
  patch<T>(path: string, body?: unknown, config?: ApiRequestConfig) {
    return request<T>("PATCH", path, body, config);
  },
  delete<T>(path: string, config?: ApiRequestConfig) {
    return request<T>("DELETE", path, undefined, config);
  }
};

export { ApiError };
