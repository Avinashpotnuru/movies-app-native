import { MoviesCardType } from "@/src/types";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

interface MoviesCarouselProps {
  moviePosters: MoviesCardType[];
}

const MoviesCarousel = ({ moviePosters }: MoviesCarouselProps) => {
  const handleNavigation = (id: number | null) => {
    if (!id) return;
    router.push({
      pathname: "/movie-details/[id]",
      params: { id, typeOfList: "movie" },
    });
  };

  return (
    <View style={styles.container}>
      <Carousel
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 50,
          parallaxAdjacentItemScale: 0.6,
        }}
        loop
        width={250}
        height={380}
        autoPlay
        data={moviePosters}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => handleNavigation(item?.id || null)}
            >
              <Image
                source={{
                  uri: item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : require("@/assets/images/placeholder.jpg"),
                }}
                style={{
                  width: 250,
                  height: 380,
                  marginRight: 15,
                  borderRadius: 12,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MoviesCarousel;
