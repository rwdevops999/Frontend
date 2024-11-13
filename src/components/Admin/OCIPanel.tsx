import { useEffect, useState } from "react";
import { OCI_REGION, OCI_TENANT } from "../../data/data";
import OCISettings from "./OCISettings";
import axios from "axios";
import { Setting } from "../../entities/Setting";

const OCIPanel = () => {
  const [settings, _] = useState<Map<string, string>>(
    new Map<string, string>()
  );
  const [__, setReload] = useState<number>(0);

  useEffect(() => {
    async function getSetting(key: string) {
      await axios
        .get("/settings/" + key)
        .then((response) => {
          if (response.data) {
            const setting: Setting = response.data;
            setReload((x: any) => x + 1);
            settings.set(setting.key, setting.value);
          }
        })
        .catch(function (error) {
          console.log(
            `[OCIPanel] : Error retrieving setting: ${error.message}`
          );
        });
    }

    getSetting(OCI_TENANT);
    getSetting(OCI_REGION);
  }, []);

  /*
  const handleCreate = (code: string): void => {
    console.log(`CREATE (${code})`);
  };

  const handleUpdate = (code: string): void => {
    console.log(`UPDATE (${code})`);
  };
*/
  return (
    <>
      <OCISettings
        name={OCI_TENANT}
        img="/src/assets/oci.png"
        readOnly={true}
        value={settings.get("OCI_Tenant")}
      />
      <OCISettings
        name={OCI_REGION}
        readOnly={true}
        value={settings.get("OCI_Region")}
      />
    </>
  );
};

export default OCIPanel;
