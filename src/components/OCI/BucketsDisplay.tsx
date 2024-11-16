import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Bucket } from "../../entities/Bucket";
import BucketContainer from "./BucketContainer";
import { BUCKETS_DISPLAY } from "../../data/layout/layout";
import { log } from "../../utils/LogUtil";
import useDebugContext from "../../hooks/useDebugContext";

const BucketsDisplay = ({
  isAdmin,
  count,
  buckets,
  setReload,
  setError,
}: {
  isAdmin: boolean;
  count: number;
  buckets: Bucket[];
  setReload(val: any): void;
  setError(val: string): void;
}) => {
  const { debug } = useDebugContext();

  log(debug, "BucketsPage.Display", "Setup, IS ADMIN", isAdmin);
  log(debug, "BucketsPage.Display", "Setup, Count", count);
  log(debug, "BucketsPage.Display", "Setup, Buckets", buckets, true);

  return (
    <Box sx={{ flexGrow: 1, p: 1 }} data-title={BUCKETS_DISPLAY}>
      <Grid
        container
        sx={{
          "--Grid-borderWidth": "1px",
          borderColor: "divider",
          "& > div": {
            borderRight: "var(--Grid-borderWidth) solid",
            borderBottom: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
          },
        }}
      >
        {buckets.map((bucket, index) => (
          <Grid key={index} marginLeft={7} marginTop="5px">
            <BucketContainer
              isAdmin={isAdmin}
              count={count}
              bucket={bucket}
              setReload={setReload}
              setError={setError}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BucketsDisplay;
