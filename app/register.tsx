import { AppAlert, AuthInput, AuthShell } from "@/src/components";
import { AlertAction } from "@/src/components/app-alert";
import { registerUser } from "@/src/api/authService";
import { Colors } from "@/src/theme";
import { getFirebaseErrorMessage } from "@/src/utils/errorMessages";
import { updateProfile } from "firebase/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    title: string;
    message: string;
    actions: AlertAction[];
  } | null>(null);

  const showAlert = (
    title: string,
    message: string,
    actions?: AlertAction[],
  ) => setAlert({ title, message, actions: actions ?? [{ text: "OK" }] });

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      showAlert("Validation Error", "Please fill all fields");
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

        showAlert(
          "Registration Success",
          `Account created for ${name.trim()}`,
          [{ text: "OK", onPress: () => router.replace("/login") }],
        );
      }
    } catch (error: unknown) {
      const message = getFirebaseErrorMessage(error);

      showAlert("Registration Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthShell
        title="Create Account"
      subtitle="Join CineWave to track your favorites"
      footer={
        <Text style={styles.linkText}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={() => router.push("/login")}>
            Sign In
          </Text>
        </Text>
      }
    >
      <AuthInput
        icon="user"
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoComplete="name"
      />

      <AuthInput
        icon="mail"
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoComplete="email"
        importantForAutofill="no"
      />

      <AuthInput
        icon="lock"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
        importantForAutofill="no"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleRegister}
        disabled={loading}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color={Colors.background} />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
    </AuthShell>

    <AppAlert
      visible={!!alert}
      title={alert?.title}
      message={alert?.message}
      actions={alert?.actions}
      onClose={() => setAlert(null)}
    />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 52,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: "rgba(215,237,47,0.5)",
  },
  buttonText: {
    color: Colors.background,
    fontSize: 17,
    fontWeight: "700",
  },
  linkText: {
    marginTop: 22,
    textAlign: "center",
    color: Colors.secondaryText,
    fontSize: 14,
  },
  link: {
    color: Colors.primary,
    fontWeight: "700",
  },
});
