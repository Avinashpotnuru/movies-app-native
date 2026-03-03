import { Loading, MoviesCard } from "@/src/components";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { getFavorites } from "../api/movies.service";
import { useFetch } from "../hooks/useFetch";
import { Colors } from "../theme";

const FavoritesContainer = () => {
  const { data, loading, refetch } = useFetch({
    fetchFunction: () => getFavorites({ page: 1 }),
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          numColumns={3}
          contentContainerStyle={{ padding: 8 }}
          data={data?.results || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MoviesCard moviesDetails={item} />}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
          ListEmptyComponent={
            <View style={{ marginTop: 50 }}>
              <Loading />
            </View>
          }
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
