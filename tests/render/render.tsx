import { render } from "@testing-library/react";
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from "react-router-dom";
import TutorialsPage from "../../src/pages/TutorialsPage";
import routes from "../../src/routes";
import AllProviders from "../Providers";

export const renderTutorialsPage = () => {
  render(
    <MemoryRouter>
      <TutorialsPage />
    </MemoryRouter>
  );
};

export const renderRoute = (url: string) => {
  console.log("[TEST] RENDER TUTOPEDIA");

  console.log("[TEST] InitialEntry = " + url);

  const router = createMemoryRouter(routes, {
    initialEntries: [url],
  });

  render(<RouterProvider router={router} />, { wrapper: AllProviders });
};
