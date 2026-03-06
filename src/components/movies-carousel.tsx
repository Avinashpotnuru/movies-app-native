import { MoviesCardType } from "@/src/types";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

interface MoviesCarouselProps {
  moviePosters: MoviesCardType[];
}

const MoviesCarousel = ({ moviePosters }: MoviesCarouselProps) => {
  const handleNavigation = useCallback((id?: number) => {
    if (!id) return;
    router.push({
      pathname: "/movie-details/[id]",
      params: { id, typeOfList: "movie" },
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: MoviesCardType }) => (
      <TouchableOpacity onPress={() => handleNavigation(item?.id)}>
        <Image
          source={{
            uri: item?.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : undefined,
          }}
          defaultSource={require("@/assets/images/placeholder.jpg")}
          onError={() => {}}
          style={styles.poster}
        />
      </TouchableOpacity>
    ),
    [handleNavigation],
  );

  return (
    <View style={styles.container}>
      {!moviePosters?.length ? (
        <Image
          source={require("@/assets/images/placeholder.jpg")}
          style={styles.emptyPoster}
        />
      ) : (
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
          autoPlay={!!moviePosters?.length}
          data={moviePosters}
          pagingEnabled
          scrollAnimationDuration={1000}
          onSnapToItem={() => {}}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  poster: {
    width: 250,
    height: 380,
    marginRight: 15,
    borderRadius: 12,
  },
  emptyPoster: {
    width: 250,
    height: 380,
    borderRadius: 12,
  },
});

export default MoviesCarousel;
