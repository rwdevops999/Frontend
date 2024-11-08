import { ConnectionState } from "../../hooks/useServerConnect";
import "./ServerLoader.css";

const ServerLoader = ({ connectState }: { connectState: ConnectionState }) => {
  const isConnectedOrFailed =
    connectState === ConnectionState.connected ||
    connectState === ConnectionState.failed;

  return (
    <div id="LoaderServerComponent">
      <div className="terminal-loader">
        <div className="terminal-header">
          <div className="terminal-title">Status</div>
        </div>
        {isConnectedOrFailed && (
          <div className="text">
            {connectState === ConnectionState.connected ? "Connected" : "Error"}
          </div>
        )}
        {!isConnectedOrFailed && <div className="text">Connecting</div>}
      </div>
    </div>
  );
};

export default ServerLoader;
