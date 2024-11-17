import { Box } from "@mui/material";
import { FaBucket, FaUser } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import HeaderActions from "./HeaderActions";
import "./Header.css";
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
import toast from "react-hot-toast";
import { useTutopediaState } from "../../hooks/states/useTutopediaState";

const Header = ({
  // header,
  count,
}: {
  // header: HeaderState | undefined;
  count: number;
}) => {
  const { user, isAuthenticated } = useAuth0();
  const { config, setConfig } = useConfig();
  const { debug } = useDebugContext();
  const { state } = useLocation();

  log(debug, "Tutopedia.Header", "Setup, STATE?", state, true);
  const { header } = useTutopediaState(state);
  log(debug, "Tutopedia.Header", "Setup", header, true);

  const getClassName = (icon: boolean = true): string => {
    console.log("Get CLASS NAME " + config.environment.toLowerCase());
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
    let newMode: "DEV" | "TST" | "ACC" | "PRD" = "DEV";

    if (config.environment !== "TST") {
      newMode = "TST";
    }

    setConfig({ environment: newMode });
    toast(`Current environment: ${newMode}`, { icon: "👏" });

    log(debug, "Tutopedia.Header", "New Config", newMode);
  };

  return (
    <>
      <Box
        data-title={TUTOPEDIA_HEADER_TITLE}
        sx={{
          width: "40%",
          marginTop: "10px",
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
          marginLeft: "-145px",
          width: "15%",
          color: "green",
          marginTop: "15px",
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
          marginTop: "15px",
          marginRight: "145px",
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
        <HeaderActions isAuthenticated={isAuthenticated} count={count} />
      </Box>
    </>
  );
};

export default Header;
