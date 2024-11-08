import {
  ApplicationState,
  HeaderState,
  LayoutState,
  TutopediaState,
} from "../../data/states";

/**
 *
 * extract Tutopedia state from input state
 *
 * @param state input string with state information
 * @returns: TutopediaState
 *
 */
export const useTutopediaState = (state: any): TutopediaState => {
  let count: number = 0;
  let description: string | undefined;
  let sender: string | undefined;
  let routeURL: string | undefined;
  let layout: LayoutState | undefined;
  let application: ApplicationState | undefined;
  let header: HeaderState | undefined;

  if (state) {
    const tutopedia = state.tutopedia;

    count = 0;
    description = tutopedia.description;
    sender = tutopedia.sender;
    routeURL = tutopedia.routeURL;
    layout = tutopedia.layout;
    application = tutopedia.application;
    header = tutopedia.header;
  }

  return {
    count,
    description,
    sender,
    routeURL,
    layout,
    application,
    header,
  };
};
