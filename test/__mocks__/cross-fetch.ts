/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import type * as fetchModule from "cross-fetch";

type Mutable<T> = {
  -readonly [k in keyof T]: T[k];
};

const crossFetch =
  jest.createMockFromModule<Mutable<typeof fetchModule>>("cross-fetch");

const {
  Headers: _Headers,
  Request: _Request,
  Response: _Response,
} = jest.requireActual<typeof fetchModule>("cross-fetch");

crossFetch.fetch = jest.fn();

crossFetch.Headers = jest.fn().mockImplementation((init?: HeadersInit) => {
  return new _Headers(init);
});

crossFetch.Request = jest
  .fn()
  .mockImplementation((input: RequestInfo, init?: RequestInit) => {
    return new _Request(input, init);
  });

// Actual type of this is Omit<typeof fetchModule.Response, "error" | "redirect">
crossFetch.Response = jest
  .fn()
  .mockImplementation((body?: BodyInit | null, init?: ResponseInit) => {
    return new _Response(body, init);
  }) as any as typeof _Response;

crossFetch.default = jest.fn();

module.exports = crossFetch;
