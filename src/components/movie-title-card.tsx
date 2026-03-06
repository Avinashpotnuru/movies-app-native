import React, { lazy, memo, Suspense } from "react";
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

function MovieTitleCard({
  movieTitle,
  movieGenre,
  runTime,
  movieTrailerId,
}: MovieTitleCardProps) {
  const convertRuntime = React.useCallback((runtime: number) => {
    if (!Number.isFinite(runtime)) return "-";
    const safe = Math.max(0, Math.floor(runtime));
    const hours = Math.floor(safe / 60);
    const minutes = safe % 60;
    return `${hours}h ${minutes}m`;
  }, []);
  const genreText = React.useMemo(
    () =>
      movieGenre
        ?.map((g) => g?.name)
        .filter(Boolean)
        .join("/") || "N/A",
    [movieGenre],
  );

  return (
    <View style={styles.container}>
      <View style={styles.movieRuntimeCard}>
        <Text style={styles.movieTitle}>{movieTitle}</Text>
        <View style={styles.movieGenreContainer}>
          <Text style={styles.movieGenre}>{convertRuntime(runTime)}</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.movieGenre}>
            {genreText && genreText.length > 30
              ? `${genreText.slice(0, 27)}...`
              : genreText || ""}
          </Text>
        </View>
      </View>
      <View style={styles.trailerCard}>
        {!!movieTrailerId && (
          <Suspense
            fallback={<ActivityIndicator size="large" color={Colors.primary} />}
          >
            <TrailerVideo movieTrailerId={movieTrailerId} />
          </Suspense>
        )}
      </View>
    </View>
  );
}

export default memo(MovieTitleCard);

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
    width: "85%",
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
  trailerCard: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
});
