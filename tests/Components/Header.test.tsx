import { screen, waitFor } from "@testing-library/react";
import { renderRoute } from "../render/render";
import {
  expectInDocumentByTestId,
  expectInDocumentByText,
  expectNotInDocumentByTestId,
  mockAuthState,
} from "../testutils";
import { User } from "@auth0/auth0-react";
import { createBuckets } from "../mock/database";

describe.skip("Header", () => {
  beforeEach(() => {
    renderRoute("/");
  });

  it("should contain the `title`", () => {
    expectInDocumentByTestId("TUTOPEDIA_HEADER_TITLE");
  });

  it("should contain the title `Tut-O-Pedia`", () => {
    expectInDocumentByText(/^Tut-O-Pedia$/);
  });

  it("should contain the `bucket`", () => {
    expectInDocumentByTestId("TUTOPEDIA_HEADER_BUCKET");
  });

  it("should contain the bucket `<<<undefined>>>`", () => {
    expectInDocumentByText(/^<<<undefined>>>$/);
  });

  it("should contain the `user`", () => {
    expectInDocumentByTestId("TUTOPEDIA_HEADER_USER");
  });

  it("should contain the `actions`", () => {
    expectInDocumentByTestId("TUTOPEDIA_HEADER_ACTIONS");
  });

  it("should contain the `home button`", () => {
    expectInDocumentByTestId("TUTOPEDIA_HEADER_ACTIONS_HOME");
  });
});

.skip("Header with mocked authorization", () => {
  it("should contain the user `<<<no user>>>` when not authenticated", () => {
    mockAuthState({
      isLoading: false,
      isAuthenticated: false,
      user: undefined,
    });

    renderRoute("/");

    expectInDocumentByText(/^<<<no user>>>$/);
  });

  it("should contain the user `testuser` when authenticated", () => {
    let user: User = {
      name: "testuser",
    };

    mockAuthState({
      isLoading: false,
      isAuthenticated: true,
      user: user,
    });

    renderRoute("/");

    expectInDocumentByText(/^testuser$/);
  });

  it("should contain the `login button` when not authenticated", () => {
    mockAuthState({
      isLoading: false,
      isAuthenticated: false,
      user: undefined,
    });

    renderRoute("/");

    expectInDocumentByTestId("TOP_MAIN_HEADER_CONTENT_ACTIONS_LOGIN");
  });

  it("should contain the `logout button` when authenticated", () => {
    let user: User = {
      name: "testuser",
    };

    mockAuthState({
      isLoading: false,
      isAuthenticated: true,
      user: user,
    });

    renderRoute("/");

    expectInDocumentByTestId("TOP_MAIN_HEADER_CONTENT_ACTIONS_LOGOUT");
  });

  it("should not contain the `admin button` when not authenticated", () => {
    mockAuthState({
      isLoading: false,
      isAuthenticated: false,
      user: undefined,
    });

    renderRoute("/");

    expectNotInDocumentByTestId("TUTOPEDIA_HEADER_ACTIONS_ADMIN");
  });

  it("should contain the `admin button` when authenticated", () => {
    let user: User = {
      name: "testuser",
    };

    mockAuthState({
      isLoading: false,
      isAuthenticated: true,
      user: user,
    });

    renderRoute("/");

    expectInDocumentByTestId("TUTOPEDIA_HEADER_ACTIONS_ADMIN");
  });
});

describe.skip("Header with bucket", () => {
  it("should contain the bucket `bucketname`", async () => {
    createBuckets(1, true, {
      name: "buckettest",
      selected: true,
    });

    renderRoute("/");

    await waitFor(() => {
      expect(screen.getByText(/^buckettest$/)).toBeInTheDocument();
    });
  });
});
