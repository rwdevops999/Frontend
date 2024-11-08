import { renderRoute } from "../render/render";
import { expectInDocumentByTestId } from "../testutils";

describe("TutOPedia", () => {
  beforeEach(async () => {
    renderRoute("/");
  });

  it("should contain the header", () => {
    expectInDocumentByTestId("TUTOPEDIA_HEADER");
  });

  it("should contain the outlet", () => {
    expectInDocumentByTestId("TUTOPEDIA_OUTLET");
  });

  it("should contain the ServerCheckPage", () => {
    expectInDocumentByTestId("SERVERCHECK_PAGE");
  });

  it.todo("should contain the TutorialsPage", () => {
    renderRoute("/tutorials");
    expectInDocumentByTestId("SERVERCHECK_PAGE");
  });

  it("should contain the footer", () => {
    expectInDocumentByTestId("TUTOPEDIA_FOOTER");
  });
});
