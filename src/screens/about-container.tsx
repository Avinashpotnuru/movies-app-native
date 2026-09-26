import { router } from "expo-router";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/src/theme/colors";

const PORTFOLIO_URL = "https://avinashpotnuruportfolio.netlify.app/";

const openPortfolio = async () => {
  try {
    const supported = await Linking.canOpenURL(PORTFOLIO_URL);
    if (supported) await Linking.openURL(PORTFOLIO_URL);
  } catch (e) {
    console.error("Failed to open portfolio:", e);
  }
};

const AboutContainer = () => {
  const features = [
    { icon: "flame-outline", label: "Trending movies & TV shows" },
    { icon: "heart-outline", label: "Save favorites and a wishlist" },
    { icon: "search-outline", label: "Search the entire TMDB catalog" },
    { icon: "star-outline", label: "Ratings, cast and recommendations" },
    { icon: "play-circle-outline", label: "Watch trailers right in the app" },
    { icon: "people-circle-outline", label: "Actor profiles, photos & filmography" },
    { icon: "options-outline", label: "Filter movies & shows by genre" },
    { icon: "time-outline", label: "Now Playing, Top Rated & Popular picks" },
  ];

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
        <Text style={styles.sectionTitle}>Created by</Text>
        <View style={styles.creatorCard}>
          <View style={styles.creatorAvatar}>
            <Text style={styles.creatorInitials}>AP</Text>
          </View>
          <View style={styles.creatorInfo}>
            <Text style={styles.creatorName}>Avinash Potnuru</Text>
            <Text style={styles.creatorRole}>Developer of CineWave</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.portfolioRow}
          onPress={openPortfolio}
          accessibilityRole="link"
          accessibilityLabel="Open Avinash Potnuru's portfolio"
        >
          <Ionicons
            name="globe-outline"
            size={20}
            color={Colors.primary}
            style={styles.portfolioIcon}
          />
          <View style={styles.portfolioInfo}>
            <Text style={styles.portfolioLabel}>Portfolio</Text>
          </View>
          <Ionicons name="open-outline" size={16} color={Colors.accent} />
        </TouchableOpacity>
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
  creatorCard: {
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
  creatorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: "rgba(215,237,47,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  creatorInitials: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "800",
  },
  creatorInfo: {
    flex: 1,
  },
  creatorName: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  creatorRole: {
    color: Colors.secondaryText,
    fontSize: 13,
    marginTop: 2,
  },
  portfolioRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  portfolioIcon: {
    marginRight: 12,
  },
  portfolioInfo: {
    flex: 1,
  },
  portfolioLabel: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "600",
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
