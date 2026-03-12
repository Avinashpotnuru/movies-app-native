import { useQuery } from "@tanstack/react-query";
import { getTvShows } from "../api/movies.service";

const useTvShows = () => {
  return useQuery({
    queryKey: ["tvShows"],
    queryFn: getTvShows,
  });
};

export default useTvShows;
