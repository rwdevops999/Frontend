import {
  TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS,
} from "../layout/layout";

export const adminControl: any[] = [
  {
    id: TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS,
    name: "Settings",
    source: "/src/assets/admingear.svg",
    data: {
      checked: true,
    },
  },
  {
    id: TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS,
    name: "Buckets",
    source: "/src/assets/adminbucket.svg",
    data: {
      checked: false,
    },
  },
];
