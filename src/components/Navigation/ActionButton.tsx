import "./ActionButton.css";
import { NavigationPageNames } from "../../data/data";
import { useNavigate } from "react-router-dom";
import {
  buildState,
  buildTutopediaForPublishAll,
  buildTutopediaForViewAllTutorials,
} from "../../builders/Builders";
import { NAVBAR_DELETE_ALL, NAVBAR_PUBLISH_ALL } from "../../data/consts";
import useDebugContext from "../../hooks/useDebugContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useConfig } from "../../configuration/useConfig";

const ActionButton = ({
  count,
  action,
  selectedPage,
}: {
  count: number;
  action: string;
  selectedPage: string | undefined;
}) => {
  const { debug } = useDebugContext();
  const { config } = useConfig();

  const navigate = useNavigate();

  const handleAction = async (action: string) => {
    if (debug) {
      console.log("[ActionButton]: ACTION RECEIVED = " + action);
    }

    switch (action) {
      case "DELETE":
        await axios.delete("/delete").then(() => {
          console.log("[ActionButton] All Deleted");

          const tutopedia = buildTutopediaForViewAllTutorials(
            count,
            "Delete all tutorials",
            NAVBAR_DELETE_ALL,
            "/tutorials",
            true
          );

          console.log(
            "[ActionButton] RENAVIGATE WITH: " +
              JSON.stringify(buildState(tutopedia))
          );

          if (config.environment != "TST") {
            toast.loading("Deleting tutorials");
          }
          navigate(tutopedia.routeURL!, buildState(tutopedia));
        });
        break;
      case "PUBLISH":
        await axios.put("/publish").then(() => {
          console.log("[ActionButton] All Published");

          const tutopedia = buildTutopediaForPublishAll(
            count,
            "Publish all tutorials",
            NAVBAR_PUBLISH_ALL,
            "/tutorials"
          );

          console.log(
            "[ActionButton] RENAVIGATE WITH: " +
              JSON.stringify(buildState(tutopedia))
          );

          if (config.environment != "TST") {
            toast.loading("Publishing tutorials");
          }
          navigate(tutopedia.routeURL!, buildState(tutopedia));
        });
        break;
      default:
        console.log("INVALID ACTION: " + action);
        break;
    }

    // if (tutopedia) {
    //   if (debug) {
    //     console.log(
    //       "[ActionButton] NAVIGATION STATE" + JSON.stringify(tutopedia)
    //     );
    //   }

    //   navigate(tutopedia.routeURL!, buildState(tutopedia));
    // }
  };

  return (
    <button
      data-title={`TUTORIALS_PAGE_NAVIGATION_BAR_ACTION_${action.toUpperCase()}`}
      className={`actionbutton type${action}`}
      disabled={selectedPage !== NavigationPageNames.Home}
      onClick={() => handleAction(action.toUpperCase())}
    ></button>
  );
};

export default ActionButton;
