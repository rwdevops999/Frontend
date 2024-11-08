import { GrOracle } from "react-icons/gr";
import { styled } from "@mui/material";
import MuiToggleButton from "@mui/material/ToggleButton";

import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { NavigationPageNames } from "../../data/data";
import { useNavigate } from "react-router-dom";
import { debugString } from "../../data/utils";
import { TutopediaState } from "../../data/states";
import {
  buildState,
  buildTutopediaForAws,
  buildTutopediaForCreate,
  buildTutopediaForFind,
  buildTutopediaForHome,
} from "../../builders/Builders";
import {
  NAVBAR_AWS,
  NAVBAR_CREATE,
  NAVBAR_FIND,
  NAVBAR_HOME,
} from "../../data/consts";

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
          "Render the list(home) page",
          NAVBAR_HOME,
          "/tutorials"
        );
        break;
      case NavigationPageNames.Create:
        tutopedia = buildTutopediaForCreate(
          count,
          "Render the create page",
          NAVBAR_CREATE,
          "create"
        );
        break;
      case NavigationPageNames.Find:
        tutopedia = buildTutopediaForFind(
          count,
          "Render the find by keywords page",
          NAVBAR_FIND,
          "find"
        );
        break;
      case NavigationPageNames.Aws:
        tutopedia = buildTutopediaForAws(
          count,
          "Render the AWS page",
          NAVBAR_AWS,
          "aws"
        );
        break;
      default:
        debugString("NavigationButton", `INVALID PAGE ${page}`);
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

    if (page === NavigationPageNames.Aws) {
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
        data-title={`TUTORIALS_PAGE_NAVIGATION_BAR_NAVIGATION_${page.toUpperCase()}`}
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
