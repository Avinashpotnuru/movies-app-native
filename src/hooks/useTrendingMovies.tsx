import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";
const useTrendingMovies = () => {
  return useQuery({
    queryKey: ["trendingMovies"],
    queryFn: getTrendingMovies,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useTrendingMovies;
