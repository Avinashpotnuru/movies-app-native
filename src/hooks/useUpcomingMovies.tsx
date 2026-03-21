import { useQuery } from "@tanstack/react-query";
import { getUpComingMovies } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: getUpComingMovies,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useUpcomingMovies;
