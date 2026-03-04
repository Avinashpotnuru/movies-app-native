import {
  BackdropImagesContainer,
  CastContainer,
  Loading,
  MovieOverview,
  MovieTitleCard,
  MoviesListContainer,
} from "@/src/components";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  getFavorites,
  getFavoritesTv,
  getMovieDetails,
  sendToFavorite,
} from "../api/movies.service";
import { useFetch } from "../hooks/useFetch";
import { Colors } from "../theme";
import { Movie, MoviesCardType } from "../types";

const { width, height } = Dimensions.get("window");

export default function MoviesDetailsContainer({
  id,
  typeOfList,
}: {
  id: number;
  typeOfList: string;
}) {
  console.log(typeOfList, "typeOfList");

  const { data, loading } = useFetch({
    fetchFunction: () => getMovieDetails(id, typeOfList),
  });
  console.log(data, "data");

  const { data: favorites, refetch: refetchFavorites } = useFetch({
    fetchFunction: () => getFavorites(),
  });

  const { data: favoritesTv, refetch: refetchFavoritesTv } = useFetch({
    fetchFunction: () => getFavoritesTv(),
  });

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!favorites?.results || !favoritesTv?.results || !data?.id) return;
    const filterData = typeOfList === "movie" ? favorites : favoritesTv;

    const exists = filterData.results.some(
      (movie: Movie) => movie.id === data.id,
    );

    setIsFavorite(exists);
  }, [favorites, favoritesTv, data, typeOfList]);

  // const handleFavorite = async () => {
  //   if (!data?.id) return;

  //   const newState = !isFavorite;
  //   setIsFavorite(newState);

  //   try {
  //     if (typeOfList === "movie") {
  //       await sendToFavorite(data.id, newState, "movie");
  //       if (isFavorite === true) {
  //         Alert.alert(
  //           `${data.title} added to favorites `,
  //           "see favorites screen",
  //           [
  //             {
  //               text: "Go to favorites",
  //               onPress: () => router.push("/favorites"),
  //             },
  //           ],
  //         );
  //       } else {
  //         Alert.alert(
  //           `${data.title} removed from favorites got to favorites screen`,
  //         );
  //       }

  //       refetchFavorites();
  //     } else {
  //       await sendToFavorite(data.id, newState, "tv");
  //       if (isFavorite === true) {
  //         Alert.alert(
  //           `${data.name} added to favorites `,
  //           "see favorites screen",
  //           [
  //             {
  //               text: "Go to favorites",
  //               onPress: () => router.push("/favorites"),
  //             },
  //           ],
  //         );
  //       } else {
  //         Alert.alert(
  //           `${data.name} removed from favorites got to favorites screen`,
  //         );
  //       }

  //       refetchFavoritesTv();
  //     }
  //   } catch (error) {
  //     console.log("Favorite error:", error);

  //     setIsFavorite(!newState);
  //   }
  // };

  const handleFavorite = async () => {
    if (!data?.id) return;

    const newState = !isFavorite;
    setIsFavorite(newState);

    try {
      if (typeOfList === "movie") {
        await sendToFavorite(data.id, newState, "movie");

        if (newState) {
          Alert.alert(
            `${data.title} added to favorites`,
            "See favorites screen",
            [
              {
                text: "Go to favorites",
                onPress: () => router.push("/favorites"),
              },
            ],
          );
        } else {
          Alert.alert(`${data.title} removed from favorites`);
        }

        refetchFavorites();
      } else {
        await sendToFavorite(data.id, newState, "tv");

        if (newState) {
          Alert.alert(
            `${data.name} added to favorites`,
            "See favorites screen",
            [
              {
                text: "Go to favorites",
                onPress: () => router.push("/favorites"),
              },
            ],
          );
        } else {
          Alert.alert(`${data.name} removed from favorites`);
        }

        refetchFavoritesTv();
      }
    } catch (error) {
      console.log("Favorite error:", error);
      setIsFavorite(!newState);
    }
  };
  
  const similarMoviesPosters: MoviesCardType[] = useMemo(() => {
    return (
      data?.similar?.results?.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      })) || []
    );
  }, [data]);

  const movieTrailerId = useMemo(() => {
    return data?.videos?.results?.[0]?.key;
  }, [data]);

  if (loading) return <Loading />;

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

          <CastContainer id={id} typeOfList={typeOfList} />

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
