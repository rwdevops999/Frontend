import { useState } from "react";
import configData from "../tutorial_env.json";

export const enum ConnectionState {
  connecting = 1,
  connected = 2,
  failed = 3,
}

export const useServerConnect = () => {
  const connectToServer: boolean = configData.server.connect;

  const [connectionState] = useState<ConnectionState>(
    connectToServer ? ConnectionState.connecting : ConnectionState.connected
  );

  return { connectionState };
};
