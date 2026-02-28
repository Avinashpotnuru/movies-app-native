import { MoviesCard, SectionHeading } from "@/src/components";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { MoviesCardType } from "../types";

interface MoviesListContainerProps {
  moviePosters: MoviesCardType[];
  sectionHeading: string;
}
export default React.memo(function MoviesListContainer({
  moviePosters,
  sectionHeading,
}: MoviesListContainerProps) {
  return (
    <View>
      {sectionHeading && (
        <SectionHeading style={styles.heading} title={sectionHeading} />
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {moviePosters.map((item: MoviesCardType) => (
          <MoviesCard
            key={item.id}
            moviesDetails={{ ...item, enableTitle: true }}
          />
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    marginBottom: 10,
  },
});
