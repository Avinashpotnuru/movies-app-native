import { useQuery } from "@tanstack/react-query";
import { getUpComingMovies } from "../api/movies.service";

const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: getUpComingMovies,
  });
};

export default useUpcomingMovies;
