import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { createTutorials, getDBTutorialByIndex } from "../mock/database";
import { renderRoute } from "../render/render";
import {
  expectElementByTestIdToBeDisabled,
  expectToBeEnabled,
} from "../testutils";
import user from "@testing-library/user-event";
import {
  ROUTE_OCI,
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT,
} from "../../src/data/layout/layout";

describe("SearchGroup", () => {
  it("should enable the search field when rendering the Home page", () => {
    renderRoute(`/${ROUTE_TUTORIALS}`);

    expectToBeEnabled(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT}`
    );
  });

  it("should render the searched tutorial", async () => {
    createTutorials(4);
    const { id } = getDBTutorialByIndex(0);

    renderRoute(`/${ROUTE_TUTORIALS}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`)
    );

    const input = await screen.getByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT}`
    );

    await user.type(input, `${id}[enter]`);

    const items = screen.getAllByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM}`
    );
    expect(items.length).toBe(1);
  });

  it("should disable the search field when rendering the OCI page", () => {
    renderRoute(`/${ROUTE_TUTORIALS}/${ROUTE_OCI}`);

    expectElementByTestIdToBeDisabled(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT}`
    );
  });
});
