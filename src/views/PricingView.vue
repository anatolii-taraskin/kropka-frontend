<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { usePricesStore, useStudioStore } from '@/stores';

const pricesStore = usePricesStore();
const studioStore = useStudioStore();

const { items, loading, error, meta } = storeToRefs(pricesStore);
const { data: studioData, loading: studioLoading } = storeToRefs(studioStore);

const tariffs = computed(() =>
  items.value
    .slice()
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map((item) => ({
      id: item.id,
      title: item.name,
      rows: item.columns
        ?.slice()
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((column) => column.value)
        .filter(Boolean) ?? [],
    }))
);

const hasData = computed(() => tariffs.value.length > 0);

const promotionMessage = computed(
  () => meta.value?.promotion_message ?? 'Скидка 20% при покупке месячного абонемента на 5 занятий.'
);

const bookingUrl = computed(() => studioData.value?.booking_url ?? 'https://t.me/kropka_batumi_admin');

const fetchPrices = async () => {
  try {
    await pricesStore.fetchPrices();
  } catch (fetchError) {
    console.error('Failed to load price list from the API', fetchError);
  }
};

onMounted(() => {
  if (!items.value.length && !loading.value) {
    fetchPrices();
  }

  if (!studioData.value && !studioLoading.value) {
    studioStore.fetchStudio().catch((fetchError) => {
      console.error('Failed to fetch studio info for booking link', fetchError);
    });
  }
});
</script>

<template>
  <section class="py-14 bg-brand-dark/50">
    <div class="mx-auto max-w-7xl px-4">
      <h2 class="text-2xl font-bold mb-6">Прайс</h2>

      <div class="rounded-2xl border border-dashed border-brand-accent/50 bg-white/[.03] px-5 py-4 mb-6">
        <div class="flex items-center gap-3">
          <span class="text-lg leading-none">🎟️</span>
          <p class="text-sm leading-6 text-brand-muted">{{ promotionMessage }}</p>
        </div>
      </div>

      <div v-if="loading" class="glass rounded-2xl p-6 text-center text-brand-muted">Загружаем актуальные цены...</div>

      <div v-else-if="error" class="glass rounded-2xl p-6 text-center space-y-3">
        <p class="text-brand-muted">Не удалось загрузить прайс. Попробуйте обновить страницу.</p>
        <button class="px-4 py-2 rounded bg-brand-accent text-white" type="button" @click="fetchPrices">
          Повторить запрос
        </button>
      </div>

      <div v-else-if="!hasData" class="glass rounded-2xl p-6 text-center text-brand-muted">
        Цены скоро появятся.
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="tariff in tariffs" :key="tariff.id ?? tariff.title" class="glass rounded-2xl p-6 flex flex-col">
          <div class="font-semibold">{{ tariff.title }}</div>
          <ul class="mt-3 text-sm text-brand-muted space-y-1">
            <li v-for="(row, index) in tariff.rows" :key="index" class="flex items-start gap-2">
              <span class="text-brand-text">•</span>
              <span>{{ row }}</span>
            </li>
          </ul>
          <a
            v-if="bookingUrl"
            :href="bookingUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex items-center justify-center px-4 py-2 rounded bg-brand-accent text-white self-start"
          >
            Записаться
          </a>
        </article>
      </div>

      <p class="mt-6 text-xs text-brand-muted">
        Цены указаны в лари (₾). Актуальные слоты и бронирование — через
        <a
          :href="bookingUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 underline-offset-2 hover:text-brand-accent"
        >
          <span class="text-sm">👤</span>
          <span>администратора в Telegram</span>
        </a>.
      </p>
    </div>
  </section>
</template>
