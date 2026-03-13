import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../api/movies.service";

const useGetLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });
};

export default useGetLanguages;
