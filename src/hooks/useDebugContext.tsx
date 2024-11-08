import React from "react";
import DebugContext from "../providers/DebugContext";

export default function useDebugContext() {
  return React.useContext(DebugContext); // This causes the error
}
