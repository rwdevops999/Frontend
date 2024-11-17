import { useEffect, useState } from "react";
// import Providers from "./providers/Providers";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { dynamicConfigUrl } from "./configuration/config";
import axios from "axios";
import { useConfig } from "./configuration/useConfig";
// import Providers from "./providers/Providers";

const configLoadingErrorMessage =
  "Error while fetching global config, the App wil not be rendered. (This is NOT a React error.)";

const App = () => {
  const { setConfig } = useConfig();
  const [configLoadingState, setConfigLoadingState] = useState<
    "loading" | "ready" | "error"
  >("loading");

  useEffect(() => {
    axios
      .get(dynamicConfigUrl)
      .then((response) => {
        console.log("[INIT] READ " + response.data);
        setConfig(response.data);
        setConfigLoadingState("ready");
      })
      .catch((error) => {
        console.log("[INIT] ERROR");
        console.log(
          configLoadingErrorMessage +
            ` Have you provided the config file '${dynamicConfigUrl}'?` +
            " Error: " +
            error.message
        );
        setConfigLoadingState("error");
      });
  }, [setConfig]);

  if (configLoadingState === "loading") {
    return "Loading the app..."; // change to some visual CircularProgress in real app
  }
  if (configLoadingState === "error") {
    return (
      <p style={{ color: "red", textAlign: "center" }}>
        {configLoadingErrorMessage}
      </p>
    );
  }

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default App;
