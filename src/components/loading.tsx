import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Colors } from "../theme";

const LoadingImage = require("@/assets/images/loading.gif");

const Loading = () => (
  <View style={styles.container}>
    <Image style={styles.image} source={LoadingImage} />
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
  image: {
    width: 200,
    height: 200,
  },
});
