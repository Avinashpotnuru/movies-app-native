import React from "react";
import { FlatList } from "react-native";
import { RecommendationCardType } from "../types";
import RecommendationCard from "./recommendation-card";
import SectionHeading from "./section-heading";
interface RecommendationProps {
  moviePosters: RecommendationCardType[];
  sectionHeading: string;
  typeOfList?: string;
}

const RecommendationSection = ({
  sectionHeading,
  moviePosters,
}: RecommendationProps) => {
  if (!moviePosters.length) return null;
  return (
    <>
      <SectionHeading title={sectionHeading} />
      <FlatList
        data={moviePosters}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <RecommendationCard moviesDetails={item} />}
      />
    </>
  );
};

export default RecommendationSection;
