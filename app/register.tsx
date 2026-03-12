import { registerUser } from "@/src/api/authService";
import { Colors } from "@/src/theme";
import { getFirebaseErrorMessage } from "@/src/utils/errorMessages";
import { Feather } from "@expo/vector-icons";
import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Validation Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser(
        name.trim(),
        email.trim(),
        password.trim(),
      );

      if (response?.user) {
        await updateProfile(response.user, {
          displayName: name.trim(),
        });

        Alert.alert("Registration Success", `Account created for ${name}`);
      }
    } catch (error: any) {
      const message = getFirebaseErrorMessage(error);
      Alert.alert("Registration Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: focusedInput === "fullName" ? "#2563EB" : "#D1D5DB",
          },
        ]}
      >
        <Feather name="user" size={20} color="#6B7280" />
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          onChangeText={setName}
          onFocus={() => setFocusedInput("fullName")}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

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
          placeholder="Email Address"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          onChangeText={setEmail}
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput(null)}
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
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating Account..." : "Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "#F9FAFB",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#111827",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
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
    backgroundColor: Colors.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
