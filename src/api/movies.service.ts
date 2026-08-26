import { api } from "./axios-interceptors";
import { ENDPOINTS } from "./endpoints";

const defaultParams = {
  include_adult: false,
  include_video: false,
  language: "en-US",
};

const fetchData = async (url: string, params: Record<string, any> = {}) => {
  const response = await api.get(url, {
    params: {
      ...defaultParams,
      ...params,
    },
  });

  return response.data;
};

const fetchSimpleData = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

type GetParams = {
  pageParam?: number;
  language?: string;
  genre?: string;
  sort?: string;
};

export const getMovies = ({ pageParam = 1, language, genre, sort }: GetParams) => {
  return fetchData(ENDPOINTS.MOVIES, {
    page: pageParam,
    with_original_language: language,
    with_genres: genre,
    sort_by: sort ?? "popularity.desc",
  });
};

export const nowPlayingMovies = () => {
  return fetchData(ENDPOINTS.ON_PLAYING);
};

export const getUpComingMovies = () => {
  return fetchData(ENDPOINTS.UP_COMING);
};

export const getPopularMovies = () => {
  return fetchData(ENDPOINTS.POPULAR);
};

export const getTrendingMovies = () => {
  return fetchData(ENDPOINTS.TRENDING);
};

export const getMovieDetails = (id: number, typeOfList: string) => {
  return fetchData(ENDPOINTS.DETAILS(id.toString(), typeOfList));
};

export const getMovieCredits = (id: number, typeOfList: string) => {
  return fetchData(ENDPOINTS.CREDITS(id.toString(), typeOfList));
};

export const getPersonDetails = (id: number) => {
  return fetchData(ENDPOINTS.PERSONDETAILS(id.toString()));
};

export const getSearchMovies = (query: string) => {
  return fetchData(ENDPOINTS.SEARCH_MOVIES(query));
};

export const getSearchTvShows = (query: string) => {
  return fetchData(ENDPOINTS.SEARCH_TV_SHOWS(query));
};

export const getTvShows = ({ pageParam = 1, language, genre, sort }: GetParams) => {
  
  return fetchData(ENDPOINTS.TV_SHOWS, {
    page: pageParam,
    with_original_language: language,
    with_genres: genre,
    sort_by: sort ?? "popularity.desc",
  });
};

export const getLanguages = () => {
  return fetchSimpleData(ENDPOINTS.LANGUAGES);
};

export const getGenres = () => {
  return fetchSimpleData(ENDPOINTS.GENRES);
};

type FavoritePayload = {
  media_id: number;
  media_type: string;
  favorite: boolean;
};

export const sendToFavorite = async (payload: FavoritePayload) => {
  const response = await api.post(ENDPOINTS.ADD_TO_FAVORITES, payload);

  return response.data;
};

export const getFavorites = (params: Record<string, any> = {}) => {
  return fetchData(ENDPOINTS.GET_FAVORITES, params);
};

export const getFavoritesTv = (params: Record<string, any> = {}) => {
  return fetchData(ENDPOINTS.GET_FAVORITES_TV, params);
};

export const getWatchlist = (params: Record<string, any> = {}) => {
  return fetchData(ENDPOINTS.GET_WATCHLIST, params);
};

export const getWatchlistTv = (params: Record<string, any> = {}) => {
  return fetchData(ENDPOINTS.GET_WATCHLIST_TV, params);
};

type WatchlistPayload = {
  media_id: number;
  media_type: string;
  watchlist: boolean;
};

export const sendToWatchlist = async (payload: WatchlistPayload) => {
  const response = await api.post(ENDPOINTS.ADD_TO_WATCHLIST, payload);

  return response.data;
};
