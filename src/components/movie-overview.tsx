import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme";

const MovieOverview = ({ content }: { content: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Overview</Text>
      <Text style={styles.overview}>{content}</Text>
    </View>
  );
};

export default MovieOverview;

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    color: Colors.secondaryText,
    gap: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.secondaryText,
  },
  overview: {
    fontSize: 15,
    color: Colors.secondaryText,
  },
});
