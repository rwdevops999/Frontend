import { render, screen } from "@testing-library/react";
import {
  ROUTE_TUTOPEDIA,
  TUTOPEDIA_FOOTER_COPYRIGHT,
  TUTOPEDIA_FOOTER_SESSION_TIME,
  TUTOPEDIA_FOOTER_SOCIAL_MEDIA,
  TUTOPEDIA_FOOTER_TIME,
} from "../../src/data/layout/layout";
import { renderRoute } from "../render/render";
import {
  expectInDocumentByAltText,
  expectInDocumentByTestId,
} from "../testutils";

describe("Footer", () => {
  beforeEach(async () => {
    renderRoute(`${ROUTE_TUTOPEDIA}`);
  });

  it("should contain the `copyright`", () => {
    expectInDocumentByTestId(`${TUTOPEDIA_FOOTER_COPYRIGHT}`);
  });

  it("should contain the `social media`", () => {
    expectInDocumentByTestId(`${TUTOPEDIA_FOOTER_SOCIAL_MEDIA}`);
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
    expectInDocumentByTestId(`${TUTOPEDIA_FOOTER_TIME}`);
  });

  it("should contain the `session time`", () => {
    expectInDocumentByTestId(`${TUTOPEDIA_FOOTER_SESSION_TIME}`);
  });
});
