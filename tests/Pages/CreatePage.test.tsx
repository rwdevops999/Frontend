import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { renderRoute } from "../render/render";
import {
  clickButton,
  clickButtonByElement,
  clickButtonById,
  expectInDocumentByTestId,
  expectInDocumentByText,
  expectToBeDisabled,
  waitForElementToAppear,
} from "../testutils";
import { act } from "react";
import user from "@testing-library/user-event";
import { simulateDelay, simulateError } from "../mock/backend";
import { createTutorials } from "../mock/database";
import {
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_CREATE_PAGE,
  TUTOPEDIA_CONTENT_CREATE_PAGE_BUTTONS,
  TUTOPEDIA_CONTENT_CREATE_PAGE_CANCEL_BUTTON,
  TUTOPEDIA_CONTENT_CREATE_PAGE_CREATE_BUTTON,
  TUTOPEDIA_CONTENT_CREATE_PAGE_ERROR,
  TUTOPEDIA_CONTENT_CREATE_PAGE_FORM,
  TUTOPEDIA_CONTENT_CREATE_PAGE_FORM_FILE_INPUT,
  TUTOPEDIA_CONTENT_CREATE_PAGE_LOADER,
  TUTOPEDIA_CONTENT_CREATE_PAGE_UPDATE_BUTTON,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_UPDATE,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT,
} from "../../src/data/layout/layout";

const navigateToCreatePage = () => {
  /**
   * we pass through `/tutorials` because mocking useLocation gives problems with in-application navigation
   */
  renderRoute(`/${ROUTE_TUTORIALS}`);

  expectInDocumentByTestId(
    `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE}`
  );

  clickButtonById(
    `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE}`
  );
};

const createLongString = (): string => {
  return "x".repeat(300);
};

