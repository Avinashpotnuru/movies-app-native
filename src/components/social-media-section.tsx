import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import React from "react";
import {
  Dimensions,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../theme";
import { SocialMediaLinks } from "../types";

const { width } = Dimensions.get("window");

const SocialMediaSection = ({
  socialMediaLinks,
}: {
  socialMediaLinks: SocialMediaLinks;
}) => {
  const openLink = (url?: string) => {
    if (!url) return;
    Linking.openURL(url);
  };

  const socialItems = [
    {
      key: "instagram",
      value: socialMediaLinks?.instagram,
      url: `https://www.instagram.com/${socialMediaLinks?.instagram}`,
      icon: <AntDesign name="instagram" size={24} color={Colors.primary} />,
    },
    {
      key: "twitter",
      value: socialMediaLinks?.twitter,
      url: `https://twitter.com/${socialMediaLinks?.twitter}`,
      icon: <AntDesign name="twitter" size={24} color={Colors.primary} />,
    },
    {
      key: "facebook",
      value: socialMediaLinks?.facebook,
      url: `https://www.facebook.com/${socialMediaLinks?.facebook}`,
      icon: <FontAwesome name="facebook" size={24} color={Colors.primary} />,
    },
  ];

  return (
    <View style={styles.container}>
      {socialItems.map(
        (item) =>
          item.value && (
            <TouchableOpacity
              key={item.key}
              style={styles.icon}
              onPress={() => openLink(item.url)}
            >
              {item.icon}
            </TouchableOpacity>
          ),
      )}
    </View>
  );
};

export default SocialMediaSection;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: width - 50,
    marginVertical: 10,
  },
  icon: {
    height: 40,
    width: 40,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 28,
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
});
