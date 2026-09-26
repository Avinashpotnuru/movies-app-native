import { useQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useTopRatedMovies = () => {
  return useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: getTopRatedMovies,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useTopRatedMovies;