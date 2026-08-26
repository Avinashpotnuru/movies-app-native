import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme";

export type AlertAction = {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
};

type AppAlertProps = {
  visible: boolean;
  title?: string;
  message?: string;
  actions?: AlertAction[];
  onClose: () => void;
};

const AppAlert = ({
  visible,
  title,
  message,
  actions = [{ text: "OK" }],
  onClose,
}: AppAlertProps) => {
  const handlePress = (action: AlertAction) => {
    action.onPress?.();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <View style={styles.overlay}>
        <View style={styles.card} accessibilityRole="alert">
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.actions}>
            {actions.map((action, index) => {
              const variant =
                action.style === "destructive"
                  ? "destructive"
                  : action.style === "cancel"
                    ? "secondary"
                    : "primary";

              return (
                <Pressable
                  key={index}
                  style={[
                    styles.action,
                    variant === "primary" && styles.actionPrimary,
                    variant === "secondary" && styles.actionSecondary,
                    variant === "destructive" && styles.actionDestructive,
                  ]}
                  onPress={() => handlePress(action)}
                  accessibilityRole="button"
                  accessibilityLabel={action.text}
                >
                  <Text
                    style={[
                      styles.actionText,
                      variant === "primary" && styles.actionTextPrimary,
                      variant === "secondary" && styles.actionTextSecondary,
                      variant === "destructive" && styles.actionTextDestructive,
                    ]}
                  >
                    {action.text}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AppAlert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },
  title: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  message: {
    color: Colors.secondaryText,
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 22,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    width: "100%",
  },
  action: {
    flex: 1,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 4,
  },
  actionPrimary: {
    backgroundColor: Colors.primary,
  },
  actionSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  actionDestructive: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.error,
  },
  actionText: {
    fontSize: 15,
    fontWeight: "700",
  },
  actionTextPrimary: {
    color: Colors.background,
  },
  actionTextSecondary: {
    color: Colors.text,
  },
  actionTextDestructive: {
    color: Colors.error,
  },
});
