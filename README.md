# @chriscdn/with-context

A minimal context injection utility for Node.js built on [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage). Propagate values across async call chains without having to pass them manually.

This package is still in early development, so use at your own risk.

## Installing

Using npm:

```bash
npm install @chriscdn/with-context
```

Using yarn:

```bash
yarn add @chriscdn/with-context
```

## Usage

```ts
import { createContext } from "@chriscdn/with-context";

const { injectOrThrow, inject, withContext } =
  createContext<number>("My context");

// The `withContext` function makes a value available to any code running in
// the same async call chain, and only for the duration of the provided function.
withContext(12345, () => {
  // Retrieves the value, but throws an exception if not in context.
  const theNumber = injectOrThrow();
  console.log(theNumber);
  // 12345

  // Retrieve the value if it's in context, undefined otherwise.
  const theNumber2 = inject();
});
```

## License

[MIT](LICENSE)
