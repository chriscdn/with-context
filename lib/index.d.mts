//#region src/index.d.ts
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
declare const createContext: <T>(label?: string) => {
  withContext: <R>(value: T, fn: () => R) => R;
  inject: () => T | undefined;
  injectOrThrow: () => T;
};
//#endregion
export { createContext };
//# sourceMappingURL=index.d.mts.map