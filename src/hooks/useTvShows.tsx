import { useQuery } from "@tanstack/react-query";
import { getTvShows } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useTvShows = () => {
  return useQuery({
    queryKey: ["tvShows"],
    queryFn: getTvShows,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useTvShows;
