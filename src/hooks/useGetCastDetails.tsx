import { useQuery } from "@tanstack/react-query";
import { getPersonDetails } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetCastDetails = (id: number) => {
  return useQuery({
    queryKey: ["castDetails", id],
    queryFn: () => getPersonDetails(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useGetCastDetails;
