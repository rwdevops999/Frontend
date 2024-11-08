import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { createTutorials, getDBTutorialByIndex } from "../mock/database";
import { renderRoute } from "../render/render";
import {
  expectElementByTestIdToBeDisabled,
  expectToBeEnabled,
} from "../testutils";
import user from "@testing-library/user-event";

describe("SearchGroup", () => {
  it("should enable the search field when rendering the Home page", () => {
    renderRoute("/tutorials");

    expectToBeEnabled("TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT");
  });

  it("should render the searched tutorial", async () => {
    createTutorials(4);
    const { id } = getDBTutorialByIndex(0);

    renderRoute("/tutorials");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    const input = await screen.getByTestId(
      "TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT"
    );

    await user.type(input, `${id}[enter]`);

    const items = screen.getAllByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM");
    expect(items.length).toBe(1);
  });

  it.skip("should disable the search field when rendering the AWS page", () => {
    renderRoute("/AWS");

    expectElementByTestIdToBeDisabled(
      "TOP_TUTORIALSPAGE_NAVIGATION_BAR_SEARCH_FIELD_INPUT"
    );
  });
});
