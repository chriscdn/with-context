import { describe, expect, test } from "vitest";
import { withContext, inject } from "../src";

const returnInject = () => inject();

describe("Memoization", () => {
  test("withContext", () => {
    expect(withContext("HELLO", () => returnInject())).toBe("HELLO");
  });
});
