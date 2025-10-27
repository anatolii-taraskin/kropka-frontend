<script setup>
import { computed, inject, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useApiLanguage } from '@/lib/use-api-language';
import { useTeachersStore } from '@/stores';

const teachersStore = useTeachersStore();
const { items, loading, error } = storeToRefs(teachersStore);

const t = inject('t', (key) => key);
const apiLanguage = useApiLanguage();

const teachers = computed(() =>
  items.value
    .slice()
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map((item) => {
      const links = [];

      if (item.telegram_url) {
        links.push({
          label: t('teachers.contact.telegram'),
          href: item.telegram_url,
          icon: '💬',
          primary: true,
        });
      }

      if (item.instagram_url) {
        links.push({ label: t('teachers.contact.instagram'), href: item.instagram_url, icon: '📸' });
      }

      if (item.facebook_url) {
        links.push({ label: t('teachers.contact.facebook'), href: item.facebook_url, icon: '📘' });
      }

      if (item.website_url) {
        links.push({ label: t('teachers.contact.website'), href: item.website_url, icon: '🌐' });
      }

      return {
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.photo_url ?? '',
        links,
      };
    }),
);

const hasData = computed(() => teachers.value.length > 0);
const lastTeachersLang = ref('');

const fetchTeachersForLang = async (lang) => {
  if (!lang) {
    return;
  }

  if (lastTeachersLang.value === lang && items.value.length) {
    return;
  }

  try {
    await teachersStore.fetchTeachers({ lang });
    lastTeachersLang.value = lang;
  } catch (fetchError) {
    console.error('Failed to load teachers from the API', fetchError);
    if (!items.value.length) {
      lastTeachersLang.value = '';
    }
  }
};

watch(
  apiLanguage,
  (lang) => {
    fetchTeachersForLang(lang);
  },
  { immediate: true },
);

const fetchTeachers = async () => {
  try {
    await teachersStore.fetchTeachers({ lang: apiLanguage.value });
    lastTeachersLang.value = apiLanguage.value;
  } catch (fetchError) {
    console.error('Failed to load teachers from the API', fetchError);
  }
};
</script>

<template>
  <section class="py-14 bg-brand-dark/50">
    <div class="mx-auto max-w-7xl px-4">
      <h2 class="text-2xl font-bold mb-6">{{ t('teachers.title') }}</h2>

      <div v-if="loading" class="glass rounded-2xl p-6 text-center text-brand-muted">
        {{ t('teachers.loading') }}
      </div>

      <div v-else-if="error" class="glass rounded-2xl p-6 text-center space-y-3">
        <p class="text-brand-muted">{{ t('teachers.loadError') }}</p>
        <button class="px-4 py-2 rounded bg-brand-accent text-white" type="button" @click="fetchTeachers">
          {{ t('teachers.retry') }}
        </button>
      </div>

      <div v-else-if="!hasData" class="glass rounded-2xl p-6 text-center text-brand-muted">
        {{ t('teachers.empty') }}
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
