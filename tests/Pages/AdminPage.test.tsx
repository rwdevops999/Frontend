import { screen } from "@testing-library/react";
import { renderRoute } from "../render/render";
import { User } from "@auth0/auth0-react";
import { clickButtonById, mockAuthState } from "../testutils";

describe.skip("AdminPage", () => {
  it("should render the settings button", async () => {
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
    screen.debug(undefined, Infinity);
  });
});
