import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popularMovies"],
    queryFn: getPopularMovies,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default usePopularMovies;
