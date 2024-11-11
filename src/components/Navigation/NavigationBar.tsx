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

const NavigationBar = ({
  count,
  layout,
  application,
}: {
  count: number;
  layout: LayoutState | undefined;
  application: ApplicationState | undefined;
}) => {
  return (
    <Box display="flex" sx={{ width: "100%" }} marginTop={1}>
      <Box
        data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS}
        sx={{ width: "28%" }}
      >
        <NavigationGroup count={count} selectedPage={layout?.selectedPage} />
      </Box>

      <Box
        data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS}
        sx={{ width: "32%" }}
      >
        <DisplayView count={count} selectedView={layout?.selectedView} />
      </Box>

      <Box
        data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH}
        sx={{ width: "20%" }}
      >
        <SearchGroup
          count={count}
          data={application?.data?.searchId ? application.data : undefined}
          selectedPage={layout?.selectedPage}
        />
      </Box>

      <Box
        data-title={TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS}
        sx={{ width: "20%" }}
      >
        <ActionGroup count={count} selectedPage={layout?.selectedPage} />
      </Box>
    </Box>
  );
};

export default NavigationBar;
