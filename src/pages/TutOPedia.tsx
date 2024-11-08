import { Outlet, useLocation } from "react-router-dom";
import Providers from "../providers/Providers";
import { Box } from "@mui/material";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {
  buildStateWithoutStateKeyword,
  buildTutopediaForHome,
  buildTutopediaForStartup,
} from "../builders/Builders";
import { useTutopediaState } from "../hooks/states/useTutopediaState";
import { TUTOPEDIA } from "../data/consts";
import axios from "axios";
import useDebugContext from "../hooks/useDebugContext";
import { useConfig } from "../configuration/useConfig";
import { useEffect, useState } from "react";
import { Bucket } from "../entities/Bucket";

const doDebug: boolean = true;
function TutOPedia() {
  let { debug, setDebug } = useDebugContext();
  const { config } = useConfig();

  console.log("[TUTOPEDIA] CONFIG = " + JSON.stringify(config));

  setDebug(doDebug);

  debug = doDebug;

  console.log("[TUTOPEDIA] DEBUG STATE = " + debug);

  axios.defaults.baseURL = "http://localhost:8081/api";

  let location = useLocation();
  if (debug) {
    console.log("[TUTOPEDIA] LOCATION = " + JSON.stringify(location));
  }

  const [defaultBucket, setDefaultBucket] = useState<Bucket | undefined>(
    undefined
  );

  console.log("ENTRY: " + JSON.stringify(defaultBucket));

  useEffect(() => {
    async function getDefaultBucket() {
      console.log("[TutOPedia] CALLING AXIOS TO GET DEFAULT BUCKET");
      await axios
        .get("/bucket/default")
        .then((response) => {
          if (response.data) {
            console.log(
              "[TutOPedia] SET DATA: " + JSON.stringify(response.data)
            );
            setDefaultBucket(response.data);
          } else {
            console.log("[TutOPedia] NO DEFAULT BUCKET");
          }
        })
        .catch(function () {
          console.log("[TutOPedia] Error loading default bucket");
        });
    }

    getDefaultBucket();
  }, []);

  let count = 0;
  console.log("[TutOPedia] CHECK LOCATION STATE");
  if (location.state !== null) {
    console.log("[TutOPedia] LOCATION STATE IS SET");
    count = location.state.tutopedia.count;
    let doSetDefaultBucket: boolean = true;
    console.log("[TutOPedia] CHECK LOCATION STATE HEADER");
    if (location.state.tutopedia.header) {
      console.log("[TutOPedia] CHECK LOCATION STATE IS SET");
      console.log("[TutOPedia] CHECK LOCATION STATE HEADER BUCKET");
      if (location.state.tutopedia.header.bucket) {
        console.log(
          "[TutOPedia] CHECK LOCATION STATE HEADER BUCKER IS SET: " +
            location.state.tutopedia.header.bucket
        );
        // setDefaultBucket(location.state.tutopedia.header.bucket);
        doSetDefaultBucket = false;
      }
    }

    console.log(
      "[TutOPedia] CHECK UPDATE LOCATION STATE HEADER BUCKET WITH DEFAULT"
    );
    if (defaultBucket && doSetDefaultBucket) {
      console.log("[TutOPedia] CHECK LOCATION STATE HEADER");
      if (location.state.tutopedia.header) {
        console.log(
          "[TutOPedia] CHECK LOCATION STATE HEADER IS SET: SET DEFUALT BUCKET: " +
            defaultBucket.name
        );
        location.state.tutopedia.header.bucket = defaultBucket.name;
      } else {
        console.log(
          "[TutOPedia] CHECK LOCATION STATE HEADER IS NOT SET: SET NEW BUCKET: " +
            defaultBucket.name
        );
        location.state.tutopedia.header = {
          bucket: defaultBucket.name,
        };
      }
    }
  } else {
    if (debug) {
      // this is in application mocking because mocking in vitest is not correct
      console.log("[TUTOPEDIA] Building a NEW STATE");
    }

    let tutopedia = undefined;

    switch (location.pathname) {
      case "/":
        console.log("BUILD STARTER ROUTING");
        tutopedia = buildTutopediaForStartup(
          0,
          "Startup",
          TUTOPEDIA,
          location.pathname
        );
        break;
      case "/tutorials":
        console.log("BUILD HOME ROUTING");
        tutopedia = buildTutopediaForHome(
          0,
          "TutOPedia create Mock",
          TUTOPEDIA,
          location.pathname
        );
        break;
      default:
        console.log("INVALID ROUTING: " + location.pathname);
        break;
    }

    if (tutopedia) {
      location.state = buildStateWithoutStateKeyword(tutopedia);
    } else {
      console.log("[TutOPedia] STATE NOT SET");
    }
  }

  if (doDebug) {
    console.log("[TutOPedia] STATE = " + JSON.stringify(location.state));
    if (count >= 0) {
      console.log("[TutOPedia] COUNT = " + count);
    }
  }

  console.log(
    "[TutOPedia] SET LOCAL VAR STATE TO " + JSON.stringify(location.state)
  );
  const state = location.state;

  const { header } = useTutopediaState(state);
  console.log(
    "[TutOPedia] GET HEADER FROM THIS VAR STATE: " + JSON.stringify(header)
  );

  return (
    <header data-title="TUTOPEDIA">
      <Providers>
        <Box
          display="flex"
          data-title="TUTOPEDIA_HEADER"
          component="section"
          sx={{
            height: "20%",
          }}
        >
          <Header header={header ? header : undefined} count={count} />
        </Box>
        <Box
          data-title="TUTOPEDIA_OUTLET"
          component="section"
          sx={{
            height: "750px",
          }}
        >
          <Outlet />
        </Box>
        <Box
          display="flex"
          data-title="TUTOPEDIA_FOOTER"
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
