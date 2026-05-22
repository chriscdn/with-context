declare const createContext: <T>(label?: string) => {
    withContext: <R>(value: T, fn: () => R) => R;
    inject: () => T | undefined;
    injectOrThrow: () => T;
};

export { createContext };
