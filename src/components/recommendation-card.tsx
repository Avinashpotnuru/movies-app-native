import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../theme";
import { RecommendationCardType } from "../types";
import { getImage } from "../utils/getImage";

const { width } = Dimensions.get("window");

const RecommendationCard = ({
  moviesDetails,
}: {
  moviesDetails: RecommendationCardType;
}) => {
  const imageSource = moviesDetails?.backdrop_path
    ? {
        uri: getImage(moviesDetails?.backdrop_path, "w780"),
      }
    : require("@/assets/images/placeholder.jpg");

  const handleNavigation = (id: number | null) => {
    if (!id) return;

    if (moviesDetails?.media_type === "movie") {
      router.push({
        pathname: "/movie-details/[id]",
        params: { id, typeOfList: "movie" },
      });
    } else {
      router.push({
        pathname: "/movie-details/[id]",
        params: { id, typeOfList: "tv" },
      });
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { margin: 10 }]}
      onPress={() => handleNavigation(moviesDetails?.id || null)}
    >
      <Image style={styles.image} source={imageSource} />
      <Text style={styles.title}>
        {moviesDetails?.original_title || moviesDetails?.original_name}
      </Text>
    </TouchableOpacity>
  );
};

export default RecommendationCard;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginHorizontal: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 13,
    color: Colors.sectionHeading,
    textAlign: "left",
  },
  image: {
    width: width-90,
    height: 170,
    overflow: "hidden",
    resizeMode: "cover",
  },
});
