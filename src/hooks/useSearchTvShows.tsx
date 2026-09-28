import { useQuery } from "@tanstack/react-query";
import { getSearchTvShows } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";
const useSearchTvShows = (query: string) => {
  const normalizedQuery = query.trim().toLowerCase();
  return useQuery({
    queryKey: ["search-tv-shows", normalizedQuery],
    queryFn: () => getSearchTvShows(normalizedQuery),
    enabled: normalizedQuery.length > 2,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useSearchTvShows;
