import { renderRoute } from "../render/render";
import {
  expectInDocumentByAltText,
  expectInDocumentByTestId,
} from "../testutils";

describe("Footer", () => {
  beforeEach(async () => {
    renderRoute("/");
  });

  it("should contain the `copyright`", () => {
    expectInDocumentByTestId("TUTOPEDIA_FOOTER_COPYRIGHT");
  });

  it("should contain the `social media`", () => {
    expectInDocumentByTestId("TUTOPEDIA_FOOTER_SOCIAL_MEDIA");
  });

  it("should contain all the `Social Media sites`", () => {
    expectInDocumentByAltText(/facebook/i);
    expectInDocumentByAltText(/instagram/i);
    expectInDocumentByAltText(/twitterx/i);
    expectInDocumentByAltText(/gmail/i);
    expectInDocumentByAltText(/messenger/i);
    expectInDocumentByAltText(/linkedin/i);
    expectInDocumentByAltText(/whatsapp/i);
  });

  it("should contain the `time`", () => {
    expectInDocumentByTestId("TUTOPEDIA_FOOTER_TIME");
  });
});
