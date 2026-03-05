import { MoviesCard, SectionHeading } from "@/src/components";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { MoviesCardType } from "../types";

interface MoviesListContainerProps {
  moviePosters: MoviesCardType[];
  sectionHeading: string;
  typeOfList?: string;
}
export default React.memo(function MoviesListContainer({
  moviePosters,
  sectionHeading,
  typeOfList,
}: MoviesListContainerProps) {
  console.log(typeOfList, "typeOfList");
  if (!moviePosters.length) return null;
  return (
    <View>
      {sectionHeading && (
        <SectionHeading style={styles.heading} title={sectionHeading} />
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {moviePosters.map((item: MoviesCardType, index: number) => (
          <MoviesCard
            key={index}
            moviesDetails={{
              ...item,
              enableTitle: true,
              typeOfList: typeOfList || item.typeOfList,
            }}
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
  noMovies: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "red",
  },
});
