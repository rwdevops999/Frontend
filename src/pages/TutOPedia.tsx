import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {
  buildStateWithoutStateKeyword,
  buildTutopediaForAdmin,
  buildTutopediaForHome,
  buildTutopediaForOCI,
  buildTutopediaForStartup,
} from "../builders/Builders";
import axios from "axios";
import useDebugContext from "../hooks/useDebugContext";
import { useConfig } from "../configuration/useConfig";
import { useEffect, useState } from "react";
import { Bucket } from "../entities/Bucket";
import {
  TUTOPEDIA,
  TUTOPEDIA_CONTENT,
  TUTOPEDIA_FOOTER,
  TUTOPEDIA_HEADER,
} from "../data/layout/layout";
import { log } from "../utils/LogUtil";
import toast from "react-hot-toast";
import Providers from "../providers/Providers";

function TutOPedia() {
  // let { debug, setDebug } = useDebugContext();
  let { debug } = useDebugContext();
  const { config } = useConfig();

  useEffect(() => {
    if (config.environment !== "TST") {
      toast(`Current environment: ${config.environment}`, { icon: "👏" });
    }
  }, []);

  // setDebug(true);

  log(debug, "Tutopedia", "IN: Configuration", config, true);

  axios.defaults.baseURL = "http://localhost:8081/api";

  let location = useLocation();
  log(debug, "Tutopedia", "Location: ", location, true);
  log(debug, "Tutopedia", "STATE IN", location.state, true);

  const [defaultBucket, setDefaultBucket] = useState<Bucket | undefined>(
    undefined
  );

  useEffect(() => {
    async function getDefaultBucket() {
      await axios
        .get("/bucket/default")
        .then((response) => {
          if (response.data) {
            log(
              debug,
              "Tutopedia",
              "Default bucket received",
              response.data,
              true
            );
            setDefaultBucket(response.data);
          }
        })
        .catch(function () {
          log(debug, "Tutopedia", "Error loading default bucket. Not set yet");
        });
    }

    log(debug, "Tutopedia", "Loading default bucket");
    getDefaultBucket();
  }, []);

  log(debug, "Tutopedia", "Checking default bucket");
  let count = 0;
  if (location.state !== null) {
    count = location.state.tutopedia.count;
    let doSetDefaultBucket: boolean = false;
    if (location.state.tutopedia.header) {
      if (
        location.state.tutopedia.header.bucket &&
        location.state.tutopedia.header.bucket === "<<<undefined>>>"
      ) {
        log(debug, "Tutopedia", "Change state bucket", defaultBucket?.name);
        location.state.tutopedia.header.bucket = defaultBucket?.name;
        doSetDefaultBucket = false;
      }
    }

    count++;
    log(debug, "Tutopedia", "Count", count);

    if (defaultBucket && doSetDefaultBucket) {
      log(debug, "Tutopedia", "STEP 1");
      if (location.state.tutopedia.header) {
        log(debug, "Tutopedia", "STEP 2");
        location.state.tutopedia.header.bucket = defaultBucket.name;
      } else {
        log(debug, "Tutopedia", "STEP 3");
        location.state.tutopedia.header = {
          bucket: defaultBucket.name,
        };
      }
    }
  } else {
    log(debug, "Tutopedia", "No State defined ... building one");
    log(debug, "Tutopedia", "STEP 4", defaultBucket, true);
    let tutopedia = undefined;

    switch (location.pathname) {
      case "/":
        log(debug, "Tutopedia", "building startup state", " for '/'");
        tutopedia = buildTutopediaForStartup(
          count,
          "Startup",
          TUTOPEDIA,
          location.pathname,
          "<<<undefined>>>",
          defaultBucket ? defaultBucket.name : "<<<undefined>>>"
        );
        break;
      case "/tutorials":
        log(debug, "Tutopedia", "building home state", " for '/tutorials'");
        tutopedia = buildTutopediaForHome(
          count,
          "TutOPedia create Mock",
          TUTOPEDIA,
          location.pathname,
          "<<<undefined>>>",
          defaultBucket ? defaultBucket.name : "<<<undefined>>>"
        );
        break;
      case "/tutorials/oci":
        log(
          debug,
          "Tutopedia",
          "(TEST ONLY) building OCI state",
          " for '/tutorials/oci'"
        );
        tutopedia = buildTutopediaForOCI(
          count,
          "TutOPedia create Mock",
          TUTOPEDIA,
          location.pathname,
          defaultBucket ? defaultBucket.name : "<<<undefined>>>"
        );
        break;
      case "/admin":
        log(
          debug,
          "Tutopedia",
          "(TEST ONLY) building ADMIN state",
          " for '/admin'"
        );
        tutopedia = buildTutopediaForAdmin(
          count,
          "TutOPedia create Mock",
          TUTOPEDIA,
          location.pathname,
          defaultBucket ? defaultBucket.name : "<<<undefined>>>"
        );
        break;
      default:
        log(debug, "Tutopedia", "Invalid Routing", location.pathname);
        break;
    }

    if (tutopedia) {
      location.state = buildStateWithoutStateKeyword(tutopedia);
      log(debug, "Tutopedia", "New state", location.state, true);
    }
  }

  const state = location.state;
  log(debug, "Tutopedia", "STATE CHECK", state, true);

  return (
    <Providers>
      <Box data-title={TUTOPEDIA} sx={{ width: "100%", height: "100%" }}>
        <Box
          display="flex"
          data-title={TUTOPEDIA_HEADER}
          // component="section"
          sx={{
            height: "6%",
          }}
        >
          <Header count={count} />
          {/* <Header header={header ? header : undefined} count={count} /> */}
        </Box>

        <Box
          data-title={TUTOPEDIA_CONTENT}
          // component="section"
          sx={{
            height: "736px",
          }}
        >
          <Outlet />
        </Box>

        <Box
          display="flex"
          data-title={TUTOPEDIA_FOOTER}
          component="section"
          sx={{
            height: "4%",
            color: "#666",
          }}
        >
          <Footer />
        </Box>
      </Box>
    </Providers>
  );
}

export default TutOPedia;
