import axios, { AxiosHeaders } from "axios";

// eslint-disable-next-line import/no-named-as-default-member
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.headers = config.headers || new AxiosHeaders();

  config.headers.set(
    "Authorization",
    `Bearer ${process.env.EXPO_PUBLIC_ACCESS_TOKEN}`,
  );

  return config;
});
