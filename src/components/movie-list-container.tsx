import React from "react";
import { StyleSheet, View } from "react-native";
import { MoviesCardType } from "../types";
import MoviesCard from "./movies-card";
import MoviesListWrapper from "./movies-list-wrapper";
import SectionHeading from "./section-heading";

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
  if (!moviePosters.length) return null;

  return (
    <View>
      {sectionHeading && (
        <SectionHeading style={styles.heading} title={sectionHeading} />
      )}

      <MoviesListWrapper
        data={moviePosters}
        renderItem={({ item }) => {
          const {
            title,
            name,
            typeOfList: itemTypeOfList,
            ...rest
          } = item as MoviesCardType;
          return (
            <MoviesCard
              moviesDetails={{
                ...rest,
                title: title || (name as string),
                enableTitle: true,
                typeOfList: typeOfList || itemTypeOfList,
              }}
            />
          );
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    marginBottom: 10,
  },
});
