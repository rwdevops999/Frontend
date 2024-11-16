import "./ActionButton.css";
import { NavigationPageNames } from "../../data/data";
import { useLocation, useNavigate } from "react-router-dom";
import {
  buildState,
  buildTutopediaForPublishAll,
  buildTutopediaForViewAllTutorials,
} from "../../builders/Builders";
import axios from "axios";
import toast from "react-hot-toast";
import { useConfig } from "../../configuration/useConfig";
import {
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE,
  TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH,
} from "../../data/layout/layout";
import useDebugContext from "../../hooks/useDebugContext";
import { log } from "../../utils/LogUtil";
import { useTutopediaState } from "../../hooks/states/useTutopediaState";

const ActionButton = ({
  count,
  action,
  selectedPage,
}: {
  count: number;
  action: string;
  selectedPage: string | undefined;
}) => {
  const { config } = useConfig();
  const { debug } = useDebugContext();
  const { state } = useLocation();

  log(debug, "NavigationBar.Action.Button", "Setup");

  const navigate = useNavigate();

  const { header } = useTutopediaState(state);

  const handleAction = async (action: string) => {
    switch (action) {
      case "DELETE":
        log(debug, "NavigationBar.Action.Button", "DELETE ALL");
        await axios.delete("/delete").then(() => {
          const tutopedia = buildTutopediaForViewAllTutorials(
            count,
            "Delete all tutorials",
            TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_DELETE,
            `/${ROUTE_TUTORIALS}`,
            true,
            header ? header.bucket : "<<<undefined>>>"
          );

          if (config.environment != "TST") {
            toast.loading("Deleting tutorials");
          }
          navigate(tutopedia.routeURL!, buildState(tutopedia));
        });
        break;
      case "PUBLISH":
        log(debug, "NavigationBar.Action.Button", "PUBLISH ALL");
        await axios
          .put("/publish")
          .then(() => {
            const tutopedia = buildTutopediaForPublishAll(
              count,
              "Publish all tutorials",
              TUTOPEDIA_CONTENT_TUTORIALS_PAGE_NAVIGATION_BAR_ACTIONS_PUBLISH,
              `/${ROUTE_TUTORIALS}`,
              header ? header.bucket : "<<<undefined>>>"
            );

            if (config.environment != "TST") {
              toast.loading("Publishing tutorials");
            }
            navigate(tutopedia.routeURL!, buildState(tutopedia));
          })
          .catch(() => {
            log(debug, "NavigationBar.Action.Button", "Error publishing all");
            if (config.environment != "TST") {
              toast(
                `Error publishing all tutorials: Is default bucket defined?`
              );
            }
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
