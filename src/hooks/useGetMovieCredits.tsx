import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetMovieCredits = (id: number, typeOfList: string) => {
  return useQuery({
    queryKey: ["movieCredits", { id, typeOfList }],

    queryFn: () => getMovieCredits(id, typeOfList),

    enabled:
      Boolean(id) &&
      typeof typeOfList === "string" &&
      typeOfList.trim().length > 0,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useGetMovieCredits;
