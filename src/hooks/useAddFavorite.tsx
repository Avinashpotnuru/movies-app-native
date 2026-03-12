import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendToFavorite } from "../api/movies.service";

const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendToFavorite,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite-movies"] });
      queryClient.invalidateQueries({ queryKey: ["favorite-tv-shows"] });
    },
  });
};

export default useAddFavorite;
