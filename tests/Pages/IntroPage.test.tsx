import { renderRoute } from "../render/render";
import { expectInDocumentByTestId } from "../testutils";
import {
  ROUTE_TUTOPEDIA,
  TUTOPEDIA_CONTENT_IMAGE_PAGE,
} from "../../src/data/layout/layout";

describe("IntroPage", () => {
  it("should render the image", () => {
    renderRoute(`${ROUTE_TUTOPEDIA}`);
    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_IMAGE_PAGE}`);
  });
});
