export const sleep = (durationMs: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), durationMs));
  
export const wrapPromise = (promise: Promise<any>) => {
  let result: {type: string, value: any};
  promise.then(
    (value) => {
      result = { type: "success", value };
    },
    (value) => {
      result = { type: "error", value };
    }
  );
  return {
    read() {
      if (result === undefined) {
        throw promise;
      }
      if (result.type === "error") {
        throw result.value;
      }
      return result.value;
    }
  };
};