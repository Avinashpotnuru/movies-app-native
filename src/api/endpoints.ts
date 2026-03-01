export const ENDPOINTS = {
  MOVIES: "/discover/movie",
  TRENDING: "/trending/movie/day",
  POPULAR: "/movie/popular",
  SEARCH: "/search/movie",
  ONPLAYING: "/movie/now_playing",
  UPCOMING: "/movie/upcoming",
  DETAILS: (id: string) =>
    `/movie/${id}?append_to_response=similar,videos,images,credits`,
  CREDITS: (id: string) => `/movie/${id}/credits`,
  PERSONDETAILS: (id: string) =>
    `/person/${id}?append_to_response=combined_credits,external_ids,images`,
};
