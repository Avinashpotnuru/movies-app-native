import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme";

const SectionHeading = ({
  title = "section heading",
  style,
}: {
  title: string;
  style?: any;
}) => {
  return (
    <View style={[style]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default SectionHeading;

const styles = StyleSheet.create({
  text: {
    color: Colors.sectionHeading,
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    textAlign: "left",
  },
});
