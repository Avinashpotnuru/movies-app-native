import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import React from "react";
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../theme";
import { SocialMediaLinks } from "../types";

const SocialMediaSection = ({
  socialMediaLinks,
}: {
  socialMediaLinks: SocialMediaLinks;
}) => {
  const openLink = async ({
    appUrl,
    webUrl,
  }: {
    appUrl?: string;
    webUrl: string;
  }) => {
    try {
      if (appUrl && (await Linking.canOpenURL(appUrl))) {
        await Linking.openURL(appUrl);
        return;
      }
    } catch {}
    try {
      const supported = await Linking.canOpenURL(webUrl);
      if (supported) {
        await Linking.openURL(webUrl);
      }
    } catch (e) {
      console.error(`Failed to open URL: ${webUrl}`, e);
    }
  };

  const normalizeHandle = (h?: string) =>
    h
      ?.trim()
      .replace(/^@/, "")
      .replace(/[^\w.]/g, "") || "";

  const ICON_SIZE = 24;
  const ICON_COLOR = Colors.primary;

  const socialItems = React.useMemo(
    () => [
      {
        key: "instagram",
        value: normalizeHandle(socialMediaLinks?.instagram),
        appUrl: `instagram://user?username=${normalizeHandle(socialMediaLinks?.instagram)}`,
        webUrl: `https://www.instagram.com/${normalizeHandle(socialMediaLinks?.instagram)}`,
        icon: (
          <AntDesign name="instagram" size={ICON_SIZE} color={ICON_COLOR} />
        ),
      },
      {
        key: "twitter",
        value: normalizeHandle(socialMediaLinks?.twitter),
        appUrl: `twitter://user?screen_name=${normalizeHandle(socialMediaLinks?.twitter)}`,
        webUrl: `https://twitter.com/${normalizeHandle(socialMediaLinks?.twitter)}`,
        icon: <AntDesign name="twitter" size={ICON_SIZE} color={ICON_COLOR} />,
      },
      {
        key: "facebook",
        value: normalizeHandle(socialMediaLinks?.facebook),
        appUrl: `fb://facewebmodal/f?href=https://www.facebook.com/${normalizeHandle(socialMediaLinks?.facebook)}`,
        webUrl: `https://www.facebook.com/${normalizeHandle(socialMediaLinks?.facebook)}`,
        icon: (
          <FontAwesome name="facebook" size={ICON_SIZE} color={ICON_COLOR} />
        ),
      },
    ],
    [
      socialMediaLinks?.instagram,
      socialMediaLinks?.twitter,
      socialMediaLinks?.facebook,
      ICON_SIZE,
      ICON_COLOR,
    ],
  );

  return (
    <View style={styles.container}>
      {socialItems.map(
        (item) =>
          item.value && (
            <TouchableOpacity
              key={item.key}
              style={styles.icon}
              onPress={() =>
                openLink({ appUrl: item.appUrl, webUrl: item.webUrl })
              }
              accessibilityRole="button"
              accessibilityLabel={`Open ${item.key}`}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
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
  },
  icon: {
    height: 42,
    width: 42,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 21,
  },
});
