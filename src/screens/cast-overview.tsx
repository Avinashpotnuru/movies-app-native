import {
  BiographySection,
  ErrorState,
  Loading,
  MoviesListContainer,
  RemoteImage,
  SectionHeading,
  SocialMediaSection,
} from "@/src/components";
import { useGetCastDetails } from "@/src/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  Linking,
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

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (iso: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return iso;
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12) return iso;
  return `${day} ${MONTHS[month - 1]} ${match[1]}`;
};

const getAge = (birthday?: string, deathday?: string): number | null => {
  if (!birthday) return null;
  const birth = new Date(birthday);
  if (Number.isNaN(birth.getTime())) return null;
  const end = deathday ? new Date(deathday) : new Date();
  let age = end.getFullYear() - birth.getFullYear();
  const m = end.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && end.getDate() < birth.getDate())) age -= 1;
  return age;
};

const hostFromUrl = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const openUrl = async (url: string) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  } catch (e) {
    console.error(`Failed to open URL: ${url}`, e);
  }
};

const PERSONAL_ICONS: Record<string, keyof typeof Feather.glyphMap> = {
  "Known For": "award",
  Born: "gift",
  Died: "x-circle",
  "Place of Birth": "map-pin",
};

const CastOverView = ({ castId }: { castId: number }) => {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetCastDetails(castId);

  const popularMoviePosters: MoviesCardType[] = useMemo(
    () =>
      data?.combined_credits?.cast?.map(
        (movie: Movie & { original_name?: string }) => ({
          id: movie.id,
          title: movie.title,
          name: movie.name,
          original_title: movie.original_title,
          original_name: movie.original_name,
          poster_path: movie.poster_path,
          typeOfList: movie.media_type,
        }),
      ) || [],
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

  const personalInfo = useMemo(() => {
    const age = data?.birthday ? getAge(data.birthday, data.deathday) : null;
    return [
      { label: "Known For", value: data?.known_for_department },
      { label: "Born", value: data?.birthday ? formatDate(data.birthday) : undefined },
      { label: "Died", value: data?.deathday ? formatDate(data.deathday) : undefined },
      { label: "Age", value: age !== null && age !== undefined ? String(age) : undefined },
      { label: "Place of Birth", value: data?.place_of_birth },
    ].filter((item) => !!item.value);
  }, [data]);

  const crewWorks = useMemo(() => {
    const crew = data?.combined_credits?.crew ?? [];
    const byJob = new Map<string, MoviesCardType[]>();
    const seenByJob = new Map<string, Set<number>>();
    for (const credit of crew) {
      if (!credit.job) continue;
      const seen = seenByJob.get(credit.job);
      if (seen?.has(credit.id)) continue;
      const existing = byJob.get(credit.job) ?? [];
      const pushSeen = seenByJob.get(credit.job) ?? new Set<number>();
      pushSeen.add(credit.id);
      seenByJob.set(credit.job, pushSeen);
      byJob.set(credit.job, [
        ...existing,
        {
          id: credit.id,
          title: credit.title,
          name: credit.name,
          original_title: credit.original_title,
          original_name: credit.original_name,
          poster_path: credit.poster_path,
          typeOfList: credit.media_type,
        },
      ]);
    }
    return [...byJob.entries()]
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 3)
      .map(([job, items]) => ({ job, items }));
  }, [data]);

  const alsoKnownAs = useMemo(
    () =>
      Array.isArray(data?.also_known_as)
        ? (data.also_known_as as string[]).filter(Boolean).slice(0, 8)
        : [],
    [data],
  );

  const profileImages = useMemo(
    () =>
      Array.isArray(data?.images?.profiles)
        ? (data.images.profiles as { file_path: string }[]).slice(0, 12)
        : [],
    [data],
  );

  const placeHolderImage =
    data?.gender === 1
      ? require(`@/assets/images/female.jpg`)
      : require(`@/assets/images/male.jpg`);

  const avatarSource = data?.profile_path
    ? { uri: getImage(data.profile_path, "w342") }
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
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => refetch()}
            tintColor={Colors.primary}
          />
        }
      >
        <View style={styles.hero}>
          <LinearGradient
            colors={[
              "rgba(11,15,20,0)",
              "rgba(11,15,20,0.55)",
              Colors.background,
            ]}
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

          <View style={styles.heroCenter}>
            <View style={styles.avatarWrap}>
              <RemoteImage
                source={avatarSource}
                placeholder={placeHolderImage}
                contentFit="cover"
                recyclingKey={data?.id?.toString()}
                style={styles.avatar}
              />
            </View>

            <Text style={styles.name} numberOfLines={2}>
              {data?.name}
            </Text>

            {data?.known_for_department ? (
              <Text style={styles.role}>{data.known_for_department}</Text>
            ) : null}

            <View style={styles.socialWrap}>
              <SocialMediaSection socialMediaLinks={socialMediaLinks} />
            </View>
          </View>
        </View>

        {personalInfo.length > 0 && (
          <View style={styles.statGrid}>
            {personalInfo.map((item) => (
              <View key={item.label} style={styles.statCard}>
                <View style={styles.statTopRow}>
                  <Text style={styles.statLabel}>{item.label}</Text>
                  {PERSONAL_ICONS[item.label] ? (
                    <Feather
                      name={PERSONAL_ICONS[item.label]}
                      size={15}
                      color={Colors.secondaryText}
                    />
                  ) : null}
                </View>
                <Text style={styles.statValue} numberOfLines={2}>
                  {item.value}
                </Text>
              </View>
            ))}
            {personalInfo.length % 2 === 1 && (
              <View style={styles.glowCard} pointerEvents="none">
                <LinearGradient
                  colors={[
                    "rgba(215,237,47,0.12)",
                    "rgba(255,107,0,0.10)",
                    "rgba(11,15,20,0)",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFillObject}
                />
                <View style={styles.glowOrb}>
                  <Feather name="zap" size={18} color={Colors.primary} />
                </View>
              </View>
            )}
          </View>
        )}

        {(data?.imdb_id || data?.homepage) && (
          <View style={styles.linkGrid}>
            {data?.imdb_id ? (
              <TouchableOpacity
                style={styles.linkCard}
                activeOpacity={0.7}
                onPress={() =>
                  openUrl(`https://www.imdb.com/name/${data.imdb_id}`)
                }
                accessibilityRole="link"
                accessibilityLabel="Open IMDb profile"
              >
                <View style={styles.linkTopRow}>
                  <Text style={styles.linkLabel}>IMDb</Text>
                  <Feather
                    name="external-link"
                    size={14}
                    color={Colors.primary}
                  />
                </View>
                <Text style={styles.linkValue} numberOfLines={1}>
                  imdb.com/name/{data.imdb_id}
                </Text>
              </TouchableOpacity>
            ) : null}
            {data?.homepage ? (
              <TouchableOpacity
                style={styles.linkCard}
                activeOpacity={0.7}
                onPress={() => openUrl(data.homepage)}
                accessibilityRole="link"
                accessibilityLabel="Open website"
              >
                <View style={styles.linkTopRow}>
                  <Text style={styles.linkLabel}>Website</Text>
                  <Feather
                    name="external-link"
                    size={14}
                    color={Colors.primary}
                  />
                </View>
                <Text style={styles.linkValue} numberOfLines={1}>
                  {hostFromUrl(data.homepage)}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}

        {alsoKnownAs.length > 0 && (
          <View style={styles.akaCard}>
            <Text style={styles.akaLabel}>Also Known As</Text>
            <View style={styles.akaChips}>
              {alsoKnownAs.map((name) => (
                <View key={name} style={styles.akaChip}>
                  <Text style={styles.akaChipText}>{name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.bioCard}>
          <BiographySection data={data} />
        </View>

        {profileImages.length > 0 && (
          <View style={styles.gallery}>
            <SectionHeading title="Photos" style={styles.galleryHeading} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryRow}
            >
              {profileImages.map((image) => (
                <RemoteImage
                  key={image.file_path}
                  source={{ uri: getImage(image.file_path, "w342") }}
                  placeholder={placeHolderImage}
                  contentFit="cover"
                  recyclingKey={image.file_path}
                  style={styles.galleryImg}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {crewWorks.map(({ job, items }) => (
          <MoviesListContainer
            key={job}
            sectionHeading={job}
            moviePosters={items}
          />
        ))}

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
  content: {
    paddingBottom: 32,
  },
  hero: {
    height: 360,
    width: "100%",
    overflow: "hidden",
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
  heroCenter: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 24,
    zIndex: 2,
  },
  avatarWrap: {
    width: 132,
    height: 132,
    borderRadius: 66,
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
    borderRadius: 62,
  },
  name: {
    marginTop: 14,
    fontSize: 26,
    fontWeight: "800",
    color: Colors.text,
    textAlign: "center",
  },
  role: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "700",
    color: Colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },
  socialWrap: {
    marginTop: 6,
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 14,
  },
  statCard: {
    width: "48.2%",
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  statTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.secondaryText,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  statValue: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
    fontVariant: ["tabular-nums"],
  },
  glowCard: {
    width: "48.2%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  glowOrb: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(215,237,47,0.12)",
    borderWidth: 1,
    borderColor: "rgba(215,237,47,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  linkGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  linkCard: {
    width: "48.2%",
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  linkTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.secondaryText,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  linkValue: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
    fontVariant: ["tabular-nums"],
  },
  akaCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  akaLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.secondaryText,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  akaChips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  akaChip: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  akaChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
  },
  bioCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  gallery: {
    marginBottom: 8,
  },
  galleryHeading: {
    paddingHorizontal: 16,
  },
  galleryRow: {
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 6,
  },
  galleryImg: {
    width: 120,
    height: 170,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: Colors.card,
  },
});