import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Tutorial } from "../entities/Tutorial";
import { Box, Pagination } from "@mui/material";
import Loader from "../components/Loader/Loader";
import ErrorBanner from "../components/Error/ErrorBanner";
import TutorialDetails from "../components/Tutorial/TutorialDetails";
import axios from "axios";
import toast from "react-hot-toast";
import { useConfig } from "../configuration/useConfig";
import {
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ERROR,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER,
} from "../data/layout/layout";
import { log } from "../utils/LogUtil";
import useDebugContext from "../hooks/useDebugContext";

const TutorialsListPage = () => {
  const { config } = useConfig();
  const { debug } = useDebugContext();

  let location = useLocation();
  log(debug, "TutorialsListPage", `In, location`, location, true);

  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [tutorialsPerPage] = useState<number>(5);
  const [beginOffset, setBeginOffset] = useState<number>(0);

  const currentPage = useRef<number>(1);

  const [reload, setReload] = useState(0);

  let apiURL = location.state.tutopedia.application.apiURL;
  let doReset: boolean = false;

  const appdata = location.state.tutopedia.application.data;
  if (appdata) {
    if (appdata.reset !== undefined) {
      doReset = appdata.reset;
    }

    if (appdata.listMode !== undefined) {
      apiURL += "?published=" + appdata.listMode;
    } else if (appdata.keywords) {
      apiURL += appdata.keywords.toString();
    } else if (appdata.searchId) {
      apiURL += `/${appdata.searchId}`;
    }
    if (appdata && appdata.reload) {
      location.state.tutopedia.application.data.reload = false;
      setReload((x: any) => x + 1);
    }
  }

  let count = location.state.tutopedia.count;
  if (count >= 0) {
    count++;
  }
  log(debug, "TutorialsListPage", "Count", count);

  const goBack = () => {
    setError(undefined);
  };

  const setPage = (loadedTutorials: Tutorial[]): void => {
    // let page = 0;
    let page = Math.floor((loadedTutorials.length - 1) / tutorialsPerPage) + 1;
    if (page < currentPage.current) {
      currentPage.current = page;
    } else if (doReset) {
      currentPage.current = 1;
    }

    const newOffset =
      ((currentPage.current - 1) * tutorialsPerPage) % loadedTutorials.length;
    setBeginOffset(newOffset);
  };

  if (config.environment != "TST") {
    toast.dismiss();
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);
      await axios
        .get(apiURL)
        .then((response) => {
          if (response.data) {
            log(
              debug,
              "TutorialsListPage",
              "Tutorials loaded",
              response.data,
              true
            );
            setTutorials(response.data);
            setPage(response.data);
            if (config.environment !== "TST") {
              toast.dismiss();
            }

            // setBeginOffset(0);
            setLoading(false);
          } else {
            log(debug, "TutorialsListPage", "NO TUTORIALS LOADED");
            if (config.environment !== "TST") {
              toast.dismiss();
              toast("No Tutorials Found");
            }
          }
        })
        .catch(function (error) {
          log(
            debug,
            "TutorialsListPage",
            "Error loading tutorials",
            error.message
          );
          setLoading(false);
          if (config.environment !== "TST") {
            if (error.response.status === 404) {
              setTutorials([]);
              toast.error("No Tutorials found");
            } else {
              setError(error.message);
            }
          } else {
            setTutorials([]);
            setError(error.message);
          }
        });
    }

    setError(undefined);

    getData();
  }, [apiURL, reload]);

  let paginatedTutorials: Tutorial[] = [];
  let pageCount = 0;
  const endOffset = beginOffset + tutorialsPerPage;

  const handlePageChange = (page: number): void => {
    currentPage.current = page;

    const newOffset = ((page - 1) * tutorialsPerPage) % tutorials!.length;
    setBeginOffset(newOffset);
  };

  const paginationStyle = {
    marginTop: "15px",
    "& .MuiButtonBase-root": {
      color: "#FF0000 !Important",
    },
    "& .Mui-selected": {
      bgcolor: "#B88E2F !Important",
      color: "#FF0000 !Important",
    },
  };

  const renderTutorials = () => {
    if (isLoading) {
      return (
        <Box data-title={TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_LOADER}>
          <Loader />
        </Box>
      );
    }

    if (error) {
      return (
        <Box data-title={TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ERROR}>
          <ErrorBanner message={error} goBack={goBack} />
        </Box>
      );
    }

    if (tutorials) {
      paginatedTutorials = Array.from(tutorials)
        .sort((a, b) => a.id! - b.id!)
        .slice(beginOffset, endOffset);
      pageCount = Math.ceil(tutorials.length / tutorialsPerPage);
      if (!pageCount) {
        pageCount = 0;
      }
    }

    if (paginatedTutorials !== undefined && paginatedTutorials.length >= 0) {
      return (
        <>
          <Pagination
            size="small"
            sx={paginationStyle}
            onChange={(_e, value) => handlePageChange(value)}
            count={pageCount}
            defaultPage={currentPage.current}
            hideNextButton={
              tutorials
                ? tutorials.length < tutorialsPerPage
                  ? true
                  : false
                : true
            }
            hidePrevButton={currentPage.current <= 1}
          />
          <Box
            data-title={TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS}
            overflow={"hidden"}
            sx={{
              width: "100%",
              height: "100%",
              maxHeight: "660px",
            }}
            marginTop={1}
          >
            {paginatedTutorials.map((tutorial) => (
              <TutorialDetails
                key={tutorial.id}
                count={count}
                tutorial={tutorial}
                setReload={setReload}
              />
            ))}
          </Box>
        </>
      );
    }
  };

  return (
    <>
      <input alt="pagination" defaultValue={tutorialsPerPage} hidden />
      <Box
        data-title={TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE}
        sx={{ height: "100%" }}
      >
        {renderTutorials()}
      </Box>
      {/* <header data-title={TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE} sx={{height: "50%"}}>
      </header> */}
    </>
  );
};

export default TutorialsListPage;
