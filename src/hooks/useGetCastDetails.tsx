import { useQuery } from "@tanstack/react-query";
import { getPersonDetails } from "../api/movies.service";

const useGetCastDetails = (id: number) => {
  return useQuery({
    queryKey: ["castDetails", id],
    queryFn: () => getPersonDetails(id),
    enabled: !!id,
  });
};

export default useGetCastDetails;
