import { ConnectionState } from "../hooks/useServerConnect";
import {
  TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_APPLICATION,
  TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_RETRY,
  TUTOPEDIA_HEADER_ACTION_BUTTON_ADMIN,
  TUTOPEDIA_HEADER_ACTION_BUTTON_HOME,
} from "./layout/layout";

export const CODE_TENANT = 1;

export const HeaderActionButtons = [
  {
    id: 1,
    title: "admin",
    src: "/src/assets/admin.svg",
    actionId: TUTOPEDIA_HEADER_ACTION_BUTTON_ADMIN,
  },
  {
    id: 2,
    title: "home",
    src: "/src/assets/house.svg",
    actionId: TUTOPEDIA_HEADER_ACTION_BUTTON_HOME,
  },
];

export const ServerPageButtons = [
  {
    type: ConnectionState.failed,
    id: "RETRY",
    title: "Retry",
    icon: "/src/assets/retry.svg",
    actionId: TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_RETRY,
  },
  {
    type: ConnectionState.connected,
    id: "APPLICATION",
    title: "To Application",
    icon: "/src/assets/application.svg",
    actionId: TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_APPLICATION,
  },
];

export const NavigationPageNames = {
  Home: "Home",
  Create: "Create",
  Find: "Find",
  OCI: "OCI",
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
