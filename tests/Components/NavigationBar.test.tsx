import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { renderRoute } from "../render/render";
import {
  clickButton,
  clickButtonById,
  expectByTestIdToBeInTheDocument,
  expectElementsDisabled,
  expectElementsEnabled,
  expectInDocumentByTestId,
  expectNotInDocumentByTestId,
} from "../testutils";
import { createTutorials } from "../mock/database";
import {
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_HOME,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_OCI,
} from "../../src/data/layout/layout";

describe("NavigationBar", () => {
  it("should render the `navigation bar`", () => {
    renderRoute(`/${ROUTE_TUTORIALS}`);

    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR}`
    );
  });

  // NAVIGATION GROUP
  it("should contain the `home button`", () => {
    renderRoute(`/${ROUTE_TUTORIALS}`);

    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_HOME}`
    );
  });

  it("should contain the `create button`", () => {
    renderRoute(`/${ROUTE_TUTORIALS}`);

    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE}`
    );
  });

  it("should contain the `find button`", () => {
    renderRoute(`/${ROUTE_TUTORIALS}`);

    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND}`
    );
  });

  it("should contain the `OCI button`", () => {
    renderRoute(`/${ROUTE_TUTORIALS}`);

    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_OCI}`
    );
  });

  it.skip("should render the `tutorials list page` when clicking the `home button` and arrange other buttons visibility", () => {
    renderRoute("/tutorials");

    clickButton({ name: /^OCI$/ });
    clickButton({ name: /^Home$/ });

    expectByTestIdToBeInTheDocument("TUTORIALS_LIST_PAGE");

    expectElementsEnabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON-PUBLISHED",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_CREATE",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_FIND",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_OCI",
      "TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT",
      "TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_DELETE",
      "TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_PUBLISH",
    ]);

    expectElementsDisabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_TUTORIALS",
    ]);
  });

  it.skip("should render the `create page` when clicking the `create button` and handle other buttons visibility", () => {
    renderRoute("/tutorials");

    clickButton({ name: /^Create$/ });

    expectInDocumentByTestId("TUTORIALS_CREATE_PAGE");

    expectElementsEnabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_HOME",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_FIND",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_OCI",
    ]);

    expectElementsDisabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_CREATE",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON-PUBLISHED",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_TUTORIALS",
      "TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT",
      "TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_DELETE",
      "TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_PUBLISH",
    ]);
  });

  it.skip("should render the `find page` when clicking the `find button` and handle other buttons visibility", () => {
    renderRoute("/tutorials");

    clickButton({ name: /^Find$/ });

    expectInDocumentByTestId("TUTORIALS_FIND_PAGE");

    expectElementsEnabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_HOME",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_CREATE",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_OCI",
    ]);

    expectElementsDisabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON-PUBLISHED",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_TUTORIALS",
      "TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT",
      "TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_DELETE",
      "TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_PUBLISH",
    ]);
  });

  it.skip("should render the `OCI page` when clicking the `OCI button` and handle other buttons visibility", () => {
    renderRoute("/tutorials");

    clickButton({ name: /^OCI$/ });

    expectByTestIdToBeInTheDocument("TUTORIALS_OCI_PAGE");

    expectElementsEnabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_HOME",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_CREATE",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_FIND",
    ]);

    expectElementsDisabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON-PUBLISHED",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_TUTORIALS",
      "TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT",
      "TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_DELETE",
      "TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_PUBLISH",
    ]);
  });

  it.skip("should render the `Home button` and `All Tutorials` button as disabled", () => {
    renderRoute("/tutorials");

    expectElementsDisabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_HOME",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_TUTORIALS",
    ]);
  });

  // VIEWS GROUP
  it.skip("should contain the `views group`", () => {
    renderRoute("/tutorials");

    expectByTestIdToBeInTheDocument("TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS");
  });

  it.skip("should contain the `All Tutorials` button", () => {
    renderRoute("/tutorials");

    expectByTestIdToBeInTheDocument(
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_TUTORIALS"
    );
  });

  it.skip("should contain the `All Published Tutorials` button", () => {
    renderRoute("/tutorials");

    expectInDocumentByTestId(
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED"
    );
  });

  it.skip("should contain the `All Non-Published Tutorials` button", () => {
    renderRoute("/tutorials");

    expectInDocumentByTestId(
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON-PUBLISHED"
    );
  });

  it.skip("should render the `Tutorials List Page` and handle other buttons visibility when clicking `All Tutorials` button", () => {
    renderRoute("/tutorials");

    clickButton({ name: /^All Published$/ });
    clickButton({ name: /^All Tutorials$/ });

    expectInDocumentByTestId("TUTORIALS_LIST_PAGE");

    expectElementsEnabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_CREATE",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_FIND",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_OCI",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON-PUBLISHED",
    ]);

    expectElementsDisabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_HOME",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_TUTORIALS",
    ]);
  });

  it.skip("should render the `Tutorials List Page` and handle other buttons visibility when clicking `All Published` button", () => {
    renderRoute("/tutorials");

    clickButton({ name: /^All Published$/ });

    expectInDocumentByTestId("TUTORIALS_LIST_PAGE");

    expectElementsEnabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_CREATE",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_FIND",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_OCI",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_TUTORIALS",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON-PUBLISHED",
    ]);

    expectElementsDisabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_HOME",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED",
    ]);
  });

  it.skip("should render the `Tutorials List Page` and handle other buttons visibility when clicking `All Non-Published` button", () => {
    renderRoute("/tutorials");

    clickButton({ name: /^All Non-Published$/ });

    expectInDocumentByTestId("TUTORIALS_LIST_PAGE");

    expectElementsEnabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_CREATE",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_FIND",
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_OCI",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_TUTORIALS",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED",
    ]);

    expectElementsDisabled([
      "TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_HOME",
      "TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON-PUBLISHED",
    ]);
  });

  // SEARCH GROUP
  it.skip("should render the `search` group", () => {
    renderRoute("/tutorials");

    expectInDocumentByTestId("TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH");
  });

  // ACTION GROUP
  it.skip("should render the `action` group", () => {
    renderRoute("/tutorials");

    expectByTestIdToBeInTheDocument("TUTORIALS_PAGE_NAVIGATION_BAR_ACTION");
  });

  it.skip("should delete all the tutorials when the `delete all` button is clicked", async () => {
    createTutorials(10);

    renderRoute("/tutorials");

    expectByTestIdToBeInTheDocument(
      "TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_DELETE"
    );

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    const preDeleteItems = screen.getAllByTestId(
      "TUTORIALS_LIST_PAGE_TUTORIALS_ITEM"
    ).length;

    console.log("[PRE_DELETE_ALL] = " + preDeleteItems);

    await waitFor(() => {
      clickButtonById("TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_DELETE");
    });

    expectNotInDocumentByTestId("TUTORIALS_LIST_PAGE_TUTORIALS_ITEM");
  });

  it.skip("should publish all the tutorials when the `publish all` button is clicked", async () => {
    createTutorials(10);
    renderRoute("/tutorials");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId("TUTORIALS_LIST_PAGE_LOADING")
    );

    expectByTestIdToBeInTheDocument(
      "TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_PUBLISH"
    );

    let nodes: HTMLCollectionOf<Element> =
      document.getElementsByClassName("MuiChip-label");

    for (let i = 0; i < nodes.length; i++) {
      expect(nodes[i].innerHTML).toBe("not published");
    }

    await waitFor(() => {
      clickButtonById("TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_PUBLISH");
    });

    nodes = document.getElementsByClassName("MuiChip-label");

    for (let i = 0; i < nodes.length; i++) {
      expect(nodes[i].innerHTML).toBe("published");
    }
  });
});
