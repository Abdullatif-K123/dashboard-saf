import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { FC, ReactNode } from "react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry(failureCount, error) {
        return (
          error instanceof AxiosError &&
          [500, 502, 503, 504].includes(error.response?.status ?? 0) &&
          failureCount < 3
        );
      },
    },
  },
});
type Props = { children: ReactNode };
const QueryClientContext: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        initialIsOpen={false}
        toggleButtonProps={{ style: { width: "1.5rem", position: "fixed", bottom: 0, right: 0 } }}
      />
      {children}
    </QueryClientProvider>
  );
};
export default QueryClientContext;
