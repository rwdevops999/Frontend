export const log = (
  isDebug: boolean,
  caller: string,
  message: string,
  object: any = undefined,
  isObject: boolean = false
) => {
  if (isDebug) {
    if (isObject) {
      console.log(`[${caller}] ${message}: ${JSON.stringify(object)}`);
    } else {
      console.log(`[${caller}] ${message}: ${object}`);
    }
  }
};
