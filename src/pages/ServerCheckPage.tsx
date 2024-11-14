import { useEffect, useState } from "react";
import { ConnectionState, useServerConnect } from "../hooks/useServerConnect";
import { Box } from "@mui/material";
import ServerLoader from "../components/Server/ServerLoader";
import ServerCheckPageButton from "../components/Server/ServerCheckPageButton";
import { ServerPageButtons } from "../data/data";
import { useLocation } from "react-router-dom";
import {
  TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION,
  TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_LOADER,
} from "../data/layout/layout";
import useDebugContext from "../hooks/useDebugContext";
import { log } from "../utils/LogUtil";
import { useTutopediaState } from "../hooks/states/useTutopediaState";

const ServerCheckPage = () => {
  const { state } = useLocation();
  const { debug } = useDebugContext();

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
  }
  log(debug, "ServerCheckPage", "Count", count);

  let { connectionState } = useServerConnect();

  const [connectState, setConnectState] = useState<ConnectionState>(
    ConnectionState.connecting
  );

  useEffect(() => {
    setConnectState(connectionState);
  }, []);

  const { header } = useTutopediaState(state);

  return (
    <Box sx={{ height: "100%" }}>
      <Box display="flex" sx={{ height: "50%" }}>
        <Box
          data-title={TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_LOADER}
          sx={{ marginLeft: "44%", marginTop: "10%" }}
        >
          <ServerLoader connectState={connectState} />
        </Box>
      </Box>
      <Box display="flex" component="section" sx={{ height: "50%" }}>
        {(connectState === ConnectionState.connected ||
          connectState === ConnectionState.failed) && (
          <Box
            data-title={TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION}
            sx={{ marginLeft: "45%" }}
          >
            <ServerCheckPageButton
              count={count}
              connectState={connectState}
              buttons={ServerPageButtons}
              header={header}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ServerCheckPage;
