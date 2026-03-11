import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  headers: {
    accept: "application/json",
  },
});


api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${process.env.EXPO_PUBLIC_ACCESS_TOKEN}`;

  return config;
});
