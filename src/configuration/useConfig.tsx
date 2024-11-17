import React, { useContext, useState } from "react";
import { defaultConfig, DynamicConfig } from "./config";

interface DynamicConfigContext {
  config: DynamicConfig;
  setConfig: (newConfig: DynamicConfig) => void;
}

const configContextObject = React.createContext<DynamicConfigContext>({
  config: defaultConfig,
  setConfig: () => {},
});

export const useConfig = () => useContext(configContextObject);

const ConfigContextProvider = ({ children }: { children: any }) => {
  const [configState, setConfigState] = useState(defaultConfig);

  const setInitConfig = (config: DynamicConfig) => {
    console.log("SET CONFIG IN STATE: " + JSON.stringify(config));
    setConfigState(config);
  };

  const getInitConfig = (): DynamicConfig => {
    console.log("GET CONFIG FROM STATE; " + JSON.stringify(configState));
    return configState;
  };

  return (
    <configContextObject.Provider
      value={{
        config: getInitConfig(),
        setConfig: setInitConfig,
      }}
    >
      {children}
    </configContextObject.Provider>
  );
};

export default ConfigContextProvider;
