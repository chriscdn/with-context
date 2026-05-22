import { createContext } from "../src";

const userContext = createContext<{ id: string }>("user");
const { withContext, injectOrThrow } = userContext;

const getUserId = () => injectOrThrow().id;

const id = withContext({ id: "abc" }, () => {
  return getUserId();
});

console.log(id);
