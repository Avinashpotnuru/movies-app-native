import React, { memo } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../theme";

const SectionHeading = ({
  title = "section heading",
  style,
  textStyle,
}: {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) => {
  return (
    <View accessible accessibilityRole="header" style={style}>
      <Text maxFontSizeMultiplier={2} style={[styles.text, textStyle]}>
        {String(title).trim()}
      </Text>
    </View>
  );
};

export default memo(SectionHeading);

const styles = StyleSheet.create({
  text: {
    color: Colors.sectionHeading,
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "left",
  },
});
