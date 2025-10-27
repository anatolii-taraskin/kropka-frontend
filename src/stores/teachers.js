import { defineStore } from 'pinia';
import { apiClient, withLangParam } from '@/lib/api-client';
import { toApiError } from '@/lib/api-error';
import { readCache, writeCache } from '@/lib/storage';

const CACHE_KEY = 'teachers:data';
const buildCacheKey = (lang) => (lang ? `${CACHE_KEY}:${lang}` : CACHE_KEY);

export const useTeachersStore = defineStore('teachers', {
  state: () => ({
    items: [],
    meta: null,
    loading: false,
    error: null,
    lastFetchedAt: null,
  }),
  actions: {
    async fetchTeachers({ lang } = {}) {
      this.loading = true;
      this.error = null;

      const cacheKey = buildCacheKey(lang);

      const updateState = ({ items = [], meta = null, lastFetchedAt = null } = {}) => {
        this.items = Array.isArray(items) ? items : [];
        this.meta = meta ?? null;
        this.lastFetchedAt = lastFetchedAt ?? null;
      };

      try {
        const { data } = await apiClient.get('/api/v1/teachers', {
          params: withLangParam(lang),
        });

        const payload = {
          items: Array.isArray(data.data) ? data.data : [],
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
          console.warn('Failed to load teachers from the API, using cached value', apiError);
          updateState(cached);
          this.error = null;
          return { data: this.items, meta: this.meta, fromCache: true };
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
