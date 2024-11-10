import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { renderRoute } from "../render/render";
import { User } from "@auth0/auth0-react";
import { clickButtonById, mockAuthState } from "../testutils";
import user from "@testing-library/user-event";
import { createBuckets } from "../mock/database";

describe.skip("AdminPage", () => {
  it("should render a bucket when created", async () => {
    let loggedUser: User = {
      name: "testuser",
    };

    mockAuthState({
      isLoading: false,
      isAuthenticated: true,
      user: loggedUser,
    });

    renderRoute("/");

    clickButtonById("TUTOPEDIA_HEADER_ACTIONS_ADMIN");
    await waitForElementToBeRemoved(screen.queryByTestId("ADMIN_PAGE_LOADING"));

    const input = screen.getByTestId("S3_DISPLAY_BUCKET_INPUT");
    console.log("[INPUT] = " + input);

    await user.type(input, `MyBucket[enter]`);

    const button = screen.getByTestId("S3_DISPLAY_BUCKET_ADD");
    await user.click(button);

    const collection = screen.getAllByTestId("S3_DISPLAY_CONTAINER");
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

    renderRoute("/");

    clickButtonById("TUTOPEDIA_HEADER_ACTIONS_ADMIN");
    await waitForElementToBeRemoved(screen.queryByTestId("ADMIN_PAGE_LOADING"));

    const button = screen.getByTestId("S3_DISPLAY_BUCKET_DELETE");
    await user.click(button);

    // screen.debug(undefined, Infinity);

    const collection = screen.getAllByTestId("S3_DISPLAY_CONTAINER");
    expect(collection.length).toBe(1);
  });
});
