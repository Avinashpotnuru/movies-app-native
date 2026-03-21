import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useGetGenres;
