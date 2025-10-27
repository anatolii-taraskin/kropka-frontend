<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useTeachersStore } from '@/stores';

const teachersStore = useTeachersStore();
const { items, loading, error } = storeToRefs(teachersStore);

const teachers = computed(() =>
  items.value
    .slice()
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map((item) => {
      const links = [];

      if (item.telegram_url) {
        links.push({
          label: 'Написать в TG',
          href: item.telegram_url,
          icon: '💬',
          primary: true,
        });
      }

      if (item.instagram_url) {
        links.push({ label: 'Instagram', href: item.instagram_url, icon: '📸' });
      }

      if (item.facebook_url) {
        links.push({ label: 'Facebook', href: item.facebook_url, icon: '📘' });
      }

      if (item.website_url) {
        links.push({ label: 'Сайт', href: item.website_url, icon: '🌐' });
      }

      return {
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.photo_url ?? '',
        links,
      };
    })
);

const hasData = computed(() => teachers.value.length > 0);

const fetchTeachers = async () => {
  try {
    await teachersStore.fetchTeachers();
  } catch (fetchError) {
    console.error('Failed to load teachers from the API', fetchError);
  }
};

onMounted(() => {
  if (!items.value.length && !loading.value) {
    fetchTeachers();
  }
});
</script>

<template>
  <section class="py-14 bg-brand-dark/50">
    <div class="mx-auto max-w-7xl px-4">
      <h2 class="text-2xl font-bold mb-6">Преподаватели</h2>

      <div v-if="loading" class="glass rounded-2xl p-6 text-center text-brand-muted">Загружаем преподавателей...</div>

      <div v-else-if="error" class="glass rounded-2xl p-6 text-center space-y-3">
        <p class="text-brand-muted">Не удалось получить список преподавателей. Попробуйте снова.</p>
        <button class="px-4 py-2 rounded bg-brand-accent text-white" type="button" @click="fetchTeachers">
          Повторить запрос
        </button>
      </div>

      <div v-else-if="!hasData" class="glass rounded-2xl p-6 text-center text-brand-muted">
        Пока нет активных преподавателей.
      </div>

      <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="teacher in teachers" :key="teacher.id ?? teacher.name" class="glass rounded-2xl p-4">
          <div class="rounded-xl overflow-hidden">
            <img
              v-if="teacher.image"
              :src="teacher.image"
              :alt="teacher.name"
              width="900"
              height="600"
              loading="lazy"
              decoding="async"
              class="w-full aspect-[3/2] object-cover"
            />
            <div v-else class="w-full aspect-[3/2] flex items-center justify-center bg-white/5 text-5xl">🎵</div>
          </div>
          <h3 class="mt-3 font-semibold">{{ teacher.name }}</h3>
          <p v-if="teacher.description" class="text-sm text-brand-muted mt-2">
            {{ teacher.description }}
          </p>
          <div v-if="teacher.links.length" class="mt-3 flex flex-wrap gap-2">
            <a
              v-for="link in teacher.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              :class="[
                'inline-flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors',
                link.primary
                  ? 'bg-brand-accent text-white'
                  : 'border border-white/15 hover:bg-white/5',
              ]"
            >
              <span>{{ link.icon }}</span>
              <span>{{ link.label }}</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
