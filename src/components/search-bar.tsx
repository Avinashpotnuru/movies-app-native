import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../theme";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const SearchBar = ({ value, onChangeText, placeholder }: SearchBarProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, focused && styles.focused]}>
      <AntDesign
        name="search"
        size={18}
        color={focused ? Colors.primary : Colors.secondaryText}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.secondaryText}
        style={styles.input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoCorrect={false}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginVertical: 12,
    width: "90%",
    alignSelf: "center",
  },
  focused: {
    borderColor: Colors.primary,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 15,
    marginLeft: 8,
    paddingVertical: 0,
  },
});
