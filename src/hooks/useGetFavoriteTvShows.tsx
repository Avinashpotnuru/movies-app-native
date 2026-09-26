import { useInfiniteQuery } from "@tanstack/react-query";
import { getFavoritesTv } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetFavoriteTvShows = () => {
  return useInfiniteQuery({
    queryKey: ["favorite-tv-shows"],
    queryFn: ({ pageParam = 1 }) => getFavoritesTv({ page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.total_pages ? lastPage.page + 1 : undefined,
    ...DEFAULT_QUERY_OPTIONS,
    cacheTime: 1000 * 60 * 30,
  });
};

export default useGetFavoriteTvShows;
