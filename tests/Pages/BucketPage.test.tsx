import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { renderRoute } from "../render/render";
import { User } from "@auth0/auth0-react";
import { clickButtonById, mockAuthState } from "../testutils";
import user from "@testing-library/user-event";
import { createBuckets, createSetting } from "../mock/database";
import {
  BUCKET_CONTAINER,
  BUCKET_CONTAINER_BUCKET_INPUT,
  BUCKET_CONTAINER_CREATE_BUTTON,
  BUCKET_CONTAINER_DELETE_BUTTON,
  BUCKETS_PAGE_LOADER,
  ROUTE_TUTOPEDIA,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS_BUTTON,
  TUTOPEDIA_HEADER_ACTION_BUTTON_ADMIN,
} from "../../src/data/layout/layout";

describe("BucketPage", () => {
  it("should render a bucket when created", async () => {
    let loggedUser: User = {
      name: "testuser",
    };

    mockAuthState({
      isLoading: false,
      isAuthenticated: true,
      user: loggedUser,
    });

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    clickButtonById(`${TUTOPEDIA_HEADER_ACTION_BUTTON_ADMIN}`);
    clickButtonById(`${TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS_BUTTON}`);

    await waitForElementToBeRemoved(
      screen.queryByTestId(`${BUCKETS_PAGE_LOADER}`)
    );

    const input = screen.getByTestId(`${BUCKET_CONTAINER_BUCKET_INPUT}`);

    await user.type(input, `MyBucket[enter]`);

    const button = screen.getByTestId(`${BUCKET_CONTAINER_CREATE_BUTTON}`);
    await user.click(button);

    const collection = screen.getAllByTestId(`${BUCKET_CONTAINER}`);
    expect(collection.length).toBe(2);
  });

  it("should remove a bucket when deleted", async () => {
    let loggedUser: User = {
      name: "testuser",
    };

    mockAuthState({
      isLoading: false,
      isAuthenticated: true,
      user: loggedUser,
    });

    createBuckets(1);
    createSetting(1, true, { key: "OCI_Tenant", value: "Tenant" });
    createSetting(1, false, { key: "OCI_Region", value: "Region" });

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    clickButtonById(`${TUTOPEDIA_HEADER_ACTION_BUTTON_ADMIN}`);
    clickButtonById(`${TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS_BUTTON}`);

    await waitForElementToBeRemoved(
      screen.queryByTestId(`${BUCKETS_PAGE_LOADER}`)
    );

    screen.debug(undefined, Infinity);

    const button = screen.getByTestId(`${BUCKET_CONTAINER_DELETE_BUTTON}`);
    await user.click(button);

    const collection = screen.getAllByTestId(`${BUCKET_CONTAINER}`);
    expect(collection.length).toBe(1);
  });
});
