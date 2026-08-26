import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getApiErrorMessage } from "../utils/errorMessages";
import { Colors } from "../theme";

type ErrorStateProps = {
  error?: unknown;
  onRetry?: () => void;
  title?: string;
  message?: string;
};

const ErrorState = ({ error, onRetry, title, message }: ErrorStateProps) => {
  const [retrying, setRetrying] = useState(false);

  const displayMessage = message ?? getApiErrorMessage(error);

  const handleRetry = () => {
    if (!onRetry) return;
    setRetrying(true);
    Promise.resolve(onRetry()).finally(() => setRetrying(false));
  };

  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="alert"
      accessibilityLabel={title ?? "Something went wrong"}
    >
      <MaterialIcons name="error-outline" size={48} color={Colors.error} />

      <Text style={styles.title}>{title ?? "Something went wrong"}</Text>

      <Text style={styles.message}>{displayMessage}</Text>

      {onRetry && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={handleRetry}
          disabled={retrying}
          accessibilityRole="button"
          accessibilityLabel="Retry"
        >
          {retrying ? (
            <ActivityIndicator color={Colors.background} size="small" />
          ) : (
            <View style={styles.retryContent}>
              <MaterialIcons
                name="refresh"
                size={18}
                color={Colors.background}
              />
              <Text style={styles.retryText}>Retry</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.background,
  },
  title: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  message: {
    color: Colors.secondaryText,
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  retryContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  retryText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
});
