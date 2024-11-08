export const debugState = (location: string, state: Object | undefined) => {
  console.log(
    `[${location}]: ` +
      (state ? JSON.stringify(state) : "STATE is UNDEFINED!!!")
  );
};

export const debugString = (location: string, value: string | undefined) => {
  console.log(`[${location}]: ` + (value ? value : "STRING is UNDEFINED!!!"));
};
