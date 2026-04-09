"use client";

import axios from "axios";

export const TOKEN_KEY = "bavio_jwt";

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_SITE_URL?.replace(":3000", ":5000") ||
  "http://localhost:5000";

export const clientApi = axios.create({
  baseURL: BACKEND_URL,
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
