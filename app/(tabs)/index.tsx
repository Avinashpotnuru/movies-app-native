import { getMovies } from "@/src/api/movies.service";
import { useFetch } from "@/src/hooks/useFetch";
import { Colors } from "@/src/theme/colors";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { data, loading, error } = useFetch({
    fetchFunction: getMovies,
  });
  console.log("Movies Screen Rendered", data);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={data?.results || []}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.movieCard}>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.movieImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  title: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    color: Colors.primary,
  },
  error: {
    color: Colors.error,
  },
  movieCard: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    gap: 8,
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieTitle: {
    color: Colors.text,
    fontSize: 16,
    marginTop: 8,
  },
});
