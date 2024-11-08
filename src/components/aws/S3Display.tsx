import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Bucket } from "../../entities/Bucket";
import BucketContainer from "./BucketContainer";

const S3Display = ({
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
  return (
    <Box sx={{ flexGrow: 1, p: 1 }} data-title="S3_DISPLAY">
      <Grid
        container
        sx={{
          "--Grid-borderWidth": "1px",
          borderTop: "var(--Grid-borderWidth) solid",
          borderLeft: "var(--Grid-borderWidth) solid",
          borderColor: "divider",
          "& > div": {
            borderRight: "var(--Grid-borderWidth) solid",
            borderBottom: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
          },
        }}
      >
        {buckets.map((bucket, index) => (
          <Grid
            key={index}
            marginLeft={7}
            width={200}
            height={195}
            marginTop="5px"
          >
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

export default S3Display;
