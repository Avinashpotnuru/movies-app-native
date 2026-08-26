import React, { memo } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MovieBackDropImage } from "../types";
import DisplayModal from "./display-modal";
import RemoteImage from "./remote-image";
import { getImage } from "../utils/getImage";
import SectionHeading from "./section-heading";

const { width } = Dimensions.get("window");

const BackdropImagesContainer = ({ data }: { data: MovieBackDropImage[] }) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  if (!data.length) return null;

  const renderItem = ({
    item,
    index,
  }: {
    item: MovieBackDropImage;
    index: number;
  }) => {
    const uri = getImage(item.file_path, "w500");
    return (
      <View>
        <TouchableOpacity
          accessibilityRole="imagebutton"
          accessibilityLabel={`Open backdrop image ${index + 1}`}
          onPress={() => setSelectedImage(item.file_path)}
        >
          <RemoteImage
            source={{ uri }}
            placeholder={require("@/assets/images/placeholder.jpg")}
            contentFit="cover"
            style={styles.image}
          />
        </TouchableOpacity>

        {selectedImage === item.file_path && (
          <DisplayModal
            visible={selectedImage !== null}
            onClose={() => setSelectedImage(null)}
            onRequestClose={() => setSelectedImage(null)}
            animationType="slide"
            modalWidth={width}
            modalHeight={250}
          >
            <View style={styles.imageContainer}>
              <RemoteImage
                source={{ uri }}
                placeholder={require("@/assets/images/placeholder.jpg")}
                contentFit="cover"
                style={styles.modalImage}
              />
            </View>
          </DisplayModal>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionHeading title="Backdrop Images" />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.file_path}
        horizontal
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(BackdropImagesContainer);

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    gap: 10,
  },
  image: {
    width: 180,
    height: 100,
    marginHorizontal: 10,
    resizeMode: "cover",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalImage: {
    margin: 30,
    width: width - 10,
    height: 250,
    resizeMode: "cover",
  },
});
