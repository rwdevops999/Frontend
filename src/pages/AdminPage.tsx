import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ROUTE_ADMIN,
  ROUTE_BUCKETS,
  TUTOPEDIA_CONTENT_ADMIN_PAGE,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS_BUTTON,
} from "../data/layout/layout";
import { Box } from "@mui/material";
import AdminControl from "../components/Admin/AdminControl";
import { buildState, buildTutopediaForAdmin } from "../builders/Builders";
import { TutopediaState } from "../data/states";

const AdminPage = () => {
  const navigate = useNavigate();
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
