import { LayoutState } from "../../data/states";
import { debugState } from "../../data/utils";

/**
 * extract LayoutState from state input
 *
 * @param state with Layout information
 * @returns Layout state object
 */
export const useLayoutState = (state: any): LayoutState => {
  console.log("[HOOK]: UseLayoutState IN");
  debugState("useLayoutState", state);
  let obj = JSON.parse(JSON.stringify(state));

  console.log("[HOOK]: UseLayoutState OUT");
  return obj;
};
