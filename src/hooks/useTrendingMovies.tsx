import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../api/movies.service";

const useTrendingMovies = () => {
  return useQuery({
    queryKey: ["trendingMovies"],
    queryFn: getTrendingMovies,
  });
};

export default useTrendingMovies;
