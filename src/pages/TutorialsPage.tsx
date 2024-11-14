import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "../components/Navigation/NavigationBar";
import { Toaster } from "react-hot-toast";
import { useConfig } from "../configuration/useConfig";
import {
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_CONTENT,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR,
} from "../data/layout/layout";
import useDebugContext from "../hooks/useDebugContext";
import { log } from "../utils/LogUtil";

const TutorialsPage = () => {
  const { config } = useConfig();
  const { debug } = useDebugContext();

  const { state } = useLocation();
  log(debug, "TutorialsPage", "IN, state", state, true);

  const layout = state.tutopedia.layout;
  const application = state.tutopedia.application;

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
  }
  log(debug, "TutorialsPage", "count", count);

  return (
    <Box
      data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE}
      sx={{ width: "100%", height: "100%" }}
    >
      <Box
        data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR}
        sx={{ height: "8%" }}
      >
        <NavigationBar
          count={count}
          layout={layout}
          application={application}
        />
      </Box>

      <Box display="flex" sx={{ height: "92%" }}>
        <Box
          sx={{ width: "100%", height: "98%" }}
          data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE_CONTENT}
        >
          <Outlet />
          <Toaster />
        </Box>
      </Box>
    </Box>
  );
};

export default TutorialsPage;
