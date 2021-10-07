/* eslint-disable @typescript-eslint/naming-convention */
import type * as fetchModule from "cross-fetch";
// eslint-disable-next-line no-shadow
import { Headers } from "cross-fetch";
import { createHeaders, setHeaders } from "../../src";

jest.mock(
  "cross-fetch",
  (): {
    fetch: typeof fetchModule.fetch;
    Request: typeof fetchModule.Request;
    Response: Omit<typeof fetchModule.Response, "error" | "redirect">;
    Headers: typeof fetchModule.Headers;
    default: typeof fetchModule.fetch;
  } => {
    // eslint-disable-next-line no-shadow
    const { Request, Response, Headers } =
      jest.requireActual<typeof fetchModule>("cross-fetch");

    return {
      fetch: jest.fn(),
      Request: jest
        .fn()
        .mockImplementation((input: RequestInfo, init?: RequestInit) => {
          return new Request(input, init);
        }),
      Response: jest
        .fn()
        .mockImplementation((body?: BodyInit | null, init?: ResponseInit) => {
          return new Response(body, init);
        }),
      Headers: jest.fn().mockImplementation((init?: HeadersInit) => {
        return new Headers(init);
      }),
      default: jest.fn(),
    };
  }
);

describe("Headers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Can set and get headers", () => {
    const actual = setHeaders("x", "y");

    expect(Headers).toHaveBeenCalledTimes(1);
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
