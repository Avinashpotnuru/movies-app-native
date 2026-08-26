import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../theme";

const Background = require("@/assets/images/loginBg.png");


type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

const AuthShell = ({ title, subtitle, children, footer }: AuthShellProps) => {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={Background}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.card}>
           
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            {children}

            {footer}
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default AuthShell;

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
    backgroundColor: "rgba(11,15,20,0.82)",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: Colors.card,
    paddingHorizontal: 28,
    paddingVertical: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  logo: {
    width: 76,
    height: 76,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: Colors.secondaryText,
    marginTop: 6,
    marginBottom: 28,
  },
});
