import { create } from "axios";

export const api = create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  headers: {
    accept: "application/json",
  },
});


api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  // ensure header key exists before assignment
  (config.headers as any).Authorization = `Bearer ${process.env.EXPO_PUBLIC_ACCESS_TOKEN}`;

  return config;
});
