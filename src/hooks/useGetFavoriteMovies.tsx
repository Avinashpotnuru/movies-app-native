import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../api/movies.service";

const useGetFavoriteMovies = (page?: number) => {
  const currentPage = page ?? 1;

  return useQuery({
    queryKey: ["favorite-movies", currentPage],
    queryFn: () => getFavorites({ page: currentPage }),
  });
};

export default useGetFavoriteMovies;
