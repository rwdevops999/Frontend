import { screen } from "@testing-library/react";
import { renderRoute } from "../render/render";
import { expectInDocumentByTestId } from "../testutils";
import {
  ROUTE_TUTOPEDIA,
  ROUTE_TUTORIALS,
  TUTOPEDIA,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE,
} from "../../src/data/layout/layout";

describe("TutOPedia", () => {
  it("should render the TutOPedia when routing to `/`", () => {
    renderRoute(ROUTE_TUTOPEDIA);

    expectInDocumentByTestId(TUTOPEDIA);
  });
  // RUN NOW THE TUTOPEDIA TESTS
});

// OUTLET
describe("Tutorials", () => {
  it("should render the `Tutorials Page` when routing to `/tutorials`", () => {
    renderRoute(`/${ROUTE_TUTORIALS}`);

    expect(
      screen.getByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_PAGE}`)
    ).toBeInTheDocument();
  });

  it.skip("should render the `Tutorials List Page` when routing to `/tutorials`", () => {
    renderRoute("/tutorials");

    expect(
      screen.getByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE}`)
    ).toBeInTheDocument();
  });
  // RUN NOW THE TUTORIALS PAGE TESTS
});

// FOOTER (NO FOOTER TESTS ON ROUTING)

// RUN THE FOOTER TESTS
