import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import avatarIcon from "/src/assets/bucket.png";
import { FaTrashAlt } from "react-icons/fa";

import NumbersIcon from "@mui/icons-material/Numbers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Bucket } from "../../entities/Bucket";
import { MdOutlineStarBorder } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";

import "./BucketContainer.css";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useConfig } from "../../configuration/useConfig";
import {
  buildState,
  buildTutopediaForAdmin,
  buildTutopediaForOCI,
} from "../../builders/Builders";
import { useNavigate } from "react-router-dom";
import {
  BUCKET_CONTAINER,
  BUCKET_CONTAINER_BUCKET,
  BUCKET_CONTAINER_BUCKET_DEFAULT,
  BUCKET_CONTAINER_BUCKET_DEFAULT_INPUT,
  BUCKET_CONTAINER_BUCKET_INPUT,
  BUCKET_CONTAINER_CREATE_BUTTON,
  BUCKET_CONTAINER_DEFAULT_BUTTON,
  BUCKET_CONTAINER_DELETE_BUTTON,
  ROUTE_BUCKETS,
  ROUTE_OCI,
  ROUTE_TUTORIALS,
} from "../../data/layout/layout";

const BucketContainer = ({
  isAdmin,
  count,
  bucket,
  setReload,
  setError,
}: {
  isAdmin: boolean;
  count: number;
  bucket: Bucket;
  setReload(val: any): void;
  setError(val: string): void;
}) => {
  const { config } = useConfig();
  const navigate = useNavigate();

  const [addEnabled, setAddEnabled] = useState<boolean>(false);

  useEffect(() => {
    const node: any = document.getElementById("bucketName");
    if (node) {
      node.addEventListener("keyup", () => {
        const value = node.value;
        if (value.length === 0) {
          setAddEnabled(false);
        } else if (value.length >= 1) {
          setAddEnabled(true);
        }
      });
    }
  });

  const handleCreateBucket = async (creationAllowed: boolean) => {
    if (creationAllowed && isAdmin) {
      const input: any = document.getElementById("bucketName");

      if (input) {
        let bucket: FormData = new FormData();

        bucket.append("name", input.value);
        new Date().toDateString();

        if (config.environment != "TST") {
          toast.loading("Creating bucket...");
        }
        await axios
          .post("/bucket/create", bucket)
          .then(() => {
            setReload((x: any) => x + 1);
          })
          .catch((error) => {
            if (
              error instanceof AxiosError &&
              error.response &&
              error.response.status === 409
            ) {
              setError(
                "Bucket  with that name already exists ... choose another bucket name"
              );
            } else {
              setError(error.message);
            }
          });
      }
    }
  };

  const handleDeleteBucket = async (bucket: Bucket) => {
    if (isAdmin) {
      if (bucket.selected) {
        setError("Default bucket can't be deleted");
      } else {
        console.log("[BucketContainer] HANDLE DELETE BUCKET = " + bucket.id);

        if (config.environment != "TST") {
          toast.loading("Deleting bucket...");
        }
        await axios
          .delete("/bucket/delete/" + bucket.id)
          .then(() => {
            setReload((x: any) => x + 1);
          })
          .catch((error) => {
            console.log("ERROR BY DELETE: " + JSON.stringify(error));
            setError(error.message);
          });
      }
    }
  };

  const renderAddButton = () => {
    if (addEnabled) {
      return (
        <Box sx={{ color: "#4b4b4b" }}>
          {isAdmin && (
            <MdPostAdd
              data-title={BUCKET_CONTAINER_CREATE_BUTTON}
              onClick={() => handleCreateBucket(addEnabled)}
            />
          )}
        </Box>
      );
    }
  };

  const renderDeleteButton = () => {
    return (
      <Box>
        <FaTrashAlt
          data-title={BUCKET_CONTAINER_DELETE_BUTTON}
          onClick={() => handleDeleteBucket(bucket)}
        />
      </Box>
    );
  };

  const handleChangeDefault = async (bucket: Bucket) => {
    await axios.put("/bucket/default/" + bucket.id).then(() => {
      let tutopedia = undefined;
      if (isAdmin) {
        tutopedia = buildTutopediaForAdmin(
          count,
          "update default bucket",
          BUCKET_CONTAINER_DEFAULT_BUTTON,
          `/${ROUTE_BUCKETS}`,
          bucket.name
        );
      } else {
        tutopedia = buildTutopediaForOCI(
          count,
          "update default bucket",
          BUCKET_CONTAINER_DEFAULT_BUTTON,
          `/${ROUTE_TUTORIALS}/${ROUTE_OCI}`,
          bucket.name
        );
      }

      setReload((x: any) => x + 1);
      navigate(tutopedia.routeURL!, buildState(tutopedia));
    });
  };

  return (
    <div id={bucket.name} data-title={BUCKET_CONTAINER}>
      <Box
        data-title={BUCKET_CONTAINER_BUCKET}
        width={200}
        height={45}
        sx={{
          borderTop: 1,
          borderRight: 1,
          borderLeft: 1,
          borderColor: "primary.main",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <Avatar alt="OCI" src={avatarIcon} sx={{ width: 36, height: 36 }} />
          </Box>
          <Box sx={{ width: "65%" }}>
            {bucket.name ? (
              <Typography>{bucket.name}</Typography>
            ) : (
              <TextField
                slotProps={{
                  htmlInput: {
                    "data-title": BUCKET_CONTAINER_BUCKET_INPUT,
                    id: "bucketName",
                  },
                }}
                placeholder="Enter name..."
                sx={{
                  input: { color: "gray" },
                }}
                size="small"
                id="outlined-basic"
                variant="standard"
              />
            )}
          </Box>
          {isAdmin ? (
            bucket.name ? (
              renderDeleteButton()
            ) : (
              renderAddButton()
            )
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <Box
        width={200}
        height={50}
        sx={{ borderLeft: 1, borderRight: 1, borderColor: "primary.main" }}
      >
        <IconButton aria-label="numbers" disabled>
          <NumbersIcon sx={{ color: "green" }} />
          <Typography sx={{ color: "green" }}>{bucket.tutorials}</Typography>
        </IconButton>
      </Box>
      <Box
        width={200}
        height={50}
        sx={{ borderLeft: 1, borderRight: 1, borderColor: "primary.main" }}
      >
        <IconButton aria-label="numbers">
          <CalendarMonthIcon sx={{ color: "green" }} />
          <Typography sx={{ color: "green" }}>
            {bucket.updateDate
              ? new Date(bucket.updateDate).toLocaleDateString("en-GB")
              : "--/--/----"}
          </Typography>
        </IconButton>
      </Box>
      <Box
        width={200}
        height={30}
        sx={{
          borderLeft: 1,
          borderRight: 1,
          borderColor: "primary.main",
        }}
      >
        <FormGroup>
          {bucket.id && (
            <FormControlLabel
              sx={{
                marginTop: "-5px",
                marginLeft: "0.5px",
                "& > .MuiTypography-root": {
                  "&.Mui-disabled": {
                    color: "#1976D2",
                  },
                },
              }}
              control={
                <Checkbox
                  inputProps={{
                    id: bucket.name,
                    placeholder: `${BUCKET_CONTAINER_BUCKET_DEFAULT_INPUT}`,
                    disabled: bucket.selected,
                  }}
                  data-title={BUCKET_CONTAINER_BUCKET_DEFAULT}
                  defaultChecked={bucket.selected}
                  color="secondary"
                  onChange={() => handleChangeDefault(bucket)}
                  sx={{
                    color: "#0D3B69",
                    "&.Mui-checked": {
                      color: "#173A5E",
                    },
                  }}
                  disabled={bucket.selected}
                />
              }
              label="Default"
            />
          )}
        </FormGroup>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={200}
        height={20}
        sx={{
          borderLeft: 1,
          borderRight: 1,
          borderBottom: 1,
          borderColor: "primary.main",
        }}
      >
        <Rating
          size="small"
          name="read-only"
          value={bucket.tutorials ? Math.floor(bucket.tutorials / 3) : 0}
          readOnly
          emptyIcon={<MdOutlineStarBorder className="emptyStar" />}
        />
      </Box>
    </div>
  );
};

export default BucketContainer;
