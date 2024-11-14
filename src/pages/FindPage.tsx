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
  buildTutopediaForFindByKeyword,
  buildTutopediaForViewAllTutorials,
} from "../builders/Builders";
import toast from "react-hot-toast";
import { useConfig } from "../configuration/useConfig";
import {
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_FIND_PAGE,
  TUTOPEDIA_CONTENT_FIND_PAGE_BUTTONS,
  TUTOPEDIA_CONTENT_FIND_PAGE_BUTTONS_CANCEL_BUTTON,
  TUTOPEDIA_CONTENT_FIND_PAGE_BUTTONS_FIND_BUTTON,
  TUTOPEDIA_CONTENT_FIND_PAGE_FORM,
} from "../data/layout/layout";
import { log } from "../utils/LogUtil";
import useDebugContext from "../hooks/useDebugContext";
import { useTutopediaState } from "../hooks/states/useTutopediaState";

const FindPage = () => {
  const navigate = useNavigate();
  const { config } = useConfig();
  const { debug } = useDebugContext();

  let { state } = useLocation();

  log(debug, "FindPage", "In, State", state, true);

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
  }
  log(debug, "FindPage", "Count", count);

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

  const { header } = useTutopediaState(state);

  const navigateToHome = (): void => {
    log(debug, "FindPage", "Back to home...");
    const tutopedia = buildTutopediaForViewAllTutorials(
      count,
      "Return from the create page",
      TUTOPEDIA_CONTENT_FIND_PAGE_BUTTONS_CANCEL_BUTTON,
      `/${ROUTE_TUTORIALS}`,
      true,
      header ? header.bucket : "<<<undefined>>>"
    );
    navigate(tutopedia.routeURL!, buildState(tutopedia));
  };

  const handleFind = () => {
    if (keywords.length > 0) {
      log(debug, "FindPage", "Find it...", keywords, true);
      const tutopedia = buildTutopediaForFindByKeyword(
        count,
        "Find By Keywords",
        TUTOPEDIA_CONTENT_FIND_PAGE_BUTTONS_FIND_BUTTON,
        `/${ROUTE_TUTORIALS}`,
        keywords,
        header ? header.bucket : "<<<undefined>>>"
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
        data-title={TUTOPEDIA_CONTENT_FIND_PAGE}
        onSubmit={() => {
          handleFind();
        }}
      >
        <Box
          data-title={TUTOPEDIA_CONTENT_FIND_PAGE_FORM}
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
            data-title={TUTOPEDIA_CONTENT_FIND_PAGE_BUTTONS}
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
