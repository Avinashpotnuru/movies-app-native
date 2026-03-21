import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetFavoriteMovies = (page?: number) => {
  const currentPage = page ?? 1;

  return useQuery({
    queryKey: ["favorite-movies", currentPage],
    queryFn: () => getFavorites({ page: currentPage }),
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useGetFavoriteMovies;
