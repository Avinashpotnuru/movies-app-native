import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
  findNodeHandle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../theme";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

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
  const buttonRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [triggerLayout, setTriggerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const measureTrigger = () => {
    const node = findNodeHandle(buttonRef.current);
    if (node) {
      UIManager.measure(node, (_x, _y, width, height, pageX, pageY) => {
        setTriggerLayout({ x: pageX, y: pageY, width, height });
      });
    }
  };

  useEffect(() => {
    measureTrigger();
  }, []);

  const selectedLabel = options.find((item) => item.value === value)?.label;

  const filteredOptions = search
    ? options.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase()),
      )
    : options;

  const triggerTop = triggerLayout ? triggerLayout.y + triggerLayout.height + 8 : 120;
  const sheetMaxHeight = Math.max(160, SCREEN_HEIGHT - triggerTop - 24);

  const handleSelect = (optionValue: string) => {
    setOpen(false);
    setSearch("");
    onValueChange(optionValue);
  };

  return (
    <View>
      <TouchableOpacity
        ref={buttonRef}
        style={[styles.button, open && styles.buttonActive]}
        activeOpacity={0.85}
        onPress={() => {
          const node = findNodeHandle(buttonRef.current);
          if (node) {
            UIManager.measure(node, (_x, _y, width, height, pageX, pageY) => {
              setTriggerLayout({ x: pageX, y: pageY, width, height });
              setOpen((prev) => !prev);
            });
          } else {
            setOpen((prev) => !prev);
          }
        }}
      >
        <Text
          style={[styles.text, !selectedLabel && styles.placeholderText]}
          numberOfLines={1}
        >
          {selectedLabel ?? placeholder}
        </Text>
        <AntDesign
          name={open ? "up" : "down"}
          size={13}
          color={Colors.primary}
          style={styles.chevron}
        />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Pressable style={styles.overlay} onPress={() => setOpen(false)} />

          <View
            style={[
              styles.sheet,
              triggerLayout && {
                top: triggerTop,
                left: 16,
                right: undefined,
                width: SCREEN_WIDTH - 32,
              },
              { maxHeight: sheetMaxHeight },
            ]}
          >
            <View style={styles.searchRow}>
              <AntDesign
                name="search1"
                size={16}
                color="#8a8a8a"
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search"
                placeholderTextColor="#8a8a8a"
                value={search}
                autoFocus
                onChangeText={setSearch}
                style={styles.searchInput}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")}>
                  <AntDesign name="close" size={16} color="#8a8a8a" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.divider} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {filteredOptions.length === 0 ? (
                <View style={styles.option}>
                  <Text style={styles.optionText}>No options</Text>
                </View>
              ) : (
                filteredOptions.map((item) => {
                  const isSelected = item.value === value;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={item.value}
                      style={[
                        styles.option,
                        isSelected && styles.optionSelected,
                      ]}
                      onPress={() => handleSelect(item.value)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected,
                        ]}
                        numberOfLines={1}
                      >
                        {item.label}
                      </Text>
                      {isSelected && (
                        <AntDesign
                          name="check"
                          size={16}
                          color={Colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1a1a1a",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2c2c2c",
    marginLeft: 10,
  },
  buttonActive: {
    borderColor: Colors.primary,
    backgroundColor: "#202020",
  },
  text: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    marginRight: 8,
  },
  placeholderText: {
    color: "#8a8a8a",
  },
  chevron: {
    marginLeft: 4,
  },

  modalContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  sheet: {
    position: "absolute",
    top: 120,
    left: 20,
    right: 20,
    backgroundColor: "#161616",
    borderRadius: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#2c2c2c",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#242424",
    margin: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 14,
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#2c2c2c",
    marginHorizontal: 10,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  optionSelected: {
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  optionText: {
    color: "#e6e6e6",
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
