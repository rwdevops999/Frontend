import { Box } from "@mui/material";
import { CODE_TENANT } from "../../data/data";
import OCISettings from "./OCISettings";

const OCIPanel = () => {
  let value: string | undefined;

  const handleCreate = (code: number): void => {
    console.log(`CREATE (${code})`);
  };

  const handleUpdate = (code: number): void => {
    console.log(`UPDATE (${code})`);
  };

  return (
    <OCISettings
      name="Tenant ID"
      img="/src/assets/oci.png"
      value={value}
      handleInput={value ? handleUpdate : handleCreate}
      code={CODE_TENANT}
      factor={1.0}
    />
  );
};

export default OCIPanel;
