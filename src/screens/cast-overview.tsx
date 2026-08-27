import {
  BiographySection,
  ErrorState,
  Loading,
  MoviesListContainer,
  RemoteImage,
  SocialMediaSection,
} from "@/src/components";
import { useGetCastDetails } from "@/src/hooks";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../theme";
import { Movie, MoviesCardType } from "../types";
import { getImage } from "../utils/getImage";

const CastOverView = ({ castId }: { castId: number }) => {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetCastDetails(castId);

  const popularMoviePosters: MoviesCardType[] = useMemo(
    () =>
      data?.combined_credits?.cast?.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        name: movie.name,
        original_title: movie.original_title,
        original_name: movie.original_name,
        poster_path: movie.poster_path,
        typeOfList: movie.media_type,
      })) || [],
    [data],
  );

  const socialMediaLinks = useMemo(() => {
    const socialMedia = data?.external_ids;
    return {
      facebook: socialMedia?.facebook_id,
      instagram: socialMedia?.instagram_id,
      twitter: socialMedia?.twitter_id,
    };
  }, [data]);

  const personalInfo = useMemo(
    () =>
      [
        { label: "Known For", value: data?.known_for_department },
        { label: "Born", value: data?.birthday },
        { label: "Died", value: data?.deathday },
        { label: "Place of Birth", value: data?.place_of_birth },
      ].filter((item) => !!item.value),
    [data],
  );

  const placeHolderImage =
    data?.gender === 1
      ? require(`@/assets/images/female.jpg`)
      : require(`@/assets/images/male.jpg`);
  const backdropSource =
    data?.profile_path !== null
      ? { uri: getImage(data?.profile_path, "w780") }
      : placeHolderImage;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => refetch()}
            tintColor={Colors.primary}
          />
        }
      >
        <View style={styles.hero}>
          <RemoteImage
            source={backdropSource}
            placeholder={placeHolderImage}
            contentFit="cover"
            style={styles.heroBackdrop}
          />
          <LinearGradient
            colors={["rgba(11,15,20,0.2)", "rgba(11,15,20,0.85)", Colors.background]}
            locations={[0, 0.55, 1]}
            style={StyleSheet.absoluteFillObject}
          />

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={22} color={Colors.text} />
          </TouchableOpacity>

          <View style={styles.heroBottom}>
            <View style={styles.avatarWrap}>
              <RemoteImage
                source={backdropSource}
                placeholder={placeHolderImage}
                contentFit="cover"
                style={styles.avatar}
              />
            </View>
            <View style={styles.heroText}>
              <Text style={styles.name} numberOfLines={2}>
                {data?.name}
              </Text>
              {data?.known_for_department && (
                <Text style={styles.role}>{data.known_for_department}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.social}>
          <SocialMediaSection socialMediaLinks={socialMediaLinks} />
        </View>

        {personalInfo.length > 0 && (
          <View style={styles.pills}>
            {personalInfo.map((item, index) => (
              <View
                key={item.label}
                style={[
                  styles.pill,
                  index === personalInfo.length - 1 && styles.pillFull,
                ]}
              >
                <Text style={styles.pillLabel}>{item.label}</Text>
                <Text style={styles.pillValue} numberOfLines={2}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.bioCard}>
          <BiographySection data={data} />
        </View>

        <MoviesListContainer
          sectionHeading={"Known For"}
          moviePosters={popularMoviePosters}
        />
      </ScrollView>
    </View>
  );
};

export default CastOverView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    height: 320,
    width: "100%",
    overflow: "hidden",
  },
  heroBackdrop: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ scale: 1.1 }],
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 3,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 8,
    borderRadius: 20,
  },
  heroBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 2,
  },
  avatarWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: Colors.primary,
    padding: 3,
    backgroundColor: Colors.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 46,
  },
  heroText: {
    flex: 1,
    marginLeft: 16,
    marginBottom: 6,
  },
  name: {
    fontSize: 26,
    fontWeight: "800",
    color: Colors.text,
  },
  role: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 4,
  },
  social: {
    alignItems: "center",
    marginVertical: 14,
  },
  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  pill: {
    width: "48%",
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
  },
  pillFull: {
    width: "100%",
  },
  pillLabel: {
    fontSize: 11,
    color: Colors.secondaryText,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  pillValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },
  bioCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
});
