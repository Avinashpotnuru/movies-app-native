import React, { memo, useMemo } from "react";
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
}: MoviesListContainerProps) {
  if (!moviePosters.length) return null;

  return (
    <View>
      {sectionHeading && (
        <SectionHeading style={styles.heading} title={sectionHeading} />
      )}

      <MoviesListWrapper
        data={moviePosters}
        renderItem={({ item }) => (
          <ListCard item={item} typeOfList={typeOfList} />
        )}
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
