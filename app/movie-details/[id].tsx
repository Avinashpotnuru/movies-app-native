import { MoviesDetailsContainer } from "@/src/screens";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const MoviesDetails = () => {
  const { id, typeOfList } = useLocalSearchParams();

  const movieId = Number(id);

  return (
    <MoviesDetailsContainer id={movieId} typeOfList={typeOfList as string} />
  );
};

export default MoviesDetails;
