import { useGetMovieCredits } from "@/src/hooks";
import React, { memo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../theme";
import { MovieCastProps } from "../types";
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

  if (isLoading)
    return <ActivityIndicator size={"large"} color={Colors.primary} />;

  if (error)
    return (
      <Text style={styles.error}>
        {" "}
        {error instanceof Error ? error.message : String(error)}
      </Text>
    );

  if (!data) return null;

  return (
    <View>
      <SectionHeading title="Cast" />
      {Array.isArray(data?.cast) && data.cast.length === 0 ? (
        <Text style={styles.noCast}>No cast available</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.cast?.map((cast: MovieCastProps, index: number) => (
            <CastDisplayCard key={index} cast={cast} />
          ))}
        </ScrollView>
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
