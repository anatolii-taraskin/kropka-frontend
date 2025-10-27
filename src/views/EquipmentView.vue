<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useEquipmentStore } from '@/stores';

const asset = (relativePath) => `${import.meta.env.BASE_URL}assets/${relativePath}`;
const fallbackImage = asset('main_page/main_img.png');

const equipmentStore = useEquipmentStore();
const { items, loading, error } = storeToRefs(equipmentStore);

const equipment = computed(() =>
  items.value
    .slice()
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map((item) => ({
      id: item.id,
      title: item.name,
      description: item.description,
      image: item.photo_url ?? '',
    }))
);

const hasData = computed(() => equipment.value.length > 0);

const fetchEquipment = async () => {
  try {
    await equipmentStore.fetchEquipment();
  } catch (fetchError) {
    console.error('Failed to load equipment from the API', fetchError);
  }
};

onMounted(() => {
  if (!items.value.length && !loading.value) {
    fetchEquipment();
  }
});
</script>

<template>
  <section class="py-14">
    <div class="mx-auto max-w-7xl px-4">
      <h2 class="text-2xl font-bold mb-6">Оборудование</h2>

      <div v-if="loading" class="glass rounded-2xl p-6 text-center text-brand-muted">Загружаем список...</div>

      <div v-else-if="error" class="glass rounded-2xl p-6 text-center space-y-3">
        <p class="text-brand-muted">Не удалось загрузить оборудование. Попробуйте обновить страницу.</p>
        <button class="px-4 py-2 rounded bg-brand-accent text-white" type="button" @click="fetchEquipment">
          Повторить запрос
        </button>
      </div>

      <div v-else-if="!hasData" class="glass rounded-2xl p-6 text-center text-brand-muted">
        Пока нет опубликованного оборудования.
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="item in equipment" :key="item.id ?? item.title" class="glass rounded-2xl overflow-hidden">
          <div class="h-44 bg-brand-dark/50">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <img
              v-else
              :src="fallbackImage"
              :alt="item.title"
              class="w-full h-full object-cover opacity-60"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="p-6">
            <div class="font-semibold">{{ item.title }}</div>
            <p v-if="item.description" class="mt-2 text-sm text-brand-muted">{{ item.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
