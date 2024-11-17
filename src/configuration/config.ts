export interface DynamicConfig {
  environment: "DEV" | "TST" | "ACC" | "PRD";
}

export const defaultConfig: DynamicConfig = {
  environment: "TST",
};

export const dynamicConfigUrl = "public/config.json";
