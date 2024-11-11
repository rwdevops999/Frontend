import { renderRoute } from "../render/render";
import { clickButtonById, expectByTestIdToBeInTheDocument } from "../testutils";
import {
  BUCKETS_PAGE,
  ROUTE_ADMIN,
  SETTINGS_PAGE,
  TUTOPEDIA_CONTENT_ADMIN_PAGE,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS,
} from "../../src/data/layout/layout";

describe("AdminPage", () => {
  it("should render the admin page", async () => {
    renderRoute(`/${ROUTE_ADMIN}`);

    expectByTestIdToBeInTheDocument(`${TUTOPEDIA_CONTENT_ADMIN_PAGE}`);
  });

  it("should render the settings button", async () => {
    renderRoute(`/${ROUTE_ADMIN}`);

    expectByTestIdToBeInTheDocument(`${TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS}`);
  });

  it("should render the buckets button", async () => {
    renderRoute(`/${ROUTE_ADMIN}`);

    expectByTestIdToBeInTheDocument(`${TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS}`);
  });

  it("should render the buckets page when clicking the buckets button", async () => {
    renderRoute(`/${ROUTE_ADMIN}`);

    clickButtonById(`${TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS}`);

    expectByTestIdToBeInTheDocument(`${BUCKETS_PAGE}`);
  });

  it("should render the settings page", async () => {
    renderRoute(`/${ROUTE_ADMIN}`);

    expectByTestIdToBeInTheDocument(`${SETTINGS_PAGE}`);
  });
});
