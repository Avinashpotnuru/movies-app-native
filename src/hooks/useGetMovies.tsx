import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies } from "../api/movies.service";
import { DEFAULT_QUERY_OPTIONS } from "../api/queryOptions";

const useGetMovies = ({
  language,
  genre,
  sort,
}: {
  language?: string;
  genre?: string;
  sort?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["movies", language, genre, sort],

    queryFn: ({ pageParam = 1 }) =>
      getMovies({
        pageParam,
        language,
        genre,
        sort,
      }),

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    ...DEFAULT_QUERY_OPTIONS,
  });
};

export default useGetMovies;
