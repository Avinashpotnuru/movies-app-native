import { CastContainer, MovieOverview, MovieTitleCard } from "@/src/components";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getMovieDetails } from "../api/movies.service";
import { useFetch } from "../hooks/useFetch";
import { Colors } from "../theme";
const { width, height } = Dimensions.get("window");
export default function MoviesDetailsContainer({ id }: { id: number }) {
  const { data, loading } = useFetch({
    fetchFunction: () => getMovieDetails(id),
  });

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Entypo
          style={styles.backIcon}
          name="home"
          size={24}
          color={Colors.primary}
          onPress={() => router.back()}
        />
        <View style={styles.backdropImageContainer}>
          <MovieTitleCard
            movieTitle={data?.title || ""}
            movieGenre={data?.genres || []}
            runTime={data?.runtime || 0}
          />
          <Image
            style={styles.backdropImage}
            source={
              data?.backdrop_path
                ? {
                    uri: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
                  }
                : require("@/assets/images/placeholder.jpg")
            }
          />

          <View style={styles.blurContainer} />
        </View>
        <View style={styles.contentContainer}>
          <MovieOverview content={data?.overview || ""} />
          <CastContainer id={id} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  title: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    color: Colors.primary,
  },
  error: {
    color: Colors.error,
  },
  backdropImageContainer: {
    position: "relative",
    width: width,
    height: height / 2,
    borderRadius: 8,
  },
  backdropImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height / 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
  },
  contentContainer: {
    padding: 16,
  },
});
