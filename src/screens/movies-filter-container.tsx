import {
  CustomDropdown,
  ErrorState,
  Loading,
  MoviesCard,
  NoDataFound,
  SearchBar,
} from "@/src/components";
import React, { useMemo, useState } from "react";

import { sortOptions } from "@/data";
import {
  useGetGenres,
  useGetLanguages,
  useGetMovies,
  useSearchMovies,
} from "@/src/hooks";

import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../theme";
import { Movie, MoviesCardType } from "../types";

const { width } = Dimensions.get("window");

export default function MoviesFilterContainer() {
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: languages } = useGetLanguages();
  const { data: genreData } = useGetGenres();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useGetMovies({
    language,
    genre,
    sort,
  });

  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
    refetch: refetchSearch,
  } = useSearchMovies(searchQuery);

  const listError = searchQuery ? searchError : error;
  const handleRetry = () => (searchQuery ? refetchSearch() : refetch());

  const movies: MoviesCardType[] = useMemo(() => {
    if (searchQuery) {
      return (
        searchData?.results?.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        })) || []
      );
    }

    return (
      data?.pages.flatMap((page) =>
        page.results.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        })),
      ) || []
    );
  }, [data, searchData, searchQuery]);

  const languageOptions = useMemo(() => {
    return languages?.map((language: any) => ({
      label: language?.english_name,
      value: language?.iso_639_1,
    }));
  }, [languages]);

  const genreOptions = useMemo(() => {
    return genreData?.genres?.map((genre: { id: number; name: string }) => ({
      label: genre.name,
      value: String(genre.id),
    }));
  }, [genreData]);

  const handleLanguage = (value: string) => {
    setLanguage((prev) => (prev === value ? "" : value));
  };

  const handleGenre = (value: string) => {
    setGenre(value);
  };

  const handleSort = (value: string) => {
    setSort(value);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLanguage("");
    setGenre("");
    setSort("");
  };

  const loadingState = searchQuery ? searchLoading : isLoading;

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search movies..."
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
              <AntDesign name="clear" size={18} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <Text style={styles.title}>Movies</Text>

      {loadingState ? (
        <Loading />
      ) : listError ? (
        <ErrorState error={listError} onRetry={handleRetry} />
      ) : (
        <FlatList
          numColumns={3}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={12}
          maxToRenderPerBatch={12}
          windowSize={5}
          removeClippedSubviews
          updateCellsBatchingPeriod={100}
          renderItem={({ item }) => (
            <MoviesCard moviesDetails={{ ...item, typeOfList: "movie" }} />
          )}
          ListEmptyComponent={<NoDataFound />}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (!searchQuery && hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <Loading /> : null}
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1a1a1a",
    borderColor: Colors.primary,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
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
