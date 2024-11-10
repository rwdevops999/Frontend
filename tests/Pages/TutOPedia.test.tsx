import {
  ROUTE_TUTOPEDIA,
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT,
  TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE,
  TUTOPEDIA_FOOTER,
  TUTOPEDIA_HEADER,
} from "../../src/data/layout/layout";
import { renderRoute } from "../render/render";
import { expectInDocumentByTestId } from "../testutils";

describe("TutOPedia", () => {
  beforeEach(async () => {
    renderRoute(`${ROUTE_TUTOPEDIA}`);
  });

  it("should contain the header", () => {
    expectInDocumentByTestId(`${TUTOPEDIA_HEADER}`);
  });

  it("should contain the content", () => {
    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT}`);
  });

  it("should contain the ServerCheckPage", () => {
    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE}`);
  });

  it("should contain the TutorialsPage", () => {
    renderRoute(`/${ROUTE_TUTORIALS}`);
    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE}`);
  });

  it("should contain the footer", () => {
    expectInDocumentByTestId(`${TUTOPEDIA_FOOTER}`);
  });
});
