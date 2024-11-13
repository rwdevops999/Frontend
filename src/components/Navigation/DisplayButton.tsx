import { styled } from "@mui/material";
import MuiButton from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { TutopediaState } from "../../data/states";
import {
  NavigationViewNames,
  UndisplayedNavigationViewNames,
} from "../../data/data";
import {
  buildState,
  buildTutopediaForViewAllNonPublishedTutorials,
  buildTutopediaForViewAllPublishedTutorials,
  buildTutopediaForViewAllTutorials,
} from "../../builders/Builders";
import {
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED,
} from "../../data/layout/layout";
import useDebugContext from "../../hooks/useDebugContext";
import { log } from "../../utils/LogUtil";

const Button = styled(MuiButton)({
  "&.MuiButton-root": {
    color: "#1976D2",
    border: "solid 1px #0D3B69",
  },
  "&.MuiButton-root:hover": {
    color: "#1976D2",
    border: "solid 1px #1976D2",
  },
  "&.MuiButton-root:disabled": {
    color: "#0D3B69",
    border: "solid 1px #0D3B69",
  },
});

const DisplayButton = ({
  count,
  view,
  selectedView,
}: {
  count: number;
  view: string;
  selectedView: string | undefined;
}) => {
  const navigate = useNavigate();
  const { debug } = useDebugContext();

  log(debug, "NavigationBar.View.Button", "Setup");

  const handleViewChange = (view: string) => {
    let tutopedia: TutopediaState | undefined = undefined;

    switch (view) {
      case NavigationViewNames.All:
        log(debug, "NavigationBar.View.Button", "Show All Tutorials...");
        tutopedia = buildTutopediaForViewAllTutorials(
          count,
          "Render All Tutorials",
          TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL,
          `/${ROUTE_TUTORIALS}`
        );
        break;
      case NavigationViewNames.AllPub:
        log(
          debug,
          "NavigationBar.View.Button",
          "Show All Published Tutorials..."
        );
        tutopedia = buildTutopediaForViewAllPublishedTutorials(
          count,
          "Render All Published Tutorials",
          TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_PUBLISHED,
          `/${ROUTE_TUTORIALS}`
        );
        break;
      case NavigationViewNames.NonPub:
        log(
          debug,
          "NavigationBar.View.Button",
          "Show All Non-Published Tutorials..."
        );
        tutopedia = buildTutopediaForViewAllNonPublishedTutorials(
          count,
          "Render All Non-Published Tutorials",
          TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_ALL_NON_PUBLISHED,
          `/${ROUTE_TUTORIALS}`
        );
        break;
      default:
        log(debug, "NavigationBar.View.Button", `Invalid view ${view}`);
    }

    if (tutopedia) {
      navigate("/tutorials", buildState(tutopedia));
    }
  };

  return (
    <Button
      data-title={`${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS}_${view
        .replace(/\s/g, "_")
        .toUpperCase()}`}
      sx={{ paddingTop: "12px", paddingBottom: "10px" }}
      className="smallfont"
      variant="outlined"
      id={`btn-${view.replace(/\s/g, "")}`}
      disabled={
        selectedView
          ? selectedView in UndisplayedNavigationViewNames
            ? false
            : view === selectedView
            ? true
            : false
          : true
      }
      onClick={() => handleViewChange(view)}
    >
      {view}
    </Button>
  );
};

export default DisplayButton;
