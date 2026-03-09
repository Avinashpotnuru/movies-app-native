import React from "react";
import { View } from "react-native";
import { RecommendationCardType } from "../types";
import SectionHeading from "./section-heading";
import MoviesListWrapper from "./movies-list-wrapper";
import RecommendationCard from "./recommendation-card";
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
    <View>
      <SectionHeading title={sectionHeading} />
      <MoviesListWrapper>
        {moviePosters.map((item: RecommendationCardType, index: number) => (
          <RecommendationCard key={index} moviesDetails={item} />
        ))}
      </MoviesListWrapper>
    </View>
  );
};

export default RecommendationSection;
