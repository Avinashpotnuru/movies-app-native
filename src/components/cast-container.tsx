import { useGetMovieCredits } from "@/src/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { memo, useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../theme";
import { MovieCastProps } from "../types";
import { getImage } from "../utils/getImage";
import CastDisplayCard from "./cast-display-card";
import RemoteImage from "./remote-image";
import SectionHeading from "./section-heading";

const CAST_ITEM_WIDTH = 116;
const MAX_CAST_TILES = 60;

type MovieCredits = {
  id?: number;
  cast?: MovieCastProps[];
  crew?: { id?: number; job?: string; name?: string }[];
};

const CastTile = ({ cast }: { cast: MovieCastProps }) => {
  const { name, character, profile_path, gender, id } = cast;

  const placeholder = useMemo(
    () =>
      gender === 1
        ? require("@/assets/images/female.jpg")
        : require("@/assets/images/male.jpg"),
    [gender],
  );

  const imageUri = useMemo(
    () => (profile_path ? getImage(profile_path, "w185") : null),
    [profile_path],
  );

  return (
    <TouchableOpacity
      style={styles.tile}
      onPress={() =>
        id &&
        router.push({
          pathname: "/cast-details/[id]",
          params: { id: String(id) },
        })
      }
      accessibilityRole="button"
      accessibilityLabel={`View details for ${name || "cast member"}`}
    >
      <RemoteImage
        style={styles.tileImage}
        source={imageUri ? { uri: imageUri } : placeholder}
        placeholder={placeholder}
        contentFit="cover"
        recyclingKey={id?.toString()}
      />
      <Text style={styles.tileName} numberOfLines={1}>
        {name || ""}
      </Text>
      {character ? (
        <Text style={styles.tileCharacter} numberOfLines={2}>
          {character}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const CastContainer = ({
  id,
  typeOfList,
  initialData,
}: {
  id: number;
  typeOfList: string;
  initialData?: MovieCredits;
}) => {
  const [expanded, setExpanded] = useState(false);
  const { data, isLoading, error } = useGetMovieCredits(id, typeOfList, {
    initialData,
  });

  const cast = useMemo<MovieCastProps[]>(() => {
    const list = (data as MovieCredits | undefined)?.cast;
    return Array.isArray(list) ? list : [];
  }, [data]);

  const renderItem = useCallback(
    ({ item }: { item: MovieCastProps }) => <CastDisplayCard cast={item} />,
    [],
  );

  const keyExtractor = useCallback(
    (item: MovieCastProps) => item.id.toString(),
    [],
  );

  if (isLoading && cast.length === 0) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  if (error && cast.length === 0) {
    return (
      <Text style={styles.error}>
        {error instanceof Error ? error.message : String(error)}
      </Text>
    );
  }

  if (cast.length === 0) return null;

  return (
    <View>
      <View style={styles.headingRow}>
        <View style={styles.headingGrow}>
          <SectionHeading title="Cast" />
        </View>
        <TouchableOpacity
          style={styles.viewAllBtn}
          onPress={() => setExpanded((prev) => !prev)}
          accessibilityRole="button"
          accessibilityLabel={
            expanded ? "Hide full cast" : `Show all ${cast.length} cast members`
          }
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.viewAllText}>
            {expanded ? "Hide" : `All (${cast.length})`}
          </Text>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={14}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>

      {expanded ? (
        <View style={styles.grid}>
          {cast.slice(0, MAX_CAST_TILES).map((item: MovieCastProps) => (
            <CastTile key={item.id} cast={item} />
          ))}
        </View>
      ) : (
        <FlatList
          data={cast}
          horizontal
          getItemLayout={(_, index) => ({
            length: CAST_ITEM_WIDTH,
            offset: CAST_ITEM_WIDTH * index,
            index,
          })}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default memo(CastContainer);

const styles = StyleSheet.create({
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
  },
  headingGrow: {
    flex: 1,
  },
  viewAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  viewAllText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  tile: {
    width: "33.333%",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  tileImage: {
    width: 84,
    height: 84,
    borderRadius: 42,
    overflow: "hidden",
    backgroundColor: Colors.card,
  },
  tileName: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },
  tileCharacter: {
    marginTop: 2,
    fontSize: 10,
    color: Colors.secondaryText,
    textAlign: "center",
  },
});