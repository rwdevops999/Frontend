import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
  const start = useRef<number>(new Date().getTime());
  const durationStr = useRef<string>("00:00:00");

  const updateAll = useRef<boolean>(true);

  const msToTime = (s: number): string => {
    const pad = (n: number, z?: number): string => {
      z = z || 2;
      return ("00" + n).slice(-z);
    };

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ":" + pad(mins) + ":" + pad(secs);
  };

  useEffect(() => {
    start.current = new Date().getTime();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let now = new Date();
      console.log("NOW = " + now.getMilliseconds());
      setTimeStr(now.toLocaleTimeString());
      durationStr.current = msToTime(now.getTime() - start.current);
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
          width: "5%",
          marginTop: "10px",
        }}
      >
        {timeStr}
      </Box>
      <Box
        data-title={TUTOPEDIA_FOOTER_TIME}
        sx={{
          width: "5%",
          marginTop: "10px",
          color: "#FF0000",
        }}
      >
        {durationStr.current}
      </Box>
    </>
  );
};

export default Footer;
