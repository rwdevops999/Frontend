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

describe("AWSPage", () => {
  it("should contain the `S3 Display`", async () => {
    renderRoute("/tutorials/aws");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(screen.queryByTestId("AWS_PAGE_LOADING"));

    screen.debug(undefined, Infinity);

    expectInDocumentByTestId("S3_DISPLAY");
  });

  it("should render the `loader`", () => {
    simulateDelay("http://localhost:8081/api/bucket/find");

    renderRoute("/tutorials/aws");

    expectInDocumentByTestId("AWS_PAGE_LOADING");
  });

  it("should render the `error`", async () => {
    simulateError("http://localhost:8081/api/bucket/find");

    renderRoute("/tutorials/aws");

    await waitForElementToAppear("AWS_PAGE_ERROR");
  });

  it("should render the `S3 display`", async () => {
    renderRoute("/tutorials/aws");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(screen.queryByTestId("AWS_PAGE_LOADING"));

    expectInDocumentByTestId("S3_DISPLAY");
  });

  it("should render the no buckets", async () => {
    renderRoute("/tutorials/aws");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(screen.queryByTestId("AWS_PAGE_LOADING"));

    const items = screen.queryAllByTestId("S3_DISPLAY_BUCKET");
    expect(items.length).toBe(0);
  });

  it("should render the n buckets", async () => {
    createBuckets(2);

    renderRoute("/tutorials/aws");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(screen.queryByTestId("AWS_PAGE_LOADING"));

    screen.debug(undefined, Infinity);

    const items = screen.getAllByTestId("S3_DISPLAY_BUCKET");
    expect(items.length).toBe(2);
  });

  it("should not render the `add button`", async () => {
    createBuckets(1);

    renderRoute("/tutorials/aws");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(screen.queryByTestId("AWS_PAGE_LOADING"));

    expectNotInDocumentByTestId("S3_DISPLAY_BUCKET_ADD");
  });

  it("should not render the `delete button`", async () => {
    createBuckets(1);

    renderRoute("/tutorials/aws");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(screen.queryByTestId("AWS_PAGE_LOADING"));

    expectNotInDocumentByTestId("S3_DISPLAY_BUCKET_DELETE");
  });

  it("should render the bucket name", async () => {
    createBuckets(1);

    const bucket = getDBBucketByIndex(0);

    renderRoute("/tutorials/aws");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(screen.queryByTestId("AWS_PAGE_LOADING"));

    expectInDocumentByText(`${bucket.name}`);
  });

  it("should render the `default checkbox` and it should be disabled", async () => {
    createBuckets(1, true, {
      selected: true,
    });

    const bucket = getDBBucketByIndex(0);
    console.log("CREATED BUCKET = " + JSON.stringify(bucket));

    renderRoute("/tutorials/aws");

    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(screen.queryByTestId("AWS_PAGE_LOADING"));

    const element = screen.getByPlaceholderText(
      "S3_DISPLAY_BUCKET_DEFAULT_INPUT"
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

    // GET THE SECOND BUCKET
    const bucket = getDBBucketByIndex(1);
    console.log("SELECTED BUCKET = " + JSON.stringify(bucket));

    // RENDER AWS
    renderRoute("/tutorials/aws");

    // WAIT UNTIL LOADER DISAPPEARS
    /**
     * This can't be put in a function because the test must be async
     */
    await waitForElementToBeRemoved(screen.queryByTestId("AWS_PAGE_LOADING"));

    // GET ALL CONTAINERS (EACH BUCKET IS IN ITS OWN CONTAINER)
    let elements = screen.getAllByTestId("S3_DISPLAY_CONTAINER");
    // WE EXPECT 3 CONTAINERS
    expect(elements.length).toBe(3);

    /**
     * Look in each container to find the default checkbox and its input field.
     */

    // FOR EACH CONTAINER
    for (let i = 0; i < elements.length; i++) {
      // GET THE CHECKBOX
      const checkbox = within(elements[i]).getByTestId(
        "S3_DISPLAY_BUCKET_DEFAULT"
      );

      // GET THE INPUT FIELD UNDER THE CHECKBOX
      const input = within(checkbox).getByPlaceholderText(
        "S3_DISPLAY_BUCKET_DEFAULT_INPUT"
      );

      // THE FIRST MUST BE DISABLED, THE OTHER TWO ENABLED
      if (i === 0) {
        expectElementToBeDisabled(input);
      } else {
        expectElementToBeEnabled(input);

        // CLICK THE CHECKBOX FOR THE SECONDS BUCKET
        if (i === 1) {
          await userEvent.click(checkbox);
        }
      }
    }

    // GET AGAIN THE CONTAINERS
    elements = screen.getAllByTestId("S3_DISPLAY_CONTAINER");

    // FOR EACH CONTAINER
    elements.forEach((element, index) => {
      // GET THE CHECKBOX
      const checkbox = within(element).getByTestId("S3_DISPLAY_BUCKET_DEFAULT");
      // AND THE INPUT INSIDE THIS CHECKBOX
      const input = within(checkbox).getByPlaceholderText(
        "S3_DISPLAY_BUCKET_DEFAULT_INPUT"
      );

      // NOW THE SECOND MUST BE DISABLED AND THE FIRST AND THE THIRD ENABLED
      if (index === 1) {
        expectElementToBeDisabled(input);
      } else {
        expectElementToBeEnabled(input);
      }
    });

    // CHECK BUCKETNAME IN HEADER TO BE NAM OF THE SECOND BUCKET
    const header = screen.getByTestId("TUTOPEDIA_HEADER_BUCKET");
    // const element = within(header).getByText(`${bucket.name}`);
    const element = within(header).getByText("bucketname2");

    expectElementInDocument(element);
  });
});
