import React from "react";
import { Image as ExpoImage, ImageSource } from "expo-image";
import { StyleProp, ImageStyle } from "react-native";

type RemoteImageProps = {
  source?: ImageSource;
  placeholder?: ImageSource;
  contentFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  style?: StyleProp<ImageStyle>;
  cachePolicy?: "memory" | "disk" | "memory-disk";
};

const RemoteImage = ({
  source,
  placeholder,
  contentFit = "cover",
  style,
  cachePolicy = "memory-disk",
}: RemoteImageProps) => {
  return (
    <ExpoImage
      source={source}
      placeholder={placeholder}
      contentFit={contentFit}
      cachePolicy={cachePolicy}
      transition={150}
      style={style}
    />
  );
};

export default RemoteImage;
