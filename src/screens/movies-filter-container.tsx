import {
  CustomDropdown,
  Loading,
  MoviesCard,
  NoDataFound,
} from "@/src/components";
import React, { useEffect, useMemo, useState } from "react";

import { sortOptions } from "@/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getGenres,
  getLanguages,
  getMovies,
  getSearchMovies,
} from "../api/movies.service";
import { Colors } from "../theme";
import { useFetch } from "@/src/hooks";
import { Movie, MoviesCardType } from "../types";

const { width } = Dimensions.get("window");

export default function MoviesFilterContainer() {
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  const [movies, setMovies] = useState<MoviesCardType[]>([]);

  const { data: searchData } = useFetch({
    fetchFunction: () => getSearchMovies(searchQuery),
    dependencies: [searchQuery],
  });

  const { data: languages } = useFetch({
    fetchFunction: () => getLanguages(),
  });

  const { data: genreData } = useFetch({
    fetchFunction: () => getGenres(),
  });

  const { data: movieData, loading } = useFetch({
    fetchFunction: () =>
      getMovies({
        with_original_language: language,
        page,
        with_genres: genre,
        sort_by: sort,
      }),
    dependencies: [page, language, genre, sort],
  });

  const languageOptions = useMemo(() => {
    return languages?.map((language: any) => ({
      label: language?.english_name,
      value: language?.iso_639_1,
    }));
  }, [languages]);

  const genreOptions = useMemo(() => {
    return genreData?.genres?.map((genre: { id: number; name: string }) => ({
      label: genre.name,
      value: genre.id,
    }));
  }, [genreData]);

  const searchMoviePosters: MoviesCardType[] = useMemo(
    () =>
      searchData?.results?.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      })) || [],
    [searchData],
  );

  useEffect(() => {
    if (!movieData?.results) return;

    const newMovies = movieData.results.map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    }));

    if (page === 1) {
      setMovies(newMovies);
    } else {
      setMovies((prev) => [...prev, ...newMovies]);
    }

    setLoadingMore(false);
  }, [movieData, page]);


  const handleLanguage = (value: string) => {
    setLanguage((prev) => (prev === value ? "" : value));
    setPage(1);
    setMovies([]);
  };

  const handleGenre = (value: string) => {
    setGenre(value);
    setPage(1);
    setMovies([]);
  };

  const handleSort = (value: string) => {
    setSort(value);
    setPage(1);
    setMovies([]);
  };


  const clearFilters = () => {
    setSearchQuery("");
    setLanguage("");
    setGenre("");
    setSort("");
    setPage(1);
    setMovies([]);
  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Search movies..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        autoCorrect={false}
      />


      <View style={styles.filterView}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterContainer}>
            <CustomDropdown
              value={language}
              onValueChange={handleLanguage}
              placeholder="Language"
              options={languageOptions}
            />

            <CustomDropdown
              value={genre}
              onValueChange={handleGenre}
              placeholder="Genre"
              options={genreOptions}
            />

            <CustomDropdown
              value={sort}
              placeholder="Sort By"
              onValueChange={handleSort}
              options={sortOptions}
            />

            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <AntDesign name="clear" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>


      <Text style={styles.title}>Movies</Text>


      {loading && page === 1 ? (
        <Loading />
      ) : (
        <FlatList
          numColumns={3}
          contentContainerStyle={{ flexGrow: 1 }}
          data={searchQuery ? searchMoviePosters : movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MoviesCard moviesDetails={{ ...item, typeOfList: "movie" }} />
          )}
          ListEmptyComponent={<NoDataFound />}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (
              !loadingMore &&
              !searchQuery &&
              movieData?.page < movieData?.total_pages
            ) {
              setLoadingMore(true);
              setPage((prev) => prev + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <Loading /> : null}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  clearButton: {
    backgroundColor: "#222222",
    padding: 14,
    borderRadius: 8,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginHorizontal: 12,
  },
  searchInput: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    marginVertical: 12,
    width: width - 50,
    alignSelf: "center",
  },
  title: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  filterView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
    width: width - 50,
    alignSelf: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 8,
    width: "100%",
  },
});
