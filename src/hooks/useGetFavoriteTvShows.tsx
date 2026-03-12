import { useQuery } from "@tanstack/react-query";
import { getFavoritesTv } from "../api/movies.service";

const useGetFavoriteTvShows = (page?: number) => {
  const currentPage = page ?? 1;

  return useQuery({
    queryKey: ["favorite-tv-shows", currentPage],
    queryFn: () => getFavoritesTv({ page: currentPage }),
  });
};

export default useGetFavoriteTvShows;
