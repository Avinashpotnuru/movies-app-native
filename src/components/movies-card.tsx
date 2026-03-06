import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../theme";
import { MoviesCardType } from "../types";
import { getImage } from "../utils/getImage";

const MoviesCard = ({
  moviesDetails,
}: {
  moviesDetails: MoviesCardType | null;
}) => {
  const handleNavigation = (id: number | null) => {
    if (!id) return;
    const listType = moviesDetails?.typeOfList === "movie" ? "movie" : "tv";
    router.push({
      pathname: "/movie-details/[id]",
      params: { id, typeOfList: listType },
    });
  };

  const imageSource = React.useMemo(
    () =>
      moviesDetails?.poster_path
        ? { uri: getImage(moviesDetails.poster_path, "w342") }
        : require("@/assets/images/placeholder.jpg"),
    [moviesDetails?.poster_path],
  );

  const displayTitle = React.useMemo(() => {
    const t = moviesDetails?.title;
    if (!t) return "";
    return t.length > 15 ? `${t.slice(0, 15)}...` : t;
  }, [moviesDetails?.title]);

  return (
    <TouchableOpacity
      disabled={!moviesDetails?.id}
      style={[styles.container, { opacity: moviesDetails?.id ? 1 : 0.5 }]}
      onPress={() => handleNavigation(moviesDetails?.id || null)}
    >
      <Image source={imageSource} style={styles.image} />
      {moviesDetails?.enableTitle && moviesDetails?.title && (
        <Text style={styles.title}>{displayTitle}</Text>
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
    margin: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 13,
    color: Colors.sectionHeading,
    textAlign: "center",
  },
  image: {
    width: 110,
    height: 150,
    overflow: "hidden",
    resizeMode: "cover",
  },
});

export default MoviesCard;
