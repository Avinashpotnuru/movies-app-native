import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useGetLanguages;
