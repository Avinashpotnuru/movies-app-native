import { loginUser } from "@/src/api/authService";
import { Colors } from "@/src/theme";
import { getFirebaseErrorMessage } from "@/src/utils/errorMessages";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Validation Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(email.trim(), password.trim());

      if (response?.user) {
        Alert.alert(
          "Login Success",
          `Welcome to CineWave ${response.user.displayName || ""}`,
        );

        router.replace("/(tabs)");
      } else {
        Alert.alert("Login Failed", "User authentication failed");
      }
    } catch (error: unknown) {
      const message = getFirebaseErrorMessage(error);

      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("@/assets/images/loginBg.png")}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Dark overlay */}
        <View style={styles.overlay}>
          <View style={styles.card}>
            <View
              style={[
                styles.inputContainer,
                focusedInput === "email" && styles.focusedInput,
              ]}
            >
              <Feather
                name="mail"
                size={20}
                color={focusedInput === "email" ? Colors.primary : "#9CA3AF"}
              />

              <TextInput
                placeholder="Enter Email"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                importantForAutofill="no"
                value={email}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
                onChangeText={setEmail}
              />
            </View>

            <View
              style={[
                styles.inputContainer,
                focusedInput === "password" && styles.focusedInput,
              ]}
            >
              <Feather
                name="lock"
                size={20}
                color={focusedInput === "password" ? Colors.primary : "#9CA3AF"}
              />

              <TextInput
                placeholder="Enter Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                importantForAutofill="no"
                value={password}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.registerText}>
              Don&apos;t have an account?{" "}
              <Text
                style={styles.registerLink}
                onPress={() => router.push("/register")}
              >
                Register
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    paddingHorizontal: 20,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "rgba(0, 0, 0, 0.72)",
    paddingHorizontal: 24,
    paddingVertical: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },

  appName: {
    color: Colors.primary,
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 3,
    marginBottom: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#D1D5DB",
    marginBottom: 25,
  },

  inputContainer: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  focusedInput: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#111827",
    fontSize: 16,
  },

  button: {
    width: "100%",
    height: 52,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 4,
  },

  disabledButton: {
    backgroundColor: "#6B7280",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  registerText: {
    marginTop: 22,
    textAlign: "center",
    color: "#D1D5DB",
    fontSize: 14,
  },

  registerLink: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});
