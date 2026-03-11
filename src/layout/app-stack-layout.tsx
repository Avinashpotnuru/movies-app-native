import { Colors } from "@/src/theme/colors";

import { Stack } from "expo-router";
import { StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { TabHeader } from "@/src/components";
import { useAuthRedirect } from "@/src/hooks";

export default function AppStackLayout() {
  useAuthRedirect();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#000"
          translucent={false}
        />

        <Stack
          screenOptions={{
            header: () => <TabHeader />,
          }}
        >
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ title: "" }} />
          <Stack.Screen
            name="movie-details/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="cast-details/[id]"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
