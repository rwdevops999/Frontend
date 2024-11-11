import { Outlet, useLocation } from "react-router-dom";
import { TUTOPEDIA_CONTENT_ADMIN_PAGE } from "../data/layout/layout";
import { Box } from "@mui/material";
import AdminControl from "../components/Admin/AdminControl";

const AdminPage = () => {
  let { state } = useLocation();

  console.log(`[${TUTOPEDIA_CONTENT_ADMIN_PAGE}] IN`);

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
  }

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
