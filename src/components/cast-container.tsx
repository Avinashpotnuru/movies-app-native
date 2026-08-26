import { useGetMovieCredits } from "@/src/hooks";
import React, { memo } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../theme";
import CastDisplayCard from "./cast-display-card";
import SectionHeading from "./section-heading";

const CastContainer = ({
  id,
  typeOfList,
}: {
  id: number;
  typeOfList: string;
}) => {
  const { data, isLoading, error } = useGetMovieCredits(id, typeOfList);

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  if (error) {
    return (
      <Text style={styles.error}>
        {error instanceof Error ? error.message : String(error)}
      </Text>
    );
  }

  if (!data) return null;

  const cast = Array.isArray(data.cast) ? data.cast : [];

  return (
    <View>
      <SectionHeading title="Cast" />

      {cast.length === 0 ? (
        <Text style={styles.noCast}>No cast available</Text>
      ) : (
        <FlatList
          data={cast}
          horizontal
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CastDisplayCard cast={item} />}
        />
      )}
    </View>
  );
};

export default memo(CastContainer);

const styles = StyleSheet.create({
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  noCast: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.primary,
  },
});
