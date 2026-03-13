import { useQuery } from "@tanstack/react-query";
import { getSearchTvShows } from "../api/movies.service";

const useSearchTvShows = (query: string) => {
  return useQuery({
    queryKey: ["search-tv-shows", query],
    queryFn: () => getSearchTvShows(query),
    enabled: !!query,
  });
};

export default useSearchTvShows;
