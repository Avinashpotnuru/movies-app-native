import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../theme";
import { MoviesCardType } from "../types";
import MoviesCard from "./movies-card";
import MoviesListWrapper from "./movies-list-wrapper";
import SectionHeading from "./section-heading";

interface MoviesListContainerProps {
  moviePosters: MoviesCardType[];
  sectionHeading: string;
  typeOfList?: string;
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
}

const SKELETON_ITEMS = 6;
const SKELETON_WIDTH = 108;
const SKELETON_HEIGHT = 162;

const ListCard = memo(function ListCard({
  item,
  typeOfList,
}: {
  item: MoviesCardType;
  typeOfList?: string;
}) {
  const moviesDetails = useMemo(
    () => ({
      ...item,
      title: item.title || (item.name as string),
      enableTitle: true,
      typeOfList: typeOfList || item.typeOfList,
    }),
    [item, typeOfList],
  );

  return <MoviesCard moviesDetails={moviesDetails} />;
});

export default React.memo(function MoviesListContainer({
  moviePosters,
  sectionHeading,
  typeOfList,
  isLoading,
  error,
  onRetry,
}: MoviesListContainerProps) {
  const renderItem = useCallback(
    ({ item }: { item: MoviesCardType }) => (
      <ListCard item={item} typeOfList={typeOfList} />
    ),
    [typeOfList],
  );

  const skeletonRow = useCallback(
    () => (
      <View style={styles.skeletonRow}>
        {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
          <View key={index} style={styles.skeletonCard}>
            <View style={styles.skeletonBlock} />
            <View style={styles.skeletonText} />
          </View>
        ))}
      </View>
    ),
    [],
  );

  const heading = sectionHeading ? (
    <SectionHeading style={styles.heading} title={sectionHeading} />
  ) : null;

  if (isLoading && !moviePosters.length) {
    return (
      <View>
        {heading}
        {skeletonRow()}
      </View>
    );
  }

  if (error && !moviePosters.length) {
    return (
      <View>
        {heading}
        <TouchableOpacity
          style={styles.retry}
          onPress={onRetry}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Retry loading ${sectionHeading}`}
        >
          <Text style={styles.retryText}>
            {"Couldn't load " + sectionHeading.toLowerCase() + ". Tap to retry."}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!moviePosters.length) return null;

  return (
    <View>
      {heading}
      <MoviesListWrapper data={moviePosters} renderItem={renderItem} />
    </View>
  );
});

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    marginBottom: 10,
  },
  skeletonRow: {
    flexDirection: "row",
    overflow: "hidden",
  },
  skeletonCard: {
    margin: 8,
    width: SKELETON_WIDTH,
  },
  skeletonBlock: {
    width: SKELETON_WIDTH,
    height: SKELETON_HEIGHT,
    borderRadius: 14,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  skeletonText: {
    marginTop: 8,
    marginHorizontal: 2,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.card,
    width: "80%",
  },
  retry: {
    marginHorizontal: 8,
    marginVertical: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  retryText: {
    color: Colors.secondaryText,
    fontSize: 13,
    fontWeight: "600",
  },
});