import {
  ErrorState,
  Loading,
  MoviesCard,
  NoDataFound,
  TabsContainer,
} from "@/src/components";
import { useGetWatchlistMovies, useGetWatchlistTvShows } from "@/src/hooks";
import { Colors } from "@/src/theme/colors";
import { router } from "expo-router";
import React, { memo, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MoviesCardType } from "../types";

const WishlistCard = memo(function WishlistCard({
  item,
  typeOfList,
}: {
  item: MoviesCardType;
  typeOfList: "movie" | "tv";
}) {
  const moviesDetails = useMemo(
    () => ({ ...item, typeOfList }),
    [item, typeOfList],
  );

  return <MoviesCard moviesDetails={moviesDetails} />;
});

const WishlistContainer = () => {
  const [selectType, setSelectType] = useState<"movie" | "tv">("movie");

  const moviesQuery = useGetWatchlistMovies();
  const tvQuery = useGetWatchlistTvShows();

  const isMovie = selectType === "movie";
  const query = isMovie ? moviesQuery : tvQuery;

  const items = useMemo(
    () => query.data?.pages.flatMap((page) => page.results) ?? [],
    [query.data],
  );

  const handleLoadMore = () => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  };

  const handleRefresh = () => {
    query.refetch();
  };

  if (query.isLoading && items.length === 0) {
    return <Loading />;
  }

  if (query.isError && items.length === 0) {
    return <ErrorState error={query.error} onRetry={handleRefresh} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wishlist</Text>
      </View>

      <TabsContainer selected={selectType} onChange={setSelectType} />

      <FlatList
        numColumns={3}
        contentContainerStyle={{ padding: 8, paddingBottom: 24 }}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={5}
        removeClippedSubviews
        updateCellsBatchingPeriod={100}
        renderItem={({ item }) => (
          <WishlistCard item={item} typeOfList={selectType} />
        )}
        ListEmptyComponent={<NoDataFound />}
        ListFooterComponent={
          query.isFetchingNextPage ? (
            <ActivityIndicator color={Colors.primary} size="large" />
          ) : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={query.isRefetching}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default WishlistContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  backBtn: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "800",
  },
});
