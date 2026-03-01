import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../theme";
import { MoviesCardType } from "../types";

const MoviesCard = ({
  moviesDetails,
}: {
  moviesDetails: MoviesCardType | null;
}) => {
  const handleNavigation = (id: number | null) => {
    if (!id) return;
    router.push(`/movie-details/${id}`);
  };
  const imageSource = moviesDetails?.poster_path
    ? { uri: `https://image.tmdb.org/t/p/w200${moviesDetails.poster_path}` }
    : require("@/assets/images/placeholder.jpg");

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigation(moviesDetails?.id || null)}
    >
      <Image source={imageSource} style={styles.image} />
      {moviesDetails?.enableTitle && moviesDetails?.title && (
        <Text style={styles.title}>
          {moviesDetails.title.length > 15
            ? `${moviesDetails.title.slice(0, 15)}...`
            : moviesDetails.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    alignItems: "center",
    marginHorizontal: 8,
    justifyContent: "center",
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.sectionHeading,
    textAlign: "center",
  },
  image: {
    width: 110,
    height: 160,
    overflow: "hidden",
    resizeMode: "cover",
  },
});

export default MoviesCard;
