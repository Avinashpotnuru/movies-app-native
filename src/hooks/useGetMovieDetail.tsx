import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api/movies.service";

const useGetMovieDetail = (id: number, typeOfList: string) => {
  return useQuery({
    queryKey: ["movieDetail", id, typeOfList],
    queryFn: async () => getMovieDetails(id, typeOfList),
    enabled: !!id && !!typeOfList,

  });
};

export default useGetMovieDetail;
