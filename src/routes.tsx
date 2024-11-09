import { RouteObject } from "react-router-dom";
import ServerCheckPage from "./pages/ServerCheckPage";
import TutorialsPage from "./pages/TutorialsPage";
import TutOPedia from "./pages/TutOPedia";
import TutorialsListPage from "./pages/TutorialsListPage";
import CreatePage from "./pages/CreatePage";
import FindPage from "./pages/FindPage";
import AwsPage from "./pages/AwsPage";
import AdminPage from "./pages/AdminPage";
import SettingsPage from "./pages/Admin/SettingsPage";
import BucketsPage from "./pages/Admin/BucketsPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <TutOPedia />,
    children: [
      { index: true, element: <ServerCheckPage /> },
      {
        path: "tutorials",
        element: <TutorialsPage />,
        children: [
          { index: true, element: <TutorialsListPage /> },
          { path: "create", element: <CreatePage /> },
          { path: "find", element: <FindPage /> },
          { path: "aws", element: <AwsPage /> },
        ],
      },
      { path: "admin", element: <AdminPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "buckets", element: <BucketsPage /> },
    ],
  },
];

export default routes;
