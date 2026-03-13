import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/movies.service";

const useGetMovieCredits = (id: number, typeOfList: string) => {
  return useQuery({
    queryKey: ["movieCredits", id, typeOfList],
    queryFn: async () => getMovieCredits(id, typeOfList),
    enabled: !!id && !!typeOfList,
  });
};

export default useGetMovieCredits;
