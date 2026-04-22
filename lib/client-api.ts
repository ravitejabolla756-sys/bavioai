"use client";

import axios from "axios";

export const TOKEN_KEY = "bavio_jwt";

function normalizeBaseUrl(url?: string | null) {
  return url ? url.replace(/\/+$/, "") : "";
}

export const BACKEND_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_SITE_URL
);

export const clientApi = axios.create({
  baseURL: BACKEND_URL || undefined,
  withCredentials: true
});

clientApi.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const token = window.localStorage.getItem(TOKEN_KEY);

  if (token && !config.headers?.Authorization) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
