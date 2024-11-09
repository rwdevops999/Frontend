import { ConnectionState } from "../hooks/useServerConnect";

export const CODE_TENANT = 1;

import {
  HEADER_ADMIN,
  HEADER_HOME,
  SERVER_APPLICATION,
  SERVER_RETRY,
} from "./consts";

export const HeaderActionButtons = [
  {
    id: 1,
    title: "admin",
    src: "/src/assets/admin.svg",
    actionId: HEADER_ADMIN,
  },
  {
    id: 2,
    title: "home",
    src: "/src/assets/house.svg",
    actionId: HEADER_HOME,
  },
];

export const ServerPageButtons = [
  {
    type: ConnectionState.failed,
    id: "retry",
    title: "Retry",
    icon: "/src/assets/retry.svg",
    actionId: SERVER_RETRY,
  },
  {
    type: ConnectionState.connected,
    id: "application",
    title: "To Application",
    icon: "/src/assets/application.svg",
    actionId: SERVER_APPLICATION,
  },
];

// ###

export const NavigationPageNames = {
  Home: "Home",
  Create: "Create",
  Find: "Find",
  Aws: "OCI",
};

export const NavigationViewNames = {
  AllPub: "All Published",
  NonPub: "All Non-Published",
  All: "All Tutorials",
};

export const UndisplayedNavigationViewNames = {
  Keywords: "FindByKeywords",
  ById: "FindById",
};

export const ActionNames = {
  DeleteAll: "Delete",
  PublishAll: "Publish",
};

export type SocialMedia = {
  id: number;
  name: string;
  url: string;
};

export const SocialMediaData: SocialMedia[] = [
  {
    id: 1,
    name: "facebook",
    url: "https://www.facebook.com/",
  },
  {
    id: 2,
    name: "instagram",
    url: "https://www.instagram.com/",
  },
  {
    id: 3,
    name: "twitterx",
    url: "https://x.com/",
  },
  {
    id: 4,
    name: "gmail",
    url: "https://mail.google.com/",
  },
  {
    id: 5,
    name: "messenger",
    url: "https://www.messenger.com/",
  },
  {
    id: 6,
    name: "linkedin",
    url: "https://www.linkedin.com/",
  },
  {
    id: 7,
    name: "whatsapp",
    url: "https://web.whatsapp.com/",
  },
];
