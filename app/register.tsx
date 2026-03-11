import { registerUser } from "@/src/api/authService";
import { Colors } from "@/src/theme";
import { getFirebaseErrorMessage } from "@/src/utils/errorMessages";
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
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
      } else {
        Alert.alert("Registration Failed", "Unable to create account");
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
      <TextInput
        placeholder="Enter Name"
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Enter Email"
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Enter Password"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Register"}
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
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#222",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: Colors.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },
});
