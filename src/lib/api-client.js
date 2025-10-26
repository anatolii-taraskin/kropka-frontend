import axios from 'axios';

const DEFAULT_TIMEOUT = 10000;
const DEFAULT_BASE_URL = 'https://api.kropka.example';

/**
 * Shared Axios instance for talking to the public API.
 *
 * The base URL can be overridden by setting the `VITE_API_BASE_URL`
 * environment variable when running the application locally.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

/**
 * Builds a params object that includes the optional language code.
 * Undefined language values are omitted.
 *
 * @param {string | undefined} lang
 * @returns {Record<string, string> | undefined}
 */
export function withLangParam(lang) {
  if (!lang) {
    return undefined;
  }

  return { lang };
}
