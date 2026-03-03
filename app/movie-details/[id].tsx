import { MoviesDetailsContainer } from "@/src/screens";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const MoviesDetails = () => {
  const { id} = useLocalSearchParams();
  const movieId = Number(id);

  return <MoviesDetailsContainer id={movieId} />;
};

export default MoviesDetails;
