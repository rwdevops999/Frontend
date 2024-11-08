import React from "react";

const DebugContext = React.createContext({
  debug: true,
  setDebug: (_b: boolean) => {},
});

export default DebugContext;
