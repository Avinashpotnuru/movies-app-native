import {
  AppAlert,
  AlertAction,
  BackdropImagesContainer,
  CastContainer,
  ErrorState,
  Loading,
  MovieOverview,
  MovieTitleCard,
  MoviesListContainer,
  RecommendationSection,
  RemoteImage,
} from "@/src/components";
import {
  useAddFavorite,
  useAddWatchlist,
  useGetFavoriteMovies,
  useGetFavoriteTvShows,
  useGetMovieDetail,
  useGetWatchlistMovies,
  useGetWatchlistTvShows,
} from "@/src/hooks";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
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
  const { data, isLoading, error, refetch } = useGetMovieDetail(
    id,
    typeOfList,
  );
  const { mutateAsync } = useAddFavorite();
  const { data: favorites } = useGetFavoriteMovies();
  const { data: favoritesTv } = useGetFavoriteTvShows();

  const { mutateAsync: mutateWatchlist } = useAddWatchlist();
  const { data: watchlist } = useGetWatchlistMovies();
  const { data: watchlistTv } = useGetWatchlistTvShows();

  const isFavorite = useMemo(() => {
    const list =
      typeOfList === "movie"
        ? favorites?.pages.flatMap((page) => page.results)
        : favoritesTv?.pages.flatMap((page) => page.results);

    if (!list) return false;

    return list.some((item: Movie) => item.id === id);
  }, [favorites, favoritesTv, id, typeOfList]);

  const isWatchlist = useMemo(() => {
    const list =
      typeOfList === "movie"
        ? watchlist?.pages.flatMap((page) => page.results)
        : watchlistTv?.pages.flatMap((page) => page.results);

    if (!list) return false;

    return list.some((item: Movie) => item.id === id);
  }, [watchlist, watchlistTv, id, typeOfList]);

  const [alert, setAlert] = useState<{
    title: string;
    message: string;
    actions: AlertAction[];
  } | null>(null);

  const showAlert = (
    title: string,
    message: string,
    actions?: AlertAction[],
  ) => setAlert({ title, message, actions: actions ?? [{ text: "OK" }] });

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

      showAlert(message, "Do you want to see your favorites?", [
        {
          text: "Go to favorites",
          onPress: () => router.replace("/favorites"),
        },
        { text: "OK", style: "cancel" },
      ]);
    } catch (error) {
      showAlert("Error", "Something went wrong while updating favorites.");
      console.log("Favorite error:", error);
    }
  };

  const handleWatchlist = async () => {
    try {
      await mutateWatchlist({
        media_id: id,
        media_type: typeOfList,
        watchlist: !isWatchlist,
      });

      const title = data?.title || data?.name;

      const message = !isWatchlist
        ? `${title} added to wishlist`
        : `${title} removed from wishlist`;

      showAlert(message, "Do you want to see your wishlist?", [
        {
          text: "Go to wishlist",
          onPress: () => router.replace("/wishlist"),
        },
        { text: "OK", style: "cancel" },
      ]);
    } catch (error) {
      showAlert("Error", "Something went wrong while updating your wishlist.");
      console.log("Watchlist error:", error);
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

  if (error) return <ErrorState error={error} onRetry={() => refetch()} />;

  return (
    <>
      <View style={styles.container}>
        <FlatList
        data={[]}
        renderItem={() => null}
        keyExtractor={() => ""}
        ListHeaderComponent={
          <>
            <Entypo
              style={styles.backIcon}
              name="home"
              size={24}
              color={Colors.primary}
              onPress={() => router.push("/")}
            />

            <TouchableOpacity
              style={styles.favoriteIcon}
              onPress={handleFavorite}
            >
              <MaterialIcons
                name={isFavorite ? "favorite" : "favorite-border"}
                size={26}
                color={Colors.primary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.watchlistIcon}
              onPress={handleWatchlist}
            >
              <Ionicons
                name={isWatchlist ? "bookmark" : "bookmark-outline"}
                size={24}
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

              <RemoteImage
                style={styles.backdropImage}
                source={
                  data?.backdrop_path
                    ? { uri: getImage(data.backdrop_path, "w780") }
                    : require("@/assets/images/placeholder.jpg")
                }
                placeholder={require("@/assets/images/placeholder.jpg")}
                contentFit="cover"
              />

              <View style={styles.blurContainer} />
            </View>
          </>
        }
        ListFooterComponent={
          <>
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
          </>
        }
      />
      </View>

      <AppAlert
        visible={!!alert}
        title={alert?.title}
        message={alert?.message}
        actions={alert?.actions}
        onClose={() => setAlert(null)}
      />
    </>
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
  watchlistIcon: {
    position: "absolute",
    top: 58,
    right: 16,
    zIndex: 10,
  },
  contentContainer: {
    padding: 16,
  },
});
