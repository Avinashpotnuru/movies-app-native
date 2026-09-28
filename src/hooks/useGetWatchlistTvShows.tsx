import { useInfiniteQuery } from "@tanstack/react-query";
import { getWatchlistTv } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetWatchlistTvShows = (options?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: ["watchlist-tv"],
    queryFn: ({ pageParam = 1 }) => getWatchlistTv({ page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.total_pages ? lastPage.page + 1 : undefined,
    enabled: options?.enabled,
    ...DEFAULT_QUERY_OPTIONS,
    cacheTime: 1000 * 60 * 30,
  });
};

export default useGetWatchlistTvShows;
