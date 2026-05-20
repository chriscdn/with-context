# @chriscdn/with-context

A minimal context injection utility for Node.js built on [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage). Propagate values across async call chains without threading them through every function signature.

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

const { injectOrThrow, withContext } = createContext<number>("My context");

withContext(12345, () => {
  const theNumber = injectOrThrow();
  console.log(theNumber);
  // 12345
});
```

## License

[MIT](LICENSE)
