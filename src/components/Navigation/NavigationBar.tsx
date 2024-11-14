import { Box } from "@mui/material";
import NavigationGroup from "./NavigationGroup";
import { ApplicationState, LayoutState } from "../../data/states";
import ActionGroup from "./ActionGroup";
import SearchGroup from "./SearchGroup";
import {
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS,
} from "../../data/layout/layout";
import DisplayView from "./DisplayView";
import useDebugContext from "../../hooks/useDebugContext";
import { log } from "../../utils/LogUtil";

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
  log(debug, "NavigationBar", "Setup");

  return (
    <Box display="flex" sx={{ width: "100%", height: "100%" }}>
      <Box
        data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS}
        sx={{ marginTop: "0.2%", marginLeft: "0.2%", width: "28%" }}
      >
        <NavigationGroup count={count} selectedPage={layout?.selectedPage} />
      </Box>

      <Box
        data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS}
        sx={{ marginLeft: "1%", marginTop: "0.2%", width: "32%" }}
      >
        <DisplayView count={count} selectedView={layout?.selectedView} />
      </Box>

      <Box
        data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH}
        sx={{ marginLeft: "2%", marginTop: "0.2%", width: "18%" }}
      >
        <SearchGroup
          count={count}
          data={application?.data?.searchId ? application.data : undefined}
          selectedPage={layout?.selectedPage}
        />
      </Box>

      <Box
        data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS}
        sx={{ marginLeft: "1%", marginTop: "0.2%", width: "17%" }}
      >
        <ActionGroup count={count} selectedPage={layout?.selectedPage} />
      </Box>
    </Box>
  );
};

export default NavigationBar;
