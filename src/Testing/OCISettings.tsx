import {
  Box,
  Button,
  createTheme,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { TutopediaTextFieldStandard } from "../components/MUI/TutopediaTextFieldStandard";

const OCISettings = ({
  name,
  img,
  value,
  handleInput,
  code,
  factor,
}: {
  name: string;
  img: string;
  value: string | undefined;
  handleInput(value: number): void;
  code: number;
  factor: number;
}) => {
  console.log("SET VALUE = " + value);
  const text = `Enter ${name} here...`;
  console.log("TEXT = " + text);

  const iwidth = 15 * factor + "%";
  const iheight = 35 * factor + "%";

  return (
    <Box id="OCI_SETTINGS_BOX" width={"100%"} height={"100%"}>
      <img src={img} width={iwidth} height={iheight} />
      <Typography variant="h6">
        {name}
        <TutopediaTextFieldStandard
          variant="standard"
          placeholder={text}
          sx={{ marginLeft: "2%", width: "50%" }}
          defaultValue={value}
        />
        <Button sx={{ marginLeft: "2%" }} onClick={() => handleInput(code)}>
          {value ? "Update" : "Create"}
        </Button>
      </Typography>
    </Box>
  );
};

export default OCISettings;
