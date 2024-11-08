import { useAuth0 } from "@auth0/auth0-react";
import "./HeaderActionButtons.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className={`child child-3`}>
      <button
        data-title={`TOP_MAIN_HEADER_CONTENT_ACTIONS_LOGOUT`}
        className={`button btn-3 tooltip-test`}
        title="logout"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        <img
          className="icon-15 tooltip-test filter-red"
          title="logout"
          src="/src/assets/login.svg"
        />
      </button>
    </div>
  );
};

export default LogoutButton;
