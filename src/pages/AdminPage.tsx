import { Outlet, useLocation } from "react-router-dom";
import { TUTOPEDIA_CONTENT_ADMIN_PAGE } from "../data/layout/layout";
import { Box } from "@mui/material";
import AdminControl from "../components/Admin/AdminControl";
import useDebugContext from "../hooks/useDebugContext";
import { log } from "../utils/LogUtil";

const AdminPage = () => {
  const { state } = useLocation();
  const { debug } = useDebugContext();

  log(debug, "AdminPage", "In, State", state, true);

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
  }
  log(debug, "AdminPage", "Count", count);

  return (
    <>
      <Box
        data-title={TUTOPEDIA_CONTENT_ADMIN_PAGE}
        width={"100%"}
        height={"8%"}
      >
        <AdminControl count={count} />
      </Box>
      <Outlet />
    </>
  );
};

export default AdminPage;
