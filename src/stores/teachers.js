import { defineStore } from 'pinia';
import { loadCachedResource } from './cached-resource';

const CACHE_KEY = 'teachers:data';

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

      try {
        const payload = await loadCachedResource({
          endpoint: '/api/v1/teachers',
          cacheKeyBase: CACHE_KEY,
          lang,
          logLabel: 'teachers',
          transformResponse: (response) => ({
            items: Array.isArray(response?.data) ? response.data : [],
            meta: response?.meta ?? null,
          }),
        });

        this.items = Array.isArray(payload.items) ? payload.items : [];
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
