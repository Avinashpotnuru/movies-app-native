import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../api/movies.service";

const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popularMovies"],
    queryFn: getPopularMovies,
  });
};

export default usePopularMovies;
