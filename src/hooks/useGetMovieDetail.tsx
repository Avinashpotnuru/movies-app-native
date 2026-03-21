import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetMovieDetail = (id: number, typeOfList: string) => {
  return useQuery({
    queryKey: ["movieDetail", { id, typeOfList }],
    queryFn: () => getMovieDetails(id, typeOfList),
    enabled:
      Boolean(id) && typeof typeOfList === "string" && typeOfList.length > 0,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useGetMovieDetail;
