import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SocialMedia from "../SocialMedia/SocialMedia";
import {
  TUTOPEDIA_FOOTER_COPYRIGHT,
  TUTOPEDIA_FOOTER_SOCIAL_MEDIA,
  TUTOPEDIA_FOOTER_TIME,
} from "../../data/layout/layout";
import { log } from "../../utils/LogUtil";
import useDebugContext from "../../hooks/useDebugContext";

const Footer = () => {
  const { debug } = useDebugContext();

  log(debug, "Tutopedia.Footer", "Setup");
  const [timeStr, setTimeStr] = useState<string>(
    new Date().toLocaleTimeString()
  );

  const updateAll = useRef<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let now = new Date();
      setTimeStr(now.toLocaleTimeString());
      updateAll.current = false;
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line
  });

  return (
    <>
      <Box
        data-title={TUTOPEDIA_FOOTER_COPYRIGHT}
        sx={{
          width: "38%",
          marginTop: "10px",
          marginLeft: "10px",
        }}
      >
        &copy;2024 Rudi Welter (Powered by ReactTS)&nbsp;
      </Box>

      <Box
        data-title={TUTOPEDIA_FOOTER_SOCIAL_MEDIA}
        sx={{
          width: "52%",
          marginTop: "20px",
          marginLeft: "100px",
        }}
      >
        <SocialMedia />
      </Box>

      <Box
        data-title={TUTOPEDIA_FOOTER_TIME}
        sx={{
          width: "10%",
          marginTop: "10px",
        }}
      >
        {timeStr}
      </Box>
    </>
  );
};

export default Footer;
