import {
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_CONTENT,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR,
} from "../../src/data/layout/layout";
import { renderRoute } from "../render/render";
import { expectInDocumentByTestId } from "../testutils";

describe("TutorialsPage", () => {
  it("should render the navigation bar", () => {
    renderRoute(`/${ROUTE_TUTORIALS}`);

    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR}`
    );
  });

  it("should render the content", () => {
    renderRoute(`/${ROUTE_TUTORIALS}`);

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_CONTENT}`);
  });
});
