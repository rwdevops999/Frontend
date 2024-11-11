import { useNavigate } from "react-router-dom";
import "./ServerCheckPageButton.css";
import { ConnectionState } from "../../hooks/useServerConnect";
import { TutopediaState } from "../../data/states";
import { buildState, buildTutopediaForHome } from "../../builders/Builders";
import {
  TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION,
  TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_APPLICATION,
  TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_RETRY,
} from "../../data/layout/layout";

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

  let buttonId = connectState === ConnectionState.failed ? 0 : 1;

  const handleClick = (actionId: string) => {
    let tutopedia: TutopediaState | undefined = undefined;

    switch (actionId) {
      case TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_APPLICATION:
        tutopedia = buildTutopediaForHome(
          count,
          "Go to the application",
          TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_RETRY,
          "tutorials"
        );
        break;
      case TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION_RETRY:
        // [TODO]
        break;
      default:
        console.log(
          `[${TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION}] INVALID SERVER ACTION: ${actionId}`
        );
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
