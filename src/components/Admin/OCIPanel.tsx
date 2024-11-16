import { useEffect, useState } from "react";
import { OCI_REGION, OCI_TENANT } from "../../data/data";
import OCISettings from "./OCISettings";
import axios from "axios";
import { Setting } from "../../entities/Setting";
import { log } from "../../utils/LogUtil";
import useDebugContext from "../../hooks/useDebugContext";

const OCIPanel = () => {
  const { debug } = useDebugContext();

  const [settings, _] = useState<Map<string, string>>(
    new Map<string, string>()
  );
  const [__, setReload] = useState<number>(0);

  log(debug, "SettingsPage.OCIPanel", "Setup");

  useEffect(() => {
    async function getSetting(key: string) {
      await axios
        .get("/settings/" + key)
        .then((response) => {
          if (response.data) {
            const setting: Setting = response.data;
            log(debug, "SettingsPage.OCIPanel", "Loaded", response.data, true);
            setReload((x: any) => x + 1);
            settings.set(setting.key, setting.value);
          }
        })
        .catch(function (error) {
          log(
            debug,
            "SettingsPage.OCIPanel",
            "Error retrieving setting",
            error.message
          );
          log(debug, "OCIPanel", "Error retrieving setting", error.message);
        });
    }

    log(debug, "SettingsPage.OCIPanel", "Load", "OCI Tenant");
    getSetting(OCI_TENANT);
    log(debug, "SettingsPage.OCIPanel", "Load", "OCI Region");
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
