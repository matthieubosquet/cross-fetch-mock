// eslint-disable-next-line no-shadow
import { Headers } from "cross-fetch";
import { createHeaders, setHeaders } from "../src";

describe("Headers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Can set and get headers", () => {
    const actual = setHeaders("x", "y");

    // expect(Headers).toHaveBeenCalledTimes(1);
    expect(actual.get("x")).toBe("y");
  });

  it("Headers mock gets overriden", () => {
    (Headers as jest.Mock).mockImplementationOnce(() => ({
      set: () => "meh",
      get: () => "bla",
    }));
    const actual = setHeaders("x", "y");

    expect(Headers).toHaveBeenCalledTimes(1);
    expect(actual.get("anything")).toBe("bla");
  });

  it("Can initiate headers with Record<string, string>", () => {
    const actual = createHeaders({ x: "y" });

    expect(Headers).toHaveBeenCalledTimes(1);
    expect(actual.get("x")).toBe("y");
  });
});
