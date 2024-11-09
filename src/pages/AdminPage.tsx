import { useLocation } from "react-router-dom";
import { useConfig } from "../configuration/useConfig";
import useDebugContext from "../hooks/useDebugContext";
import { useEffect, useState } from "react";
import { Bucket } from "../entities/Bucket";
import axios from "axios";
import toast from "react-hot-toast";
import { Box, Pagination } from "@mui/material";
import Loader from "../components/Loader/Loader";
import ErrorBanner from "../components/Error/ErrorBanner";
import S3Display from "../components/aws/S3Display";
import Buckets from "../components/Admin/Buckets";
import Settings from "../components/Admin/Settings";

const AdminPage = () => {
  let { debug } = useDebugContext();
  let { state } = useLocation();
  const { config } = useConfig();

  console.log("[Admin Page] IN");

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
  }

  if (debug) {
    console.log("[Admin Page] count: " + state.tutopedia.count);
    console.log("[Admin Page] State: " + JSON.stringify(state));
  }

  return (
    <>
      <Settings />
      <br />
      <Buckets />
    </>
  );
};

export default AdminPage;
