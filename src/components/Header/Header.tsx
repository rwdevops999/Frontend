import { Box } from "@mui/material";
import { FaBookOpen, FaBucket, FaUser } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import HeaderActions from "./HeaderActions";
import "./Header.css";
import { HeaderState } from "../../data/states";
import { debugState } from "../../data/utils";
import { useConfig } from "../../configuration/useConfig";

const Header = ({
  header,
  count,
}: {
  header: HeaderState | undefined;
  count: number;
}) => {
  const { user, isAuthenticated } = useAuth0();
  const { config } = useConfig();

  debugState("Header: AUTHENTICATED", isAuthenticated);
  debugState("Header: USER", user);

  debugState("Header", header);

  const getClassName = (icon: boolean = true): string => {
    if (config.environment) {
      if (icon) {
        return "icon_30" + " color_" + config.environment.toLowerCase();
      } else {
        return "title" + " color_" + config.environment.toLowerCase();
      }
    } else {
      if (icon) {
        return "icon_30";
      } else {
        return "title";
      }
    }
  };

  return (
    <>
      <Box
        data-title="TUTOPEDIA_HEADER_TITLE"
        sx={{
          width: "40%",
        }}
      >
        <FaBookOpen
          className={getClassName()}
          title={config.environment === "TST" ? "TST MODE" : "DEV MODE"}
        />
        &nbsp;
        <strong className={getClassName(false)}>Tut-O-Pedia</strong>
      </Box>

      <Box
        data-title="TUTOPEDIA_HEADER_BUCKET"
        sx={{
          width: "15%",
          color: "green",
        }}
      >
        <FaBucket />
        &nbsp;{" "}
        {header
          ? header.bucket
            ? header.bucket
            : "<<<undefined>>>"
          : "<<<undefined>>>"}
      </Box>

      <Box
        data-title="TUTOPEDIA_HEADER_USER"
        sx={{
          width: "15%",
          color: "green",
        }}
      >
        <FaUser />
        &nbsp;
        {isAuthenticated ? `${user!.name}` : "<<<no user>>>"}
      </Box>

      <Box
        data-title="TUTOPEDIA_HEADER_ACTIONS"
        sx={{
          width: "30%",
        }}
      >
        <HeaderActions
          isAuthenticated={isAuthenticated}
          count={count}
          header={header}
        />
      </Box>
    </>
  );
};

export default Header;
