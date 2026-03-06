import { router } from "expo-router";
import React, { useMemo } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MovieCastProps } from "../types";
import { getImage } from "../utils/getImage";

const CastDisplayCard = ({ cast }: { cast: MovieCastProps }) => {
  const { name, profile_path, gender, id } = cast;
  const [hasError, setHasError] = React.useState(false);

  const placeHolderImage = useMemo(
    () =>
      gender === 1
        ? require(`@/assets/images/female.jpg`)
        : require(`@/assets/images/male.jpg`),
    [gender],
  );

  const imageUri = React.useMemo(
    () => (profile_path ? getImage(profile_path, "w342") : null),
    [profile_path],
  );

  const imageSource =
    !hasError && imageUri ? { uri: imageUri } : placeHolderImage;

  const handleNavigation = () => {
    if (!id) return;
    router.push({
      pathname: "/cast-details/[id]",
      params: { id: String(id) },
    });
  };

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      accessibilityRole="button"
      accessibilityLabel={`View details for ${name || "cast member"}`}
    >
      <View style={styles.castContainer}>
        <Image
          style={styles.image}
          source={imageSource}
          onError={() => setHasError(true)}
          accessibilityLabel={name || "Cast member"}
        />
        <Text style={styles.name} accessibilityLabel={name || "Cast member"}>
          {name || ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CastDisplayCard;

const styles = StyleSheet.create({
  castContainer: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  name: {
    fontSize: 12,
    color: "white",
  },
  image: {
    width: 100,
    height: 100,
    overflow: "hidden",
    borderRadius: 60,
  },
});
