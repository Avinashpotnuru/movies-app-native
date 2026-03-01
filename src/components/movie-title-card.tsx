import React from "react";
import { StyleSheet, Text, View ,Dimensions} from "react-native";
import { Colors } from "../theme";
import { MovieTitleCardProps } from "../types";

const { width} = Dimensions.get("window");
export default function MovieTitleCard({
  movieTitle,
  movieGenre,
  runTime,
}: MovieTitleCardProps) {
  const convertRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.movieTitle}>{movieTitle}</Text>
      <View style={styles.movieRuntimeCard}>
        <Text style={styles.movieGenre}>{convertRuntime(runTime)}</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.movieGenre}>
          {movieGenre?.map((genre) => genre.name).join("/")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: width - 20,
    zIndex: 1,
    bottom: 10,
    left: 10,
    right: 0,
    textAlign: "left",
  },
  movieTitle: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  movieGenre: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "normal",
    marginTop: 5,
  },
  movieRuntimeCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    paddingTop: 5,
  },
  separator: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    height: 20,
  },
});
