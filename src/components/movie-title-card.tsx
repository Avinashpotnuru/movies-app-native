import React, { lazy, Suspense } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../theme";
import { MovieTitleCardProps } from "../types";

const TrailerVideo = lazy(() => import("@/src/components/trailer-video"));

const { width } = Dimensions.get("window");
export default function MovieTitleCard({
  movieTitle,
  movieGenre,
  runTime,
  movieTrailerId,
}: MovieTitleCardProps) {
  const convertRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };
  const genreText = movieGenre?.map((genre) => genre.name).join("/");

  return (
    <View style={styles.container}>
      <View style={styles.movieRuntimeCard}>
        <Text style={styles.movieTitle}>{movieTitle}</Text>
        <View style={styles.movieGenreContainer}>
          <Text style={styles.movieGenre}>{convertRuntime(runTime)}</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.movieGenre}>
            {genreText.length > 30 ? genreText.slice(0, 32) + "..." : genreText}
          </Text>
        </View>
      </View>
      <Suspense fallback={<ActivityIndicator size="large" color={Colors.primary} />}>
        <TrailerVideo movieTrailerId={movieTrailerId || ""} />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: width - 20,
    zIndex: 1,
    bottom: 10,
    left: 10,
    right: 10,
    maxWidth: width - 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  movieTitle: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  movieGenre: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "normal",
    marginTop: 5,
  },
  movieRuntimeCard: {
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
    paddingTop: 5,
  },
  separator: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    height: 20,
  },
  movieGenreContainer: {
    flexDirection: "row",
    gap: 5,
  },
});
