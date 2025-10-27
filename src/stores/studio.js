import { defineStore } from 'pinia';
import { apiClient, withLangParam } from '@/lib/api-client';
import { toApiError } from '@/lib/api-error';
import { readCache, writeCache } from '@/lib/storage';

const CACHE_KEY = 'studio:data';
const buildCacheKey = (lang) => (lang ? `${CACHE_KEY}:${lang}` : CACHE_KEY);

export const useStudioStore = defineStore('studio', {
  state: () => ({
    data: null,
    meta: null,
    loading: false,
    error: null,
    lastFetchedAt: null,
  }),
  actions: {
    async fetchStudio({ lang } = {}) {
      this.loading = true;
      this.error = null;

      const cacheKey = buildCacheKey(lang);

      const updateState = ({ data = null, meta = null, lastFetchedAt = null } = {}) => {
        this.data = data ?? null;
        this.meta = meta ?? null;
        this.lastFetchedAt = lastFetchedAt ?? null;
      };

      try {
        const { data } = await apiClient.get('/api/v1/studio', {
          params: withLangParam(lang),
        });

        const payload = {
          data: data.data ?? null,
          meta: data.meta ?? null,
          lastFetchedAt: new Date().toISOString(),
        };

        updateState(payload);
        writeCache(cacheKey, payload);

        return data;
      } catch (error) {
        const apiError = toApiError(error);
        const cached = readCache(cacheKey);

        if (cached) {
          console.warn('Failed to load studio info from the API, using cached value', apiError);
          updateState(cached);
          this.error = null;
          return { data: cached.data ?? null, meta: cached.meta ?? null, fromCache: true };
        }

        this.error = apiError;
        throw apiError;
      } finally {
        this.loading = false;
      }
    },
    reset() {
      this.$reset();
    },
  },
});
