import {
  CustomDropdown,
  ErrorState,
  Loading,
  MoviesCard,
  NoDataFound,
  SearchBar,
} from "@/src/components";
import React, { useCallback, useMemo, useState } from "react";

import { sortOptions } from "@/data";
import {
  useDebounce,
  useGetGenres,
  useGetLanguages,
  useGetMovies,
  useSearchMovies,
} from "@/src/hooks";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams } from "expo-router";
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { Colors } from "../theme";
import { Movie, MoviesCardType } from "../types";

const LIST_CONTENT_STYLE = { flexGrow: 1, paddingBottom: 24 };

export default function MoviesFilterContainer() {
  const { genre: genreParam } = useLocalSearchParams<{ genre?: string }>();

  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState(
    typeof genreParam === "string" && genreParam ? genreParam : "",
  );
  const [sort, setSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { width } = useWindowDimensions();
  const debouncedQuery = useDebounce(searchQuery, 350);

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
  } = useSearchMovies(debouncedQuery);

  const listError = searchQuery ? searchError : error;

  const movies: MoviesCardType[] = useMemo(() => {
    if (searchQuery) {
      return (
        searchData?.results?.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          typeOfList: "movie",
        })) || []
      );
    }

    return (
      data?.pages.flatMap((page) =>
        page.results.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          typeOfList: "movie",
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

  const handleLanguage = useCallback(
    (value: string) => {
      setLanguage((prev) => (prev === value ? "" : value));
    },
    [],
  );

  const handleGenre = useCallback(
    (value: string) => {
      setGenre(value);
    },
    [],
  );

  const handleSort = useCallback(
    (value: string) => {
      setSort(value);
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setLanguage("");
    setGenre("");
    setSort("");
  }, []);

  const handleRetry = useCallback(
    () => (searchQuery ? refetchSearch() : refetch()),
    [searchQuery, refetchSearch, refetch],
  );

  const handleEndReached = useCallback(() => {
    if (!searchQuery && hasNextPage) {
      fetchNextPage();
    }
  }, [searchQuery, hasNextPage, fetchNextPage]);

  const loadingState = searchQuery ? searchLoading : isLoading;

  const renderItem: ListRenderItem<MoviesCardType> = useCallback(
    ({ item }) => <MoviesCard moviesDetails={item} />,
    [],
  );

  const keyExtractor = useCallback(
    (item: MoviesCardType) => item.id.toString(),
    [],
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search movies..."
      />

      <View style={[styles.filterView, { width: width - 50 }]}>
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
          contentContainerStyle={LIST_CONTENT_STYLE}
          data={movies}
          keyExtractor={keyExtractor}
          initialNumToRender={12}
          maxToRenderPerBatch={12}
          windowSize={5}
          removeClippedSubviews
          renderItem={renderItem}
          ListEmptyComponent={<NoDataFound />}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
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
    alignSelf: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 8,
    width: "100%",
  },
});
