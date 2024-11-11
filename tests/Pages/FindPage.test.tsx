import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { renderRoute } from "../render/render";
import {
  clickButton,
  clickButtonById,
  expectElementByTextToBeInTheDocument,
  expectInDocumentByTestId,
  expectInDocumentByText,
  expectToBeDisabled,
} from "../testutils";
import user from "@testing-library/user-event";
import { createTutorials } from "../mock/database";
import {
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_FIND_PAGE_BUTTONS,
  TUTOPEDIA_CONTENT_FIND_PAGE_FORM,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED,
} from "../../src/data/layout/layout";

const navigateToFindPage = () => {
  /**
   * we pass through `/tutorials` because mocking useLocation gives problems with in-application navigation
   */
  renderRoute(`/${ROUTE_TUTORIALS}`);

  expectInDocumentByTestId(
    `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND}`
  );

  clickButtonById(
    `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND}`
  );
};

describe("FindPage", () => {
  it("should disable the `search field` when rendering the Find page", () => {
    navigateToFindPage();

    expectToBeDisabled(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT}`
    );
  });

  it("should render the `Find By Keywords` title page", () => {
    navigateToFindPage();

    expectElementByTextToBeInTheDocument(/^Find By Keywords$/);
  });

  it("should render the find form", () => {
    navigateToFindPage();

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_FIND_PAGE_FORM}`);
  });

  it("should render the buttons", () => {
    navigateToFindPage();

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_FIND_PAGE_BUTTONS}`);
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

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE}`);
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

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_FIND_PAGE_FORM}`);
  });

  it("should search if keywords are given and display the result and enabled all 3 view buttons", async () => {
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
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`)
    );

    const items = screen.getAllByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM}`
    );

    expect(items.length).toBe(2);

    expectToBeDisabled(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL}`
    );
    expectToBeDisabled(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED}`
    );
    expectToBeDisabled(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED}`
    );
  });
});
