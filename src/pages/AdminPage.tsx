import { useLocation } from "react-router-dom";
import useDebugContext from "../hooks/useDebugContext";
import Buckets from "../components/Admin/Buckets";
import Settings from "../components/Admin/Settings";

const AdminPage = () => {
  let { debug } = useDebugContext();
  let { state } = useLocation();

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
      <Settings count={count} />
      <br />
      <Buckets count={count} />
    </>
  );
};

export default AdminPage;
