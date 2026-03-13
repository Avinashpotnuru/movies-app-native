import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../api/movies.service";

const useGetGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
};

export default useGetGenres;
