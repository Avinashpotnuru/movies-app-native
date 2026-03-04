import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../theme";

type TabType = "movie" | "tv";

interface TabsProps {
  selected: TabType;
  onChange: (value: TabType) => void;
}

export default function TabsContainer({ selected, onChange }: TabsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, selected === "movie" && styles.activeTab]}
        onPress={() => onChange("movie")}
      >
        <Text style={[styles.text, selected === "movie" && styles.activeText]}>
          Movies
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selected === "tv" && styles.activeTab]}
        onPress={() => onChange("tv")}
      >
        <Text style={[styles.text, selected === "tv" && styles.activeText]}>
          TV Shows
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    borderRadius: 25,
    margin: 16,
    padding: 4,
  },

  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 15,
    color: Colors.secondaryText,
  },

  activeTab: {
    backgroundColor: Colors.primary,
  },

  text: {
    color: "#aaa",
    fontWeight: "600",
  },

  activeText: {
    color: "#180404",
  },
});
