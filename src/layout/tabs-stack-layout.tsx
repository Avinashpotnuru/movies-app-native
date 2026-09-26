import { Colors } from "@/src/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const TabIcon = ({
  name,
  outlineName,
  size,
  focused,
}: {
  name: IconName;
  outlineName: IconName;
  size: number;
  focused: boolean;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.08 : 1,
      damping: 14,
      stiffness: 220,
      mass: 0.6,
      useNativeDriver: true,
    }).start();
  }, [focused, scale]);

  return (
    <Animated.View
      style={[
        styles.iconWrap,
        focused && styles.iconWrapActive,
        { transform: [{ scale }] },
      ]}
    >
      <Ionicons
        name={focused ? name : outlineName}
        size={focused ? size + 1 : size}
        color={focused ? Colors.primary : Colors.secondaryText}
      />
    </Animated.View>
  );
};

const TabLabel = ({ title, focused }: { title: string; focused: boolean }) => (
  <Text
    allowFontScaling={false}
    style={[styles.label, focused && styles.labelActive]}
  >
    {title}
  </Text>
);

const TabsStackLayout = () => {
  return (
    <Tabs
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.secondaryText,
        tabBarStyle: styles.bar,
        tabBarItemStyle: styles.item,
        tabBarLabelStyle: styles.label,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: ({ focused }) => <TabLabel title="Home" focused={focused} />,
          tabBarIcon: ({ size, focused }) => (
            <TabIcon
              name="home"
              outlineName="home-outline"
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="movies"
        options={{
          title: "Movies",
          tabBarLabel: ({ focused }) => (
            <TabLabel title="Movies" focused={focused} />
          ),
          tabBarIcon: ({ size, focused }) => (
            <TabIcon
              name="film"
              outlineName="film-outline"
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="tvshows"
        options={{
          title: "TV Shows",
          tabBarLabel: ({ focused }) => (
            <TabLabel title="TV Shows" focused={focused} />
          ),
          tabBarIcon: ({ size, focused }) => (
            <TabIcon
              name="tv"
              outlineName="tv-outline"
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarLabel: ({ focused }) => (
            <TabLabel title="Favorites" focused={focused} />
          ),
          tabBarIcon: ({ size, focused }) => (
            <TabIcon
              name="heart"
              outlineName="heart-outline"
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: ({ focused }) => (
            <TabLabel title="Profile" focused={focused} />
          ),
          tabBarIcon: ({ size, focused }) => (
            <TabIcon
              name="person"
              outlineName="person-outline"
              size={size}
              focused={focused}
            />
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
    bottom: 14,
    left: 20,
    right: 20,
    height: 68,
    backgroundColor: "rgba(20,26,34,0.97)",
    borderRadius: 24,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
    paddingTop: 8,
    paddingHorizontal: 6,
    elevation: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrap: {
    width: 44,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapActive: {
    backgroundColor: "rgba(215,237,47,0.16)",
  },
  label: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.4,
    color: Colors.secondaryText,
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: "800",
  },
});