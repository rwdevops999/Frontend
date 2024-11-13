import { useNavigate } from "react-router-dom";
import {
  buildState,
  buildTutopediaForAdmin,
  buildTutopediaForServerCheckPage,
} from "../../builders/Builders";
import "./HeaderActionButton.css";
import {
  TUTOPEDIA_HEADER_ACTION_BUTTON_ADMIN,
  TUTOPEDIA_HEADER_ACTION_BUTTON_HOME,
} from "../../data/layout/layout";
import useDebugContext from "../../hooks/useDebugContext";
import { log } from "../../utils/LogUtil";

const HeaderActionButton = ({
  action,
  isAuthenticated,
  count,
  bucket,
}: {
  action: any;
  isAuthenticated: boolean;
  count: number;
  bucket: string;
}) => {
  const navigate = useNavigate();
  const { debug } = useDebugContext();

  log(debug, "Tutopedia.Header.Actions.Button", action.title);

  const handleHeaderAction = (action: any) => {
    if (action.actionId === TUTOPEDIA_HEADER_ACTION_BUTTON_ADMIN) {
      log(debug, "Tutopedia.Header.Actions.Button", "To Admin");
      const tutopedia = buildTutopediaForAdmin(
        count,
        "Go to admin page",
        TUTOPEDIA_HEADER_ACTION_BUTTON_ADMIN,
        "/admin",
        bucket
      );

      navigate(tutopedia.routeURL!, buildState(tutopedia));
    }

    if (action.actionId === TUTOPEDIA_HEADER_ACTION_BUTTON_HOME) {
      log(debug, "Tutopedia.Header.Actions.Button", "To Home");
      const tutopedia = buildTutopediaForServerCheckPage(
        count,
        "Restart",
        TUTOPEDIA_HEADER_ACTION_BUTTON_HOME,
        "/",
        bucket
      );
      navigate(tutopedia.routeURL!, buildState(tutopedia)); //
    }
  };

  const renderButton = () => {
    return (
      <div className={`child child-${action.id}`}>
        <button
          data-title={`TUTOPEDIA_HEADER_ACTION_BUTTONS_${action.title.toUpperCase()}`}
          className={`button btn-${action.id} tooltip-test`}
          title={`${action.title}`}
          onClick={() => handleHeaderAction(action)}
        >
          <img
            className="icon-15 tooltip-test filter-green"
            title={`${action.title}`}
            src={`${action.src}`}
          />
        </button>
      </div>
    );
  };

  return action.title === "admin" && !isAuthenticated ? <></> : renderButton();
};

export default HeaderActionButton;
