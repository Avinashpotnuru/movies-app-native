import { loginUser } from "@/src/api/authService";
import { Colors } from "@/src/theme";
import { getFirebaseErrorMessage } from "@/src/utils/errorMessages";
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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser(email.trim(), password.trim());
      console.log(response, "response");
      if (response?.user) {
        Alert.alert(
          "Login Success",
          `Welcome to CineWave ${response.user.displayName}, Enjoy your movie experience!`,
        );
        router.replace("/(tabs)");
      } else {
        Alert.alert("Login Failed", "User authentication failed");
      }
    } catch (error: any) {
      console.log(error.message, "message");
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

        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

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
          {" Don't have an account?"}
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
    backgroundColor: "#f4f6f8",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    shadowColor: Colors.primary,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#333",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fafafa",
    marginBottom: 15,
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
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  registerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#333",
  },

  registerLink: {
    color: Colors.primary,
    fontWeight: "bold",
  },

  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 60,
  },
});
