import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetMovieCredits = (
  id: number,
  typeOfList: string,
  options?: { initialData?: unknown },
) => {
  const hasInitialData = Boolean(options?.initialData);
  return useQuery({
    queryKey: ["movieCredits", { id, typeOfList }],

    queryFn: () => getMovieCredits(id, typeOfList),

    enabled:
      !hasInitialData &&
      Boolean(id) &&
      typeof typeOfList === "string" &&
      typeOfList.trim().length > 0,
    initialData: options?.initialData,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useGetMovieCredits;
