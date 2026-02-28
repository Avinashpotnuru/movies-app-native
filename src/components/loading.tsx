import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme";

const Loading = () => (
  <View style={styles.container}>
    <Text>Loading...</Text>
  </View>
);

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
