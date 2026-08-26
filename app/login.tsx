import { AppAlert, AuthInput, AuthShell } from "@/src/components";
import { loginUser } from "@/src/api/authService";
import { Colors } from "@/src/theme";
import { getFirebaseErrorMessage } from "@/src/utils/errorMessages";
import { AlertAction } from "@/src/components/app-alert";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen() {
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

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showAlert("Validation Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(email.trim(), password.trim());

      if (response?.user) {
        showAlert(
          "Login Success",
          `Welcome to CineWave ${response.user.displayName || ""}`,
          [{ text: "OK", onPress: () => router.replace("/(tabs)") }],
        );
      } else {
        showAlert("Login Failed", "User authentication failed");
      }
    } catch (error: unknown) {
      const message = getFirebaseErrorMessage(error);

      showAlert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthShell
        title="Welcome Back"
      subtitle="Sign in to continue to CineWave"
      footer={
        <Text style={styles.linkText}>
          Don&apos;t have an account?{" "}
          <Text style={styles.link} onPress={() => router.push("/register")}>
            Register
          </Text>
        </Text>
      }
    >
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
        onPress={handleLogin}
        disabled={loading}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color={Colors.background} />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
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
