import { useQuery } from "@tanstack/react-query";
import { getSearchMovies } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useSearchMovies = (query: string) => {
  const normalizedQuery = query.trim().toLowerCase();
  return useQuery({
    queryKey: ["search-movies", normalizedQuery],
    queryFn: () => getSearchMovies(normalizedQuery),
    enabled: normalizedQuery.length > 2,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useSearchMovies;
