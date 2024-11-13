import { useLocation } from "react-router-dom";
import useDebugContext from "../hooks/useDebugContext";
import { Bucket } from "../entities/Bucket";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useConfig } from "../configuration/useConfig";
import toast from "react-hot-toast";
import { Box, Pagination } from "@mui/material";
import Loader from "../components/Loader/Loader";
import ErrorBanner from "../components/Error/ErrorBanner";
import BucketsDisplay from "../components/OCI/BucketsDisplay";
import {
  TUTOPEDIA_CONTENT_OCI_PAGE,
  TUTOPEDIA_CONTENT_OCI_PAGE_BUCKETS,
  TUTOPEDIA_CONTENT_OCI_PAGE_ERROR,
  TUTOPEDIA_CONTENT_OCI_PAGE_LOADER,
} from "../data/layout/layout";

const OCIPage = () => {
  let { debug } = useDebugContext();
  let { state } = useLocation();
  const { config } = useConfig();

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
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
      setLoading(true);
      await axios
        .get("/bucket/find")
        .then((response) => {
          if (response.data) {
            setBuckets([...response.data]);
            // setPage(response.data);
            if (config.environment != "TST") {
              toast.dismiss();
            }

            // setBeginOffset(0);
            setLoading(false);
          }
        })
        .catch(function (error) {
          setLoading(false);
          if (config.environment !== "TST") {
            if (error.response && error.reponse.status === 404) {
              setBuckets([]);
              toast.error("No Buckets found");
            } else {
              console.log("[OCIPage] SET ERROR");
              setError(error.message);
            }
          } else {
            setBuckets([]);
            setError(error.message);
          }
        });
    }

    setError(undefined);

    getBuckets();
  }, [reload, setReload]);

  const bucketsPerPage = 15;

  let paginatedBuckets: Bucket[] = [];
  let pageCount = 0;
  const endOffset = beginOffset + bucketsPerPage;

  const handlePageChange = (page: number): void => {
    currentPage.current = page;

    const newOffset = ((page - 1) * bucketsPerPage) % buckets.length;
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
    if (loading) {
      return (
        <Box data-title={TUTOPEDIA_CONTENT_OCI_PAGE_LOADER}>
          <Loader />
        </Box>
      );
    }

    if (error) {
      return (
        <Box data-title={TUTOPEDIA_CONTENT_OCI_PAGE_ERROR}>
          <ErrorBanner message={error} goBack={goBack} />
        </Box>
      );
    }

    if (buckets) {
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
              data-title={TUTOPEDIA_CONTENT_OCI_PAGE_BUCKETS}
              overflow={"hidden"}
              sx={{
                width: "100%",
                height: "700px",
                maxHeight: "700px",
              }}
              marginTop={1}
            >
              <BucketsDisplay
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
      <header data-title={TUTOPEDIA_CONTENT_OCI_PAGE}>{renderBuckets()}</header>
    </>
  );
};

export default OCIPage;
