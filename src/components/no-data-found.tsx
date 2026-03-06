import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme";

const NoDataFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NoDataFound</Text>
    </View>
  );
};

export default NoDataFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
});
