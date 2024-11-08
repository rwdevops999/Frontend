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
import { TUTOPEDIA } from "../data/consts";
import { useConfig } from "../configuration/useConfig";

const TutorialsPage = () => {
  let { debug } = useDebugContext();
  const { config } = useConfig();

  const location = useLocation();
  if (location.state === null) {
    if (debug) {
      console.log("[TutorialsPage] Building a NEW STATE");
    }

    const tutopedia = buildTutopediaForStartup(0, "Startup", TUTOPEDIA, "/");
    location.state = buildStateWithoutStateKeyword(tutopedia);
  }

  const state = location.state;

  console.log("[TP] STATE = " + JSON.stringify(state));

  const layout = state.tutopedia.layout;
  const application = state.tutopedia.application;

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
  }

  if (debug) {
    console.log("[TutorialsPage]: " + state + " => " + JSON.stringify(state));
    console.log("[TutorialsPage]: COUNT " + count);
    debugState("TutorialsPage [LAYOUT]", layout);
    debugState("TutorialsPage [APPLICATION]", application);
  }

  return (
    <header data-title="TUTORIALS_PAGE">
      <Box data-title="TUTORIALS_PAGE_NAVIGATION_BAR">
        <NavigationBar
          count={count}
          layout={layout}
          application={application}
        />
      </Box>
      <Box display="flex">
        <Box sx={{ width: "100%" }} data-title="TUTORIALS_PAGE_OUTLET">
          <Outlet />
          {config.environment != "TST" && <Toaster />}
        </Box>
      </Box>
    </header>
  );
};

export default TutorialsPage;
