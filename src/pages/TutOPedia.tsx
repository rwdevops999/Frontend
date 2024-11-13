import { Outlet, useLocation } from "react-router-dom";
import Providers from "../providers/Providers";
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
import { useTutopediaState } from "../hooks/states/useTutopediaState";
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

function TutOPedia() {
  let { debug, setDebug } = useDebugContext();
  const { config } = useConfig();

  setDebug(true);

  log(debug, "Tutopedia", "IN: Configuration", config, true);

  axios.defaults.baseURL = "http://localhost:8081/api";

  let location = useLocation();
  log(debug, "Tutopedia", "Location: ", location, true);

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
          log(debug, "Tutopedia", "Error loading default bucket");
        });
    }

    log(debug, "Tutopedia", "Loading default bucket");
    getDefaultBucket();
  }, []);

  let count = 0;
  if (location.state !== null) {
    count = location.state.tutopedia.count;
    let doSetDefaultBucket: boolean = true;
    if (location.state.tutopedia.header) {
      if (location.state.tutopedia.header.bucket) {
        // setDefaultBucket(location.state.tutopedia.header.bucket);
        doSetDefaultBucket = false;
      }
    }
    count++;
    log(debug, "Tutopedia", "Count", count);

    if (defaultBucket && doSetDefaultBucket) {
      if (location.state.tutopedia.header) {
        location.state.tutopedia.header.bucket = defaultBucket.name;
      } else {
        location.state.tutopedia.header = {
          bucket: defaultBucket.name,
        };
      }
    }
  } else {
    log(debug, "Tutopedia", "No State defined ... building one");
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
  const { header } = useTutopediaState(state);
  log(debug, "Tutopedia", "Header", header, true);

  return (
    <header data-title={TUTOPEDIA}>
      <Providers>
        <Box
          display="flex"
          data-title={TUTOPEDIA_HEADER}
          component="section"
          sx={{
            height: "20%",
          }}
        >
          <Header header={header ? header : undefined} count={count} />
        </Box>
        <Box
          data-title={TUTOPEDIA_CONTENT}
          component="section"
          sx={{
            height: "750px",
          }}
        >
          <Outlet />
        </Box>
        <Box
          display="flex"
          data-title={TUTOPEDIA_FOOTER}
          component="section"
          sx={{
            height: "20%",
            color: "#666",
          }}
        >
          <Footer />
        </Box>
      </Providers>
    </header>
  );
}

export default TutOPedia;
