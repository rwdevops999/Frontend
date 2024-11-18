import {
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { renderRoute } from "../render/render";
import {
  expectElementInDocument,
  expectElementToBeDisabled,
  expectElementToBeEnabled,
  expectInDocumentByTestId,
  expectInDocumentByText,
  expectNotInDocumentByTestId,
  waitForElementToAppear,
} from "../testutils";
import { simulateDelay, simulateError } from "../mock/backend";
import { createBuckets, getDBBucketByIndex } from "../mock/database";
import userEvent from "@testing-library/user-event";
import {
  BUCKET_CONTAINER,
  BUCKET_CONTAINER_BUCKET,
  BUCKET_CONTAINER_BUCKET_DEFAULT,
  BUCKET_CONTAINER_BUCKET_DEFAULT_INPUT,
  BUCKET_CONTAINER_CREATE_BUTTON,
  BUCKET_CONTAINER_DELETE_BUTTON,
  BUCKETS_DISPLAY,
  ROUTE_OCI,
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_OCI_PAGE_ERROR,
  TUTOPEDIA_CONTENT_OCI_PAGE_LOADER,
  TUTOPEDIA_HEADER_BUCKET_NAME,
} from "../../src/data/layout/layout";

describe("OCIPage", () => {
  it("should contain the `BUCKET Display`", async () => {
    renderRoute(`/${ROUTE_TUTORIALS}/${ROUTE_OCI}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_OCI_PAGE_LOADER}`)
    );

    expectInDocumentByTestId(`${BUCKETS_DISPLAY}`);
  });

  it("should render the `loader`", () => {
    simulateDelay("http://localhost:8081/api/bucket/find");

    renderRoute(`/${ROUTE_TUTORIALS}/${ROUTE_OCI}`);

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_OCI_PAGE_LOADER}`);
  });

  it("should render the `error`", async () => {
    simulateError("http://localhost:8081/api/bucket/find");

    renderRoute(`/${ROUTE_TUTORIALS}/${ROUTE_OCI}`);

    await waitForElementToAppear(`${TUTOPEDIA_CONTENT_OCI_PAGE_ERROR}`);
  });

  it("should render the `S3 display`", async () => {
    renderRoute(`/${ROUTE_TUTORIALS}/${ROUTE_OCI}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_OCI_PAGE_LOADER}`)
    );

    expectInDocumentByTestId(`${BUCKETS_DISPLAY}`);
  });

  it("should render no buckets", async () => {
    renderRoute(`/${ROUTE_TUTORIALS}/${ROUTE_OCI}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_OCI_PAGE_LOADER}`)
    );

    const items = screen.queryAllByTestId(`${BUCKET_CONTAINER_BUCKET}`);
    expect(items.length).toBe(0);
  });

  it("should render the n buckets", async () => {
    createBuckets(2);

    renderRoute(`/${ROUTE_TUTORIALS}/${ROUTE_OCI}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_OCI_PAGE_LOADER}`)
    );

    const items = screen.getAllByTestId(`${BUCKET_CONTAINER_BUCKET}`);
    expect(items.length).toBe(2);
  });

  it("should not render the `add button`", async () => {
    createBuckets(1);

    renderRoute(`/${ROUTE_TUTORIALS}/${ROUTE_OCI}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_OCI_PAGE_LOADER}`)
    );

    expectNotInDocumentByTestId(`${BUCKET_CONTAINER_CREATE_BUTTON}`);
  });

  it("should not render the `delete button`", async () => {
    createBuckets(1);

    renderRoute(`/${ROUTE_TUTORIALS}/${ROUTE_OCI}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_OCI_PAGE_LOADER}`)
    );

    expectNotInDocumentByTestId(`${BUCKET_CONTAINER_DELETE_BUTTON}`);
  });

  it("should render the bucket name", async () => {
    createBuckets(1);

    const bucket = getDBBucketByIndex(0);

    renderRoute(`/${ROUTE_TUTORIALS}/${ROUTE_OCI}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_OCI_PAGE_LOADER}`)
    );

    expectInDocumentByText(`${bucket.name}`);
  });

  it("should render the `default checkbox` and it should be disabled", async () => {
    createBuckets(1, true, {
      selected: true,
    });

    renderRoute(`/${ROUTE_TUTORIALS}/${ROUTE_OCI}`);

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_OCI_PAGE_LOADER}`)
    );

    const element = screen.getByPlaceholderText(
      `${BUCKET_CONTAINER_BUCKET_DEFAULT_INPUT}`
    );

    expectElementInDocument(element);
    expectElementToBeDisabled(element);
  });

  it("should handle the default check box", async () => {
    // CREATE THREE BUCKETS (THE FIRST IS DEFAULT ONE)
    createBuckets(1, true, {
      id: 1,
      name: "bucketname1",
      selected: true,
    });
    createBuckets(1, false, {
      id: 2,
      name: "bucketname2",
    });
    createBuckets(1, false, {
      id: 3,
      name: "bucketname3",
    });

    // RENDER OCI
    renderRoute(`/${ROUTE_TUTORIALS}/${ROUTE_OCI}`);

    // WAIT UNTIL LOADER DISAPPEARS
    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_OCI_PAGE_LOADER}`)
    );

    // GET ALL CONTAINERS (EACH BUCKET IS IN ITS OWN CONTAINER)
    // WE EXPECT 3 CONTAINERS
    let elements = screen.getAllByTestId(`${BUCKET_CONTAINER}`);
    expect(elements.length).toBe(3);

    /**
     * Look in each container to find the default checkbox and its input field.
     */

    // FOR EACH CONTAINER
    // GET THE CHECKBOX
    // GET THE INPUT FIELD UNDER THE CHECKBOX
    // THE FIRST MUST BE DISABLED, THE OTHER TWO ENABLED
    // CLICK THE CHECKBOX FOR THE SECONDS BUCKET
    for (let i = 0; i < elements.length; i++) {
      const checkbox = within(elements[i]).getByTestId(
        `${BUCKET_CONTAINER_BUCKET_DEFAULT}`
      );

      const input = within(checkbox).getByPlaceholderText(
        `${BUCKET_CONTAINER_BUCKET_DEFAULT_INPUT}`
      );

      if (i === 0) {
        expectElementToBeDisabled(input);
      } else {
        expectElementToBeEnabled(input);

        if (i === 1) {
          await userEvent.click(checkbox);
        }
      }
    }

    // GET AGAIN THE CONTAINERS
    // elements = screen.getAllByTestId(`${BUCKET_CONTAINER}`);

    // FOR EACH CONTAINER
    // GET THE CHECKBOX
    // AND THE INPUT INSIDE THIS CHECKBOX
    // NOW THE SECOND MUST BE DISABLED AND THE FIRST AND THE THIRD ENABLED
    elements.forEach((element, index) => {
      const checkbox = within(element).getByTestId(
        `${BUCKET_CONTAINER_BUCKET_DEFAULT}`
      );
      const input = within(checkbox).getByPlaceholderText(
        `${BUCKET_CONTAINER_BUCKET_DEFAULT_INPUT}`
      );

      if (index === 1) {
        expectElementToBeDisabled(input);
      } else {
        expectElementToBeEnabled(input);
      }
    });

    // CHECK BUCKETNAME IN HEADER TO BE NAME OF THE SECOND BUCKET
    const header = screen.getByTestId(`${TUTOPEDIA_HEADER_BUCKET_NAME}`);
    const element = within(header).getByText("bucketname2");

    expectElementInDocument(element);
  });
});
