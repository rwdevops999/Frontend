import { renderRoute } from "../render/render";
import { expectInDocumentByTestId } from "../testutils";

describe("TutorialsPage", () => {
  it("should render the navigation bar", () => {
    renderRoute("/tutorials");

    expectInDocumentByTestId("TUTORIALS_PAGE_NAVIGATION_BAR");
  });

  it("should render the outlet", () => {
    renderRoute("/tutorials");

    expectInDocumentByTestId("TUTORIALS_PAGE_OUTLET");
  });
});
