import { PropsWithChildren } from "react";
import AuthProvider from "./AuthProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import DebugProvider from "./DebugProvider";
import ConfigContextProvider from "../configuration/useConfig";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <DebugProvider>
          <ConfigContextProvider>{children}</ConfigContextProvider>
        </DebugProvider>
      </ReactQueryProvider>
    </AuthProvider>
  );
};

export default Providers;
