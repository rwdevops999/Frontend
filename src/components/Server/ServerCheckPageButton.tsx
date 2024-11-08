import { useNavigate } from "react-router-dom";
import "./ServerCheckPageButton.css";
import { ConnectionState } from "../../hooks/useServerConnect";
import { TutopediaState } from "../../data/states";
import { debugState } from "../../data/utils";
import { buildState, buildTutopediaForHome } from "../../builders/Builders";
import { SERVER_APPLICATION, SERVER_RETRY } from "../../data/consts";
import useDebugContext from "../../hooks/useDebugContext";

const ServerCheckPageButton = ({
  count,
  connectState,
  buttons,
}: {
  count: number;
  connectState: ConnectionState;
  buttons: any[];
}) => {
  const navigate = useNavigate();
  const { debug } = useDebugContext();

  if (debug) {
    console.log("[SCPB] COUNT = " + count);
  }

  let buttonId = connectState === ConnectionState.failed ? 0 : 1;

  const handleClick = (actionId: string) => {
    if (debug) {
      console.log("SCP Click: " + actionId + "(" + count + ")");
    }

    let tutopedia: TutopediaState | undefined = undefined;

    switch (actionId) {
      case SERVER_APPLICATION:
        tutopedia = buildTutopediaForHome(
          count,
          "Go to the application",
          SERVER_APPLICATION,
          "tutorials"
        );
        break;
      case SERVER_RETRY:
        // [TODO]
        break;
      default:
        console.log("INVALID SERVER ACTION: " + actionId);
    }

    if (tutopedia) {
      if (debug) {
        debugState("[ServerCheckPageButton] state = ", tutopedia);
      }
      navigate(tutopedia.routeURL!, buildState(tutopedia));
    }
  };

  return (
    <button
      data-title={`SERVERCHECK_PAGE_ACTION_${buttons[buttonId].id}`}
      className="spbutton"
      onClick={() => handleClick(buttons[buttonId].actionId)}
    >
      {buttons[buttonId].title}
    </button>
  );
};

export default ServerCheckPageButton;
