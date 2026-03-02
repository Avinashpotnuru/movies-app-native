import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../theme";

const { height } = Dimensions.get("window");

interface DropDownProps {
  options?: { label: string; value: string }[];
  placeholder?: string;
  onValueChange: (value: string) => void;
  value: string;
}

export default function CustomDropdown({
  options = [],
  placeholder = "Select option",
  onValueChange,
  value,
}: DropDownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>();
  const [search, setSearch] = useState<string | null>(null);

  const filteredOptions = search
    ? options.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase()),
      )
    : options;

  const handleSelect = (label: string, value: string) => {
    setSelected(label);
    setOpen(false);
    onValueChange(value);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.text}>{value === "" ? placeholder : selected}</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Pressable style={styles.overlay} onPress={() => setOpen(false)} />

          <View style={styles.dropdownWrapper}>
            <TextInput
              placeholder="Search"
              onChangeText={setSearch}
              style={styles.searchInput}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              {filteredOptions.map((item) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={item.value}
                  style={styles.option}
                  onPress={() => {
                    handleSelect(item.label, item.value);
                    setSearch(null);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#222222",
    padding: 14,
    borderRadius: 8,
    borderColor: Colors.primary,
    borderWidth: 1,

    marginLeft: 10,
  },

  text: {
    color: "white",
    fontSize: 14,
  },

  modalContainer: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  dropdownWrapper: {
    position: "absolute",
    top: 120,
    left: 20,
    right: 20,
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    maxHeight: height - 200,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  option: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#333",
  },

  optionText: {
    color: "white",
    fontSize: 14,
  },

  searchInput: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    marginVertical: 12,
    width: "90%",
    alignSelf: "center",
    marginHorizontal: 10,
  },
});
