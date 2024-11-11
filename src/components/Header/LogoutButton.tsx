import { useAuth0 } from "@auth0/auth0-react";
import "./HeaderActionButton.css";
import { TUTOPEDIA_HEADER_ACTION_BUTTON_LOGOUT } from "../../data/layout/layout";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className={`child child-3`}>
      <button
        data-title={TUTOPEDIA_HEADER_ACTION_BUTTON_LOGOUT}
        className={`button btn-3 tooltip-test`}
        title="logout"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        <img
          className="icon-15 tooltip-test filter-red"
          title="logout"
          src="/src/assets/logout.svg"
        />
      </button>
    </div>
  );
};

export default LogoutButton;
