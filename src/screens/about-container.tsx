import RemoteImage from "@/src/components/remote-image";
import { Colors } from "@/src/theme/colors";
import { useTrendingMovies } from "@/src/hooks";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getImage } from "../utils/getImage";
import { Movie } from "../types";

const AboutContainer = () => {
  const features = [
    { icon: "flame-outline", label: "Trending movies & TV shows" },
    { icon: "heart-outline", label: "Save favorites and a wishlist" },
    { icon: "search-outline", label: "Search the entire TMDB catalog" },
    { icon: "star-outline", label: "Ratings, cast and recommendations" },
  ];

  const { data: trending } = useTrendingMovies();
  const gallery = React.useMemo(
    () =>
      ((trending?.results ?? []) as Movie[])
        .filter((item: Movie) => item.backdrop_path)
        .slice(0, 10)
        .map((item: Movie) => ({
          id: item.id,
          title: item.title || item.name || "",
          uri: getImage(item.backdrop_path as string, "w780"),
        })),
    [trending],
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      <View style={styles.logoWrap}>
        <View style={styles.logoBadge}>
          <Ionicons name="film" size={40} color={Colors.primary} />
        </View>
        <Text style={styles.appName}>CineWave</Text>
        <Text style={styles.tagline}>
          Your pocket companion for movies & TV shows.
        </Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What you can do</Text>
        {features.map((item, index) => (
          <View key={index} style={styles.featureRow}>
            <Ionicons
              name={item.icon as any}
              size={20}
              color={Colors.primary}
              style={styles.featureIcon}
            />
            <Text style={styles.featureLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gallery</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gallery}
        >
          {gallery.map((item) => (
            <View key={item.id} style={styles.galleryItem}>
              <RemoteImage
                source={{ uri: item.uri }}
                placeholder={require("@/assets/images/placeholder.jpg")}
                contentFit="cover"
                style={styles.galleryImage}
              />
              <View style={styles.galleryScrim} />
              <Text style={styles.galleryTitle} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Data provided by The Movie Database (TMDB).
        </Text>
        <Text style={styles.footerText}>
          CineWave is not endorsed by or affiliated with TMDB.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 12,
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
  logoWrap: {
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 24,
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(215,237,47,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  appName: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "800",
  },
  tagline: {
    color: Colors.secondaryText,
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },
  version: {
    color: Colors.secondaryText,
    fontSize: 12,
    marginTop: 10,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: Colors.secondaryText,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  featureIcon: {
    marginRight: 12,
  },
  featureLabel: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  gallery: {
    paddingHorizontal: 4,
  },
  galleryItem: {
    width: 240,
    height: 140,
    borderRadius: 12,
    marginRight: 12,
    overflow: "hidden",
    backgroundColor: Colors.card,
  },
  galleryImage: {
    width: 240,
    height: 140,
  },
  galleryScrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 48,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  galleryTitle: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 10,
    color: Colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  footer: {
    marginTop: 8,
  },
  footerText: {
    color: Colors.secondaryText,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});
