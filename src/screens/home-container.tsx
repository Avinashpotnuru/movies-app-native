import {
  getPopularMovies,
  getTrendingMovies,
  getTvShows,
  getUpComingMovies,
} from "@/src/api/movies.service";
import { Loading, MoviesListContainer, SectionHeading } from "@/src/components";
import { useFetch } from "@/src/hooks/useFetch";
import { Colors } from "@/src/theme/colors";
import { Movie, MoviesCardType } from "@/src/types";
import { lazy, Suspense, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
const MoviesCarousel = lazy(() => import("@/src/components/movies-carousel"));

export default function HomeScreenContainer() {
  const { data, loading, error } = useFetch({
    fetchFunction: getTrendingMovies,
  });
  const { data: popularMoviesData } = useFetch({
    fetchFunction: getPopularMovies,
  });

  const { data: upcomingMoviesData } = useFetch({
    fetchFunction: getUpComingMovies,
  });

  const { data: tvShows } = useFetch({
    fetchFunction: getTvShows,
  });

  const treadingMoviePosters: MoviesCardType[] = useMemo(
    () =>
      data?.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      })) || [],

    [data],
  );

  const popularMoviePosters: MoviesCardType[] = useMemo(
    () =>
      popularMoviesData?.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      })) || [],

    [popularMoviesData],
  );
  const upcomingMoviePosters: MoviesCardType[] = useMemo(
    () =>
      upcomingMoviesData?.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      })) || [],

    [upcomingMoviesData],
  );

  const tvShowPosters: MoviesCardType[] = useMemo(
    () =>
      tvShows?.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      })) || [],

    [tvShows],
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <SectionHeading title="Trending Movies" />
        <Suspense fallback={<Loading />}>
          <MoviesCarousel moviePosters={treadingMoviePosters} />
        </Suspense>

        <MoviesListContainer
          sectionHeading={"Popular Movies"}
          moviePosters={popularMoviePosters}
          typeOfList="movie"
        />
        <MoviesListContainer
          sectionHeading={"Popular Tv Shows"}
          moviePosters={tvShowPosters}
          typeOfList="tvShows"
        />
        <MoviesListContainer
          sectionHeading={"Upcoming Movies"}
          moviePosters={upcomingMoviePosters}
          typeOfList="movie"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  movieCard: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    gap: 8,
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
