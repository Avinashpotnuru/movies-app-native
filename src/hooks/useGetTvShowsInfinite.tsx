// hooks/useGetTvShowsInfinite.ts

import { useInfiniteQuery } from "@tanstack/react-query";
import { getTvShows } from "../api/movies.service";

const useGetTvShowsInfinite = ({
  language,
  genre,
  sort,
}: {
  language?: string;
  genre?: string;
  sort?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["tv-shows", language, genre, sort],

    queryFn: ({ pageParam = 1 }) =>
      getTvShows({
        page: pageParam,
        with_original_language: language,
        with_genres: genre,
        sort_by: sort,
      }),

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};

export default useGetTvShowsInfinite;
