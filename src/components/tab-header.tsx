import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../config/firebase";
import { Colors } from "../theme";

const TabHeader = () => {
  return (
    <View
      style={style.header}
      accessible
      accessibilityRole="header"
      accessibilityLabel="Header"
    >
      <Image
        accessibilityLabel="CineWave Logo"
        accessibilityHint="This is the CineWave logo"
        accessibilityRole="image"
        testID="logo"
        accessibilityIgnoresInvertColors
        accessibilityLiveRegion="polite"
        accessibilityValue={{ min: 0, max: 1, now: 0 }}
        style={style.logo}
        source={require("@/assets/images/cineWaveLogo.png")}
      />
      <Text style={style.userName}>
        Welcome <Text style={style.name}>{auth.currentUser?.displayName}</Text>
      </Text>

      <TouchableOpacity>
        <MaterialIcons
          name="logout"
          size={24}
          color={"red"}
          accessibilityLabel="Logout"
          accessibilityHint="This button will log you out of the app"
          accessibilityRole="button"
          testID="logout"
          accessibilityIgnoresInvertColors
          onPress={() => auth.signOut()}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TabHeader;

const style = StyleSheet.create({
  header: {
    height: 45,
    backgroundColor: Colors.card,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  logo: {
    width: 30,
    height: 30,
  },
  userName: {
    color: Colors.text,
  },
  name: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 18,
    fontStyle: "italic",
  },
});
