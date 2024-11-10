import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const AuthStatus = () => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <LogoutButton />;
  }

  return <LoginButton />;
};

export default AuthStatus;
