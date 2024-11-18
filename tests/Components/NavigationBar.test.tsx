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
import { createBuckets, createTutorials } from "../mock/database";
import {
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_CREATE_PAGE,
  TUTOPEDIA_CONTENT_FIND_PAGE,
  TUTOPEDIA_CONTENT_OCI_PAGE,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_HOME,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_OCI,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED,
} from "../../src/data/layout/layout";

describe("NavigationBar", () => {
  beforeEach(() => {
    renderRoute(`/${ROUTE_TUTORIALS}`);
  });

  it("should render the `navigation bar`", () => {
    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR}`
    );
  });

  // NAVIGATION GROUP
  it("should contain the `home button`", () => {
    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_HOME}`
    );
  });

  it("should contain the `create button`", () => {
    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE}`
    );
  });

  it("should contain the `find button`", () => {
    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND}`
    );
  });

  it("should contain the `OCI button`", () => {
    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_OCI}`
    );
  });

  it("should render the `tutorials list page` when clicking the `home button` and arrange other buttons visibility", () => {
    clickButton({ name: /^OCI$/ });
    clickButton({ name: /^Home$/ });

    expectByTestIdToBeInTheDocument(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE}`);

    expectElementsEnabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_OCI}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH}`,
    ]);

    expectElementsDisabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL}`,
    ]);
  });

  it("should render the `create page` when clicking the `create button` and handle other buttons visibility", () => {
    clickButton({ name: /^Create$/ });

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_CREATE_PAGE}`);

    expectElementsEnabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_HOME}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_OCI}`,
    ]);

    expectElementsDisabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH}`,
    ]);
  });

  it("should render the `find page` when clicking the `find button` and handle other buttons visibility", () => {
    clickButton({ name: /^Find$/ });

    screen.debug(undefined, Infinity);

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_FIND_PAGE}`);

    expectElementsEnabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_HOME}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_OCI}`,
    ]);

    expectElementsDisabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH}`,
    ]);
  });

  it("should render the `OCI page` when clicking the `OCI button` and handle other buttons visibility", () => {
    clickButton({ name: /^OCI$/ });

    expectByTestIdToBeInTheDocument(`${TUTOPEDIA_CONTENT_OCI_PAGE}`);

    expectElementsEnabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_HOME}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND}`,
    ]);

    expectElementsDisabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH}`,
    ]);
  });

  it("should render the `Home button` and `All Tutorials` button as disabled", () => {
    expectElementsDisabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_HOME}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL}`,
    ]);
  });

  // VIEWS GROUP
  it("should contain the `views group`", () => {
    expectByTestIdToBeInTheDocument(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS}`
    );
  });

  it("should contain the `All Tutorials` button", () => {
    expectByTestIdToBeInTheDocument(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL}`
    );
  });

  it("should contain the `All Published Tutorials` button", () => {
    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED}`
    );
  });

  it("should contain the `All Non-Published Tutorials` button", () => {
    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED}`
    );
  });

  it("should render the `Tutorials List Page` and handle other buttons visibility when clicking `All Tutorials` button", () => {
    clickButton({ name: /^All Published$/ });
    clickButton({ name: /^All Tutorials$/ });

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE}`);

    expectElementsEnabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_OCI}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED}`,
    ]);

    expectElementsDisabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_HOME}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL}`,
    ]);
  });

  it("should render the `Tutorials List Page` and handle other buttons visibility when clicking `All Published` button", () => {
    clickButton({ name: /^All Published$/ });

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE}`);

    expectElementsEnabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_OCI}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED}`,
    ]);

    expectElementsDisabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_HOME}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED}`,
    ]);
  });

  it("should render the `Tutorials List Page` and handle other buttons visibility when clicking `All Non-Published` button", () => {
    clickButton({ name: /^All Non-Published$/ });

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE}`);

    expectElementsEnabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_OCI}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED}`,
    ]);

    expectElementsDisabled([
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_HOME}`,
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED}`,
    ]);
  });

  // SEARCH GROUP
  it("should render the `search` group", () => {
    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH}`
    );
  });

  // ACTION GROUP
  it("should render the `action` group", () => {
    expectByTestIdToBeInTheDocument(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS}`
    );
  });
});

describe("NavigationBar with Data", () => {
  beforeEach(() => {
    createTutorials(10);
    renderRoute(`/${ROUTE_TUTORIALS}`);
  });

  it("should delete all the tutorials when the `delete all` button is clicked", async () => {
    expectByTestIdToBeInTheDocument(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE}`
    );

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`)
    );

    await waitFor(() => {
      clickButtonById(
        `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE}`
      );
    });

    expectNotInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM}`
    );
  });
});

describe("NavigationBar With Default Bucket", () => {
  it("should publish all the tutorials when the `publish all` button is clicked", async () => {
    createBuckets(1, true, {
      name: "buckettest",
      selected: true,
    });

    renderRoute(`/${ROUTE_TUTORIALS}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}`)
    );

    expectByTestIdToBeInTheDocument(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH}`
    );

    let nodes: HTMLCollectionOf<Element> =
      document.getElementsByClassName("MuiChip-label");
    for (let i = 0; i < nodes.length; i++) {
      expect(nodes[i].innerHTML).toBe("not published");
    }

    await waitFor(() => {
      clickButtonById(
        `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH}`
      );
    });

    nodes = document.getElementsByClassName("MuiChip-label");
    for (let i = 0; i < nodes.length; i++) {
      expect(nodes[i].innerHTML).toBe("published");
    }
  });
});
