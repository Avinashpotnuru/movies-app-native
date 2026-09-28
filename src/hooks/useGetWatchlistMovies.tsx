import { useInfiniteQuery } from "@tanstack/react-query";
import { getWatchlist } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetWatchlistMovies = (options?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: ["watchlist-movies"],
    queryFn: ({ pageParam = 1 }) => getWatchlist({ page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.total_pages ? lastPage.page + 1 : undefined,
    enabled: options?.enabled,
    ...DEFAULT_QUERY_OPTIONS,
    cacheTime: 1000 * 60 * 30,
  });
};

export default useGetWatchlistMovies;
