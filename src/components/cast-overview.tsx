import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getPersonDetails } from "../api/movies.service";
import { useFetch } from "../hooks/useFetch";
import { Colors } from "../theme";

const CastOverView = ({ castId }: { castId: number }) => {
  const { data } = useFetch({
    fetchFunction: () => getPersonDetails(castId),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {data?.name}</Text>
    </View>
  );
};

export default CastOverView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
