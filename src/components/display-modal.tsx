import React, { useMemo } from "react";
import { Dimensions, Modal, Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../theme";

interface ModalProps {
  children: React.ReactNode;
  modalHeight?: number;
  modalWidth?: number;
  title?: string;
  onClose?: () => void;
  visible?: boolean;
  onRequestClose?: () => void;
  animationType?: "fade" | "slide";
}

const { width, height } = Dimensions.get("window");

const DisplayModal = ({
  children,
  modalHeight,
  modalWidth,

  onClose,
  visible,
  onRequestClose,
  animationType,
}: ModalProps) => {
  const containerStyle = useMemo(
    () => [
      styles.modalContainer,
      {
        width: modalWidth ?? width * 0.9,
        height: modalHeight ?? height * 0.8,
      },
    ],
    [modalWidth, modalHeight],
  );

  return (
    <View>
      <Modal
        visible={visible ?? false}
        transparent
        accessibilityViewIsModal
        animationType={animationType ?? `slide`}
        onRequestClose={onRequestClose ?? onClose}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => onClose?.()}
          accessibilityRole="button"
          accessibilityLabel="Close modal"
        >
          <Pressable
            pointerEvents="box-none"
            style={containerStyle}
            onPress={() => {}}
            accessible
          >
            {children}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default DisplayModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.modalBackground,
    borderRadius: 12,
    elevation: 5,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
});
