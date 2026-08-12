# @chriscdn/with-context

A small utility for request scoped state using Node.js `AsyncLocalStorage`.

Each `createContext()` call creates an isolated context that stores and retrieves a value within the same asynchronous execution chain.

## Installing

Using npm:

```sh
npm install @chriscdn/with-context
```

## Usage

```ts
import { createContext } from "@chriscdn/with-context";

const { withContext, inject, injectOrThrow } = createContext([optionalLabel]);
```

The optional `label` is only used for displaying error messages. Each call to `createContext()` creates a separate context, regardless of the label.

### `withContext(value, fn)`

Executes `fn` with `value` available to all asynchronous operations started within it.

Returns the result of `fn`.

### `inject()`

Returns the current context value, or `undefined` when called outside a context.

### `injectOrThrow()`

Returns the current context value, or throws an exception when called outside a context.

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

The context is preserved across asynchronous operations:

```ts
const getUserId = async () => {
  await someAsyncOperation();

  return injectOrThrow().id;
};

const id = await withContext({ id: "abc" }, () => {
  return getUserId();
});

console.log(id);
// abc
```

Multiple contexts are isolated from each other:

```ts
const userContext = createContext<{ id: string }>("user");
const requestContext = createContext<{ id: string }>("request");

const result = userContext.withContext({ id: "user1" }, () => {
  return requestContext.withContext({ id: "request1" }, () => {
    return {
      user: userContext.injectOrThrow(),
      request: requestContext.injectOrThrow(),
    };
  });
});
```

Each context has its own value, even when contexts are nested.

## License

[MIT](LICENSE)
