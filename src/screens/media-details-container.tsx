import {
  AppAlert,
  AlertAction,
  BackdropImagesContainer,
  CastContainer,
  ErrorState,
  Loading,
  MovieOverview,
  MoviesListContainer,
  RecommendationSection,
  RemoteImage,
} from "@/src/components";
import TrailerVideo from "../components/trailer-video";
import {
  useAddFavorite,
  useAddWatchlist,
  useGetFavoriteMovies,
  useGetFavoriteTvShows,
  useGetMovieDetail,
  useGetWatchlistMovies,
  useGetWatchlistTvShows,
} from "@/src/hooks";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme";
import { Movie, MoviesCardType, RecommendationCardType } from "../types";
import { getImage } from "../utils/getImage";

export default function MediaDetailsContainer({
  id,
  typeOfList,
}: {
  id: number;
  typeOfList: string;
}) {
  const { data, isLoading, error, refetch, isFetching } = useGetMovieDetail(
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

  const metaInfo = useMemo(() => {
    const info: { label: string; value: string }[] = [];

    if (data?.vote_average) {
      info.push({ label: "Rating", value: data.vote_average.toFixed(1) });
    }

    const releaseDate = data?.release_date || data?.first_air_date;
    if (releaseDate) {
      info.push({ label: "Released", value: releaseDate });
    }

    if (data?.original_language) {
      info.push({
        label: "Language",
        value: data.original_language.toUpperCase(),
      });
    }

    if (data?.status) {
      info.push({ label: "Status", value: data.status });
    }

    if (typeOfList === "tv") {
      if (data?.number_of_seasons) {
        info.push({ label: "Seasons", value: `${data.number_of_seasons}` });
      }
      if (data?.number_of_episodes) {
        info.push({ label: "Episodes", value: `${data.number_of_episodes}` });
      }
    }

    return info;
  }, [data, typeOfList]);

  const genreList = useMemo(
    () => (data?.genres ? data.genres.map((g: { name: string }) => g.name) : []),
    [data],
  );

  const posterSource = data?.poster_path
    ? { uri: getImage(data.poster_path, "w342") }
    : require("@/assets/images/placeholder.jpg");

  const backdropSource = data?.backdrop_path
    ? { uri: getImage(data.backdrop_path, "w780") }
    : posterSource;

  if (isLoading) return <Loading />;

  if (error) return <ErrorState error={error} onRetry={() => refetch()} />;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => refetch()}
            tintColor={Colors.primary}
          />
        }
      >
        <View style={styles.hero}>
          <RemoteImage
            source={backdropSource}
            placeholder={require("@/assets/images/placeholder.jpg")}
            contentFit="cover"
            style={StyleSheet.absoluteFillObject}
          />
          <LinearGradient
            colors={[
              "rgba(11,15,20,0.25)",
              "rgba(11,15,20,0.85)",
              Colors.background,
            ]}
            locations={[0, 0.5, 1]}
            style={StyleSheet.absoluteFillObject}
          />

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={22} color={Colors.text} />
          </TouchableOpacity>

          <View style={styles.topActions}>
            <TouchableOpacity
              style={styles.actionIcon}
              onPress={handleFavorite}
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <MaterialIcons
                name={isFavorite ? "favorite" : "favorite-border"}
                size={26}
                color={Colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionIcon}
              onPress={handleWatchlist}
              accessibilityRole="button"
              accessibilityLabel={isWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
              <Ionicons
                name={isWatchlist ? "bookmark" : "bookmark-outline"}
                size={24}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.heroBottom}>
            <View style={styles.posterWrap}>
              <RemoteImage
                source={posterSource}
                placeholder={require("@/assets/images/placeholder.jpg")}
                contentFit="cover"
                style={styles.poster}
              />
            </View>
            <View style={styles.heroText}>
              <Text style={styles.title} numberOfLines={3}>
                {data?.title || data?.name}
              </Text>
              {data?.tagline ? (
                <Text style={styles.tagline} numberOfLines={2}>
                  {data.tagline}
                </Text>
              ) : null}
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color={Colors.primary} />
                <Text style={styles.ratingText}>
                  {data?.vote_average ? data.vote_average.toFixed(1) : "N/A"}
                </Text>
                {data?.vote_average ? (
                  <Text style={styles.ratingMax}>/10</Text>
                ) : null}
              </View>
              {genreList.length > 0 && (
                <View style={styles.genreRow}>
                  {genreList.slice(0, 3).map((genre: string) => (
                    <View key={genre} style={styles.genreChip}>
                      <Text style={styles.genreText}>{genre}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.trailerRow}>
          <TrailerVideo movieTrailerId={movieTrailerId || ""} variant="button" />
        </View>

        {metaInfo.length > 0 && (
          <View style={styles.pills}>
            {metaInfo.map((item, index) => (
              <View
                key={item.label}
                style={[
                  styles.pill,
                  index === metaInfo.length - 1 && styles.pillFull,
                ]}
              >
                <Text style={styles.pillLabel}>{item.label}</Text>
                <Text style={styles.pillValue} numberOfLines={2}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.card}>
          <MovieOverview content={data?.overview || ""} />
        </View>

        <CastContainer id={id} typeOfList={typeOfList} />

        <RecommendationSection
          sectionHeading="Recommendations"
          moviePosters={recommendationMoviesPosters}
          typeOfList={typeOfList}
        />

        <MoviesListContainer
          sectionHeading="Similar"
          moviePosters={similarMoviesPosters}
          typeOfList={typeOfList}
        />

        <BackdropImagesContainer data={data?.images?.backdrops || []} />
      </ScrollView>

      <AppAlert
        visible={!!alert}
        title={alert?.title}
        message={alert?.message}
        actions={alert?.actions}
        onClose={() => setAlert(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    height: 380,
    width: "100%",
    overflow: "hidden",
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 4,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 8,
    borderRadius: 20,
  },
  topActions: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 4,
    flexDirection: "row",
  },
  actionIcon: {
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  heroBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 2,
  },
  posterWrap: {
    width: 120,
    height: 180,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    overflow: "hidden",
    backgroundColor: Colors.card,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  heroText: {
    flex: 1,
    marginLeft: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
  },
  tagline: {
    color: Colors.secondaryText,
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 6,
  },
  ratingMax: {
    color: Colors.secondaryText,
    fontSize: 13,
    marginLeft: 2,
  },
  genreRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  genreChip: {
    backgroundColor: "rgba(215,237,47,0.12)",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  genreText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  trailerRow: {
    paddingHorizontal: 16,
    marginTop: 14,
  },
  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 12,
  },
  pill: {
    width: "48%",
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
  },
  pillFull: {
    width: "100%",
  },
  pillLabel: {
    fontSize: 11,
    color: Colors.secondaryText,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  pillValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
});
