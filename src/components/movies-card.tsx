import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { memo, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme";
import { MoviesCardType } from "../types";
import { getImage } from "../utils/getImage";
import { prefetchMovieDetail } from "../hooks/useGetMovieDetail";
import RemoteImage from "./remote-image";

const POSTER_WIDTH = 108;
const POSTER_HEIGHT = 162;

const areMoviesDetailsEqual = (
  prev?: MoviesCardType | null,
  next?: MoviesCardType | null,
) => {
  if (prev === next) return true;
  if (!prev || !next) return false;
  return (
    prev.id === next.id &&
    prev.title === next.title &&
    prev.name === next.name &&
    prev.original_title === next.original_title &&
    prev.original_name === next.original_name &&
    prev.poster_path === next.poster_path &&
    prev.typeOfList === next.typeOfList &&
    prev.vote_average === next.vote_average &&
    prev.release_date === next.release_date &&
    prev.enableTitle === next.enableTitle
  );
};

const MoviesCard = ({
  moviesDetails,
}: {
  moviesDetails: MoviesCardType | null;
}) => {
  const queryClient = useQueryClient();

  const handleNavigation = (id: number | null) => {
    if (!id) return;
    const listType = moviesDetails?.typeOfList === "movie" ? "movie" : "tv";
    prefetchMovieDetail(queryClient, id, listType);
    router.push({
      pathname: "/media-details/[id]",
      params: { id, typeOfList: listType },
    });
  };

  const imageSource = useMemo(
    () =>
      moviesDetails?.poster_path
        ? { uri: getImage(moviesDetails.poster_path, "w342") }
        : require("@/assets/images/placeholder.jpg"),
    [moviesDetails?.poster_path],
  );

  const displayTitle = useMemo(() => {
    const raw =
      moviesDetails?.title ||
      moviesDetails?.name ||
      moviesDetails?.original_title ||
      moviesDetails?.original_name ||
      "";
    if (!raw) return "";
    return raw.length > 20 ? `${raw.slice(0, 20).trimEnd()}…` : raw;
  }, [
    moviesDetails?.title,
    moviesDetails?.name,
    moviesDetails?.original_title,
    moviesDetails?.original_name,
  ]);

  const rating = useMemo(() => {
    const value = moviesDetails?.vote_average;
    if (typeof value === "number" && value > 0) {
      return value.toFixed(1);
    }
    return null;
  }, [moviesDetails?.vote_average]);

  const isDisabled = !moviesDetails?.id;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={() => handleNavigation(moviesDetails?.id ?? null)}
      accessibilityRole="imagebutton"
      accessibilityLabel={displayTitle || "Movie poster"}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.posterWrap}>
        <RemoteImage
          source={imageSource}
          placeholder={require("@/assets/images/placeholder.jpg")}
          contentFit="cover"
          recyclingKey={moviesDetails?.id?.toString()}
          style={styles.poster}
        />

        {rating ? (
          <View
            style={styles.ratingBadge}
            accessibilityLabel={`Rating ${rating} out of 10`}
          >
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        ) : null}
      </View>

      {displayTitle ? (
        <Text style={styles.title} numberOfLines={1}>
          {displayTitle}
        </Text>
      ) : null}
    </Pressable>
  );
};

export default memo(MoviesCard, (prev, next) =>
  areMoviesDetailsEqual(prev.moviesDetails, next.moviesDetails),
);

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: POSTER_WIDTH,
  },
  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  posterWrap: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  ratingBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    color: Colors.background,
    fontSize: 11,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  title: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 6,
    paddingHorizontal: 2,
  },
});
