import { AppStackLayout } from "@/src/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppStackLayout />
    </QueryClientProvider>
  );
}
