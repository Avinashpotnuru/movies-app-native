import {
  Loading,
  MoviesCard,
  NoDataFound,
  TabsContainer,
} from "@/src/components";
import { useGetFavoriteMovies, useGetFavoriteTvShows } from "@/src/hooks";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Colors } from "../theme";

const FavoritesContainer = () => {
  const [selectType, setSelectType] = useState<"movie" | "tv">("movie");

  const [moviePage, setMoviePage] = useState(1);
  const [tvPage, setTvPage] = useState(1);

  const [movies, setMovies] = useState<any[]>([]);
  const [tvShows, setTvShows] = useState<any[]>([]);

  const [loadingMore, setLoadingMore] = useState(false);

  const {
    data,
    isLoading: isLoadingMovies,
    refetch,
  } = useGetFavoriteMovies(moviePage);

  const {
    data: dataTv,
    isLoading: isLoadingTv,
    refetch: refetchTv,
  } = useGetFavoriteTvShows(tvPage);

  useFocusEffect(
    useCallback(() => {
      refetch();
      refetchTv();
    }, [refetch, refetchTv]),
  );

  useEffect(() => {
    if (data?.results) {
      if (moviePage === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
    }
    setLoadingMore(false);
  }, [data, moviePage]);

  useEffect(() => {
    if (dataTv?.results) {
      if (tvPage === 1) {
        setTvShows(dataTv.results);
      } else {
        setTvShows((prev) => [...prev, ...dataTv.results]);
      }
    }
    setLoadingMore(false);
  }, [dataTv, tvPage]);

  const currentData = selectType === "movie" ? movies : tvShows;
  const isLoading = selectType === "movie" ? isLoadingMovies : isLoadingTv;

  return (
    <View style={styles.container}>
      <TabsContainer selected={selectType} onChange={setSelectType} />

      {isLoading && currentData.length === 0 ? (
        <Loading />
      ) : (
        <FlatList
          numColumns={3}
          contentContainerStyle={{ padding: 8 }}
          data={currentData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MoviesCard moviesDetails={{ ...item, typeOfList: selectType }} />
          )}
          ListEmptyComponent={<NoDataFound />}
          ListFooterComponent={loadingMore ? <Loading /> : null}
          onEndReached={() => {
            if (!loadingMore) {
              setLoadingMore(true);

              if (selectType === "movie") {
                setMoviePage((prev) => prev + 1);
              } else {
                setTvPage((prev) => prev + 1);
              }
            }
          }}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingMovies || isLoadingTv}
              onRefresh={() => {
                setMoviePage(1);
                setTvPage(1);
                setMovies([]);
                setTvShows([]);
                refetch();
                refetchTv();
              }}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default FavoritesContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
