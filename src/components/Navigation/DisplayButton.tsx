import { styled } from "@mui/material";
import MuiButton from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { debugString } from "../../data/utils";
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
  NAVBAR_ALL_NON_PUBLISHED_TUTORIALS,
  NAVBAR_ALL_PUBLISHED_TUTORIALS,
  NAVBAR_ALL_TUTORIALS,
} from "../../data/consts";

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

  console.log("[DisplayButton] SELECTED VIEW: " + selectedView);

  const handleViewChange = (view: string) => {
    let tutopedia: TutopediaState | undefined = undefined;

    switch (view) {
      case NavigationViewNames.All:
        tutopedia = buildTutopediaForViewAllTutorials(
          count,
          "Render All Tutorials",
          NAVBAR_ALL_TUTORIALS,
          "/tutorials"
        );
        break;
      case NavigationViewNames.AllPub:
        tutopedia = buildTutopediaForViewAllPublishedTutorials(
          count,
          "Render All Published Tutorials",
          NAVBAR_ALL_PUBLISHED_TUTORIALS,
          "/tutorials"
        );
        break;
      case NavigationViewNames.NonPub:
        tutopedia = buildTutopediaForViewAllNonPublishedTutorials(
          count,
          "Render All Non-Published Tutorials",
          NAVBAR_ALL_NON_PUBLISHED_TUTORIALS,
          "/tutorials"
        );
        break;
      default:
        debugString("DisplayButton", `INVALID VIEW ${view}`);
    }

    if (tutopedia) {
      navigate("/tutorials", buildState(tutopedia));
    }
  };

  return (
    <Button
      data-title={`TUTORIALS_PAGE_NAVIGATION_BAR_VIEWS_${view
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
      // disabled={isDisabled(view)}
      onClick={() => handleViewChange(view)}
    >
      {view}
    </Button>
  );
};

export default DisplayButton;
