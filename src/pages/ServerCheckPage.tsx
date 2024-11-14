import { useEffect, useState } from "react";
import { ConnectionState, useServerConnect } from "../hooks/useServerConnect";
import { Box } from "@mui/material";
import ServerLoader from "../components/Server/ServerLoader";
import ServerCheckPageButton from "../components/Server/ServerCheckPageButton";
import { ServerPageButtons } from "../data/data";
import { useLocation } from "react-router-dom";
import {
  TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE,
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
    <header data-title={TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE}>
      <Box>
        <Box
          data-title={TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_LOADER}
          marginTop={25}
        >
          <ServerLoader connectState={connectState} />
        </Box>
        {(connectState === ConnectionState.connected ||
          connectState === ConnectionState.failed) && (
          <Box
            data-title={TUTOPEDIA_CONTENT_SERVER_CHECK_PAGE_ACTION}
            marginTop={-2}
            marginLeft={87}
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
    </header>
  );
};

export default ServerCheckPage;
