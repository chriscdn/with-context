import { AsyncLocalStorage } from "async_hooks";

/**
 * Stores a Map that is local to the current asynchronous execution context.
 *
 * AsyncLocalStorage allows the Map to be automatically propagated through async
 * operations such as promises, async functions, timers, and callbacks.
 *
 * The Map contains the values registered by individual contexts created by
 * createContext(). Each context uses its own unique key so multiple contexts
 * can coexist in the same store.
 */
const storage = new AsyncLocalStorage<Map<string, unknown>>();

/**
 * Creates an isolated context for storing and retrieving a value of type T
 * across an asynchronous execution chain.
 *
 * Each context gets a unique key, allowing multiple contexts to share the same
 * AsyncLocalStorage without their values conflicting.
 *
 * Use withContext() to establish the value for an asynchronous scope, then use
 * inject() or injectOrThrow() anywhere further down that async chain to
 * retrieve it without explicitly passing the value through function arguments.
 *
 * Nested contexts inherit the values from their parent context and can override
 * their own value without modifying the parent's context.
 *
 * @param label Optional human readable name used in error messages.
 */
const createContext = <T>(label?: string) => {
  const factoryKey = crypto.randomUUID();

  /**
   * Runs a function inside an asynchronous context containing the given value.
   *
   * A new Map is created from the current store so that nested contexts can
   * override their own value without modifying the parent context.
   *
   * AsyncLocalStorage propagates this store through the asynchronous execution
   * chain, allowing the value to be retrieved later without explicitly passing
   * it through function arguments.
   */
  const withContext = <R>(value: T, fn: () => R): R => {
    // make a copy
    const newStore = new Map(storage.getStore());
    newStore.set(factoryKey, value);
    return storage.run(newStore, fn);
  };

  /**
   * Retrieves the value associated with this context from the current
   * asynchronous execution context.
   *
   * Returns undefined when this code is not running inside a withContext call
   * that established this context.
   */
  const inject = (): T | undefined =>
    storage.getStore()?.get(factoryKey) as T | undefined;

  /**
   * Retrieves the value associated with this context from the current
   * asynchronous execution context.
   *
   * Throws when this code is not running inside a withContext call that
   * established this context.
   */
  const injectOrThrow = (): T => {
    const store = storage.getStore();

    if (store && store.has(factoryKey)) {
      return store.get(factoryKey) as T;
    } else {
      throw new Error(
        `Context "${label ?? factoryKey}" not found. Ensure you are inside withContext.`,
      );
    }
  };

  return { withContext, inject, injectOrThrow };
};

export { createContext };
