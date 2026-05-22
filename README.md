# @chriscdn/with-context

A small helper for request scoped state using Node.js `AsyncLocalStorage`.

Each `createContext()` call creates an isolated slot that stores and retrieves a value within the same async execution chain.

## Installing

Using npm:

```sh
npm install @chriscdn/with-context
```

Using yarn:

```sh
yarn add @chriscdn/with-context
```

## Usage

```ts
import { createContext } from "@chriscdn/with-context";

const { withContext, inject, injectOrThrow } = createContext([optionalLabel]);
```

The `optionalLabel` is only used for error messages. I.e., calling `createContext` twice with the same label will create independent contexts.

You can now bind and read values anywhere in the async chain.

- `withContext(value, fn)` - Executes `fn` with `value` available to all async calls within it. Returns the result of `fn`.
- `inject()` - Returns the current value if inside a context, otherwise `undefined`.
- `injectOrThrow()` - Returns the current value or throws if not inside a context.

## Example

```ts
import { createContext } from "@chriscdn/with-context";

const userContext = createContext<{ id: string }>("user");

const { withContext, injectOrThrow } = userContext;

const getUserId = () => injectOrThrow().id;

const id = withContext({ id: "abc" }, () => {
  return getUserId();
});

console.log(id);
// abc
```

## License

[MIT](LICENSE)
