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
  return (
    <TouchableOpacity
      onPress={() => handleNavigation(moviesDetails?.id || null)}
    >
      {moviesDetails?.poster_path && (
        <Image
          source={{
            uri: moviesDetails?.poster_path
              ? `https://image.tmdb.org/t/p/w500/${moviesDetails?.poster_path}`
              : require("@/assets/images/placeholder.jpg"),
          }}
          style={{
            width: moviesDetails?.width || 150,
            height: moviesDetails?.height || 220,
            marginRight: 15,
            borderRadius: 12,
          }}
        />
      )}
      {moviesDetails?.enableTitle && moviesDetails?.title && (
        <Text style={styles.title}>
          {moviesDetails?.title.length > 20
            ? `${moviesDetails?.title.slice(0, 20)}...`
            : moviesDetails?.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.sectionHeading,
    textAlign: "center",
  },
});

export default React.memo(MoviesCard);
