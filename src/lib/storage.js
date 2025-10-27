const isBrowser = typeof window !== 'undefined';

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn('[storage] Failed to parse cached value', error);
    return null;
  }
};

export const readCache = (key) => {
  if (!isBrowser) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return null;
    }

    return safeParse(raw);
  } catch (error) {
    console.warn('[storage] Failed to read from localStorage', error);
    return null;
  }
};

export const writeCache = (key, value) => {
  if (!isBrowser) {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('[storage] Failed to write to localStorage', error);
  }
};

