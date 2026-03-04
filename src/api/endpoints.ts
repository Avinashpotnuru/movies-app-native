const ACCOUNT_ID = process.env.EXPO_PUBLIC_TMDB_ACCOUNT_ID ;
console.log(ACCOUNT_ID);

export const ENDPOINTS = {
  MOVIES: "/discover/movie",
  TV_SHOWS: "/discover/tv",
  TRENDING: "/trending/movie/day",
  POPULAR: "/movie/popular",
  SEARCH: "/search/movie",
  ON_PLAYING: "/movie/now_playing",
  UP_COMING: "/movie/upcoming",
  LANGUAGES: "/configuration/languages",
  SEARCH_MOVIES: (query: string) => `/search/movie?query=${query}`,
  SEARCH_TV_SHOWS: (query: string) => `/search/tv?query=${query}`,
  DETAILS: (id: string, typeOfList: string) =>
    `/${typeOfList}/${id}?append_to_response=similar,videos,images,credits`,
  CREDITS: (id: string, typeOfList: string) => `/${typeOfList}/${id}/credits`,
  PERSONDETAILS: (id: string) =>
    `/person/${id}?append_to_response=combined_credits,external_ids,images`,
  GENRES: "/genre/movie/list",
  ADD_TO_FAVORITES: `/account/${ACCOUNT_ID}/favorite`,
  GET_FAVORITES: `/account/${ACCOUNT_ID}/favorite/movies`,
  GET_FAVORITES_TV: `/account/${ACCOUNT_ID}/favorite/tv`,
};
