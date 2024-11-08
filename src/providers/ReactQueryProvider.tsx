import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
