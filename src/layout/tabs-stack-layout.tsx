import { Colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const TabIcon = ({
  name,
  color,
  size,
  focused,
}: {
  name: IconName;
  color: string;
  size: number;
  focused: boolean;
}) => (
  <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
    <Ionicons name={name} size={size} color={color} />
  </View>
);

const TabsStackLayout = () => {
  return (
    <Tabs
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.secondaryText,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.item,
        tabBarStyle: styles.bar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="home" color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="movies"
        options={{
          title: "Movies",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="film" color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="tvshows"
        options={{
          title: "TV Shows",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="tv" color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="heart" color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="person" color={color} size={size} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsStackLayout;

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    bottom: 16,
    left: 24,
    right: 24,
    height: 76,
    backgroundColor: Colors.card,
    borderRadius: 24,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  iconWrap: {
    width: 48,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapActive: {
    backgroundColor: "rgba(215,237,47,0.15)",
  },
});
