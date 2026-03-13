import { useQuery } from "@tanstack/react-query";
import { getSearchMovies } from "../api/movies.service";

const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ["search-movies", query],
    queryFn: () => getSearchMovies(query),
    enabled: !!query,
  });
};

export default useSearchMovies;
