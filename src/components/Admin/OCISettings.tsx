import { Box, Button, Typography } from "@mui/material";
import { TutopediaTextFieldStandard } from "../MUI/TutopediaTextFieldStandard";
import useDebugContext from "../../hooks/useDebugContext";
import { log } from "../../utils/LogUtil";

const OCISettings = ({
  name,
  readOnly,
  value,
  img,
  handleInput,
}: {
  name: string;
  readOnly: boolean;
  value: string | undefined;
  img?: string;
  handleInput?(value: string): void;
}) => {
  const { debug } = useDebugContext();

  const text = `Enter ${name} here...`;

  let boxHeight = "30%";

  log(debug, "SettingsPage.OCIPanel.OCISetting", "Name", name);
  log(debug, "SettingsPage.OCIPanel.OCISetting", "Value", value);

  return (
    <>
      {img && <img src={img} width={"15%"} height={"55%"} />}
      <Box
        id="OCI_SETTINGS_BOX"
        width={"100%"}
        height={boxHeight}
        sx={{ marginTop: "5px" }}
      >
        <Typography variant="h6">
          {name}
          <TutopediaTextFieldStandard
            variant="standard"
            placeholder={text}
            sx={{ marginLeft: "2%", width: "50%", backgroundColor: "#505050" }}
            value={value}
            disabled={readOnly}
          />
          {!readOnly && (
            <Button
              data-title="SETTINGS_PAGE_ACTION_BUTTON"
              sx={{ marginLeft: "2%" }}
              onClick={() => handleInput!(name)}
            >
              {value ? "Update" : "Create"}
            </Button>
          )}
        </Typography>
      </Box>
    </>
  );
};

export default OCISettings;
