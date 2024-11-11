import { GrOracle } from "react-icons/gr";
import { styled } from "@mui/material";
import MuiToggleButton from "@mui/material/ToggleButton";

import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { NavigationPageNames } from "../../data/data";
import { useNavigate } from "react-router-dom";
import { TutopediaState } from "../../data/states";
import {
  buildState,
  buildTutopediaForCreate,
  buildTutopediaForFindByKeyword,
  buildTutopediaForHome,
  buildTutopediaForOCI,
} from "../../builders/Builders";
import {
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_HOME,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_OCI,
} from "../../data/layout/layout";

const NavigationButton = ({
  count,
  page,
  selectedPage,
}: {
  count: number;
  page: string;
  selectedPage: string | undefined;
}) => {
  const navigate = useNavigate();

  const handlePageChange = (page: string) => {
    let tutopedia: TutopediaState | undefined = undefined;

    switch (page) {
      case NavigationPageNames.Home:
        tutopedia = buildTutopediaForHome(
          count,
          "Render the Tutorials Home page",
          TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_HOME,
          "/tutorials"
        );
        break;
      case NavigationPageNames.Create:
        tutopedia = buildTutopediaForCreate(
          count,
          "Render the create page",
          TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_CREATE,
          "create"
        );
        break;
      case NavigationPageNames.Find:
        tutopedia = buildTutopediaForFindByKeyword(
          count,
          "Render the find by keywords page",
          TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_FIND,
          "find"
        );
        break;
      case NavigationPageNames.OCI:
        tutopedia = buildTutopediaForOCI(
          count,
          "Render the OCI page",
          TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS_OCI,
          "OCI"
        );
        break;
      default:
        console.log(
          `[${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS}] INVALID PAGE ${page}`
        );
        break;
    }

    if (tutopedia) {
      navigate(tutopedia.routeURL!, buildState(tutopedia));
    }
  };

  const getIcon = () => {
    if (page === NavigationPageNames.Home) {
      return <HomeIcon />;
    }

    if (page === NavigationPageNames.Create) {
      return <CreateIcon />;
    }

    if (page === NavigationPageNames.Find) {
      return <ImageSearchIcon />;
    }

    if (page === NavigationPageNames.OCI) {
      return <GrOracle />;
    }
  };

  const ToggleButton = styled(MuiToggleButton)({
    "&.MuiToggleButton-root": {
      color: "#1976D2",
      border: "solid 1px #0D3B69",
    },
    "&.MuiToggleButton-root:hover": {
      color: "#1976D2",
      border: "solid 1px #1976D2",
    },
    "&.MuiToggleButton-root:disabled": {
      color: "#0D3B69",
      border: "solid 1px #0D3B69",
    },
  });

  return (
    <span>
      <ToggleButton
        data-title={`${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_GROUPS}_${page.toUpperCase()}`}
        value="check"
        id={`btn-${page}`}
        selected={page === selectedPage}
        disabled={page === selectedPage}
        onClick={() => handlePageChange(page)}
      >
        {getIcon()}&nbsp;{page}
      </ToggleButton>
      &nbsp;
    </span>
  );
};

export default NavigationButton;
