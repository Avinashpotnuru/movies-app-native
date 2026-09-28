import React, { memo, useCallback } from "react";
import { FlatList } from "react-native";
import { RecommendationCardType } from "../types";
import RecommendationCard from "./recommendation-card";
import SectionHeading from "./section-heading";
interface RecommendationProps {
  moviePosters: RecommendationCardType[];
  sectionHeading: string;
  typeOfList?: string;
}

export default memo(function RecommendationSection({
  sectionHeading,
  moviePosters,
}: RecommendationProps) {
  const keyExtractor = useCallback(
    (item: RecommendationCardType, index: number) =>
      `${item?.media_type ?? "item"}-${item?.id ?? index}`,
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: RecommendationCardType }) => (
      <RecommendationCard moviesDetails={item} />
    ),
    [],
  );

  if (!moviePosters.length) return null;

  return (
    <>
      <SectionHeading title={sectionHeading} />
      <FlatList
        data={moviePosters}
        keyExtractor={keyExtractor}
        horizontal
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </>
  );
});