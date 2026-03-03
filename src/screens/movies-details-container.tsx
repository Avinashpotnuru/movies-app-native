// import {
//   BackdropImagesContainer,
//   CastContainer,
//   Loading,
//   MovieOverview,
//   MovieTitleCard,
//   MoviesListContainer,
// } from "@/src/components";
// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { router } from "expo-router";
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Dimensions,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import {
//   getFavorites,
//   getMovieDetails,
//   sendToFavorite,
// } from "../api/movies.service";
// import { useFetch } from "../hooks/useFetch";
// import { Colors } from "../theme";
// import { Movie, MoviesCardType } from "../types";

// const { width, height } = Dimensions.get("window");

// export default function MoviesDetailsContainer({
//   id,
// }: {
//   id: number;
//   type?: string;
// }) {
//   const { data, loading } = useFetch({
//     fetchFunction: () => getMovieDetails(id),
//   });

//   const { data: favorites, refetch: refetchFavorites } = useFetch({
//     fetchFunction: () => getFavorites(),
//   });

//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     if (!favorites?.results || !data?.id) return;

//     const exists = favorites.results.some(
//       (movie: Movie) => movie.id === data.id,
//     );

//     setIsFavorite(exists);
//   }, [favorites, data]);

//   const handleFavorite = async () => {
//     if (!data?.id) return;

//     const newState = !isFavorite;
//     setIsFavorite(newState);

//     try {
//       await sendToFavorite(data.id, newState, "movie");

//       refetchFavorites();
//     } catch (error) {
//       console.log("Favorite error:", error);

//       setIsFavorite(!newState);
//     }
//   };

//   const similarMoviesPosters: MoviesCardType[] = useMemo(() => {
//     return (
//       data?.similar?.results?.map((movie: Movie) => ({
//         id: movie.id,
//         title: movie.title,
//         poster_path: movie.poster_path,
//       })) || []
//     );
//   }, [data]);

//   const movieTrailerId = useMemo(() => {
//     return data?.videos?.results?.[0]?.key;
//   }, [data]);

//   if (loading) return <Loading />;

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <Entypo
//           style={styles.backIcon}
//           name="home"
//           size={24}
//           color={Colors.primary}
//           onPress={() => router.back()}
//         />

//         <TouchableOpacity style={styles.favoriteIcon} onPress={handleFavorite}>
//           <MaterialIcons
//             name={isFavorite ? "favorite" : "favorite-border"}
//             size={26}
//             color={Colors.primary}
//           />
//         </TouchableOpacity>

//         <View style={styles.backdropImageContainer}>
//           <MovieTitleCard
//             movieTitle={data?.title || ""}
//             movieGenre={data?.genres || []}
//             runTime={data?.runtime || 0}
//             movieTrailerId={movieTrailerId || ""}
//           />

//           <Image
//             style={styles.backdropImage}
//             source={
//               data?.backdrop_path
//                 ? {
//                     uri: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
//                   }
//                 : require("@/assets/images/placeholder.jpg")
//             }
//           />

//           <View style={styles.blurContainer} />
//         </View>

//         <View style={styles.contentContainer}>
//           <MovieOverview content={data?.overview || ""} />

//           <CastContainer id={id} />

//           <MoviesListContainer
//             sectionHeading="Similar movies"
//             moviePosters={similarMoviesPosters}
//           />

//           <BackdropImagesContainer data={data?.images?.backdrops || []} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
//   backdropImageContainer: {
//     position: "relative",
//     width: width,
//     height: height / 2,
//   },
//   backdropImage: {
//     width: width,
//     height: height / 2,
//     resizeMode: "cover",
//   },
//   blurContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: width,
//     height: height / 2,
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   backIcon: {
//     position: "absolute",
//     top: 16,
//     left: 16,
//     zIndex: 10,
//   },
//   favoriteIcon: {
//     position: "absolute",
//     top: 16,
//     right: 16,
//     zIndex: 10,
//   },
//   contentContainer: {
//     padding: 16,
//   },
// });
import {
  BackdropImagesContainer,
  CastContainer,
  Loading,
  MovieOverview,
  MovieTitleCard,
  MoviesListContainer,
} from "@/src/components";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  getFavorites,
  getMovieDetails,
  sendToFavorite,
} from "../api/movies.service";
import { useFetch } from "../hooks/useFetch";
import { Colors } from "../theme";
import { Movie, MoviesCardType } from "../types";

const { width, height } = Dimensions.get("window");

export default function MoviesDetailsContainer({ id }: { id: number }) {
  const { data, loading } = useFetch({
    fetchFunction: () => getMovieDetails(id),
  });

  const { data: favorites, refetch: refetchFavorites } = useFetch({
    fetchFunction: () => getFavorites(),
  });

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!favorites?.results || !data?.id) return;

    const exists = favorites.results.some(
      (movie: Movie) => movie.id === data.id,
    );

    setIsFavorite(exists);
  }, [favorites, data]);

  const handleFavorite = async () => {
    if (!data?.id) return;

    const newState = !isFavorite;
    setIsFavorite(newState);

    try {
      await sendToFavorite(data.id, newState, "movie");

      refetchFavorites();
    } catch (error) {
      console.log("Favorite error:", error);

      setIsFavorite(!newState);
    }
  };

  const similarMoviesPosters: MoviesCardType[] = useMemo(() => {
    return (
      data?.similar?.results?.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      })) || []
    );
  }, [data]);

  const movieTrailerId = useMemo(() => {
    return data?.videos?.results?.[0]?.key;
  }, [data]);

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Entypo
          style={styles.backIcon}
          name="home"
          size={24}
          color={Colors.primary}
          onPress={() => router.back()}
        />

        <TouchableOpacity style={styles.favoriteIcon} onPress={handleFavorite}>
          <MaterialIcons
            name={isFavorite  ? "favorite" : "favorite-border"}
            size={26}
            color={Colors.primary}
          />
        </TouchableOpacity>

        <View style={styles.backdropImageContainer}>
          <MovieTitleCard
            movieTitle={data?.title || ""}
            movieGenre={data?.genres || []}
            runTime={data?.runtime || 0}
            movieTrailerId={movieTrailerId || ""}
          />

          <Image
            style={styles.backdropImage}
            source={
              data?.backdrop_path
                ? {
                    uri: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
                  }
                : require("@/assets/images/placeholder.jpg")
            }
          />

          <View style={styles.blurContainer} />
        </View>

        <View style={styles.contentContainer}>
          <MovieOverview content={data?.overview || ""} />

          <CastContainer id={id} />

          <MoviesListContainer
            sectionHeading="Similar movies"
            moviePosters={similarMoviesPosters}
          />

          <BackdropImagesContainer data={data?.images?.backdrops || []} />
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backdropImageContainer: {
    position: "relative",
    width: width,
    height: height / 2,
  },
  backdropImage: {
    width: width,
    height: height / 2,
    resizeMode: "cover",
  },
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height / 2,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backIcon: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
  },
  favoriteIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
  contentContainer: {
    padding: 16,
  },
});
