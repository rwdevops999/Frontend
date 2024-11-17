import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SocialMedia from "../SocialMedia/SocialMedia";
import {
  TUTOPEDIA_FOOTER_COPYRIGHT,
  TUTOPEDIA_FOOTER_SESSION_TIME,
  TUTOPEDIA_FOOTER_SOCIAL_MEDIA,
  TUTOPEDIA_FOOTER_TIME,
} from "../../data/layout/layout";

const Footer = () => {
  const [timeStr, setTimeStr] = useState<string>(
    new Date().toLocaleTimeString()
  );
  const start = useRef<number>(new Date().getTime());
  const durationStr = useRef<string>("0h 0m 0s");

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

    let strHrs: string = (hrs < 10 ? pad(hrs, 1) : pad(hrs)) + "h";
    let strMin: string = (mins < 10 ? pad(mins, 1) : pad(mins)) + "m";
    let strSec: string = (secs < 10 ? pad(secs, 1) : pad(secs)) + "s";

    return strHrs + " " + strMin + " " + strSec;
  };

  useEffect(() => {
    start.current = new Date().getTime();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let now = new Date();
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
          marginLeft: "5px",
        }}
      >
        &copy;2024 Rudi Welter (Powered by ReactTS)&nbsp;
      </Box>

      <Box
        data-title={TUTOPEDIA_FOOTER_SOCIAL_MEDIA}
        sx={{
          width: "50%",
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
        data-title={TUTOPEDIA_FOOTER_SESSION_TIME}
        sx={{
          width: "7%",
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
