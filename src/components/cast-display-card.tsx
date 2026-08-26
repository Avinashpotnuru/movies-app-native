import { router } from "expo-router";
import React, { useMemo } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MovieCastProps } from "../types";
import { getImage } from "../utils/getImage";
import RemoteImage from "./remote-image";


const CastDisplayCard = ({ cast }: { cast: MovieCastProps }) => {
  const { name, profile_path, gender, id } = cast;

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
        <RemoteImage
          style={styles.image}
          source={imageUri ? { uri: imageUri } : placeHolderImage}
          placeholder={placeHolderImage}
          contentFit="cover"
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
