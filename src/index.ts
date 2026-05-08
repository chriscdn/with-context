import { AsyncLocalStorage } from "async_hooks";

const storage = new AsyncLocalStorage<Map<string, unknown>>();

const createContext = <T>(label: string) => {
  const factoryKey = crypto.randomUUID();

  const inject = (): T | undefined => {
    return storage.getStore()?.get(factoryKey) as T | undefined;
  };

  const injectOrThrow = (): T => {
    const store = storage.getStore();
    if (!store || !store.has(factoryKey)) {
      throw new Error(
        `Context "${label ?? factoryKey}" not found. Ensure you are inside withContext.`,
      );
    }
    return store.get(factoryKey) as T;
  };

  const withContext = <R>(value: T, fn: () => R): R => {
    const newStore = new Map(storage.getStore());
    newStore.set(factoryKey, value);
    return storage.run(newStore, fn);
  };

  return { withContext, inject, injectOrThrow };
};

export { createContext };
