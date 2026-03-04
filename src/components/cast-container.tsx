import { CastDisplayCard, Loading, SectionHeading } from "@/src/components";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getMovieCredits } from "../api/movies.service";
import { useFetch } from "../hooks/useFetch";
import { MovieCastProps } from "../types";
const CastContainer = ({
  id,
  typeOfList,
}: {
  id: number;
  typeOfList: string;
}) => {
  const { data, loading, error } = useFetch({
    fetchFunction: () => getMovieCredits(id, typeOfList),
  });

  if (loading) return <Loading />;

  if (error) return <Text>{error}</Text>;

  if (!data) return null;

  return (
    <View style={styles.castContainer}>
      <SectionHeading title="Cast" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.cast?.map((cast: MovieCastProps, index: number) => (
          <CastDisplayCard key={index} cast={cast} />
        ))}
      </ScrollView>
    </View>
  );
};

export default CastContainer;

const styles = StyleSheet.create({
  castContainer: {},
});
