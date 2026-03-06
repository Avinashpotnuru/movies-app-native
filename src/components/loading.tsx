import React, { memo, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { Colors } from "../theme";

const LoadingImage = require("@/assets/images/loading.gif");

const Loading = () => {
  const [failed, setFailed] = useState(false);
  const hasImage = !!LoadingImage && !failed;

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel={`Loading container`}
      accessibilityRole="summary"
    >
      {hasImage ? (
        <Image
          style={styles.image}
          source={LoadingImage}
          resizeMode="contain"
          accessible
          accessibilityLabel={`Loading`}
          accessibilityRole="image"
          onError={() => setFailed(true)}
        />
      ) : (
        <ActivityIndicator color={Colors.primary} size="large" />
      )}
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
  image: {
    width: 200,
    height: 200,
  },
});
