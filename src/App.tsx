import { useEffect, useState } from "react";
import Providers from "./providers/Providers";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { dynamicConfigUrl } from "./configuration/config";
import axios from "axios";
import { useConfig } from "./configuration/useConfig";

const configLoadingErrorMessage =
  "Error while fetching global config, the App wil not be rendered. (This is NOT a React error.)";

const App = () => {
  const { setConfig } = useConfig();
  const [configLoadingState, setConfigLoadingState] = useState<
    "loading" | "ready" | "error"
  >("loading");

  useEffect(() => {
    console.log("App.tsx, fetching global config from" + dynamicConfigUrl);

    axios
      .get(dynamicConfigUrl)
      .then((response) => {
        setConfig(response.data);
        console.log("Global config fetched: " + JSON.stringify(response.data));
        setConfigLoadingState("ready");
      })
      .catch((error) => {
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
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;

// const App = () => {

//   const { setConfig } = useConfig();
//   const [configLoadingState, setConfigLoadingState] = useState<
//     "loading" | "ready" | "error"
//   >("loading");

//   useEffect(() => {
//     console.log("[APP] fetching global config from", dynamicConfigUrl);
//     axios
//       .get(dynamicConfigUrl)
//       .then((response) => {
//         setConfig(response.data);
//         console.log("[APP] Global config fetched: ", response.data);
//         setConfigLoadingState("ready");
//       })
//       .catch((e) => {
//         console.log(
//           "[APP] ERROR:" + configLoadingErrorMessage,
//           `Have you provided the config file '${dynamicConfigUrl}'?`,
//           e
//         );
//         setConfigLoadingState("error");
//       });
//   }, [setConfig]);

//   if (configLoadingState === "loading") {
//     return "Loading the app..."; // change to some visual CircularProgress in real app
//   }
//   if (configLoadingState === "error") {
//     return (
//       <p style={{ color: "red", textAlign: "center" }}>
//         {configLoadingErrorMessage}
//       </p>
//     );
//   }

//   return (
//     <Providers>
//       <RouterProvider router={router} />
//     </Providers>
//   );
// };

// export default App;
