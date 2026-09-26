import { QueryClient, useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

export const prefetchMovieDetail = (
  queryClient: QueryClient,
  id: number,
  typeOfList: string,
) => {
  if (!Boolean(id) || typeof typeOfList !== "string" || !typeOfList) return;
  return queryClient.prefetchQuery({
    queryKey: ["movieDetail", { id, typeOfList }],
    queryFn: () => getMovieDetails(id, typeOfList),
    staleTime: DEFAULT_QUERY_OPTIONS.staleTime,
  });
};

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
