import {
  Box,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { FaFileAlt, FaTrashAlt } from "react-icons/fa";
import { FaFileExport, FaPenFancy } from "react-icons/fa6";
import "./TutorialDetails.css";
import { useNavigate } from "react-router-dom";
import { Tutorial } from "../../entities/Tutorial";
import {
  buildState,
  buildTutopediaForCreate,
  buildTutopediaForViewAllPublishedTutorials,
} from "../../builders/Builders";
import { LISTVIEW_PUBLISH, LISTVIEW_UPDATE } from "../../data/consts";
import useDebugContext from "../../hooks/useDebugContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useConfig } from "../../configuration/useConfig";

const TutorialDetails = ({
  count,
  tutorial,
  setReload,
}: // deleteTutorialById,
// publishTutorialById,
{
  count: number;
  tutorial: Tutorial;
  setReload(value: any): any;
  // deleteTutorialById(id: number): void;
  // publishTutorialById(id: number): void;
}) => {
  const navigate = useNavigate();
  const { config } = useConfig();

  const { debug } = useDebugContext();

  const editTutorial = (id: number): void => {
    if (debug) {
      console.log("[DetailsEditButton] Update ID = " + id);
    }

    const tutopedia = buildTutopediaForCreate(
      count,
      "Update tutorial",
      LISTVIEW_UPDATE,
      "create",
      id,
      true
    );

    const state = buildState(tutopedia);

    if (debug) {
      console.log(
        "[DetailsEditButton] NAVIGATION: STATE = ",
        state + " URL = " + tutopedia.routeURL!
      );

      console.log("[DetailsEditButton] NAVIGATE AWAY TO " + tutopedia.routeURL);
    }

    navigate(tutopedia.routeURL!, state);
  };

  const publishTutorialById = async (id: number) => {
    console.log("[TutorialDetails] publish: " + id);

    await axios.put("/publish/" + id).then(() => {
      console.log("[TutorialDetails] PUBLISHED");

      const tutopedia = buildTutopediaForViewAllPublishedTutorials(
        count,
        "Publish tutorial",
        LISTVIEW_PUBLISH,
        "/tutorials",
        true
      );

      console.log("[TutorialDetails] RENAVIGATE");
      if (config.environment != "TST") {
        toast.loading("Publish tutorial: " + id);
      }
      navigate(tutopedia.routeURL!, buildState(tutopedia));
    });
  };

  const deleteTutorialById = async (id: number) => {
    console.log("[TutorialDetails] delete: " + id);

    await axios.delete("/delete/" + id).then(() => {
      console.log("[TutorialDetails] DELETED");

      if (config.environment != "TST") {
        toast.loading("Delete tutorial: " + id);
      }
      setReload((x: any) => x + 1);
    });
  };

  return (
    <div className="separate">
      <Box display={"flex"} data-title="TUTORIALS_LIST_PAGE_TUTORIALS_ITEM">
        <Box sx={{ width: "80%" }}>
          <CardContent
            sx={{
              background: "lightgray",
              color: "black",
              border: "1px solid black",
              height: "80px",
            }}
          >
            <Typography variant="body1" className="font-vertical-fix">
              &nbsp;[
              {tutorial.id}
              ]&nbsp; &nbsp;
              {tutorial.title}
            </Typography>
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "purple", marginLeft: "10px" }}
              >
                <FaFileAlt className="iconadjust" />
                <span className="font-filename-fix">
                  {tutorial.filename === undefined ? "" : tutorial.filename}
                </span>
              </Typography>
            </Box>
            <Typography variant="body1">{tutorial.description}</Typography>
          </CardContent>
        </Box>
        <Box
          sx={{
            width: "20%",
            backgroundColor: "white",
          }}
        >
          <CardContent
            sx={{
              background: "lightgray",
              color: "black",
              height: "80px",
              border: "1px solid black",
            }}
          >
            <Chip
              data-title="TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_CHIP"
              size="small"
              label={tutorial.published ? "published" : "not published"}
              variant="outlined"
              sx={{
                backgroundColor: tutorial.published ? "green" : "red",
                marginLeft: "10px",
              }}
            />
            {!tutorial.published && (
              <CardActions sx={{ background: "lightgray", color: "black" }}>
                <FaPenFancy
                  data-title="TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_EDIT"
                  className="tooltip-test pointer"
                  title="update"
                  onClick={() => editTutorial(tutorial.id!)}
                />
                <Divider orientation="vertical" />
                <FaFileExport
                  data-title="TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_PUBLISH"
                  className="tooltip-test pointer"
                  title="publish"
                  onClick={() => publishTutorialById(tutorial.id!)}
                />
                <Divider orientation="vertical" />
                <FaTrashAlt
                  data-title="TUTORIALS_LIST_PAGE_TUTORIALS_ITEM_DELETE"
                  className="tooltip-test pointer"
                  title="delete"
                  onClick={() => deleteTutorialById(tutorial.id!)}
                />
              </CardActions>
            )}
          </CardContent>
        </Box>
      </Box>
    </div>
  );
};

export default TutorialDetails;
