import { Dispatch, useEffect, useState } from "react";
import ApplicationConfiguration from "./ApplicationConfiguration";

export const useConfiguration = (): [
  ApplicationConfiguration,
  Dispatch<ApplicationConfiguration>
] => {
  const env = import.meta.env.VITE_ENV;
  const [config, setConfig] = useState<ApplicationConfiguration>({
    environment: env,
  });

  useEffect(() => {
    setConfig({ environment: env ?? "" });
  }, []);

  return [config, setConfig];
};
