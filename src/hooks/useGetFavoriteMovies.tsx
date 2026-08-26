import { useInfiniteQuery } from "@tanstack/react-query";
import { getFavorites } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetFavoriteMovies = () => {
  return useInfiniteQuery({
    queryKey: ["favorite-movies"],
    queryFn: ({ pageParam = 1 }) => getFavorites({ page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.total_pages ? lastPage.page + 1 : undefined,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useGetFavoriteMovies;
