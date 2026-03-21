import { useQuery } from "@tanstack/react-query";
import { getFavoritesTv } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetFavoriteTvShows = (page?: number) => {
  const currentPage = page ?? 1;

  return useQuery({
    queryKey: ["favorite-tv-shows", currentPage],
    queryFn: () => getFavoritesTv({ page: currentPage }),
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useGetFavoriteTvShows;
