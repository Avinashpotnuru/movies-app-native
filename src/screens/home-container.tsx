import {
  ErrorState,
  MoviesListContainer,
  SectionHeading,
} from "@/src/components";
import {
  useGetGenres,
  useNowPlayingMovies,
  usePopularMovies,
  useTopRatedMovies,
  useTrendingMovies,
  useTvShows,
  useUpcomingMovies,
} from "@/src/hooks";
import { Colors } from "@/src/theme/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { lazy, Suspense, useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Genre, Movie, MoviesCardType } from "@/src/types";

const MoviesCarousel = lazy(() => import("@/src/components/movies-carousel"));

const GENRE_CHIP_COUNT = 8;

const toPosterCard = (
  movie: Movie & { original_name?: string },
  typeOfList?: string,
): MoviesCardType => ({
  id: movie.id,
  title: movie.title,
  name: movie.name,
  original_title: movie.original_title,
  original_name: movie.original_name,
  poster_path: movie.poster_path,
  vote_average: movie.vote_average,
  release_date: movie.release_date,
  typeOfList,
});

type HomeRow = {
  title: string;
  data: MoviesCardType[];
  typeOfList: string;
  isLoading: boolean;
  error: unknown;
  onRetry: () => void;
};

export default function HomeScreenContainer() {
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useTrendingMovies();

  const {
    data: popularMoviesData,
    isLoading: popularLoading,
    isFetching: popularFetching,
    error: popularError,
    refetch: refetchPopular,
  } = usePopularMovies();

  const {
    data: upcomingMoviesData,
    isLoading: upcomingLoading,
    isFetching: upcomingFetching,
    error: upcomingError,
    refetch: refetchUpcoming,
  } = useUpcomingMovies();

  const {
    data: tvShows,
    isLoading: tvLoading,
    isFetching: tvFetching,
    error: tvError,
    refetch: refetchTv,
  } = useTvShows();

  const {
    data: nowPlayingData,
    isLoading: nowPlayingLoading,
    isFetching: nowPlayingFetching,
    error: nowPlayingError,
    refetch: refetchNowPlaying,
  } = useNowPlayingMovies();

  const {
    data: topRatedData,
    isLoading: topRatedLoading,
    isFetching: topRatedFetching,
    error: topRatedError,
    refetch: refetchTopRated,
  } = useTopRatedMovies();

  const { data: genreData } = useGetGenres();

  const treadingMoviePosters: MoviesCardType[] = useMemo(
    () =>
      data?.results.map((movie: Movie) => toPosterCard(movie, "movie")) || [],
    [data],
  );

  const popularMoviePosters: MoviesCardType[] = useMemo(
    () =>
      popularMoviesData?.results.map((movie: Movie) =>
        toPosterCard(movie, "movie"),
      ) || [],
    [popularMoviesData],
  );

  const upcomingMoviePosters: MoviesCardType[] = useMemo(
    () =>
      upcomingMoviesData?.results.map((movie: Movie) =>
        toPosterCard(movie, "movie"),
      ) || [],
    [upcomingMoviesData],
  );

  const nowPlayingPosters: MoviesCardType[] = useMemo(
    () =>
      nowPlayingData?.results.map((movie: Movie) =>
        toPosterCard(movie, "movie"),
      ) || [],
    [nowPlayingData],
  );

  const topRatedPosters: MoviesCardType[] = useMemo(
    () =>
      topRatedData?.results.map((movie: Movie) =>
        toPosterCard(movie, "movie"),
      ) || [],
    [topRatedData],
  );

  const tvShowPosters: MoviesCardType[] = useMemo(
    () =>
      tvShows?.results.map((movie: Movie) => toPosterCard(movie, "tvShows")) ||
      [],
    [tvShows],
  );

  const genreChips = useMemo(
    () => (genreData?.genres as Genre[] | undefined)?.slice(0, GENRE_CHIP_COUNT) || [],
    [genreData],
  );

  const handleGenreChip = useCallback((genre: Genre) => {
    router.push({ pathname: "/movies", params: { genre: String(genre.id) } });
  }, []);

  const refreshing =
    isFetching ||
    popularFetching ||
    upcomingFetching ||
    tvFetching ||
    nowPlayingFetching ||
    topRatedFetching;

  const onRefresh = useCallback(() => {
    return Promise.all([
      refetch(),
      refetchPopular(),
      refetchUpcoming(),
      refetchTv(),
      refetchNowPlaying(),
      refetchTopRated(),
    ]);
  }, [
    refetch,
    refetchPopular,
    refetchUpcoming,
    refetchTv,
    refetchNowPlaying,
    refetchTopRated,
  ]);

  const displayMoviesList: HomeRow[] = useMemo(
    () => [
      {
        title: "Now Playing",
        data: nowPlayingPosters,
        typeOfList: "movie",
        isLoading: nowPlayingLoading,
        error: nowPlayingError,
        onRetry: () => refetchNowPlaying(),
      },
      {
        title: "Popular Movies",
        data: popularMoviePosters,
        typeOfList: "movie",
        isLoading: popularLoading,
        error: popularError,
        onRetry: () => refetchPopular(),
      },
      {
        title: "Top Rated",
        data: topRatedPosters,
        typeOfList: "movie",
        isLoading: topRatedLoading,
        error: topRatedError,
        onRetry: () => refetchTopRated(),
      },
      {
        title: "Popular Tv Shows",
        data: tvShowPosters,
        typeOfList: "tvShows",
        isLoading: tvLoading,
        error: tvError,
        onRetry: () => refetchTv(),
      },
      {
        title: "Upcoming Movies",
        data: upcomingMoviePosters,
        typeOfList: "movie",
        isLoading: upcomingLoading,
        error: upcomingError,
        onRetry: () => refetchUpcoming(),
      },
    ],
    [
      nowPlayingPosters,
      nowPlayingLoading,
      nowPlayingError,
      refetchNowPlaying,
      popularMoviePosters,
      popularLoading,
      popularError,
      refetchPopular,
      topRatedPosters,
      topRatedLoading,
      topRatedError,
      refetchTopRated,
      tvShowPosters,
      tvLoading,
      tvError,
      refetchTv,
      upcomingMoviePosters,
      upcomingLoading,
      upcomingError,
      refetchUpcoming,
    ],
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary}
        />
      }
    >
      <TouchableOpacity
        style={styles.searchPill}
        onPress={() => router.push("/movies")}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Search movies and shows"
      >
        <AntDesign name="search" size={16} color={Colors.secondaryText} />
        <Text style={styles.searchPillText}>Search movies & shows</Text>
      </TouchableOpacity>

      {genreChips.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {genreChips.map((genre) => (
            <TouchableOpacity
              key={genre.id}
              style={styles.chip}
              onPress={() => handleGenreChip(genre)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={`Browse ${genre.name} movies`}
            >
              <Text style={styles.chipText}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <SectionHeading title="Trending Movies" />

      {error ? (
        <ErrorState error={error} onRetry={() => refetch()} />
      ) : (
        <Suspense
          fallback={<ActivityIndicator color={Colors.primary} size={"large"} />}
        >
          {isLoading && !treadingMoviePosters.length ? (
            <View style={styles.heroSkeleton} />
          ) : (
            <MoviesCarousel moviePosters={treadingMoviePosters} />
          )}
        </Suspense>
      )}

      {displayMoviesList.map((item) => (
        <MoviesListContainer
          key={item.title}
          sectionHeading={item.title}
          moviePosters={item.data}
          typeOfList={item.typeOfList}
          isLoading={item.isLoading}
          error={item.error}
          onRetry={item.onRetry}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  searchPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
    marginTop: 4,
  },
  searchPillText: {
    color: Colors.secondaryText,
    fontSize: 14,
    marginLeft: 8,
  },
  chipsRow: {
    paddingVertical: 14,
  },
  chip: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
  },
  chipText: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: "600",
  },
  heroSkeleton: {
    marginTop: 12,
    height: 240,
    borderRadius: 16,
    backgroundColor: Colors.card,
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
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieTitle: {
    color: Colors.text,
    fontSize: 16,
    marginTop: 8,
  },
});