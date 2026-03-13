import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendToFavorite } from "../api/movies.service";

const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendToFavorite,

    onSuccess: (_, variables) => {
      if (variables.media_type === "movie") {
        queryClient.invalidateQueries({ queryKey: ["favorite-movies"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["favorite-tv-shows"] });
      }
    },
  });
};

export default useAddFavorite;
