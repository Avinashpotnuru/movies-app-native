import { router } from "expo-router";
import React, { memo, useMemo } from "react";
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
  const imageSource = useMemo(() => {
    return moviesDetails?.backdrop_path
      ? {
          uri: getImage(moviesDetails?.backdrop_path, "w780"),
        }
      : require("@/assets/images/placeholder.jpg");
  }, [moviesDetails?.backdrop_path]);

  const handleNavigation = React.useCallback(
    (id: number | null) => {
      if (!id) return;

      const params =
        moviesDetails?.media_type === "movie"
          ? { id, typeOfList: "movie" }
          : { id, typeOfList: "tv" };
      router.replace({ pathname: "/movie-details/[id]", params });
    },
    [moviesDetails],
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigation(moviesDetails?.id || null)}
    >
      <Image style={styles.image} source={imageSource} />
      <Text style={styles.title}>
        {moviesDetails?.original_title || moviesDetails?.original_name}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(RecommendationCard);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginHorizontal: 8,
    margin: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 13,
    color: Colors.sectionHeading,
    textAlign: "left",
  },
  image: {
    width: width - 90,
    height: 170,
    overflow: "hidden",
    resizeMode: "cover",
  },
});
