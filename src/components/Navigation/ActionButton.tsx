import "./ActionButton.css";
import { NavigationPageNames } from "../../data/data";
import { useNavigate } from "react-router-dom";
import {
  buildState,
  buildTutopediaForPublishAll,
  buildTutopediaForViewAllTutorials,
} from "../../builders/Builders";
import useDebugContext from "../../hooks/useDebugContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useConfig } from "../../configuration/useConfig";
import {
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE_ALL,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH_ALL,
} from "../../data/layout/layout";

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
    switch (action) {
      case "DELETE":
        await axios.delete("/delete").then(() => {
          console.log("[ActionButton] All Deleted");

          const tutopedia = buildTutopediaForViewAllTutorials(
            count,
            "Delete all tutorials",
            TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE_ALL,
            `/${ROUTE_TUTORIALS}`,
            true
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
            TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH_ALL,
            `/${ROUTE_TUTORIALS}`
          );

          if (config.environment != "TST") {
            toast.loading("Publishing tutorials");
          }
          navigate(tutopedia.routeURL!, buildState(tutopedia));
        });
        break;
      default:
        break;
    }
  };

  return (
    <button
      data-title={`${TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS}_${action.toUpperCase()}`}
      className={`actionbutton type${action}`}
      disabled={selectedPage !== NavigationPageNames.Home}
      onClick={() => handleAction(action.toUpperCase())}
    ></button>
  );
};

export default ActionButton;
