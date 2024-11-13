import PlagiarismIcon from "@mui/icons-material/Plagiarism";

import CSS from "csstype";

import { useEffect, useState } from "react";
import { DataState } from "../../data/states";
import { NavigationPageNames } from "../../data/data";
import { buildState, buildTutopediaForFindById } from "../../builders/Builders";
import { useNavigate } from "react-router-dom";
import { TutopediaTextFieldOutlined } from "../MUI/TutopediaTextFieldOutlined";
import {
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT,
} from "../../data/layout/layout";
import { log } from "../../utils/LogUtil";
import useDebugContext from "../../hooks/useDebugContext";

const iconStyles: CSS.Properties = {
  color: "#0D3B69",
  marginTop: "8px",
  width: "35px",
  height: "35px",
};

const SearchGroup = ({
  count,
  data,
  selectedPage,
}: {
  count: number;
  data: DataState | undefined;
  selectedPage: string | undefined;
}) => {
  const navigate = useNavigate();
  const { debug } = useDebugContext();

  log(debug, "NavigationBar.Search", "Setup");

  const [searchId, setSearchId] = useState<string | undefined>(
    data ? data.searchId?.toString() : undefined
  );

  const findTutorialById = (tutorialId: number) => {
    log(debug, "NavigationBar.Search", `Find Tutoral ${tutorialId}`);
    const tutopedia = buildTutopediaForFindById(
      count,
      "Search By Id",
      TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT,
      `/${ROUTE_TUTORIALS}`,
      tutorialId
    );

    navigate(tutopedia.routeURL!, buildState(tutopedia));
  };

  useEffect(() => {
    const node = document.getElementById("inputId");
    node!.addEventListener("keyup", (event: any) => {
      if (event.key === "Enter") {
        setSearchId(event.target.value.trim());
        findTutorialById(parseInt(event.target.value.trim()));
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <PlagiarismIcon style={iconStyles} />
      &nbsp;
      <TutopediaTextFieldOutlined // set 'data-title' on <input> tag'
        slotProps={{
          htmlInput: {
            "data-title":
              TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT,
            id: "inputId",
          },
        }}
        defaultValue={searchId ? searchId : ""}
        label="Tutorial ID"
        variant="outlined"
        type="number"
        size="medium"
        disabled={selectedPage !== NavigationPageNames.Home}
      />
    </>
  );
};

export default SearchGroup;
