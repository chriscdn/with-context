# @chriscdn/with-context

A small helper for request scoped state using Node.js `AsyncLocalStorage`.

Each `createContext()` call creates an isolated slot that can store and retrieve a value within the same async execution chain.

## API

### `createContext(label?)`

Creates a context container.

Returns:

- `withContext(value, fn)`
- `inject()`
- `injectOrThrow()`

### `withContext(value, fn)`

Runs `fn` with `value` bound to the current async scope.

```ts
context.withContext("abc", () => {
  // value available in this async chain
});
```

### `inject()`

Reads the current value.

Returns `T | undefined`

```ts
const value = context.inject();
```

### `injectOrThrow()`

Same as `inject()`, but throws if missing.

```ts
const value = context.injectOrThrow();
```

## Example

```ts
import { createContext } from "@chriscdn/with-context";

const userContext = createContext<{ id: string }>("user");

function getUserId() {
  return userContext.injectOrThrow().id;
}

userContext.withContext({ id: "u1" }, () => {
  console.log(getUserId());
});
```

## Optional usage

```ts
const requestId = createContext<string>("requestId");

const log = (msg: string) => {
  const id = requestId.inject();
  console.log(id ? `[${id}] ${msg}` : msg);
};

requestId.withContext("req-123", () => {
  log("started");
});
```

## Notes

- Context is scoped to the async chain started by `withContext`
- Each `createContext()` is isolated
- Common use cases: request state, tracing, auth, metadata

## License

[MIT](LICENSE)
