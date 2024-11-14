import { Box } from "@mui/material";
import { FaBucket, FaUser } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import HeaderActions from "./HeaderActions";
import "./Header.css";
import { HeaderState } from "../../data/states";
import { useConfig } from "../../configuration/useConfig";
import {
  TUTOPEDIA_HEADER_ACTION_BUTTONS,
  TUTOPEDIA_HEADER_BUCKET_NAME,
  TUTOPEDIA_HEADER_TITLE,
  TUTOPEDIA_HEADER_USER_NAME,
} from "../../data/layout/layout";
import { useLocation } from "react-router-dom";
import { log } from "../../utils/LogUtil";
import useDebugContext from "../../hooks/useDebugContext";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Header = ({
  header,
  count,
}: {
  header: HeaderState | undefined;
  count: number;
}) => {
  const { user, isAuthenticated } = useAuth0();
  const { config, setConfig } = useConfig();
  const { debug } = useDebugContext();
  const { state } = useLocation();

  log(debug, "Tutopedia.Header", "Setup, STATE?", state, true);
  log(debug, "Tutopedia.Header", "Setup", header, true);

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

  const handleChangeMode = () => {
    if (config.environment === "TST") {
      setConfig({ environment: "DEV" });
    } else {
      setConfig({ environment: "TST" });
    }
    log(debug, "Tutopedia.Header", "New Config", config, true);
  };

  return (
    <>
      <Box
        data-title={TUTOPEDIA_HEADER_TITLE}
        sx={{
          width: "40%",
        }}
      >
        <img
          src="/book.ico"
          className="icon_30"
          title={config.environment === "TST" ? "TST MODE" : "DEV MODE"}
        />
        &nbsp;
        <strong className={getClassName(false)} onClick={handleChangeMode}>
          Tut-O-Pedia
        </strong>
      </Box>

      <Box
        data-title={TUTOPEDIA_HEADER_BUCKET_NAME}
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
        data-title={TUTOPEDIA_HEADER_USER_NAME}
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
        data-title={TUTOPEDIA_HEADER_ACTION_BUTTONS}
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
