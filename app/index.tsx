import { View, Text, FlatList } from "react-native";
import { useFetch } from "@/src/hooks/useFetch";
import { getMovies } from "@/src/api/movies.service";

export default function HomeScreen() {
  const { data, loading, error } = useFetch({
    fetchFunction: getMovies,
  });
  console.log("Movies Screen Rendered", data);


  return (
    <View style={{ flex: 1 }}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}

      <FlatList
        data={data?.results}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <Text style={{ color: "white" }}>{item.title}</Text>
        )}
      />
    </View>
  );
}
