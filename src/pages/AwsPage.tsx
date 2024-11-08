import { useLocation } from "react-router-dom";
import useDebugContext from "../hooks/useDebugContext";
import S3Display from "../components/aws/S3Display";
import { Bucket } from "../entities/Bucket";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useConfig } from "../configuration/useConfig";
import toast from "react-hot-toast";
import { Box, Pagination } from "@mui/material";
import Loader from "../components/Loader/Loader";
import ErrorBanner from "../components/Error/ErrorBanner";

const AwsPage = () => {
  let { debug } = useDebugContext();
  let { state } = useLocation();
  const { config } = useConfig();

  console.log("[AWS Page] IN");

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
  }

  if (debug) {
    console.log("[AWS Page] count: " + state.tutopedia.count);
    console.log("[AWS Page] State: " + JSON.stringify(state));
  }

  // FUNCTIONALITY
  const [buckets, setBuckets] = useState<Bucket[]>([{}]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [beginOffset, setBeginOffset] = useState<number>(0);

  const [reload, setReload] = useState(0);

  const currentPage = useRef<number>(1);

  const goBack = () => {
    setError(undefined);
  };

  useEffect(() => {
    async function getBuckets() {
      console.log("[AWSPage] SET LOADING ON");
      setLoading(true);
      console.log("[AWSPage] CALLING AXIOS");
      await axios
        .get("/bucket/find")
        .then((response) => {
          if (response.data) {
            console.log("[AWSPage] SET DATA: " + JSON.stringify(response.data));
            setBuckets([...response.data]);
            console.log("[AWSPage] SET LOADING OFF");
            // setPage(response.data);
            if (config.environment != "TST") {
              toast.dismiss();
            }

            // setBeginOffset(0);
            setLoading(false);
          } else {
            console.log("[AWSPage] NO DATA");
          }
        })
        .catch(function (error) {
          console.log("[AWSPage] AXIOS ERROR");
          console.log("[AWSPage] SET LOADING OFF");
          setLoading(false);
          if (config.environment !== "TST") {
            if (error.response && error.reponse.status === 404) {
              setBuckets([]);
              toast.error("No Buckets found");
            } else {
              console.log("[AWSPage] SET ERROR");
              setError(error.message);
            }
          } else {
            setBuckets([]);
            setError(error.message);
          }
        });
    }

    setError(undefined);

    console.log("[AWS Page] LOADING BUCKETS");
    getBuckets();
  }, [reload, setReload]);

  const bucketsPerPage = 15;

  let paginatedBuckets: Bucket[] = [];
  let pageCount = 0;
  const endOffset = beginOffset + bucketsPerPage;

  const handlePageChange = (page: number): void => {
    currentPage.current = page;
    console.log("[AWSPage] HANDLE PAGE CHANGE TO " + page);

    const newOffset = ((page - 1) * bucketsPerPage) % buckets.length;
    console.log("[AWSPage] HANDLE PAGE CHANGE: NEW OFFSET = " + newOffset);
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

  const renderBuckets = () => {
    console.log("[AWSPage] RENDER DOM");

    if (loading) {
      console.log("[AWSPage] RENDER LOADING: " + config.environment);
      return (
        <Box data-title="AWS_PAGE_LOADING">
          <Loader />
        </Box>
      );
    }

    if (error) {
      console.log("[AWSPage] RENDER ERROR");
      return (
        <Box data-title="AWS_PAGE_ERROR">
          <ErrorBanner message={error} goBack={goBack} />
        </Box>
      );
    }

    if (buckets) {
      console.log("[AWSPage] RENDERING BUCKETS: " + buckets.length);
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
              defaultPage={currentPage.current}
              hideNextButton={
                buckets
                  ? buckets.length < bucketsPerPage
                    ? true
                    : false
                  : true
              }
              hidePrevButton={currentPage.current <= 1}
            />
            <Box
              data-title="AWS_PAGE_BUCKETS"
              overflow={"hidden"}
              sx={{
                width: "100%",
                height: "700px",
                maxHeight: "700px",
              }}
              marginTop={1}
            >
              <S3Display
                isAdmin={false}
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
      <header data-title="TUTORIALS_AWS_PAGE">{renderBuckets()}</header>
    </>
  );
};

export default AwsPage;
