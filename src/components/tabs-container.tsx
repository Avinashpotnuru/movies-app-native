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
  selected: TabType;
  onPress: (value: TabType) => void;
}) {
  const isActive = selected === value;
  const handlePress = useCallback(() => {
    if (!isActive) onPress(value);
  }, [isActive, onPress, value]);

  return (
    <Pressable
      style={[styles.tab, isActive && styles.activeTab]}
      onPress={handlePress}
      android_ripple={{ color: Colors.primary, borderless: false }}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>{label}</Text>
    </Pressable>
  );
});

export default function TabsContainer({ selected, onChange }: TabsProps) {
  const onPressMovie = useCallback(() => {
    if (selected !== `movie`) onChange(`movie`);
  }, [selected, onChange]);

  const onPressTv = useCallback(() => {
    if (selected !== `tv`) onChange(`tv`);
  }, [selected, onChange]);

  return (
    <View style={styles.container}>
      <TabButton
        label={`Movies`}
        value={`movie`}
        selected={selected}
        onPress={() => onPressMovie()}
      />
      <TabButton
        label={`TV Shows`}
        value={`tv`}
        selected={selected}
        onPress={() => onPressTv()}
      />
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
