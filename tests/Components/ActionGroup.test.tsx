import { renderRoute } from "../render/render";
import { clickButtonById, expectInDocumentByTestId } from "../testutils";

describe("ActionGroup", () => {
  it("should display the `delete all` button", () => {
    renderRoute("/tutorials");

    expectInDocumentByTestId("TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_DELETE");
  });

  it("should display the `publish all` button", () => {
    renderRoute("/tutorials");

    expectInDocumentByTestId("TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_PUBLISH");
  });

  it("should render the `tutorials list page` when delete all button is clicked", () => {
    renderRoute("/tutorials");

    clickButtonById("TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_DELETE");

    expectInDocumentByTestId("TUTORIALS_LIST_PAGE");
  });

  it("should render the `tutorials list page` when publish all button is clicked", () => {
    renderRoute("/tutorials");

    clickButtonById("TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_PUBLISH");

    expectInDocumentByTestId("TUTORIALS_LIST_PAGE");
  });
});
