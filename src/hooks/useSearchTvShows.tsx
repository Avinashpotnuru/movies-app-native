import { useQuery } from "@tanstack/react-query";
import { getSearchTvShows } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";
const useSearchTvShows = (query: string) => {
  return useQuery({
    queryKey: ["search-tv-shows", query],
    queryFn: () => getSearchTvShows(query),
    enabled: query.length > 2,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useSearchTvShows;
