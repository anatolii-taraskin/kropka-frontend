<script setup>
import { computed, ref } from 'vue';

import { apiClient, withLangParam } from '@/lib/api-client';

const endpoints = [
  { path: '/api/v1/studio', label: 'Студия', description: 'Информация о студии' },
  { path: '/api/v1/prices', label: 'Прайс', description: 'Активные тарифы' },
  { path: '/api/v1/equipment', label: 'Оборудование', description: 'Список оборудования' },
  { path: '/api/v1/teachers', label: 'Преподаватели', description: 'Команда преподавателей' },
  { path: '/api/v1/rules', label: 'Правила', description: 'Правила студии' },
];

const preferredLang = ref('');
const requests = ref([]);

const formatTimestamp = (date) =>
  new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);

const hasRequests = computed(() => requests.value.length > 0);

const runRequest = async (endpoint) => {
  const startedAt = new Date();
  const startedPerformance = performance.now();

  const entry = {
    id: `${endpoint.path}-${startedAt.getTime()}`,
    endpoint: endpoint.path,
    label: endpoint.label,
    status: 'pending',
    message: 'Выполняем запрос...',
    startedAt,
    finishedAt: null,
    duration: null,
  };

  requests.value = [entry, ...requests.value];

  try {
    const response = await apiClient.get(endpoint.path, {
      params: withLangParam(preferredLang.value || undefined),
    });

    console.log(`[API test] GET ${endpoint.path}`, response.data);

    entry.status = 'success';
    entry.message = `Успех (HTTP ${response.status})`;
  } catch (error) {
    console.error(`[API test] GET ${endpoint.path} failed`, error);
    entry.status = 'error';
    entry.message = error?.message ?? 'Ошибка запроса';
  } finally {
    entry.finishedAt = new Date();
    entry.duration = Math.max(0, Math.round(performance.now() - startedPerformance));
  }
};

const clearRequests = () => {
  requests.value = [];
};
</script>

<template>
  <section class="py-14">
    <div class="mx-auto max-w-4xl px-4 space-y-8">
      <header class="space-y-3">
        <h1 class="text-3xl font-bold">Тестирование публичного API</h1>
        <p class="text-brand-muted text-sm">
          Используйте кнопки ниже, чтобы выполнить запросы, описанные в <code>openapi.yaml</code>. Ответы выводятся в консоль
          браузера, а сводка — в таблице ниже.
        </p>
        <div class="flex flex-wrap items-center gap-3 text-sm">
          <label class="flex items-center gap-2">
            <span class="text-brand-muted">Язык ответа (опционально):</span>
            <input
              v-model="preferredLang"
              type="text"
              maxlength="2"
              placeholder="ru / en"
              class="px-3 py-2 rounded border border-white/15 bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </label>
          <button
            v-if="hasRequests"
            type="button"
            class="px-3 py-2 rounded border border-white/15 hover:bg-white/5"
            @click="clearRequests"
          >
            Очистить журнал
          </button>
        </div>
      </header>

      <div class="grid sm:grid-cols-2 gap-4">
        <button
          v-for="endpoint in endpoints"
          :key="endpoint.path"
          type="button"
          class="glass rounded-2xl p-5 text-left transition hover:shadow-lg"
          @click="runRequest(endpoint)"
        >
          <div class="text-sm uppercase tracking-wide text-brand-muted">GET {{ endpoint.path }}</div>
          <div class="mt-2 text-lg font-semibold">{{ endpoint.label }}</div>
          <p class="mt-1 text-sm text-brand-muted">{{ endpoint.description }}</p>
        </button>
      </div>

      <section>
        <h2 class="text-xl font-semibold mb-3">Журнал запросов</h2>
        <p v-if="!hasRequests" class="text-sm text-brand-muted">Пока нет выполненных запросов.</p>
        <ul v-else class="space-y-3">
          <li
            v-for="entry in requests"
            :key="entry.id"
            class="glass rounded-2xl px-4 py-3 text-sm flex flex-col gap-1"
          >
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="font-semibold">GET {{ entry.endpoint }}</div>
              <div
                :class="[
                  'px-2 py-1 rounded text-xs uppercase tracking-wide',
                  entry.status === 'success'
                    ? 'bg-emerald-500/10 text-emerald-300'
                    : entry.status === 'error'
                      ? 'bg-red-500/10 text-red-300'
                      : 'bg-white/10 text-white',
                ]"
              >
                {{ entry.status === 'pending' ? 'в процессе' : entry.status === 'success' ? 'успех' : 'ошибка' }}
              </div>
            </div>
            <div class="text-brand-muted">
              {{ entry.message }}
              <span v-if="entry.duration !== null"> · {{ entry.duration }} мс</span>
            </div>
            <div class="text-xs text-brand-muted">
              {{ formatTimestamp(entry.startedAt) }}<template v-if="entry.finishedAt"> → {{ formatTimestamp(entry.finishedAt) }}</template>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>
