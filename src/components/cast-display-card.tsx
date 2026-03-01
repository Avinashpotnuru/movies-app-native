import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MovieCastProps } from "../types";

const CastDisplayCard = ({ cast }: { cast: MovieCastProps }) => {
  const { name, profile_path, gender, id } = cast;

  const placeHolderImage =
    gender === 1
      ? require(`@/assets/images/female.jpg`)
      : require(`@/assets/images/male.jpg`);

  const handleNavigation = (id: number) => {
    if (!id) return;
    router.push({
      pathname: "/cast-details/[id]",
      params: { id: String(id) },
    });
  };
  return (
    <TouchableOpacity onPress={() => handleNavigation(id)}>
      <View style={styles.castContainer}>
        {profile_path ? (
          <Image
            style={styles.image}
            source={{ uri: `https://image.tmdb.org/t/p/w500${profile_path}` }}
          />
        ) : (
          <Image style={styles.image} source={placeHolderImage} />
        )}

        <Text style={styles.name}>{name || ""}</Text>
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
    width: 120,
    height: 120,
    overflow: "hidden",
    borderRadius: 60,
  },
});
