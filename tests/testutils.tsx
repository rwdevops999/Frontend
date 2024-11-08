import {
  ByRoleOptions,
  fireEvent,
  Matcher,
  screen,
  waitFor,
} from "@testing-library/react";
import { useAuth0, User } from "@auth0/auth0-react";

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | undefined;
};

export const mockAuthState = (authState: AuthState) => {
  vi.mocked(useAuth0).mockReturnValue({
    ...authState,
    getAccessTokenSilently: vi.fn().mockResolvedValue("a"),
    getAccessTokenWithPopup: vi.fn(),
    getIdTokenClaims: vi.fn(),
    loginWithRedirect: vi.fn(),
    loginWithPopup: vi.fn(),
    logout: vi.fn(),
    handleRedirectCallback: vi.fn(),
  });
};

type ServerConnectState = {
  connected: boolean;
  showInfo: boolean;
};

export const mockServerConnect = (connectState: ServerConnectState) => {
  vi.mock("../src/hooks/useServerConnect", async () => {
    return {
      ...connectState,
    };
  });
};

export const expectByTestIdToBeInTheDocument = (name: string) => {
  expect(screen.getByTestId(name)).toBeInTheDocument();
};

export const expectElementByTextToBeInTheDocument = (exp: Matcher) => {
  expect(screen.getByText(exp)).toBeInTheDocument();
};

export const expectElementByTestIdToBeDisabled = (id: string) => {
  expect(screen.getByTestId(id)).toBeDisabled();
};

export const expectElementByTestIdToBeEnabled = (id: string) => {
  expect(screen.getByTestId(id)).toBeEnabled();
};

export const expectButtonByNameToBeDisabled = (exp: ByRoleOptions) => {
  expect(screen.getByRole("button", exp)).toBeDisabled();
};

export const expectButtonByNameToBeEnabled = (exp: ByRoleOptions) => {
  expect(screen.getByRole("button", exp)).toBeEnabled();
};

export const expectButtonByNameToBeInTheDocument = (exp: ByRoleOptions) => {
  expect(screen.getByRole("button", exp)).toBeInTheDocument();
};

export const clickButton = async (exp: ByRoleOptions) => {
  await fireEvent.click(screen.getByRole("button", exp));
};

export const clickButtonByElement = (htmlButton: any) => {
  fireEvent.click(htmlButton);
};

export const clickButtonById = (id: string) => {
  fireEvent.click(screen.getByTestId(id));
};

export const expectElementByTestIdToHaveNumberValue = (
  id: string,
  value: number
) => {
  expect(screen.getByTestId(id)).toHaveValue(value);
};

// REAL TEST FUNCTIONS
export const expectInDocumentByTestId = (exp: Matcher) => {
  expect(screen.getByTestId(exp)).toBeInTheDocument();
};

export const expectElementInDocument = (element: HTMLElement) => {
  expect(element).toBeInTheDocument();
};

export const expectNotInDocumentByTestId = (exp: Matcher) => {
  expect(screen.queryByTestId(exp)).toBeFalsy();
};

export const expectInDocumentByText = (exp: Matcher) => {
  expect(screen.getByText(exp)).toBeInTheDocument();
};

export const expectInDocumentByAltText = (exp: Matcher) => {
  expect(screen.getByAltText(exp)).toBeInTheDocument();
};

export const expectQueryByTestIdFalsy = (exp: Matcher) => {
  expect(screen.queryByTestId(exp)).toBeFalsy();
};

export const expectToBeEnabled = (exp: Matcher) => {
  expect(screen.getByTestId(exp)).toBeEnabled();
};

export const expectElementToBeEnabled = (element: HTMLElement) => {
  expect(element).toBeEnabled();
};

export const expectToBeDisabled = (exp: Matcher) => {
  expect(screen.getByTestId(exp)).toBeDisabled();
};

export const expectElementToBeDisabled = (element: HTMLElement) => {
  expect(element).toBeDisabled();
};

export const expectElementsEnabled = (elements: string[]) => {
  elements.map((element) => expectToBeEnabled(element));
};

export const expectElementsDisabled = (elements: string[]) => {
  elements.map((element) => expectToBeDisabled(element));
};

export const waitForElementToAppear = async (name: string) => {
  await waitFor(() => {
    expect(screen.getByTestId(name)).toBeInTheDocument();
  });
};

export const expectElementContainsValue = (element: string, value: string) => {
  const node = screen.getByTestId(element);
  expect(node.innerHTML).toContain(value);
};

export const expectChipContainsValue = (value: string) => {
  let node: HTMLCollectionOf<Element> =
    document.getElementsByClassName("MuiChip-label");

  expect(node[0].innerHTML).toBe(value);
};
