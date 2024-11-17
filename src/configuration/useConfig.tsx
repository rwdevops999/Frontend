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
  // const [configState, setConfigState] = useState(defaultConfig);

  let cs = defaultConfig;

  const setInitConfig = (config: DynamicConfig) => {
    console.log("SET CONFIG IN STATE: " + JSON.stringify(config));
    cs = config;
    // setConfigState(config);
  };

  return (
    <configContextObject.Provider
      value={{
        config: cs,
        setConfig: setInitConfig,
      }}
    >
      {children}
    </configContextObject.Provider>
  );
};

export default ConfigContextProvider;
