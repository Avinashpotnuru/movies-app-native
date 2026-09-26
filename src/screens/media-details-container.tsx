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
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "../theme";
import { Movie, MoviesCardType, RecommendationCardType } from "../types";
import { getImage } from "../utils/getImage";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatReleaseDate = (iso: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return iso;
  const year = match[1];
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12) return iso;
  return `${day} ${MONTHS[month - 1]} ${year}`;
};

const formatRuntime = (minutes: number) => {
  if (!Number.isFinite(minutes)) return "-";
  const safe = Math.max(0, Math.floor(minutes));
  const hours = Math.floor(safe / 60);
  const mins = safe % 60;
  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h`;
  return `${mins}m`;
};

const hostFromUrl = (url: string) =>
  url?.replace(/^https?:\/\//i, "").split("/")[0] || url;

const openUrl = (url: string) => {
  Linking.openURL(url).catch(() => undefined);
};

const formatVoteCount = (count: number) =>
  count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;

const statusTone = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("released") || s.includes("returning")) {
    return Colors.primary;
  }
  if (
    s.includes("in production") ||
    s.includes("post production") ||
    s.includes("planned")
  ) {
    return Colors.accent;
  }
  return Colors.secondaryText;
};

const STAT_ICONS: Record<string, keyof typeof Feather.glyphMap> = {
  Released: "calendar",
  Language: "globe",
  Status: "activity",
  Runtime: "clock",
  Director: "user",
  Creators: "users",
  Seasons: "layers",
  Episodes: "video",
  Production: "home",
  Website: "link",
};

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
      info.push({ label: "Released", value: formatReleaseDate(releaseDate) });
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

    if (typeOfList === "movie") {
      if (typeof data?.runtime === "number" && data.runtime > 0) {
        info.push({ label: "Runtime", value: formatRuntime(data.runtime) });
      }

      const directors = data?.credits?.crew
        ?.filter(
          (crew: { job?: string }) =>
            typeof crew?.job === "string" && crew.job.toLowerCase() === "director",
        )
        ?.map((crew: { name?: string }) => crew?.name)
        ?.filter(Boolean);

      if (directors?.length) {
        info.push({ label: "Director", value: directors.join(" & ") });
      }
    } else {
      const creators = data?.created_by
        ?.map((creator: { name?: string }) => creator?.name)
        ?.filter(Boolean);

      if (creators?.length) {
        info.push({ label: "Creators", value: creators.join(", ") });
      }

      if (data?.number_of_seasons) {
        info.push({ label: "Seasons", value: `${data.number_of_seasons}` });
      }
      if (data?.number_of_episodes) {
        info.push({ label: "Episodes", value: `${data.number_of_episodes}` });
      }
    }

    const companies = data?.production_companies
      ?.map((company: { name?: string }) => company?.name)
      ?.filter(Boolean);

    if (companies?.length) {
      info.push({
        label: "Production",
        value: companies.slice(0, 3).join(", "),
      });
    }

    if (typeof data?.homepage === "string" && data.homepage.length > 0) {
      info.push({ label: "Website", value: data.homepage });
    }

    return info;
  }, [data, typeOfList]);

  const genreList = useMemo(
    () => (data?.genres ? data.genres.map((g: { name: string }) => g.name) : []),
    [data],
  );

  const rating = data?.vote_average ? data.vote_average.toFixed(1) : null;
  const voteCount = data?.vote_count ?? null;
  const specs = metaInfo.filter((item) => item.label !== "Rating");

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
        contentContainerStyle={styles.content}
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

        {specs.length > 0 && (
          <View style={styles.statGrid}>
            {rating ? (
              <View style={[styles.statCard, styles.ratingStatCard]}>
                <Text style={styles.statLabel}>Rating</Text>
                <View style={styles.ratingMain}>
                  <Text style={styles.statRatingNum}>{rating}</Text>
                  <Text style={styles.statRatingOutOf}>/10</Text>
                </View>
                <View style={styles.statRatingTrack}>
                  <View
                    style={[
                      styles.statRatingFill,
                      {
                        width: `${Math.min((Number(rating) / 10) * 100, 100)}%`,
                      },
                    ]}
                  />
                </View>
                {voteCount ? (
                  <Text style={styles.statRatingVotes}>
                    {formatVoteCount(voteCount)} votes
                  </Text>
                ) : null}
              </View>
            ) : null}

            {specs.map((item) => {
              const isWebsite = item.label === "Website";
              const isStatus = item.label === "Status";
              const displayValue = isWebsite
                ? hostFromUrl(item.value)
                : item.value;
              const icon = STAT_ICONS[item.label];

              const content = (
                <>
                  <View style={styles.statTopRow}>
                    <Text style={styles.statLabel}>{item.label}</Text>
                    {icon ? (
                      <Feather
                        name={icon}
                        size={15}
                        color={Colors.secondaryText}
                      />
                    ) : null}
                  </View>
                  <View style={styles.statValueRow}>
                    {isStatus ? (
                      <View
                        style={[
                          styles.statusDot,
                          { backgroundColor: statusTone(item.value) },
                        ]}
                      />
                    ) : null}
                    <Text style={styles.statValue} numberOfLines={2}>
                      {displayValue}
                    </Text>
                    {isWebsite ? (
                      <Feather
                        name="external-link"
                        size={13}
                        color={Colors.primary}
                        style={styles.statLinkIcon}
                      />
                    ) : null}
                  </View>
                </>
              );

              return isWebsite ? (
                <TouchableOpacity
                  key={item.label}
                  style={styles.statCard}
                  onPress={() => openUrl(item.value)}
                  accessibilityRole="link"
                  accessibilityLabel={`Open website ${displayValue}`}
                >
                  {content}
                </TouchableOpacity>
              ) : (
                <View key={item.label} style={styles.statCard}>
                  {content}
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.card}>
          <MovieOverview content={data?.overview || ""} />
        </View>

        <CastContainer
          id={id}
          typeOfList={typeOfList}
          initialData={data?.credits}
        />

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
  content: {
    paddingBottom: 32,
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
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  statCard: {
    width: "48.2%",
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  ratingStatCard: {
    width: "100%",
    borderColor: "rgba(215,237,47,0.35)",
  },
  statTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.secondaryText,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  statValueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  statValue: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
    fontVariant: ["tabular-nums"],
  },
  ratingMain: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 6,
  },
  statRatingNum: {
    color: Colors.primary,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
    fontVariant: ["tabular-nums"],
  },
  statRatingOutOf: {
    color: Colors.secondaryText,
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 3,
  },
  statRatingTrack: {
    marginTop: 8,
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  statRatingFill: {
    height: "100%",
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  statRatingVotes: {
    marginTop: 8,
    fontSize: 11,
    color: Colors.secondaryText,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statLinkIcon: {
    marginLeft: 6,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
});
