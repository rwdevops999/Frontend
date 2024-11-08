import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import DebugProvider from "../src/providers/DebugProvider";

const AllProviders = ({ children }: PropsWithChildren) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <DebugProvider>{children}</DebugProvider>
    </QueryClientProvider>
  );
};

export default AllProviders;
