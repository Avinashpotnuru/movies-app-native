import React, { memo, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { MovieBackDropImage } from "../types";
import DisplayModal from "./display-modal";
import RemoteImage from "./remote-image";
import { getImage } from "../utils/getImage";
import SectionHeading from "./section-heading";

const ITEM_WIDTH = 200;

const BackdropImagesContainer = ({ data }: { data: MovieBackDropImage[] }) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const { width } = useWindowDimensions();

  const renderItem = useCallback(
    ({
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
              recyclingKey={item.file_path}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      );
    },
    [],
  );

  const keyExtractor = useCallback(
    (item: MovieBackDropImage) => item.file_path,
    [],
  );

  if (!data.length) return null;

  return (
    <View style={styles.container}>
      <SectionHeading title="Backdrop Images" />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}
      />

      {selectedImage ? (
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
              source={{ uri: getImage(selectedImage, "w500") }}
              placeholder={require("@/assets/images/placeholder.jpg")}
              contentFit="cover"
              style={[styles.modalImage, { width: width - 10 }]}
            />
          </View>
        </DisplayModal>
      ) : null}
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
    height: 250,
    resizeMode: "cover",
  },
});
