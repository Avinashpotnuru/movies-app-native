import {
  BiographySection,
  MoviesListContainer,
  SocialMediaSection,
} from "@/src/components";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getPersonDetails } from "../api/movies.service";
import { useFetch } from "../hooks/useFetch";
import { Colors } from "../theme";
import { Movie, MoviesCardType } from "../types";
const { width, height } = Dimensions.get("window");

const CastOverView = ({ castId }: { castId: number }) => {
  const { data, loading } = useFetch({
    fetchFunction: () => getPersonDetails(castId),
  });

  const popularMoviePosters: MoviesCardType[] = useMemo(
    () =>
      data?.combined_credits?.cast?.map((movie: Movie, index: number) => ({
        id: index,
        title: movie.original_title,
        poster_path: movie.poster_path,
      })) || [],
    [data],
  );

  const socialMediaLinks = useMemo(() => {
    const socialMedia = data?.external_ids;
    const socialMediaLinks = {
      facebook: socialMedia?.facebook_id,
      instagram: socialMedia?.instagram_id,
      twitter: socialMedia?.twitter_id,
    };
    return socialMediaLinks;
  }, [data]);

  if (loading) return <Text>Loading...</Text>;
  const placeHolderImage =
    data?.gender === 1
      ? require(`@/assets/images/female.jpg`)
      : require(`@/assets/images/male.jpg`);
  const imageSource =
    data?.profile_path !== null
      ? { uri: `https://image.tmdb.org/t/p/w500${data?.profile_path}` }
      : placeHolderImage;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Entypo
            style={styles.backIcon}
            name="home"
            size={24}
            color={Colors.primary}
            onPress={() => router.back()}
          />
          <Image source={imageSource} style={styles.profileImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{data?.name}</Text>
          <SocialMediaSection socialMediaLinks={socialMediaLinks} />
          <BiographySection data={data} />
          <MoviesListContainer
            sectionHeading={"Known For"}
            moviePosters={popularMoviePosters}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CastOverView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.5,
    width: width * 0.8,
    margin: "auto",
    backgroundColor: Colors.background,
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 150,

    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backIcon: {
    position: "absolute",
    top: 16,
    left: 0,
    zIndex: 1,
  },

  textContainer: {
    width: width * 0.9,
    margin: "auto",
  },
});
