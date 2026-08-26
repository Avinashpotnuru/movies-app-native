import React, { memo, useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme";

type TabType = "movie" | "tv";

interface TabsProps {
  selected: TabType;
  onChange: (value: TabType) => void;
}

const TabButton = memo(function TabButton({
  label,
  value,
  selected,
  onPress,
}: {
  label: string;
  value: TabType;
  selected: boolean;
  onPress: (value: TabType) => void;
}) {
  const handlePress = useCallback(() => onPress(value), [onPress, value]);

  return (
    <Pressable
      style={[styles.tab, selected && styles.activeTab]}
      onPress={handlePress}
      android_ripple={{ color: Colors.primary, borderless: false }}
      accessibilityRole="tab"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.text, selected && styles.activeText]}>{label}</Text>
    </Pressable>
  );
});

export default function TabsContainer({ selected, onChange }: TabsProps) {
  return (
    <View style={styles.container}>
      <TabButton
        label="Movies"
        value="movie"
        selected={selected === "movie"}
        onPress={onChange}
      />
      <TabButton
        label="TV Shows"
        value="tv"
        selected={selected === "tv"}
        onPress={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    borderRadius: 25,
    margin: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 21,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  text: {
    color: Colors.secondaryText,
    fontWeight: "600",
    fontSize: 14,
  },
  activeText: {
    color: Colors.background,
    fontWeight: "800",
  },
});
