import { defineStore } from 'pinia';
import { apiClient, withLangParam } from '@/lib/api-client';
import { toApiError } from '@/lib/api-error';

export const usePricesStore = defineStore('prices', {
  state: () => ({
    items: [],
    meta: null,
    loading: false,
    error: null,
    lastFetchedAt: null,
  }),
  actions: {
    async fetchPrices({ lang } = {}) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await apiClient.get('/api/v1/prices', {
          params: withLangParam(lang),
        });

        this.items = data.data;
        this.meta = data.meta;
        this.lastFetchedAt = new Date();

        return data;
      } catch (error) {
        const apiError = toApiError(error);
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
