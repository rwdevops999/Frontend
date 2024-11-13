import { LayoutState } from "../../data/states";

/**
 * extract LayoutState from state input
 *
 * @param state with Layout information
 * @returns Layout state object
 */
export const useLayoutState = (state: any): LayoutState => {
  return JSON.parse(JSON.stringify(state));
};
