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

function TutOPedia() {
  let { debug, setDebug } = useDebugContext();
  const { config } = useConfig();

  setDebug(true);

  console.log(`[${TUTOPEDIA}] CONFIG = ${JSON.stringify(config)}`);
  console.log(`[${TUTOPEDIA}] DEBUG STATE = ${debug}`);

  axios.defaults.baseURL = "http://localhost:8081/api";

  let location = useLocation();
  console.log(`[${TUTOPEDIA}] XX LOCATION = ${JSON.stringify(location)}`);

  const [defaultBucket, setDefaultBucket] = useState<Bucket | undefined>(
    undefined
  );

  useEffect(() => {
    async function getDefaultBucket() {
      await axios
        .get("/bucket/default")
        .then((response) => {
          if (response.data) {
            setDefaultBucket(response.data);
          }
        })
        .catch(function () {
          console.log(`[${TUTOPEDIA}] Error loading default bucket`);
        });
    }

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
    let tutopedia = undefined;

    console.log(`[${TUTOPEDIA}] CHECK BUILDING`);
    switch (location.pathname) {
      case "/":
        console.log(`[${TUTOPEDIA}] BUILD ROUTING FOR STARTUP`);
        tutopedia = buildTutopediaForStartup(
          0,
          "Startup",
          TUTOPEDIA,
          location.pathname
        );
        break;
      case "/tutorials":
        console.log(`[${TUTOPEDIA}] BUILD ROUTING FOR APPLICATION (HOME)`);
        tutopedia = buildTutopediaForHome(
          0,
          "TutOPedia create Mock",
          TUTOPEDIA,
          location.pathname
        );
        break;
      case "/tutorials/oci":
        console.log(`[${TUTOPEDIA}] BUILD ROUTING FOR OCI`);
        tutopedia = buildTutopediaForOCI(
          0,
          "TutOPedia create Mock",
          TUTOPEDIA,
          location.pathname
        );
        break;
      case "/admin":
        console.log(`[${TUTOPEDIA}] BUILD ROUTING FOR ADMIN`);
        tutopedia = buildTutopediaForAdmin(
          0,
          "TutOPedia create Mock",
          TUTOPEDIA,
          location.pathname
        );
        break;
      default:
        console.log(`[${TUTOPEDIA}] INVALID ROUTING: ${location.pathname}`);
        break;
    }

    if (tutopedia) {
      location.state = buildStateWithoutStateKeyword(tutopedia);
    }
  }

  const state = location.state;
  console.log(`[${TUTOPEDIA}] XX LOCATION STATE: ${JSON.stringify(state)}`);

  const { header } = useTutopediaState(state);
  console.log(`[${TUTOPEDIA}] HEADER: ${JSON.stringify(header)}`);

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
