import { useNavigate } from "react-router-dom";
import {
  buildState,
  buildTutopediaForAdmin,
  buildTutopediaForServerCheckPage,
} from "../../builders/Builders";
import "./HeaderActionButtons.css";
import {
  TUTOPEDIA_HEADER_ACTION_BUTTON_ADMIN,
  TUTOPEDIA_HEADER_ACTION_BUTTON_HOME,
} from "../../data/layout/layout";

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

  const handleHeaderAction = (action: any) => {
    console.log("ACTION = " + action.id);
    if (action.actionId === TUTOPEDIA_HEADER_ACTION_BUTTON_ADMIN) {
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
          data-title={`TUTOPEDIA_HEADER_ACTIONS_${action.title.toUpperCase()}`}
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
