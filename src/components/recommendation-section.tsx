import React from "react";

import {
  MoviesListWrapper,
  RecommendationCard,
  SectionHeading,
} from "@/src/components";
import { StyleSheet, View } from "react-native";
import { RecommendationCardType } from "../types";
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


