import { DisplayModal } from "@/src/components";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import { Colors } from "../theme";

const { width } = Dimensions.get("window");
const videoHeight = Math.round((width * 0.9 * 9) / 16);

const TrailerVideo = ({ movieTrailerId }: { movieTrailerId: string }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const playerRef = React.useRef<YoutubeIframeRef>(null);
  if (!movieTrailerId) return null;
  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        accessibilityRole="button"
        accessibilityLabel="Play trailer"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <AntDesign name="play-circle" size={40} color={Colors.primary} />
      </TouchableOpacity>

      <DisplayModal
        modalWidth={width - 15}
        modalHeight={220}
        animationType="fade"
        visible={isVisible}
        onClose={() => {
          playerRef.current?.seekTo(0, true);
          setIsVisible(false);
        }}
      >
        <View style={styles.container}>
          <View style={styles.videoPlayer}>
            {Platform.OS !== "web" && isVisible && (
              <View style={{ width: width * 0.9, height: videoHeight }}>
                <YoutubePlayer
                  ref={playerRef}
                  width="100%"
                  height={videoHeight}
                  videoId={movieTrailerId}
                  play={isVisible}
                  forceAndroidAutoplay={false}
                  onChangeState={(state: string) => {
                    if (state === "ended") {
                      setIsVisible(false);
                    }
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </DisplayModal>
    </View>
  );
};

export default TrailerVideo;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  videoPlayer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
