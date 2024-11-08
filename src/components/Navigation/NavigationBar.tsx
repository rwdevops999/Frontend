import { Box } from "@mui/material";
import { NavigationPageNames, NavigationViewNames } from "../../data/data";
import NavigationGroup from "./NavigationGroup";
import DisplayGroup from "./DisplayGroup";
import { ApplicationState, LayoutState } from "../../data/states";
import { debugString } from "../../data/utils";
import ActionGroup from "./ActionGroup";
import SearchGroup from "./SearchGroup";
import useDebugContext from "../../hooks/useDebugContext";

const NavigationBar = ({
  count,
  layout,
  application,
}: {
  count: number;
  layout: LayoutState | undefined;
  application: ApplicationState | undefined;
}) => {
  const { debug } = useDebugContext();

  if (debug) {
    debugString("[NavigationBar]", "SELECTED PAGE = " + layout?.selectedPage);
    debugString("[NavigationBar]", "SELECTED VIEW = " + layout?.selectedView);
  }

  return (
    <Box display="flex" sx={{ width: "100%" }} marginTop={1}>
      <Box
        data-title="TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION"
        sx={{ width: "28%" }}
      >
        <NavigationGroup
          count={count}
          pages={Object.values(NavigationPageNames)}
          selectedPage={layout?.selectedPage}
        />
      </Box>

      <Box
        data-title="TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS"
        sx={{ width: "32%" }}
      >
        <DisplayGroup
          count={count}
          views={Object.values(NavigationViewNames)}
          selectedView={layout?.selectedView}
        />
      </Box>

      <Box
        data-title="TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH"
        sx={{ width: "20%" }}
      >
        <SearchGroup
          count={count}
          data={application?.data?.searchId ? application.data : undefined}
          selectedPage={layout?.selectedPage}
        />
      </Box>

      <Box
        data-title="TUTORIALS_PAGE_NAVIGATION_BAR_ACTION"
        sx={{ width: "20%" }}
      >
        <ActionGroup count={count} selectedPage={layout?.selectedPage} />
      </Box>
    </Box>
  );
};

export default NavigationBar;
