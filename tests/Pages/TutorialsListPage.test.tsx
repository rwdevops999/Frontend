import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { simulateDelay, simulateError } from "../mock/backend";
import { renderRoute } from "../render/render";
import {
  clickButtonByElement,
  clickButtonById,
  expectChipContainsValue,
  expectInDocumentByTestId,
  expectNotInDocumentByTestId,
  expectToBeDisabled,
} from "../testutils";
import { createTutorials } from "../mock/database";
import {
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_CREATE_PAGE,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ERROR,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_DELETE,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_PUBLISH,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_UPDATE,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED,
} from "../../src/data/layout/layout";

describe("TutorialsListPage", () => {
  it("should show the loader if loading", () => {
    simulateDelay("http://localhost:8081/api/find");
    renderRoute(`/${ROUTE_TUTORIALS}`);
    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`);
  });

  it("should show the error if any error occurs", async () => {
    simulateError("http://localhost:8081/api/find");
    renderRoute(`/${ROUTE_TUTORIALS}`);

    await waitFor(() => {
      expectInDocumentByTestId(
        `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ERROR}`
      );
    });
  });

  it("should show all tutorials when all tutorials is selected", async () => {
    createTutorials(10);
    renderRoute(`/${ROUTE_TUTORIALS}`);

    expectToBeDisabled(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL}`
    );

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`)
    );

    const items = screen.getAllByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM}`
    );

    const node: HTMLInputElement = screen.getByAltText(/pagination/i);
    expect(items.length).toBe(parseInt(node.value));
  });

  it("should show all published tutorials when all published tutorials is selected", async () => {
    createTutorials(3, true, { published: true });
    createTutorials(2, false);

    renderRoute(`/${ROUTE_TUTORIALS}`);

    clickButtonById(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED}`
    );

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`)
    );

    const items = screen.getAllByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM}`
    );
    expect(items.length).toBe(3);
  });

  it("should show all non-published tutorials when all non-published tutorials is selected", async () => {
    createTutorials(2);
    renderRoute(`/${ROUTE_TUTORIALS}`);

    clickButtonById(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED}`
    );

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
  });

  it("should show an published chip when the tutorial is published", async () => {
    createTutorials(1, true, { published: true });
    renderRoute(`/${ROUTE_TUTORIALS}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`)
    );

    expectChipContainsValue("published");
  });

  it("should not contain any button when the tutorial is published", async () => {
    createTutorials(1, true, { published: true });
    renderRoute(`/${ROUTE_TUTORIALS}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`)
    );

    expectNotInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_UPDATE}`
    );
    expectNotInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_PUBLISH}`
    );
    expectNotInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_DELETE}`
    );
  });

  it("should show an not published chip when the tutorial is not published", async () => {
    createTutorials(1);
    renderRoute(`/${ROUTE_TUTORIALS}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`)
    );

    expectChipContainsValue("not published");
  });

  it("should contain all buttons (edit, publish, delete) when the tutorial is not published", async () => {
    createTutorials(1);
    renderRoute(`/${ROUTE_TUTORIALS}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`)
    );

    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_UPDATE}`
    );
    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_PUBLISH}`
    );
    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_DELETE}`
    );
  });

  it("should render the create page as update when the update button is clicked", async () => {
    createTutorials(1);
    renderRoute(`/${ROUTE_TUTORIALS}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`)
    );

    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_UPDATE}`
    );
    clickButtonById(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_UPDATE}`);

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_CREATE_PAGE}`);
  });

  it("should publish the tutorial and render the publish tutorials when the publish button is clicked", async () => {
    createTutorials(1);
    renderRoute(`/${ROUTE_TUTORIALS}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`)
    );

    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_PUBLISH}`
    );

    /**
     * the button contains an awiait axios, so we have to wait also for that to finish
     */
    await waitFor(() => {
      clickButtonById(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_PUBLISH}`);
    });

    expectChipContainsValue("published");
  });

  it("should remove the tutorial when the delete button is clicked", async () => {
    createTutorials(2);

    renderRoute(`/${ROUTE_TUTORIALS}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`)
    );

    const preDeleteItems = screen.getAllByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM}`
    ).length;

    /**
     * the button contains an awiait axios, so we have to wait also for that to finish
     */
    await waitFor(() => {
      let deleteButton = screen.getAllByTestId(
        `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_DELETE}`
      )[0];
      clickButtonByElement(deleteButton);
    });

    const postDeleteItems = screen.getAllByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM}`
    ).length;

    expect(postDeleteItems).toBe(preDeleteItems - 1);
  });
});
