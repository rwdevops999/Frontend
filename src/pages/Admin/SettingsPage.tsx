import { Box } from "@mui/material";
import OCIPanel from "../../components/Admin/OCIPanel";
import { SETTINGS_PAGE } from "../../data/layout/layout";
import { log } from "../../utils/LogUtil";
import useDebugContext from "../../hooks/useDebugContext";

const SettingsPage = () => {
  const { debug } = useDebugContext();

  log(debug, "SettingsPage", "Setup");
  return (
    <Box data-title={SETTINGS_PAGE} width={"100%"} height={"20%"}>
      <OCIPanel />
    </Box>
  );
};

export default SettingsPage;
