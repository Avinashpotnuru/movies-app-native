import {
  Loading,
  MoviesCard,
  TabsContainer,
  NoDataFound,
} from "@/src/components";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { getFavorites, getFavoritesTv } from "../api/movies.service";
import { useFetch } from "../hooks/useFetch";
import { Colors } from "../theme";

const FavoritesContainer = () => {
  const [selectType, setSelectType] = useState<"movie" | "tv">("movie");
  const { data, loading, refetch } = useFetch({
    fetchFunction: () => getFavorites(),
  });

  const {
    data: dataTv,
    loading: loadingTv,
    refetch: refetchTv,
  } = useFetch({
    fetchFunction: () => getFavoritesTv({ page: 1 }),
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
      refetchTv();
    }, [refetch, refetchTv]),
  );

  return (
    <View style={styles.container}>
      <TabsContainer selected={selectType} onChange={setSelectType} />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          numColumns={3}
          contentContainerStyle={{ padding: 8 }}
          data={selectType === "movie" ? data?.results : dataTv?.results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MoviesCard moviesDetails={{ ...item, typeOfList: selectType }} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={loading || loadingTv}
              onRefresh={() => {
                refetch();
                refetchTv();
              }}
            />
          }
          ListEmptyComponent={<NoDataFound />}
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
