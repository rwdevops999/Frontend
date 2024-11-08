export interface DynamicConfig {
  environment: "DEV" | "TST" | "ACC" | "PROD";
}

export const defaultConfig: DynamicConfig = {
  environment: "TST",
};

export const dynamicConfigUrl = "config.json";
