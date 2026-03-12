import { loginUser } from "@/src/api/authService";
import { Colors } from "@/src/theme";
import { getFirebaseErrorMessage } from "@/src/utils/errorMessages";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
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
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser(email.trim(), password.trim());

      if (response?.user) {
        Alert.alert(
          "Login Success",
          `Welcome to CineWave ${response.user.displayName}`,
        );

        router.replace("/(tabs)");
      } else {
        Alert.alert("Login Failed", "User authentication failed");
      }
    } catch (error: any) {
      const message = getFirebaseErrorMessage(error);
      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        source={require("@/assets/images/cineWaveLogo.png")}
        style={styles.logo}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />

      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <View
          style={[
            styles.inputContainer,
            {
              borderColor: focusedInput === "email" ? "#2563EB" : "#D1D5DB",
            },
          ]}
        >
          <Feather name="mail" size={20} color="#6B7280" />
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
            {
              borderColor: focusedInput === "password" ? "#2563EB" : "#D1D5DB",
            },
          ]}
        >
          <Feather name="lock" size={20} color="#6B7280" />
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            style={styles.input}
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
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.registerText}>
          {"Don't have an account?"}
          <Text
            style={styles.registerLink}
            onPress={() => router.push("/register")}
          >
            {" "}
            Register
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  logo: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginBottom: 50,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#111827",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 50,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#111827",
    fontSize: 16,
  },

  button: {
    height: 50,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },

  disabledButton: {
    backgroundColor: "#9E9E9E",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },

  registerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#374151",
  },

  registerLink: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});
