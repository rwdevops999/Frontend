import { screen } from "@testing-library/react";
import { renderRoute } from "../render/render";
import { expectInDocumentByTestId } from "../testutils";

describe("TutOPedia", () => {
  it("should render the TutOPedia when routing to `/`", () => {
    renderRoute("/");

    expectInDocumentByTestId("TUTOPEDIA");
  });
  // RUN NOW THE TUTOPEDIA TESTS
});

// OUTLET
describe("Tutorials", () => {
  it("should render the `Tutorials Page` when routing to `/tutorials`", () => {
    renderRoute("/tutorials");

    expect(screen.getByTestId("TUTORIALS_PAGE")).toBeInTheDocument();
  });

  it("should render the `Tutorials List Page` when routing to `/tutorials`", () => {
    renderRoute("/tutorials");

    expect(screen.getByTestId("TUTORIALS_LIST_PAGE")).toBeInTheDocument();
  });
  // RUN NOW THE TUTORIALS PAGE TESTS
});

// FOOTER (NO FOOTER TESTS ON ROUTING)

// RUN THE FOOTER TESTS
