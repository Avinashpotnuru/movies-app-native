import { DisplayModal, SectionHeading } from "@/src/components";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MovieBackDropImage } from "../types";

const { width } = Dimensions.get("window");

const BackdropImagesContainer = ({ data }: { data: MovieBackDropImage[] }) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  if (!data.length) return null;
  return (
    <View style={styles.container}>
      <SectionHeading title="Backdrop Images" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => setSelectedImage(item.file_path)}>
              <Image
                key={item.file_path}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.file_path}`,
                }}
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
                  <Image
                    key={item.file_path}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.file_path}`,
                    }}
                    style={styles.modalImage}
                  />
                </View>
              </DisplayModal>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BackdropImagesContainer;

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
