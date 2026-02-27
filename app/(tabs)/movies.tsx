import { Colors } from "@/src/theme/colors";
import { Text, View } from "react-native";

export default function MoviesScreen() {
 
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>Movies Screen 🎬</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
};
