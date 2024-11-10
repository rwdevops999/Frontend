import { RouteObject } from "react-router-dom";
import ServerCheckPage from "./pages/ServerCheckPage";
import TutorialsPage from "./pages/TutorialsPage";
import TutOPedia from "./pages/TutOPedia";
import TutorialsListPage from "./pages/TutorialsListPage";
import CreatePage from "./pages/CreatePage";
import FindPage from "./pages/FindPage";
import AdminPage from "./pages/AdminPage";
import SettingsPage from "./pages/Admin/SettingsPage";
import BucketsPage from "./pages/Admin/BucketsPage";
import OCIPage from "./pages/OCIPage";
import {
  ROUTE_ADMIN,
  ROUTE_BUCKETS,
  ROUTE_CREATE,
  ROUTE_FIND,
  ROUTE_OCI,
  ROUTE_TUTOPEDIA,
  ROUTE_TUTORIALS,
} from "./data/layout/layout";

const routes: RouteObject[] = [
  {
    path: ROUTE_TUTOPEDIA,
    element: <TutOPedia />,
    children: [
      { index: true, element: <ServerCheckPage /> },
      {
        path: ROUTE_TUTORIALS,
        element: <TutorialsPage />,
        children: [
          { index: true, element: <TutorialsListPage /> },
          { path: ROUTE_CREATE, element: <CreatePage /> },
          { path: ROUTE_FIND, element: <FindPage /> },
          { path: ROUTE_OCI, element: <OCIPage /> },
        ],
      },
      {
        path: ROUTE_ADMIN,
        element: <AdminPage />,
        children: [
          { index: true, element: <SettingsPage /> },
          { path: ROUTE_BUCKETS, element: <BucketsPage /> },
        ],
      },
    ],
  },
];

export default routes;
