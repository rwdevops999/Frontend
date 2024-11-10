import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import SocialMedia from "../SocialMedia/SocialMedia";
import {
  TUTOPEDIA_FOOTER_COPYRIGHT,
  TUTOPEDIA_FOOTER_SOCIAL_MEDIA,
  TUTOPEDIA_FOOTER_TIME,
} from "../../data/layout/layout";

const Footer = () => {
  const [timeStr, setTimeStr] = useState<string>(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let now = new Date();
      setTimeStr(now.toLocaleTimeString());
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
        }}
      >
        &copy;2024 Rudi Welter (Powered by ReactTS)&nbsp;
      </Box>

      <Box
        data-title={TUTOPEDIA_FOOTER_SOCIAL_MEDIA}
        sx={{
          width: "52%",
        }}
      >
        <SocialMedia />
      </Box>

      <Box
        data-title={TUTOPEDIA_FOOTER_TIME}
        sx={{
          width: "10%",
        }}
      >
        {timeStr}
      </Box>
    </>
  );
};

export default Footer;
