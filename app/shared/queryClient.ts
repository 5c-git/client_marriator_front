import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 3 minines
      staleTime: 180000,
    },
  },
});
