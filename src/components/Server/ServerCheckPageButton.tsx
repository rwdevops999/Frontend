import { useNavigate } from "react-router-dom";
import "./ServerCheckPageButton.css";
import { ConnectionState } from "../../hooks/useServerConnect";
import { HeaderState, TutopediaState } from "../../data/states";
import { buildState, buildTutopediaForHome } from "../../builders/Builders";
import {
  TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION,
  TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_APPLICATION,
  TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_RETRY,
} from "../../data/layout/layout";
import useDebugContext from "../../hooks/useDebugContext";
import { log } from "../../utils/LogUtil";

const ServerCheckPageButton = ({
  count,
  connectState,
  buttons,
  header,
}: {
  count: number;
  connectState: ConnectionState;
  buttons: any[];
  header: HeaderState | undefined;
}) => {
  const navigate = useNavigate();
  const { debug } = useDebugContext();

  let buttonId = connectState === ConnectionState.failed ? 0 : 1;

  const handleClick = (actionId: string) => {
    let tutopedia: TutopediaState | undefined = undefined;

    switch (actionId) {
      case TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_APPLICATION:
        log(debug, "ServerCheckPage.Button", "Create state for Home", count);
        log(debug, "ServerCheckPage.Button", "For Home, header", header, true);
        tutopedia = buildTutopediaForHome(
          count,
          "Go to the application",
          TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_RETRY,
          "tutorials",
          "<<<undefined>>>",
          header ? header.bucket : "<<<undefined>>>"
        );
        break;
      case TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_RETRY:
        // [TODO]
        break;
      default:
        log(debug, "ServerCheckPage.Button", "Invalid server action", actionId);
        break;
    }

    if (tutopedia) {
      navigate(tutopedia.routeURL!, buildState(tutopedia));
    }
  };

  return (
    <button
      data-title={`${TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION}_${buttons[buttonId].id}`}
      className="spbutton"
      onClick={() => handleClick(buttons[buttonId].actionId)}
    >
      {buttons[buttonId].title}
    </button>
  );
};

export default ServerCheckPageButton;
