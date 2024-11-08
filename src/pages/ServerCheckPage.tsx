import { useEffect, useState } from "react";
import { ConnectionState, useServerConnect } from "../hooks/useServerConnect";
import { Box } from "@mui/material";
import ServerLoader from "../components/Server/ServerLoader";
import ServerCheckPageButton from "../components/Server/ServerCheckPageButton";
import { ServerPageButtons } from "../data/data";
import { useLocation } from "react-router-dom";
import useDebugContext from "../hooks/useDebugContext";

const ServerCheckPage = () => {
  let { state } = useLocation();
  const { debug } = useDebugContext();

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
  }

  if (debug) {
    console.log("[ServerCheckPage]: " + state + " => " + JSON.stringify(state));
    console.log("[ServerCheckPage] COUNT = " + count);
  }

  let { connectionState } = useServerConnect();

  const [connectState, setConnectState] = useState<ConnectionState>(
    ConnectionState.connecting
  );

  useEffect(() => {
    setConnectState(connectionState);
  }, []);

  return (
    <header data-title="SERVERCHECK_PAGE">
      <Box>
        <Box data-title="SERVERCHECK_PAGE_LOADER" marginTop={25}>
          <ServerLoader connectState={connectState} />
        </Box>
        {(connectState === ConnectionState.connected ||
          connectState === ConnectionState.failed) && (
          <Box data-title="SERVERCHECK_PAGE_ACTION" marginLeft={87}>
            <ServerCheckPageButton
              count={count}
              connectState={connectState}
              buttons={ServerPageButtons}
            />
          </Box>
        )}
      </Box>
    </header>
  );
};

export default ServerCheckPage;
