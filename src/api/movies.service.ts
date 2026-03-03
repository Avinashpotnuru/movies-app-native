import { api } from "./axios-interceptors";
import { ENDPOINTS } from "./endpoints";
export const getMovies = async (params: any) => {
  const response = await api.get(ENDPOINTS.MOVIES, {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
      ...params,
    },
  });

  return response.data;
};

export const nowPlayingMovies = async () => {
  const response = await api.get(ENDPOINTS.ON_PLAYING, {
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
  const response = await api.get(ENDPOINTS.UP_COMING, {
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
  const response = await api.get(`${ENDPOINTS.CREDITS(id.toString())}`, {
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

export const getPersonDetails = async (id: number) => {
  const response = await api.get(`${ENDPOINTS.PERSONDETAILS(id.toString())}`, {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
    },
  });

  return response.data;
};

export const getSearchMovies = async (query: string) => {
  const response = await api.get(ENDPOINTS.SEARCH_MOVIES(query), {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
    },
  });

  return response.data;
};

export const getSearchTvShows = async (query: string) => {
  const response = await api.get(ENDPOINTS.SEARCH_TV_SHOWS(query), {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
    },
  });

  return response.data;
};

export const getTvShows = async (params: any = {}) => {
  const response = await api.get(ENDPOINTS.TV_SHOWS, {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
      ...params,
    },
  });

  return response.data;
};

export const getLanguages = async () => {
  const response = await api.get(ENDPOINTS.LANGUAGES);
  return response.data;
};
export const getGenres = async () => {
  const response = await api.get(ENDPOINTS.GENRES);
  return response.data;
};

export const sendToFavorite = async (
  id: number,
  favorite: boolean,
  media_type: string,
) => {
  const response = await api.post(ENDPOINTS.ADD_TO_FAVORITES, {
    media_type: media_type,
    media_id: id,
    favorite: favorite,
  });
  return response.data;
};

export const getFavorites = async (params: any = {}) => {
  const response = await api.get(ENDPOINTS.GET_FAVORITES, {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
      ...params,
    },
  });
  return response.data;
};

export const getFavoritesTv = async (params: any = {}) => {
  const response = await api.get(ENDPOINTS.GET_FAVORITES_TV, {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
      ...params,
    },
  });
  return response.data;
};
