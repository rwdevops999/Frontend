import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { renderRoute } from "../render/render";
import {
  clickButton,
  clickButtonById,
  expectElementByTextToBeInTheDocument,
  expectInDocumentByTestId,
  expectInDocumentByText,
  expectToBeDisabled,
  expectToBeEnabled,
} from "../testutils";
import user from "@testing-library/user-event";
import { createTutorials } from "../mock/database";

const navigateToFindPage = () => {
  /**
   * we pass through `/tutorials` because mocking useLocation gives problems with in-application navigation
   */
  renderRoute("/tutorials");

  expectInDocumentByTestId("TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_FIND");

  clickButtonById("TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_FIND");
};

describe("FindPage", () => {
  it("should disable the `search field` when rendering the Find page", () => {
    navigateToFindPage();

    expectToBeDisabled("TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT");
  });

  it("should render the `Find By Keywords` title page", () => {
    navigateToFindPage();

    expectElementByTextToBeInTheDocument(/^Find By Keywords$/);
  });

  it("should render the find form", () => {
    navigateToFindPage();

    expectInDocumentByTestId("TOP_MAIN_FIND_FORM");
  });

  it("should render the buttons", () => {
    navigateToFindPage();

    expectInDocumentByTestId("TOP_MAIN_FIND_BUTTONS");
  });

  it("should render the search button", () => {
    navigateToFindPage();

    expectInDocumentByText(/^SEARCH$/);
  });

  it("should render the cancel button", () => {
    navigateToFindPage();

    expectInDocumentByText(/^CANCEL$/);
  });

  it("should render the home page when cancel button is pressed", () => {
    navigateToFindPage();

    clickButton({ name: /^CANCEL$/ });

    expectInDocumentByTestId("TUTORIALS_LIST_PAGE");
  });

  it("should check if there are 5 keywords left", () => {
    navigateToFindPage();

    expectInDocumentByText(/5 keywords left/i);
  });

  it("should check if there are 4 keywords left after input a keyword", async () => {
    navigateToFindPage();

    const input = await screen.findByPlaceholderText(
      "Enter keyword and press enter"
    );

    await user.type(input, "hello[enter]");

    expectInDocumentByText(/4 keywords left/i);
  });

  it("should not search if no keywords are given", async () => {
    navigateToFindPage();

    clickButton({ name: /^SEARCH$/ });

    expectInDocumentByTestId("TOP_MAIN_FIND_FORM");
  });

  it("should search if keywords are given and display the result and enabled all 3 view buttons", async () => {
    console.log("[TEST] SBK");

    createTutorials(1, true, {
      title: "Hello World",
      description: "this is a test",
    });
    createTutorials(1, false, { title: "Joehoe", description: "I'm here" });
    createTutorials(1, false, { title: "The World", description: "is enough" });
    createTutorials(1, false, {
      title: "From Home",
      description: "to eternity",
    });

    navigateToFindPage();

    const input = await screen.findByPlaceholderText(
      "Enter keyword and press enter"
    );

    await user.type(input, "World[enter]");

    clickButton({ name: /^SEARCH$/ });

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    const items = screen.getAllByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM");
    console.log("[TEST] items: " + items);

    expect(items.length).toBe(2);

    expectToBeEnabled("TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED");
    expectToBeEnabled("TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON-PUBLISHED");
    expectToBeEnabled("TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_TUTORIALS");
  });
});
