import { useInfiniteQuery } from "@tanstack/react-query";
import { getWatchlist } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetWatchlistMovies = () => {
  return useInfiniteQuery({
    queryKey: ["watchlist-movies"],
    queryFn: ({ pageParam = 1 }) => getWatchlist({ page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.total_pages ? lastPage.page + 1 : undefined,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useGetWatchlistMovies;
