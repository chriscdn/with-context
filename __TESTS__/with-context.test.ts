import { describe, expect, test } from "vitest";
import { createContext } from "../src";

const { withContext, inject } = createContext();

const returnInject = () => inject();

describe("Memoization", () => {
  test("withContext", () => {
    expect(withContext("HELLO", () => returnInject())).toBe("HELLO");
  });
});
