export const ENDPOINTS = {
  MOVIES: "/discover//movie",
  TRENDING: "/trending/movie/day",
  POPULAR: "/movie/popular",
  SEARCH: "/search/movie",
  DETAILS: (id: string) => `/movie/${id}`,
};
