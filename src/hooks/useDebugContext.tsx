import { useContext } from "react";
import DebugContext from "../providers/DebugContext";

export default function useDebugContext() {
  return useContext(DebugContext); // This causes the error
}
