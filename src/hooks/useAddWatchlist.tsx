import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendToWatchlist } from "../api/movies.service";

const useAddWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendToWatchlist,

    onSuccess: (_, variables) => {
      if (variables.media_type === "movie") {
        queryClient.invalidateQueries({ queryKey: ["watchlist-movies"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["watchlist-tv"] });
      }
    },
  });
};

export default useAddWatchlist;
