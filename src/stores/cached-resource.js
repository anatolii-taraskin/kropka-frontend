import { apiClient, withLangParam } from '@/lib/api-client';
import { toApiError } from '@/lib/api-error';
import { readCache, writeCache } from '@/lib/storage';

const buildCacheKey = (baseKey, lang) => (lang ? `${baseKey}:${lang}` : baseKey);

/**
 * Fetches a resource from the API with localStorage based caching.
 * When the API request fails and cached data exists, the cached
 * payload is returned instead of throwing an error.
 *
 * @param {Object} options
 * @param {string} options.endpoint - API endpoint path
 * @param {string} options.cacheKeyBase - cache key prefix
 * @param {string | undefined} options.lang - optional language parameter
 * @param {string} options.logLabel - label used in fallback warnings
 * @param {(response: any) => Object} options.transformResponse - maps API
 *   response payload to the value saved in the store/cache
 * @returns {Promise<{ fromCache: boolean } & Record<string, any>>}
 */
export async function loadCachedResource({
  endpoint,
  cacheKeyBase,
  lang,
  logLabel,
  transformResponse,
}) {
  const cacheKey = buildCacheKey(cacheKeyBase, lang);

  try {
    const { data } = await apiClient.get(endpoint, {
      params: withLangParam(lang),
    });

    const normalized = {
      ...transformResponse?.(data),
      lastFetchedAt: new Date().toISOString(),
    };

    writeCache(cacheKey, normalized);
    return { ...normalized, fromCache: false };
  } catch (error) {
    const apiError = toApiError(error);
    const cached = readCache(cacheKey);

    if (cached) {
      const label = logLabel || 'resource';
      console.warn(`Failed to load ${label} from the API, using cached value`, apiError);
      return { ...cached, fromCache: true };
    }

    throw apiError;
  }
}
