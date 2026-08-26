import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { MoviesCardType } from "@/src/types";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import RemoteImage from "./remote-image";
import { getImage } from "../utils/getImage";
import { Colors } from "../theme";

interface MoviesCarouselProps {
  moviePosters: MoviesCardType[];
}

const resolveTitle = (item: MoviesCardType) =>
  item?.title || item?.name || item?.original_title || item?.original_name || "";

const MoviesCarousel = ({ moviePosters }: MoviesCarouselProps) => {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavigation = useCallback((id?: number) => {
    if (!id) return;
    router.push({
      pathname: "/movie-details/[id]",
      params: { id, typeOfList: "movie" },
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: MoviesCardType }) => {
      const title = resolveTitle(item);
      const year = item?.release_date ? item.release_date.slice(0, 4) : "";
      const rating = item?.vote_average
        ? item.vote_average.toFixed(1)
        : null;

      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => handleNavigation(item?.id)}
          style={styles.item}
        >
          <RemoteImage
            source={
              item?.poster_path
                ? { uri: getImage(item.poster_path, "w500") }
                : require("@/assets/images/placeholder.jpg")
            }
            placeholder={require("@/assets/images/placeholder.jpg")}
            contentFit="cover"
            style={styles.poster}
          />

          <LinearGradient
            colors={["rgba(11,15,20,0)", "rgba(11,15,20,0.85)"]}
            locations={[0.45, 1]}
            style={styles.scrim}
          />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>TRENDING</Text>
          </View>

          <View style={styles.meta}>
            <Text style={styles.caption} numberOfLines={1}>
              {title}
            </Text>
            <View style={styles.row}>
              {rating ? (
                <View style={styles.rating}>
                  <Ionicons name="star" size={12} color={Colors.primary} />
                  <Text style={styles.ratingText}>{rating}</Text>
                </View>
              ) : null}
              {year ? <Text style={styles.year}>{year}</Text> : null}
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [handleNavigation],
  );

  const itemWidth = width - 32;

  return (
    <View style={styles.container}>
      {!moviePosters?.length ? (
        <View style={[styles.item, styles.empty]}>
          <RemoteImage
            source={require("@/assets/images/placeholder.jpg")}
            contentFit="cover"
            style={styles.poster}
          />
        </View>
      ) : (
        <Carousel
          loop
          width={itemWidth}
          height={240}
          autoPlay={!!moviePosters?.length}
          autoPlayInterval={4000}
          data={moviePosters}
          pagingEnabled
          scrollAnimationDuration={1200}
          onSnapToItem={(index) => setActiveIndex(index)}
          renderItem={renderItem}
          style={styles.carousel}
        />
      )}

      {!!moviePosters?.length ? (
        <View style={styles.dots}>
          {moviePosters.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex % moviePosters.length && styles.dotActive,
              ]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  carousel: {
    alignItems: "center",
  },
  item: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  empty: {
    width: "100%",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  scrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 130,
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(215,237,47,0.16)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  meta: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
  },
  caption: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  year: {
    color: Colors.secondaryText,
    fontSize: 13,
    fontWeight: "600",
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 14,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  dotActive: {
    width: 20,
    backgroundColor: Colors.primary,
  },
});

export default MoviesCarousel;
