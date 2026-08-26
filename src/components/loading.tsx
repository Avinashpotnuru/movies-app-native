import React, { memo, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Colors } from "../theme";

const SIZE = 76;
const STROKE = 6;

const Loading = () => {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="summary"
      accessibilityLabel="Loading"
    >
      <View style={styles.spinner}>
        <Animated.View
          style={[styles.ring, { transform: [{ rotate }] }]}
        />
        <View style={styles.triangle} />
      </View>
    </View>
  );
};

export default memo(Loading);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  spinner: {
    width: SIZE,
    height: SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  ring: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: STROKE,
    borderColor: "rgba(255,255,255,0.12)",
    borderTopColor: Colors.primary,
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: "transparent",
    borderBottomWidth: 10,
    borderBottomColor: "transparent",
    borderLeftWidth: 16,
    borderLeftColor: Colors.primary,
  },
});
