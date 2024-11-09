import KeyIcon from "@mui/icons-material/Key";
import {
  Box,
  Button,
  createTheme,
  styled,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./FindPage.css";
import { useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";
import { MuiChipsInputChip } from "../components/MUI/mui.types";
import { MuiChipsInput } from "../components/MUI/MuiChipsInput";
import {
  buildState,
  buildTutopediaForFind,
  buildTutopediaForFindByKeyword,
  buildTutopediaForViewAllTutorials,
} from "../builders/Builders";
import { FIND_PAGE_CANCEL_BUTTON, FIND_PAGE_FIND_BUTTON } from "../data/consts";
import toast from "react-hot-toast";
import { useConfig } from "../configuration/useConfig";

const FindPage = () => {
  const navigate = useNavigate();
  const { config } = useConfig();
  let { state } = useLocation();

  let count = state.tutopedia.count;
  if (count >= 0) {
    console.log("[FindPage] COUNT = " + count);
    count++;
  }

  const theme = createTheme({
    palette: {
      text: {
        primary: "#173A5E",
        secondary: "#3B3BEB",
      },
    },
    components: {
      MuiChip: {
        defaultProps: {
          variant: "filled",
        },
      },
    },
  });

  const [keywords, setKeywords] = useState<MuiChipsInputChip[]>([]);

  const getCount = (): number => {
    return 5 - keywords.length;
  };

  const handleChange = (newValue: MuiChipsInputChip[]) => {
    if (newValue.length <= 5) {
      setKeywords(newValue);
    }
  };

  const getMessageColor = (): string => {
    if (getCount() <= 1) {
      return "error";
    }

    return "success";
  };

  const getMessage = (): string => {
    let message: string = "(" + getCount();
    if (getCount() == 1) {
      message += " keyword left)";
    } else {
      message += " keywords left)";
    }

    return message;
  };

  const MyChipsInputStyled = styled(MuiChipsInput)`
    & input {
      color: white;
    }
  `;

  const KeywordChipInput = styled(MyChipsInputStyled)({
    "& .MuiChipsInput-Chip": {
      backgroundColor: "#4877A5",
    },
    "& .MuiInputBase-root": {
      border: "1px dotted #0D3B69",
    },
  });

  const navigateToHome = (): void => {
    const tutopedia = buildTutopediaForViewAllTutorials(
      count,
      "Return from the create page",
      FIND_PAGE_CANCEL_BUTTON,
      "/tutorials",
      true
    );
    navigate(tutopedia.routeURL!, buildState(tutopedia));
  };

  const handleFind = () => {
    if (keywords.length > 0) {
      const tutopedia = buildTutopediaForFindByKeyword(
        count,
        "Find By Keywords",
        FIND_PAGE_FIND_BUTTON,
        "/tutorials",
        keywords
      );

      console.log(
        "[FindPage] STATE = " + JSON.stringify(buildState(tutopedia))
      );

      navigate(tutopedia.routeURL!, buildState(tutopedia));
    } else {
      if (config.environment != "TST") {
        toast.error("Keywords must be defined", { duration: 5000 });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5" sx={{ marginTop: "20px" }}>
        Find By Keywords
      </Typography>
      <Typography variant="h6" color={`${getMessageColor()}`}>
        <span>{getMessage()}</span>
      </Typography>
      <form
        data-title="TUTORIALS_FIND_PAGE"
        onSubmit={() => {
          handleFind();
        }}
      >
        <Box
          data-title="TOP_MAIN_FIND_FORM"
          overflow={"hidden"}
          sx={{
            width: "100%",
            height: "700px",
            maxHeight: "700px",
          }}
          marginTop={1}
        >
          <Box>
            <KeywordChipInput
              id="keywordInputBtn"
              sx={{ marginTop: "20px" }}
              value={keywords}
              placeholder="Enter keyword and press enter"
              onChange={handleChange}
              size="medium"
              hideClearAll={false}
              helperText="Double click a keyword to edit"
              renderChip={(Component: any, key: any, props: any) => {
                return (
                  <Component
                    {...props}
                    id="keywordInputBtn_chip"
                    key={key}
                    icon={<KeyIcon />}
                    disabled={false}
                  />
                );
              }}
              validate={(chipValue: any) => {
                return {
                  isError: chipValue.length < 2,
                  textError: "the value must be at least 2 characters long",
                };
              }}
              label="keywords"
              variant="standard"
              error={false}
              disabled={false}
            />
          </Box>
          <Box
            data-title="TOP_MAIN_FIND_BUTTONS"
            sx={{ textAlign: "center" }}
            justifyContent="space-between"
            marginTop={theme.spacing(5)}
          >
            <Button id="searchBtn" variant="contained" onClick={handleFind}>
              SEARCH
            </Button>
            <Button
              id="cancelBtn"
              variant="contained"
              onClick={() => {
                navigateToHome();
              }}
            >
              CANCEL
            </Button>
          </Box>
        </Box>
      </form>
    </ThemeProvider>
  );
};

export default FindPage;
