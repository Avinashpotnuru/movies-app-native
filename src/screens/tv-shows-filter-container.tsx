import {
  CustomDropdown,
  Loading,
  MoviesCard,
  NoDataFound,
} from "@/src/components";
import React, { useMemo, useState } from "react";

import { sortOptions } from "@/data";
import {
  useGetGenres,
  useGetLanguages,
  useGetTvShowsInfinite,
  useSearchTvShows,
} from "@/src/hooks";

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

import { Colors } from "../theme";
import { Movie, MoviesCardType } from "../types";

const { width } = Dimensions.get("window");

export default function TvShowFilterContainer() {
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: languages } = useGetLanguages();
  const { data: genreData } = useGetGenres();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetTvShowsInfinite({
      language,
      genre,
      sort,
    });

  const { data: searchData, isLoading: searchLoading } =
    useSearchTvShows(searchQuery);

  const tvShows: MoviesCardType[] = useMemo(() => {
    if (searchQuery) {
      return (
        searchData?.results?.map((tv: Movie) => ({
          id: tv.id,
          title: tv.title,
          poster_path: tv.poster_path,
        })) || []
      );
    }

    return (
      data?.pages.flatMap((page) =>
        page.results.map((tv: Movie) => ({
          id: tv.id,
          title: tv.title,
          poster_path: tv.poster_path,
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
      value: genre.id,
    }));
  }, [genreData]);

  const clearFilters = () => {
    setSearchQuery("");
    setLanguage("");
    setGenre("");
    setSort("");
  };

  const loadingState = searchQuery ? searchLoading : isLoading;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Tv Shows..."
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
              onValueChange={setLanguage}
              placeholder="Language"
              options={languageOptions}
            />

            <CustomDropdown
              value={genre}
              onValueChange={setGenre}
              placeholder="Genre"
              options={genreOptions}
            />

            <CustomDropdown
              value={sort}
              placeholder="Sort By"
              onValueChange={setSort}
              options={sortOptions}
            />

            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <AntDesign name="clear" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <Text style={styles.title}>Tv Shows</Text>

      {loadingState ? (
        <Loading />
      ) : (
        <FlatList
          numColumns={3}
          data={tvShows}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MoviesCard moviesDetails={{ ...item, typeOfList: "tv" }} />
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
  },
});
