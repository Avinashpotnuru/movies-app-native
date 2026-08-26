import { useInfiniteQuery } from "@tanstack/react-query";
import { getWatchlistTv } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetWatchlistTvShows = () => {
  return useInfiniteQuery({
    queryKey: ["watchlist-tv"],
    queryFn: ({ pageParam = 1 }) => getWatchlistTv({ page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.total_pages ? lastPage.page + 1 : undefined,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useGetWatchlistTvShows;
