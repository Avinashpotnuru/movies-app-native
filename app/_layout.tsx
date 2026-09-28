import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { Platform } from "react-native";
import { AppStackLayout } from "@/src/layout";
import { DEFAULT_QUERY_OPTIONS } from "@/src/api/queryOptions";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: DEFAULT_QUERY_OPTIONS,
    mutations: { retry: 0 },
  },
});

if (Platform.OS !== "web") {
  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  persistQueryClient({
    queryClient,
    persister: asyncStoragePersister,
    maxAge: 1000 * 60 * 60 * 24,
    buster: "cinewave-v1",
    dehydrateOptions: {
      shouldDehydrateQuery: (query) => {
        if (query.state.status !== "success") return false;
        const key = Array.isArray(query.queryKey)
          ? query.queryKey[0]
          : query.queryKey;
        return (
          typeof key === "string" &&
          !key.startsWith("search") &&
          !key.startsWith("favorite") &&
          !key.startsWith("watchlist")
        );
      },
    },
  });
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppStackLayout />
    </QueryClientProvider>
  );
}
