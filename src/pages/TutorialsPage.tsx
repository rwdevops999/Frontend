import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "../components/Navigation/NavigationBar";
import { debugState } from "../data/utils";
import useDebugContext from "../hooks/useDebugContext";
import {
  buildStateWithoutStateKeyword,
  buildTutopediaForStartup,
} from "../builders/Builders";
import { Toaster } from "react-hot-toast";
import { useConfig } from "../configuration/useConfig";
import {
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_CONTENT,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR,
} from "../data/layout/layout";

const TutorialsPage = () => {
  let { debug } = useDebugContext();
  const { config } = useConfig();

  const location = useLocation();
  // if (location.state === null) {
  //   const tutopedia = buildTutopediaForStartup(0, "Startup", TUTOPEDIA, "/");
  //   location.state = buildStateWithoutStateKeyword(tutopedia);
  // }

  const state = location.state;

  const layout = state.tutopedia.layout;
  const application = state.tutopedia.application;

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
  }

  return (
    <header data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE}>
      <Box data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR}>
        <NavigationBar
          count={count}
          layout={layout}
          application={application}
        />
      </Box>
      <Box display="flex">
        <Box
          sx={{ width: "100%" }}
          data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE_CONTENT}
        >
          <Outlet />
          {config.environment != "TST" && <Toaster />}
        </Box>
      </Box>
    </header>
  );
};

export default TutorialsPage;