describe("Create and Update page", () => {
  it("should render the `Create Page`", () => {
    navigateToCreatePage();

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_CREATE_PAGE}`);
  });

  it("should render the form", () => {
    navigateToCreatePage();
    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_CREATE_PAGE_FORM}`);
  });

  it("should render the buttons part", () => {
    navigateToCreatePage();
    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_CREATE_PAGE_BUTTONS}`);
  });

  it("should render the cancel button", () => {
    navigateToCreatePage();
    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_CREATE_PAGE_CANCEL_BUTTON}`);
  });

  it("should contain title field", () => {
    navigateToCreatePage();
    expect(
      screen.getByRole("textbox", {
        name: /title/i,
      })
    ).toBeInTheDocument();
  });

  it("should contain description field", () => {
    navigateToCreatePage();
    expect(
      screen.getByRole("textbox", {
        name: /description/i,
      })
    ).toBeInTheDocument();
  });

  it("should contain upload button", () => {
    navigateToCreatePage();
    expect(screen.getByText(/^Upload files$/)).toBeInTheDocument();
  });

  it("should contain filename button", () => {
    navigateToCreatePage();
    expectInDocumentByTestId(
      `${TUTOPEDIA_CONTENT_CREATE_PAGE_FORM_FILE_INPUT}`
    );
  });

  it("should disable the `search field` when rendering the `Create page`", () => {
    navigateToCreatePage();

    expectToBeDisabled(
      `${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT}`
    );
  });

  it("should return to home page if cancel button is clicked", () => {
    navigateToCreatePage();

    clickButton({ name: /^CANCEL$/ });

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE}`);
  });
});

describe("CreatePage", () => {
  it("should render the create button", () => {
    navigateToCreatePage();
    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_CREATE_PAGE_CREATE_BUTTON}`);
  });

  it("should display `Create Tutorial", () => {
    navigateToCreatePage();
    expect(screen.getByText(/^Create Tutorial$/)).toBeTruthy();
  });

  it("should not display a Loader", () => {
    navigateToCreatePage();
    expect(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_CREATE_PAGE_LOADER}`)
    ).not.toBeInTheDocument();
  });

  it("should not display an Error Message", () => {
    navigateToCreatePage();
    expect(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_CREATE_PAGE_ERROR}`)
    ).not.toBeInTheDocument();
  });

  it("should give a validation error on title if create button is clicked", async () => {
    navigateToCreatePage();

    const button = screen.getByRole("button", { name: /^CREATE$/ });
    await act(async () => {
      await fireEvent.click(button);
    });

    expectInDocumentByText(/title is required/i);
  });

  it("should give no validation error on title if field is filled in and if create button is clicked", async () => {
    navigateToCreatePage();

    const textbox = screen.getByRole("textbox", { name: /title/i });
    fireEvent.change(textbox, { target: { value: "Hello" } });

    const button = screen.getByRole("button", { name: /^CREATE$/ });
    await act(async () => {
      await fireEvent.click(button);
    });

    const info = screen.queryByText(/title is required/i);
    expect(info).toBeNull();
  });

  it("should give a validation error on title if field is filled in more than 255 characters and if create button is clicked", async () => {
    navigateToCreatePage();

    const textbox = screen.getByRole("textbox", { name: /title/i });
    fireEvent.change(textbox, { target: { value: createLongString() } });

    const button = screen.getByRole("button", { name: /^CREATE$/ });
    await act(async () => {
      await fireEvent.click(button);
    });

    const info = screen.queryByText(/Maximal title length is 255 characters/i);
    expect(info).toBeInTheDocument();
  });

  it("should give a validation error on description if create button is clicked", async () => {
    navigateToCreatePage();

    const button = screen.getByRole("button", { name: /^CREATE$/ });
    await act(async () => {
      await fireEvent.click(button);
    });

    expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
  });

  it("should give no validation error on description if field is filled in and if create button is clicked", async () => {
    navigateToCreatePage();

    const textbox = screen.getByRole("textbox", { name: /description/i });
    fireEvent.change(textbox, { target: { value: "Hello" } });

    const button = screen.getByRole("button", { name: /^CREATE$/ });
    await act(async () => {
      await fireEvent.click(button);
    });

    const info = screen.queryByText(/description is required/i);
    expect(info).toBeNull();
  });

  it("should give a validation error on description if field is filled in more than 255 characters and if create button is clicked", async () => {
    navigateToCreatePage();

    const textbox = screen.getByRole("textbox", { name: /description/i });
    fireEvent.change(textbox, { target: { value: createLongString() } });

    const button = screen.getByRole("button", { name: /^CREATE$/ });
    await act(async () => {
      await fireEvent.click(button);
    });

    const info = screen.queryByText(
      /Maximal description length is 255 characters/i
    );
    expect(info).toBeInTheDocument();
  });

  it("should give a validation error on file if create button is clicked", async () => {
    navigateToCreatePage();

    const button = screen.getByRole("button", { name: /^CREATE$/ });
    await act(async () => {
      await fireEvent.click(button);
    });

    expect(screen.getByText(/File is required/i)).toBeInTheDocument();
  });

  it("should give no validation error on file if file is uploaded and if create button is clicked", async () => {
    navigateToCreatePage();

    const content = "";
    const file = new File([content], "upload.csv", {
      type: "text/csv",
    });

    const fileUploadButton = screen.getByLabelText(/upload files/i);

    await act(async () => {
      await user.upload(fileUploadButton, file);
    });

    const button = screen.getByRole("button", { name: /^CREATE$/ });
    await act(async () => {
      await fireEvent.click(button);
    });

    const info = screen.queryByText(/File is required/i);
    expect(info).toBeNull();
  });

  it("should give a validation error on file if filename is more than 255 characters and if create button is clicked", async () => {
    navigateToCreatePage();

    const content = "";
    const file = new File([content], createLongString() + ".csv", {
      type: "text/csv",
    });

    const fileUploadButton = screen.getByLabelText(/upload files/i);

    await act(async () => {
      await user.upload(fileUploadButton, file);
    });

    const button = screen.getByRole("button", { name: /^CREATE$/ });
    await act(async () => {
      await fireEvent.click(button);
    });

    const info = screen.queryByText(
      /Maximal filename length is 255 characters/i
    );
    expect(info).toBeInTheDocument();
  });

  it("should follow the happy page route when clicking the create button", async () => {
    navigateToCreatePage();

    // SET a valid title
    let textbox = screen.getByRole("textbox", { name: /title/i });
    fireEvent.change(textbox, { target: { value: "This is a title" } });

    // SET a valid description
    textbox = screen.getByRole("textbox", { name: /description/i });
    fireEvent.change(textbox, { target: { value: "This is a description" } });

    // upload a file
    const content = "";
    const file = new File([content], "ThisIsAFile.csv", {
      type: "text/csv",
    });
    const fileUploadButton = screen.getByLabelText(/upload files/i);
    await user.upload(fileUploadButton, file);

    // click `CREATE`
    await waitFor(() => {
      const createButton = screen.getByRole("button", { name: /^CREATE$/ });
      clickButtonByElement(createButton);
    });

    expectInDocumentByText(/this is a title/i);
  });
});

const navigateToUpdatePage = async (
  checkLoader: boolean = false,
  checkError: boolean = false
) => {
  createTutorials(1);

  if (checkLoader) {
    simulateDelay("http://localhost:8081/api/find/:tid");
  }

  if (checkError) {
    simulateError("http://localhost:8081/api/find/:tid");
  }

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

  if (!checkLoader && !checkError) {
    await waitForElementToBeRemoved(
      screen.queryByTestId(`${TUTOPEDIA_CONTENT_CREATE_PAGE_LOADER}`)
    );
  }
};

