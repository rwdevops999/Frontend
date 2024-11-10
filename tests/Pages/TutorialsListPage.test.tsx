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

describe.skip("TutorialsListPage", () => {
  it("should show the loader if loading", () => {
    simulateDelay("http://localhost:8081/api/find");
    renderRoute("/tutorials");
    expectInDocumentByTestId("TUTORIALS_LIST_PAGE_LOADING");
  });

  it("should show the error if any error occurs", async () => {
    simulateError("http://localhost:8081/api/find");
    renderRoute("/tutorials");

    /**
     * This can't be put in a function because the test must be async
     */
    // await waitForElementToBeRemoved(
    //   screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    // );

    await waitFor(() => {
      expectInDocumentByTestId("TUTORIALS_LIST_PAGE_ERROR");
    });
  });

  it("should show all tutorials when all tutorials is selected", async () => {
    createTutorials(10);
    renderRoute("/tutorials");

    expectToBeDisabled("TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_TUTORIALS");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    const items = screen.getAllByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM");

    const node: HTMLInputElement = screen.getByAltText(/pagination/i);
    expect(items.length).toBe(parseInt(node.value));
  });

  it("should show all published tutorials when all published tutorials is selected", async () => {
    createTutorials(3, true, { published: true });
    createTutorials(2, false);

    renderRoute("/tutorials");

    clickButtonById("TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    screen.debug(undefined, Infinity);

    const items = screen.getAllByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM");
    expect(items.length).toBe(3);
  });

  it("should show all non-published tutorials when all non-published tutorials is selected", async () => {
    createTutorials(2);
    renderRoute("/tutorials");

    clickButtonById("TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON-PUBLISHED");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    const items = screen.getAllByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM");
    expect(items.length).toBe(2);
  });

  it("should show an published chip when the tutorial is published", async () => {
    createTutorials(1, true, { published: true });
    renderRoute("/tutorials");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    expectChipContainsValue("published");
  });

  it("should not contain any button when the tutorial is published", async () => {
    createTutorials(1, true, { published: true });
    renderRoute("/tutorials");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    expectNotInDocumentByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_EDIT");
    expectNotInDocumentByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_PUBLISH");
    expectNotInDocumentByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_DELETE");
  });

  it("should show an not published chip when the tutorial is not published", async () => {
    createTutorials(1);
    renderRoute("/tutorials");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    expectChipContainsValue("not published");
  });

  it("should contain all buttons (edit, publish, delete) when the tutorial is not published", async () => {
    createTutorials(1);
    renderRoute("/tutorials");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    expectInDocumentByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_EDIT");
    expectInDocumentByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_PUBLISH");
    expectInDocumentByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_DELETE");
  });

  it("should render the create page as update when the edit button is clicked", async () => {
    createTutorials(1);
    renderRoute("/tutorials");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    expectInDocumentByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_EDIT");
    clickButtonById("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_EDIT");

    expectInDocumentByTestId("TUTORIALS_CREATE_PAGE");
  });

  it("should publish the tutorial and render the publish tutorials when the publish button is clicked", async () => {
    createTutorials(1);
    renderRoute("/tutorials");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    expectInDocumentByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_PUBLISH");
    /**
     * the button contains an awiait axios, so we have to wait also for that to finish
     */
    await waitFor(() => {
      clickButtonById("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_PUBLISH");
    });

    expectChipContainsValue("published");
  });

  it("should remove the tutorial when the delete button is clicked", async () => {
    createTutorials(2);

    renderRoute("/tutorials");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    // screen.debug(undefined, Infinity);

    const preDeleteItems = screen.getAllByTestId(
      "TUTORIALS_LIST_PAGE_TUTORIALS_ITEM"
    ).length;

    /**
     * the button contains an awiait axios, so we have to wait also for that to finish
     */
    await waitFor(() => {
      let deleteButton = screen.getAllByTestId(
        "TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_DELETE"
      )[0];
      clickButtonByElement(deleteButton);
    });

    const postDeleteItems = screen.getAllByTestId(
      "TUTORIALS_LIST_PAGE_TUTORIALS_ITEM"
    ).length;

    expect(postDeleteItems).toBe(preDeleteItems - 1);
  });
});
