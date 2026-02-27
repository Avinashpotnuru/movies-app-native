import api from "./axios-interceptors";
import { ENDPOINTS } from "./endpoints";
export const getMovies = async () => {
  const response = await api.get(ENDPOINTS.MOVIES, {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
    },
  });

  return response.data;
};
