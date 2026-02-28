import { MoviesCard } from "@/src/components";
import { MoviesCardType } from "@/src/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

interface MoviesCarouselProps {
  moviePosters: MoviesCardType[];
}

const MoviesCarousel = ({ moviePosters }: MoviesCarouselProps) => {
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
            <MoviesCard
              moviesDetails={{
                ...item,
                enableTitle: true,
                height: 380,
                width: 250,
              }}
            />
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
