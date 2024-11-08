import { User } from "@auth0/auth0-react";

export type HeaderState = {
  user?: string;
  bucket?: string;
};

export type SettingsState = {};

export type LayoutState = {
  selectedPage: string;
  selectedView?: string;
};

export type DataState = {
  // tutorial id for search field in navigation bar
  searchId?: number;

  // list identification (what to display in the list)
  // undefined = ALL, true = ALL_PUBLISHED, false = ALL_NON_PUBLISHED
  listMode?: boolean;

  // mode for the create page (updateMode = fale => create, updateMode = true => update)
  updateMode?: boolean;

  reload?: boolean;

  keywords?: string[];

  reset?: boolean;
};

export type ApplicationState = {
  apiURL: string;
  data?: DataState;
};

export type TutopediaState = {
  count: number;
  description: String | undefined;
  sender: string | undefined;
  routeURL: string | undefined;
  header?: HeaderState | undefined;
  settings?: SettingsState | undefined;
  layout?: LayoutState | undefined;
  application?: ApplicationState | undefined;
};

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | undefined;
};
