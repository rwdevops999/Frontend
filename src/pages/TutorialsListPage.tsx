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

const TutorialsListPage = () => {
  const { config } = useConfig();
  console.log("[TutorialsListPage] CONFIG = " + config.environment);

  let location = useLocation();

  console.log("[TutorialsListPage] IN");
  console.log("[STEP] 1");

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
  console.log("[STEP] 2: APPDATA = " + JSON.stringify(appdata));
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

    console.log("[STEP] 3: apiURL = " + apiURL);

    // console.log("[TutorialsListPage] MUST DATA RELOAD? = " + data.reload);

    if (appdata && appdata.reload) {
      console.log("[TutorialsListPage] RELOADING");

      location.state.tutopedia.application.data.reload = false;
      setReload((x: any) => x + 1);
    }
  }

  console.log("[STEP] 4");
  console.log("[TutorialsListPage] AXIOS USES: " + apiURL);

  let count = location.state.tutopedia.count;
  if (count >= 0) {
    console.log("[TutorialsListPage] COUNT = " + count);
    count++;
  }

  const goBack = () => {
    setError(undefined);
  };

  const setPage = (loadedTutorials: Tutorial[]): void => {
    // let page = 0;
    let page = Math.floor((loadedTutorials.length - 1) / tutorialsPerPage) + 1;
    console.log("PAGE CALCULATION");
    console.log("TUTORIALS: " + loadedTutorials.length);
    console.log("PAGE = " + page);
    console.log("CURRENT PAGE");
    if (page < currentPage.current) {
      console.log("SET CURRENT PAGE TO " + page);

      currentPage.current = page;
    } else if (doReset) {
      currentPage.current = 1;
    }

    const newOffset =
      ((currentPage.current - 1) * tutorialsPerPage) % loadedTutorials.length;
    console.log("[TutorialsListPage] PAGE CHANGED => RESET BEGIN OFFSET");
    setBeginOffset(newOffset);
  };

  useEffect(() => {
    async function getData() {
      console.log("[TutorialsListPage] SET LOADING ON");
      setLoading(true);
      console.log("[TutorialsListPage] CALLING AXIOS");
      await axios
        .get(apiURL)
        .then((response) => {
          if (response.data) {
            console.log(
              "[TutorialsListPage] SET DATA: " + JSON.stringify(response.data)
            );
            setTutorials(response.data);
            console.log("[TutorialsListPage] SET LOADING OFF");
            setPage(response.data);
            if (config.environment != "TST") {
              toast.dismiss();
            }

            // setBeginOffset(0);
            setLoading(false);
          } else {
            console.log("NO DATA");
          }
        })
        .catch(function (error) {
          console.log("[TutorialsListPage] SET LOADING OFF");
          setLoading(false);
          if (config.environment !== "TST") {
            if (error.response.status === 404) {
              setTutorials([]);
              toast.error("No Tutorials found");
            } else {
              console.log("[TutorialsListPage] SET ERROR");
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
    console.log("HANDLE PAGE CHANGE TO " + page);

    const newOffset = ((page - 1) * tutorialsPerPage) % tutorials!.length;
    console.log("HANDLE PAGE CHANGE: NEW OFFSET = " + newOffset);
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
    console.log("RENDER");

    if (isLoading) {
      console.log("[TutorialsListPage] RENDER LOADING: " + config.environment);
      return (
        <Box data-title="TUTORIALS_LIST_PAGE_LOADING">
          <Loader />
        </Box>
      );
    }

    if (error) {
      console.log("[TutorialsListPage] RENDER ERROR");
      return (
        <Box data-title="TUTORIALS_LIST_PAGE_ERROR">
          <ErrorBanner message={error} goBack={goBack} />
        </Box>
      );
    }

    if (tutorials) {
      console.log(
        "[TutorialsListPage] RENDERING TUTORIALS: " + tutorials.length
      );
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
            data-title="TUTORIALS_LIST_PAGE_TUTORIALS"
            overflow={"hidden"}
            sx={{
              width: "100%",
              height: "700px",
              maxHeight: "700px",
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
      <header data-title="TUTORIALS_LIST_PAGE">{renderTutorials()}</header>
    </>
  );
};

export default TutorialsListPage;
