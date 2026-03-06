import {
  CustomDropdown,
  Loading,
  MoviesCard,
  NoDataFound,
} from "@/src/components";
import React, { useMemo, useState } from "react";

import { sortOptions } from "@/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Dimensions,
  FlatList,
  RefreshControl,
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
  getSearchTvShows,
  getTvShows,
} from "../api/movies.service";
import { useFetch } from "../hooks/useFetch";
import { Colors } from "../theme";
import { Movie, MoviesCardType } from "../types";

const { width } = Dimensions.get("window");

export default function TvShowFilterContainer() {
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading } = useFetch({
    fetchFunction: () => getSearchTvShows(searchQuery),
  });

  const { data: languages } = useFetch({
    fetchFunction: () => getLanguages(),
  });
  const { data: genreData } = useFetch({
    fetchFunction: () => getGenres(),
  });

  const { data: tvShowData } = useFetch({
    fetchFunction: () =>
      getTvShows({
        with_original_language: language,
        page,
        with_genres: genre,
        sort_by: sort,
      }),
  });

  const languageOptions = useMemo(() => {
    return languages?.map((language: any) => ({
      label: language?.["english_name"],
      value: language?.["iso_639_1"],
    }));
  }, [languages]);

  const genreOptions = useMemo(() => {
    return genreData?.genres.map((genre: { id: number; name: string }) => ({
      label: genre?.name,
      value: genre?.id,
    }));
  }, [genreData]);

  const searchMoviePosters: MoviesCardType[] = useMemo(
    () =>
      data?.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      })) || [],

    [data],
  );

  const moviePosters: MoviesCardType[] = useMemo(
    () =>
      tvShowData?.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      })) || [],
    [tvShowData],
  );

  const handleLanguage = (value: string) => {
    setLanguage(value);
  };

  const handleGenre = (value: string) => {
    setGenre(value);
  };

  const handleSort = (value: string) => {
    setSort(value);
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
          </View>
          <CustomDropdown
            value={sort}
            placeholder="Sort By"
            onValueChange={handleSort}
            options={sortOptions}
          />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setSearchQuery("");
              setPage(1);
              setSort("");
              setLanguage("");
              setGenre("");
            }}
          >
            <AntDesign name="clear" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Text style={styles.title}>Tv Shows</Text>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          numColumns={3}
          contentContainerStyle={{ flexGrow: 1 }}
          data={searchQuery ? searchMoviePosters : moviePosters || []}
          extraData={searchMoviePosters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <MoviesCard moviesDetails={{ ...item, typeOfList: "tv" }} />;
          }}
          ListEmptyComponent={<NoDataFound />}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                setPage((pre) => pre + 1);
              }}
            />
          }
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
    position: "relative",
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
  genre: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
