import { Box } from "@mui/material";
import OCISettings from "./OCISettings";
import { TutopediaTextFieldOutlined } from "../components/MUI/TutopediaTextFieldOutlined";

const Test = () => {
  let val: string | undefined;
  val = "123";

  const CODE_TENANT = 1;
  //   const CODE_TUTOPEDIA = 2;

  const handleCreate = (code: number): void => {
    console.log(`CREATE (${code})`);
  };

  const handleUpdate = (code: number): void => {
    console.log(`UPDATE (${code})`);
  };

  return (
    <Box id="SETTING_MAIN_BOX" width={"100%"} height={"20%"}>
      <OCISettings
        name="Tendant ID"
        img="/src/assets/oci.png"
        value={val}
        handleInput={val ? handleUpdate : handleCreate}
        code={CODE_TENANT}
        factor={1.0}
      />
      {/* <br /> */}
      {/* <OCISettings
        name="Time ID"
        img="/src/assets/tut-o-pedia.png"
        value={val}
        handleInput={val ? handleUpdate : handleCreate}
        code={CODE_TUTOPEDIA}
        factor={1.5}
      /> */}
    </Box>
  );
};

export default Test;
