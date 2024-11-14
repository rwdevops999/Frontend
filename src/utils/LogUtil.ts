export const log = (
  isDebug: boolean,
  caller: string,
  message: string,
  object: any = undefined,
  isObject: boolean = false
) => {
  if (isDebug) {
    if (isObject && object) {
      console.log(`[${caller}] ${message}: ${JSON.stringify(object)}`);
    } else {
      if (object) {
        console.log(`[${caller}] ${message}: ${object}`);
      } else {
        console.log(`[${caller}] ${message}`);
      }
    }
  }
};
