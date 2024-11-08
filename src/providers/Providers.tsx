import { PropsWithChildren } from "react";
import AuthProvider from "./AuthProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import DebugProvider from "./DebugProvider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <DebugProvider>{children}</DebugProvider>
      </ReactQueryProvider>
    </AuthProvider>
  );
};

export default Providers;
