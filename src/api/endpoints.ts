export const ENDPOINTS = {
  MOVIES: "/discover//movie",
  TRENDING: "/trending/movie/day",
  POPULAR: "/movie/popular",
  SEARCH: "/search/movie",
  ONPLAYING: "/movie/now_playing",
  UPCOMING: "/movie/upcoming",
  DETAILS: (id: string) => `/movie/${id}`,
  CREDITS:(id: string) => `/movie/${id}/credits`,
  PERSONDETAILS:(id: string) => `/person/${id}`,
};
