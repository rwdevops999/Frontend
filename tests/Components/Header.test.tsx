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
import {
  ROUTE_TUTOPEDIA,
  TUTOPEDIA_HEADER_ACTION_BUTTON_ADMIN,
  TUTOPEDIA_HEADER_ACTION_BUTTON_HOME,
  TUTOPEDIA_HEADER_ACTION_BUTTON_LOGIN,
  TUTOPEDIA_HEADER_ACTION_BUTTON_LOGOUT,
  TUTOPEDIA_HEADER_ACTION_BUTTONS,
  TUTOPEDIA_HEADER_BUCKET_NAME,
  TUTOPEDIA_HEADER_TITLE,
  TUTOPEDIA_HEADER_USER_NAME,
} from "../../src/data/layout/layout";

describe("Header", () => {
  beforeEach(() => {
    renderRoute(`${ROUTE_TUTOPEDIA}`);
  });

  it("should contain the `title`", () => {
    expectInDocumentByTestId(`${TUTOPEDIA_HEADER_TITLE}`);
  });

  it("should contain the title `Tut-O-Pedia`", () => {
    expectInDocumentByText(/^Tut-O-Pedia$/);
  });

  it("should contain the `bucket`", () => {
    expectInDocumentByTestId(`${TUTOPEDIA_HEADER_BUCKET_NAME}`);
  });

  it("should contain the bucket `not set`", () => {
    expectInDocumentByText(/^not set$/);
  });

  it("should contain the `user`", () => {
    expectInDocumentByTestId(`${TUTOPEDIA_HEADER_USER_NAME}`);
  });

  it("should contain the `actions`", () => {
    expectInDocumentByTestId(`${TUTOPEDIA_HEADER_ACTION_BUTTONS}`);
  });

  it("should contain the `home button`", () => {
    expectInDocumentByTestId(`${TUTOPEDIA_HEADER_ACTION_BUTTON_HOME}`);
  });
});

describe("Header with mocked authorization", () => {
  it("should contain the user `no user` when not authenticated", () => {
    mockAuthState({
      isLoading: false,
      isAuthenticated: false,
      user: undefined,
    });

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    expectInDocumentByText(/^no user$/);
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

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    expectInDocumentByText(/^testuser$/);
  });

  it("should contain the `login button` when not authenticated", () => {
    mockAuthState({
      isLoading: false,
      isAuthenticated: false,
      user: undefined,
    });

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    expectInDocumentByTestId(`${TUTOPEDIA_HEADER_ACTION_BUTTON_LOGIN}`);
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

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    expectInDocumentByTestId(`${TUTOPEDIA_HEADER_ACTION_BUTTON_LOGOUT}`);
  });

  it("should not contain the `admin button` when not authenticated", () => {
    mockAuthState({
      isLoading: false,
      isAuthenticated: false,
      user: undefined,
    });

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    expectNotInDocumentByTestId(`${TUTOPEDIA_HEADER_ACTION_BUTTON_ADMIN}`);
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

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    expectInDocumentByTestId(`${TUTOPEDIA_HEADER_ACTION_BUTTON_ADMIN}`);
  });
});

describe("Header with bucket", () => {
  it("should contain the bucket `buckettest`", async () => {
    createBuckets(1, true, {
      name: "buckettest",
      selected: true,
    });

    renderRoute(`${ROUTE_TUTOPEDIA}`);

    await waitFor(() => {
      expect(screen.getByText(/^buckettest$/)).toBeInTheDocument();
    });
  });
});
