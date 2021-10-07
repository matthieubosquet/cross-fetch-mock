// eslint-disable-next-line no-shadow
import { Headers } from "cross-fetch";

export function createHeaders(init?: HeadersInit): Headers {
  return new Headers(init);
}

export function setHeaders(headerName: string, value: string): Headers {
  const x = new Headers();
  x.set(headerName, value);
  return x;
}
