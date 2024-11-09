import PlagiarismIcon from "@mui/icons-material/Plagiarism";

import CSS from "csstype";

import { useEffect, useState } from "react";
import { DataState } from "../../data/states";
import { NavigationPageNames } from "../../data/data";
import { buildState, buildTutopediaForFindById } from "../../builders/Builders";
import { useNavigate } from "react-router-dom";
import { TutopediaTextFieldOutlined } from "../MUI/TutopediaTextFieldOutlined";

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

  const [searchId, setSearchId] = useState<string | undefined>(
    data ? data.searchId?.toString() : undefined
  );

  const findTutorialById = (tutorialId: number) => {
    console.log("[SearchGroup] findTutorialById: " + tutorialId);
    const tutopedia = buildTutopediaForFindById(
      count,
      "Search By Id",
      "TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT",
      "/tutorials",
      tutorialId
    );

    navigate(tutopedia.routeURL!, buildState(tutopedia));
  };

  useEffect(() => {
    const node = document.getElementById("inputId");
    node!.addEventListener("keyup", (event: any) => {
      console.log("[SearchGroup] KEY PRESSED");
      if (event.key === "Enter") {
        console.log("[SearchGroup] IT IS ENTER");
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
            "data-title": "TUTORIALS_PAGE_NAVIGATION_BAR_SEARCH_INPUT",
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
