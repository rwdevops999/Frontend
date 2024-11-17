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
import {
  BUCKETS_PAGE,
  BUCKETS_PAGE_ERROR,
  BUCKETS_PAGE_LOADER,
} from "../../data/layout/layout";
import { log } from "../../utils/LogUtil";

const BucketsPage = () => {
  let { debug } = useDebugContext();
  let { state } = useLocation();
  const { config } = useConfig();

  log(debug, "BucketsPage", "In, State", state, true);

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
  }
  log(debug, "BucketsPage", "In, Count", count);

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
    if (currentPage >= pages) {
      setCurrentPage(pages);
    }

    const newOffset =
      ((currentPage - 1) * bucketsPerPage) % loadedBuckets.length;
    setBeginOffset(newOffset);
  };

  useEffect(() => {
    async function getBuckets() {
      setLoading(true);
      await axios
        .get("/bucket/find")
        .then((response) => {
          if (response.data) {
            log(debug, "BucketsPage", "Found Buckets", response.data, true);
            setBuckets([...response.data, {}]);
            setPage([...response.data, {}]);

            if (config.environment != "TST") {
              toast.dismiss();
            }

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
              log(
                debug,
                "BucketsPage",
                "Error  retrieving buckets",
                error.message
              );
              setError(error.message);
            }
          } else {
            setBuckets([{}]);
            setError(error.message);
          }
        });
    }

    setError(undefined);

    log(debug, "BucketsPage", "Load Buckets");
    getBuckets();
  }, [reload, setReload]);

  const bucketsPerPage = 15;

  let paginatedBuckets: Bucket[] = [];
  let pageCount = 0;
  const endOffset = beginOffset + bucketsPerPage;

  const handlePageChange = (page: number): void => {
    const newOffset = ((page - 1) * bucketsPerPage) % buckets.length;
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
    if (loading) {
      return (
        <Box data-title={BUCKETS_PAGE_LOADER}>
          <Loader />
        </Box>
      );
    }

    if (error) {
      return (
        <Box data-title={BUCKETS_PAGE_ERROR}>
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
      <header data-title={BUCKETS_PAGE}>{renderBuckets()}</header>
    </>
  );
};

export default BucketsPage;
