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
import YoutubePlayer from "react-native-youtube-iframe";
import { Colors } from "../theme";

const { width } = Dimensions.get("window");

const TrailerVideo = ({ movieTrailerId }: { movieTrailerId: string }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  if (!movieTrailerId) return null;
  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <AntDesign name="play-circle" size={40} color={Colors.primary} />
      </TouchableOpacity>

      <DisplayModal
        modalWidth={width - 15}
        modalHeight={220}
        animationType="fade"
        visible={isVisible}
        onClose={() => setIsVisible(false)}
      >
        <View style={styles.container}>
          <View style={styles.videoPlayer}>
            {Platform.OS !== "web" && (
              <View style={{ width: width * 0.9, height: 200 }}>
                <YoutubePlayer
                  width="100%"
                  height={300}
                  videoId={movieTrailerId}
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
