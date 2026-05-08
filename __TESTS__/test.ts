import { createContext } from "../src";

const { injectOrThrow, withContext } = createContext<number>("My context");

withContext(1231233, () => {
  const z = injectOrThrow();
  console.log(z);
});

// console.log(injectOrThrow());
