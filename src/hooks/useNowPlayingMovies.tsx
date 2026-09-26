import { useQuery } from "@tanstack/react-query";
import { nowPlayingMovies } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: nowPlayingMovies,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useNowPlayingMovies;