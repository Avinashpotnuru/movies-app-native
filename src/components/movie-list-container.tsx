import React from "react";
import { StyleSheet, View } from "react-native";
import { MoviesCardType } from "../types";
import SectionHeading from "./section-heading";
import MoviesListWrapper from "./movies-list-wrapper";
import NoDataFound from "./no-data-found";
import MoviesCard from "./movies-card";

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

      <MoviesListWrapper>
        {moviePosters.length === 0 ? (
          <NoDataFound />
        ) : (
          moviePosters.map((item: MoviesCardType, index: number) => (
            <MoviesCard
              key={index}
              moviesDetails={{
                ...item,
                title: item.title || (item.name as string),
                enableTitle: true,
                typeOfList: typeOfList || item.typeOfList,
              }}
            />
          ))
        )}
        {}
      </MoviesListWrapper>
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
