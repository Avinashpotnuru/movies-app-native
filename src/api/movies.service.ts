import { api } from "./axios-interceptors";
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

export const nowPlayingMovies = async () => {
  const response = await api.get(ENDPOINTS.ONPLAYING, {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
    },
  });

  return response.data;
};

export const getUpComingMovies = async () => {
  const response = await api.get(ENDPOINTS.UPCOMING, {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
    },
  });

  return response.data;
};

export const getMovieDetails = async (id: number) => {
  const response = await api.get(ENDPOINTS.DETAILS(id.toString()), {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
    },
  });

  return response.data;
};
export const getMovieCredits = async (id: number) => {
  const response = await api.get(`/movie/${id}/credits`, {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
    },
  });

  return response.data;
};

export const getPopularMovies = async () => {
  const response = await api.get(ENDPOINTS.POPULAR, {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
    },
  });

  return response.data;
};

export const getTrendingMovies = async () => {
  const response = await api.get(ENDPOINTS.TRENDING, {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
    },
  });

  return response.data;
};
