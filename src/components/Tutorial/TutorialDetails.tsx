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
import axios from "axios";
import toast from "react-hot-toast";
import { useConfig } from "../../configuration/useConfig";
import {
  ROUTE_CREATE,
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_DELETE,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM_CHIP,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_PUBLISH,
  TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_UPDATE,
} from "../../data/layout/layout";
import { log } from "../../utils/LogUtil";
import useDebugContext from "../../hooks/useDebugContext";

const TutorialDetails = ({
  count,
  tutorial,
  setReload,
}: {
  count: number;
  tutorial: Tutorial;
  setReload(value: any): any;
}) => {
  const navigate = useNavigate();
  const { config } = useConfig();
  const { debug } = useDebugContext();

  log(debug, "TutorialsListPage.Details", "Setup");

  const editTutorial = (id: number): void => {
    log(debug, "TutorialsListPage.Details", "Update tutorial", id);
    const tutopedia = buildTutopediaForCreate(
      count,
      "Update tutorial",
      TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_UPDATE,
      `${ROUTE_CREATE}`,
      id,
      true
    );

    const state = buildState(tutopedia);

    navigate(tutopedia.routeURL!, state);
  };

  const publishTutorialById = async (id: number) => {
    log(debug, "TutorialsListPage.Details", "Publish tutorial", id);
    await axios
      .put("/publish/" + id)
      .then(() => {
        const tutopedia = buildTutopediaForViewAllPublishedTutorials(
          count,
          "Publish tutorial",
          TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_PUBLISH,
          `/${ROUTE_TUTORIALS}`,
          true
        );

        if (config.environment != "TST") {
          toast.loading("Publish tutorial: " + id);
        }

        navigate(tutopedia.routeURL!, buildState(tutopedia));
      })
      .catch((err) => {
        if (config.environment != "TST") {
          toast(`ERROR PUBLISH TUTORIAL ${id}: ${err.message}`);
        }
      });
  };

  const deleteTutorialById = async (id: number) => {
    log(debug, "TutorialsListPage.Details", "Delete tutorial", id);
    await axios.delete("/delete/" + id).then(() => {
      if (config.environment != "TST") {
        toast.loading("Delete tutorial: " + id);
      }
      setReload((x: any) => x + 1);
    });
  };

  return (
    <div className="separate">
      <Box
        display={"flex"}
        data-title={TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM}
      >
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
              data-title={TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_ITEM_CHIP}
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
                  data-title={
                    TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_UPDATE
                  }
                  className="tooltip-test pointer"
                  title="update"
                  onClick={() => editTutorial(tutorial.id!)}
                />
                <Divider orientation="vertical" />
                <FaFileExport
                  data-title={
                    TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_PUBLISH
                  }
                  className="tooltip-test pointer"
                  title="publish"
                  onClick={() => publishTutorialById(tutorial.id!)}
                />
                <Divider orientation="vertical" />
                <FaTrashAlt
                  data-title={
                    TUTOPEDIA_CONTENT_TUTORIALS_LIST_PAGE_ITEMS_DELETE
                  }
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
