import {
  BackdropImagesContainer,
  CastContainer,
  Loading,
  MovieOverview,
  MovieTitleCard,
  MoviesListContainer,
  RecommendationSection,
} from "@/src/components";
import {
  useAddFavorite,
  useGetFavoriteMovies,
  useGetFavoriteTvShows,
  useGetMovieDetail,
} from "@/src/hooks";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "../theme";
import { Movie, MoviesCardType, RecommendationCardType } from "../types";
import { getImage } from "../utils/getImage";

const { width, height } = Dimensions.get("window");

export default function MoviesDetailsContainer({
  id,
  typeOfList,
}: {
  id: number;
  typeOfList: string;
}) {
  const { data, isLoading } = useGetMovieDetail(id, typeOfList);

  const { mutateAsync } = useAddFavorite();

  const { data: favorites } = useGetFavoriteMovies();
  const { data: favoritesTv } = useGetFavoriteTvShows();

  const isFavorite = useMemo(() => {
    const list =
      typeOfList === "movie" ? favorites?.results : favoritesTv?.results;

    if (!list) return false;

    return list.some((item: Movie) => item.id === id);
  }, [favorites, favoritesTv, id, typeOfList]);

 const handleFavorite = async () => {
   try {
     await mutateAsync({
       media_id: id,
       media_type: typeOfList,
       favorite: !isFavorite,
     });

     const title = data?.title || data?.name;

     const message = !isFavorite
       ? `${title} added to favorites`
       : `${title} removed from favorites`;

     Alert.alert(message, "Do you want to see your favorites?", [
       {
         text: "Go to favorites",
         onPress: () => router.replace("/favorites"),
       },
       { text: "OK", style: "cancel" },
     ]);
   } catch (error) {
     Alert.alert("Error", "Something went wrong while updating favorites.");
     console.log("Favorite error:", error);
   }
 };

  const similarMoviesPosters: MoviesCardType[] = useMemo(() => {
    return (
      data?.similar?.results?.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
      })) || []
    );
  }, [data]);

  const recommendationMoviesPosters: RecommendationCardType[] = useMemo(() => {
    return (
      data?.recommendations?.results?.map((movie: RecommendationCardType) => ({
        id: movie.id,
        original_title: movie?.original_title || movie?.original_name,
        backdrop_path: movie.backdrop_path,
        media_type: movie.media_type,
      })) || []
    );
  }, [data]);

  const movieTrailerId = useMemo(() => {
    return data?.videos?.results?.[0]?.key;
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Entypo
          style={styles.backIcon}
          name="home"
          size={24}
          color={Colors.primary}
          onPress={() => router.push("/")}
        />

        <TouchableOpacity style={styles.favoriteIcon} onPress={handleFavorite}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={26}
            color={Colors.primary}
          />
        </TouchableOpacity>

        <View style={styles.backdropImageContainer}>
          <MovieTitleCard
            movieTitle={data?.title || data?.name || ""}
            movieGenre={data?.genres || []}
            runTime={data?.runtime || 0}
            movieTrailerId={movieTrailerId || ""}
          />

          <Image
            style={styles.backdropImage}
            source={
              data?.backdrop_path
                ? { uri: getImage(data.backdrop_path, "w780") }
                : require("@/assets/images/placeholder.jpg")
            }
          />

          <View style={styles.blurContainer} />
        </View>

        <View style={styles.contentContainer}>
          <MovieOverview content={data?.overview || ""} />

          <CastContainer id={id} typeOfList={typeOfList} />

          <RecommendationSection
            sectionHeading="Recommendations"
            moviePosters={recommendationMoviesPosters}
            typeOfList={typeOfList}
          />

          <MoviesListContainer
            sectionHeading="Similar movies"
            moviePosters={similarMoviesPosters}
            typeOfList={typeOfList}
          />

          <BackdropImagesContainer data={data?.images?.backdrops || []} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backdropImageContainer: {
    position: "relative",
    width: width,
    height: height / 2,
  },
  backdropImage: {
    width: width,
    height: height / 2,
    resizeMode: "cover",
  },
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height / 2,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backIcon: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
  },
  favoriteIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
  contentContainer: {
    padding: 16,
  },
});
