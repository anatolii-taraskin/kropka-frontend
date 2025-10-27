import { defineStore } from 'pinia';
import { loadCachedResource } from './cached-resource';

const CACHE_KEY = 'studio:data';

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

      try {
        const payload = await loadCachedResource({
          endpoint: '/api/v1/studio',
          cacheKeyBase: CACHE_KEY,
          lang,
          logLabel: 'studio info',
          transformResponse: (response) => ({
            data: response?.data ?? null,
            meta: response?.meta ?? null,
          }),
        });

        this.data = payload.data ?? null;
        this.meta = payload.meta ?? null;
        this.lastFetchedAt = payload.lastFetchedAt ?? null;
        this.error = null;

        return payload;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    reset() {
      this.$reset();
    },
  },
});
