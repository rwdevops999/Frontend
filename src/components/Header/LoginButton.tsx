import { useAuth0 } from "@auth0/auth0-react";
import "./HeaderActionButtons.css";
import { TUTOPEDIA_HEADER_ACTION_BUTTON_LOGIN } from "../../data/layout/layout";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={`child child-3`}>
      <button
        data-title={TUTOPEDIA_HEADER_ACTION_BUTTON_LOGIN}
        className={`button btn-3 tooltip-test`}
        title="login"
        onClick={() => loginWithRedirect()}
      >
        <img
          className="icon-15 tooltip-test filter-green"
          title="login"
          src="/src/assets/login.svg"
        />
      </button>
    </div>
  );
};

export default LoginButton;
