import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Box, Pagination } from "@mui/material";
import useDebugContext from "../../hooks/useDebugContext";
import { useConfig } from "../../configuration/useConfig";
import { Bucket } from "../../entities/Bucket";
import Loader from "../../components/Loader/Loader";
import ErrorBanner from "../../components/Error/ErrorBanner";
import BucketsDisplay from "../../components/OCI/BucketsDisplay";
import "./BucketsPage.css";

const BucketsPage = () => {
  let { debug } = useDebugContext();
  let { state } = useLocation();
  const { config } = useConfig();

  console.log("[Admin Page] IN");

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
  }

  if (debug) {
    console.log("[Admin Page] count: " + state.tutopedia.count);
    console.log("[Admin Page] State: " + JSON.stringify(state));
  }

  // FUNCTIONALITY
  const [buckets, setBuckets] = useState<Bucket[]>([{}]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [beginOffset, setBeginOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [reload, setReload] = useState(0);

  const setPage = (loadedBuckets: Bucket[]): void => {
    // let page = 0;
    let pages = Math.floor(loadedBuckets.length / bucketsPerPage) + 1;
    console.log("PAGE CALCULATION");
    console.log("BUCKETS: " + loadedBuckets.length);
    console.log("PAGES = " + pages);
    console.log("CURRENT PAGE");
    if (currentPage >= pages) {
      console.log("SET CURRENT PAGE TO " + pages);
      setCurrentPage(pages);
    }

    const newOffset =
      ((currentPage - 1) * bucketsPerPage) % loadedBuckets.length;
    console.log("[ADMINPage] PAGE CHANGED => RESET BEGIN OFFSET");
    setBeginOffset(newOffset);
  };

  useEffect(() => {
    async function getBuckets() {
      console.log("[AdminPage] SET LOADING ON");
      setLoading(true);
      console.log("[AdminPage] CALLING AXIOS");
      await axios
        .get("/bucket/find")
        .then((response) => {
          if (response.data) {
            console.log(
              "[AdminPage] SET DATA: " + JSON.stringify(response.data)
            );
            setBuckets([...response.data, {}]);
            setPage([...response.data, {}]);

            console.log("[AdminPage] SET LOADING OFF");
            // setPage(response.data);
            if (config.environment != "TST") {
              toast.dismiss();
            }

            // setBeginOffset(0);
            setLoading(false);
          } else {
            console.log("[AdminPage] NO DATA");
          }
        })
        .catch(function (error) {
          console.log("[AdminPage] AXIOS ERROR");
          console.log("[AdminPage] SET LOADING OFF");
          setLoading(false);
          if (config.environment !== "TST") {
            if (error.response && error.reponse.status === 404) {
              setBuckets([]);
              toast.error("No Buckets found");
            } else {
              console.log("[AdminPage] SET ERROR");
              setError(error.message);
            }
          } else {
            setBuckets([{}]);
            setError(error.message);
          }
        });
    }

    setError(undefined);

    console.log("[AdminPage] LOADING BUCKETS");
    getBuckets();
  }, [reload, setReload]);

  const bucketsPerPage = 15;

  let paginatedBuckets: Bucket[] = [];
  let pageCount = 0;
  const endOffset = beginOffset + bucketsPerPage;

  const handlePageChange = (page: number): void => {
    console.log("[AdminPage] HANDLE PAGE CHANGE TO " + page);

    const newOffset = ((page - 1) * bucketsPerPage) % buckets.length;
    console.log("[AdminPage] HANDLE PAGE CHANGE: NEW OFFSET = " + newOffset);
    setCurrentPage(page);
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

  const goBack = () => {
    setError(undefined);
  };

  const renderBuckets = () => {
    console.log("[AdminPage] RENDER DOM");

    if (loading) {
      console.log("[AdminPage] RENDER LOADING: " + config.environment);
      return (
        <Box data-title="ADMIN_PAGE_LOADING">
          <Loader />
        </Box>
      );
    }

    if (error) {
      console.log("[AdminPage] RENDER ERROR");
      return (
        <Box data-title="ADMIN_PAGE_ERROR">
          <ErrorBanner message={error} goBack={goBack} />
        </Box>
      );
    }

    if (buckets) {
      console.log("[AdminPage] RENDERING BUCKETS: " + buckets.length);
      paginatedBuckets = Array.from(buckets)
        .sort((a, b) => a.id! - b.id!)
        .slice(beginOffset, endOffset);
      pageCount = Math.ceil(buckets.length / bucketsPerPage);
      if (!pageCount) {
        pageCount = 0;
      }

      if (paginatedBuckets !== undefined && paginatedBuckets.length >= 0) {
        return (
          <>
            <Pagination
              size="small"
              sx={paginationStyle}
              onChange={(_e, value) => handlePageChange(value)}
              count={pageCount}
              defaultPage={currentPage}
              hideNextButton={
                buckets
                  ? Math.floor(buckets.length / bucketsPerPage) + 1 ===
                    currentPage
                  : true
              }
              hidePrevButton={currentPage <= 1}
            />
            <Box
              data-title="ADMIN_PAGE_BUCKETS"
              overflow={"hidden"}
              sx={{
                width: "100%",
                height: "700px",
                maxHeight: "700px",
              }}
              marginTop={1}
            >
              <BucketsDisplay
                isAdmin={true}
                count={count}
                buckets={paginatedBuckets}
                setReload={setReload}
                setError={setError}
              />
            </Box>
          </>
        );
      }
    }
  };

  return (
    <>
      <header className="" data-title="BUCKETS_MAIN_DISPLAY">
        {renderBuckets()}
      </header>
    </>
  );
};

export default BucketsPage;
