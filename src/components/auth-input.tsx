import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "../theme";

type AuthInputProps = {
  icon: React.ComponentProps<typeof Feather>["name"];
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "words";
  autoComplete?: "off" | "email" | "password" | "name";
  importantForAutofill?: "no" | "yes";
};

const AuthInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize = "none",
  autoComplete = "off",
  importantForAutofill = "no",
}: AuthInputProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, focused && styles.focused]}>
      <Feather
        name={icon}
        size={20}
        color={focused ? Colors.primary : Colors.secondaryText}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.secondaryText}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        autoComplete={autoComplete}
        importantForAutofill={importantForAutofill}
        style={styles.input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  focused: {
    borderColor: Colors.primary,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: Colors.text,
    fontSize: 16,
  },
});