describe("UpdatePage", () => {
  it("should should render the update button", async () => {
    await navigateToUpdatePage();

    screen.debug(undefined, Infinity);

    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_CREATE_PAGE_UPDATE_BUTTON}`);
  });

  it("should display `Update Tutorial", async () => {
    await navigateToUpdatePage();

    expect(screen.getByText(/^Update Tutorial$/)).toBeTruthy();
  });

  it("should give no validation error on title if update button is clicked", async () => {
    await navigateToUpdatePage();

    await act(() => clickButton({ name: /^UPDATE$/ }));

    const info = screen.queryByText(/title is required/i);
    expect(info).toBeNull();
  });

  it("should display a Loader", async () => {
    await navigateToUpdatePage(true);
    expectInDocumentByTestId(`${TUTOPEDIA_CONTENT_CREATE_PAGE_LOADER}`);
  });

  it("should display an Error Message", async () => {
    await navigateToUpdatePage(false, true);
    await waitForElementToAppear(`${TUTOPEDIA_CONTENT_CREATE_PAGE_ERROR}`);
  });

  it("should give a validation error on title if field is cleared and if update button is clicked", async () => {
    await navigateToUpdatePage();

    const textbox = screen.getByRole("textbox", { name: /title/i });
    fireEvent.change(textbox, { target: { value: "" } });

    await act(() => clickButton({ name: /^UPDATE$/ }));

    const info = screen.queryByText(/title is required/i);
    expect(info).toBeInTheDocument();
  });

  it("should give a validation error on title if field is filled in more than 255 characters and if update button is clicked", async () => {
    await navigateToUpdatePage();

    const textbox = screen.getByRole("textbox", { name: /title/i });
    fireEvent.change(textbox, { target: { value: createLongString() } });

    await act(() => clickButton({ name: /^UPDATE$/ }));

    const info = screen.queryByText(/Maximal title length is 255 characters/i);
    expect(info).toBeInTheDocument();
  });

  it("should give no validation error on description if update button is clicked", async () => {
    await navigateToUpdatePage();

    await act(() => clickButton({ name: /^UPDATE$/ }));

    const info = screen.queryByText(/Description is required/i);
    expect(info).toBeNull();
  });

  it("should give a validation error on description if field is cleared and if update button is clicked", async () => {
    await navigateToUpdatePage();

    const textbox = screen.getByRole("textbox", { name: /description/i });
    fireEvent.change(textbox, { target: { value: "" } });

    await act(() => clickButton({ name: /^UPDATE$/ }));

    const info = screen.queryByText(/Description is required/i);
    expect(info).toBeInTheDocument();
  });

  it("should give a validation error on description if field is filled in more than 255 characters and if update button is clicked", async () => {
    await navigateToUpdatePage();

    const textbox = screen.getByRole("textbox", { name: /description/i });
    fireEvent.change(textbox, { target: { value: createLongString() } });

    await act(() => clickButton({ name: /^UPDATE$/ }));

    const info = screen.queryByText(
      /Maximal description length is 255 characters/i
    );
    expect(info).toBeInTheDocument();
  });

  it("should give no validation error on file if update button is clicked", async () => {
    await navigateToUpdatePage();

    await act(() => clickButton({ name: /^UPDATE$/ }));

    const info = screen.queryByText(/File is required/i);
    expect(info).toBeNull();
  });

  it("should give a validation error on file if filename is more than 255 characters and if update button is clicked", async () => {
    await navigateToUpdatePage();

    const content = "";
    const file = new File([content], createLongString() + ".csv", {
      type: "text/csv",
    });

    const fileUploadButton = screen.getByLabelText(/upload files/i);

    await act(async () => {
      await user.upload(fileUploadButton, file);
    });

    await act(() => clickButton({ name: /^UPDATE$/ }));

    const info = screen.queryByText(
      /Maximal filename length is 255 characters/i
    );
    expect(info).toBeInTheDocument();
  });

  it("should follow the happy page route when clicking the update button for submitting on `UPDATE`", async () => {
    await navigateToUpdatePage();

    let textbox = screen.getByRole("textbox", { name: /title/i });
    fireEvent.change(textbox, { target: { value: "This is a new title" } });

    await waitFor(() => {
      const createButton = screen.getByRole("button", { name: /^UPDATE$/ });
      clickButtonByElement(createButton);
    });

    expect(screen.getByDisplayValue("This is a new title")).toBeInTheDocument();
  });
});
