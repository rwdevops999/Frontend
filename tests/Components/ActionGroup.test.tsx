import {
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH,
} from "../../src/data/layout/layout";
import { createBuckets } from "../mock/database";
import { renderRoute } from "../render/render";
import { clickButtonById, expectInDocumentByTestId } from "../testutils";

describe("ActionGroup", () => {
  it("should display the `delete all` button", () => {
    renderRoute(`/${ROUTE_TUTORIALS}`);

    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE}`
    );
  });

  it("should display the `publish all` button", () => {
    renderRoute(`/${ROUTE_TUTORIALS}`);

    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH}`
    );
  });

  it("should render the `tutorials list page` when delete all button is clicked", () => {
    renderRoute(`/${ROUTE_TUTORIALS}`);

    clickButtonById(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE}`
    );

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE}`);
  });

  it("should render the `tutorials list page` when publish all button is clicked and default bucket set", () => {
    createBuckets(1, true, {
      name: "buckettest",
      selected: true,
    });

    renderRoute(`/${ROUTE_TUTORIALS}`);

    clickButtonById(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH}`
    );

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE}`);
  });
});
