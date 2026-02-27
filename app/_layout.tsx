import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Colors } from "@/src/theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
        translucent={false}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        {/* <Stack.Screen name="details/[id]" /> */}
      </Stack>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
};
