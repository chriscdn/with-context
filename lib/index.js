// src/index.ts
import { AsyncLocalStorage } from "async_hooks";
var storage = new AsyncLocalStorage();
var createContext = (label) => {
  const factoryKey = crypto.randomUUID();
  const inject = () => {
    return storage.getStore()?.get(factoryKey);
  };
  const injectOrThrow = () => {
    const store = storage.getStore();
    if (!store || !store.has(factoryKey)) {
      throw new Error(
        `Context "${label ?? factoryKey}" not found. Ensure you are inside withContext.`
      );
    }
    return store.get(factoryKey);
  };
  const withContext = (value, fn) => {
    const newStore = new Map(storage.getStore());
    newStore.set(factoryKey, value);
    return storage.run(newStore, fn);
  };
  return { withContext, inject, injectOrThrow };
};
export {
  createContext
};
//# sourceMappingURL=index.js.map