import { createRoot } from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./main.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
// import Test from "./Testing/Test";
createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
  // <Test />
);
