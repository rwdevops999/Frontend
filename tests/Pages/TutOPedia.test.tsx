import {
  ROUTE_TUTOPEDIA,
  TUTOPEDIA_CONTENT,
  TUTOPEDIA_FOOTER,
  TUTOPEDIA_HEADER,
} from "../../src/data/layout/layout";
import { renderRoute } from "../render/render";
import { expectInDocumentByTestId } from "../testutils";

describe("TutOPedia", () => {
  beforeEach(async () => {
    renderRoute(ROUTE_TUTOPEDIA);
  });

  it("should contain the header", () => {
    expectInDocumentByTestId(TUTOPEDIA_HEADER);
  });

  it("should contain the content", () => {
    expectInDocumentByTestId(TUTOPEDIA_CONTENT);
  });

  it.skip("should contain the ServerCheckPage", () => {
    expectInDocumentByTestId("SERVERCHECK_PAGE");
  });

  it.skip("should contain the TutorialsPage", () => {
    renderRoute("/tutorials");
    expectInDocumentByTestId("SERVERCHECK_PAGE");
  });

  it("should contain the footer", () => {
    expectInDocumentByTestId(TUTOPEDIA_FOOTER);
  });
});
