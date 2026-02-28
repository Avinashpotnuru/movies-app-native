import {
  getPopularMovies,
  getTrendingMovies,
  getUpComingMovies,
} from "@/src/api/movies.service";
import {
  MoviesCarousel,
  MoviesListContainer,
  SectionHeading,
} from "@/src/components";
import { useFetch } from "@/src/hooks/useFetch";
import { Colors } from "@/src/theme/colors";
import { Movie, MoviesCardType } from "@/src/types";
import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { data, loading, error } = useFetch({
    fetchFunction: getTrendingMovies,
  });
  const { data: popularMoviesData } = useFetch({
    fetchFunction: getPopularMovies,
  });

  const { data: upcomingMoviesData } = useFetch({
    fetchFunction: getUpComingMovies,
  });

  const treadingMoviePosters: MoviesCardType[] = useMemo(
    () =>
      data?.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      })) || [],

    [data],
  );

  const popularMoviePosters: MoviesCardType[] = useMemo(
    () =>
      popularMoviesData?.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      })) || [],

    [popularMoviesData],
  );
  const upcomingMoviePosters: MoviesCardType[] = useMemo(
    () =>
      upcomingMoviesData?.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      })) || [],

    [upcomingMoviesData],
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
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
        <MoviesCarousel moviePosters={treadingMoviePosters} />

        <MoviesListContainer
          sectionHeading={"Popular Movies"}
          moviePosters={popularMoviePosters}
        />
        <MoviesListContainer
          sectionHeading={"Upcoming Movies"}
          moviePosters={upcomingMoviePosters}
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
