import { auth } from "@/src/config/firebase";
import { Colors } from "@/src/theme/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Stack, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Image, StatusBar } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    });

    return unsubscribe;
  }, []);

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
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.text,

            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "bold",
              color: Colors.text,
            },

            headerLeft: () => (
              <Image
                style={{ width: 40, height: 40 }}
                source={require("../assets/images/cineWaveLogo.png")}
              />
            ),

            headerRight: () => (
              <AntDesign
                name="logout"
                size={24}
                color={Colors.text}
                onPress={() => auth.signOut()}
              />
            ),
          }}
        >
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen
            name="(tabs)"
            options={{
              title: "",
            }}
          />
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

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
};
