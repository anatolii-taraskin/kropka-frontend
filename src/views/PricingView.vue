<script setup>
const tariffs = [
  {
    title: 'Соло / с учеником',
    items: [
      { label: '1 час', price: '20 ₾' },
      { label: '2 часа', price: '30 ₾' },
      { label: '3 часа', price: '40 ₾' },
    ],
    hasCta: true,
  },
  {
    title: 'Дуэт',
    items: [
      { label: '1 час', price: '30 ₾' },
      { label: '2 часа', price: '40 ₾' },
      { label: '3 часа', price: '50 ₾' },
    ],
    hasCta: true,
  },
  {
    title: 'Группа',
    items: [
      { label: '2 часа', price: '50 ₾' },
      { label: '3 часа', price: '65 ₾' },
      { label: '4 часа', price: '80 ₾' },
    ],
    hasCta: true,
  },
  {
    title: '2 ударные установки',
    items: [
      { label: '1 час', price: '25 ₾' },
      { label: '2 часа', price: '35 ₾' },
      { label: '3 часа', price: '45 ₾' },
    ],
    hasCta: true,
  },
  {
    title: 'Аренда инструментов',
    items: [
      { label: 'Электрогитара', price: '5 ₾ / сессия · Ibanez (EMG 81/85)' },
      { label: 'Бас-гитара', price: '5 ₾ / сессия · Washburn' },
    ],
  },
  {
    title: 'Для барабанщика',
    items: [
      { label: 'Вторая ударка', price: '5 ₾ / сессия · Gretsch Energy' },
      { label: 'Кардан (двойная педаль)', price: '5 ₾ / сессия · Millenium PD-222' },
    ],
  },
];
</script>

<template>
  <section class="py-14 bg-brand-dark/50">
    <div class="mx-auto max-w-7xl px-4">
      <h2 class="text-2xl font-bold mb-6">Прайс</h2>
      <div class="rounded-2xl border border-dashed border-brand-accent/50 bg-white/[.03] px-5 py-4 mb-6">
        <div class="flex items-center gap-3">
          <span class="text-lg leading-none">🎟️</span>
          <p class="text-sm leading-6 text-brand-muted">
            <strong class="text-brand-text">Скидка 20%</strong> при покупке
            <strong class="text-brand-text">месячного абонемента</strong> на 5 занятий.
          </p>
        </div>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="tariff in tariffs" :key="tariff.title" class="glass rounded-2xl p-6 flex flex-col">
          <div class="font-semibold">{{ tariff.title }}</div>
          <ul class="mt-3 text-sm text-brand-muted space-y-1">
            <li v-for="item in tariff.items" :key="item.label" class="flex justify-between gap-2">
              <span>{{ item.label }}</span>
              <span class="text-brand-text font-medium text-right">{{ item.price }}</span>
            </li>
          </ul>
          <a
            v-if="tariff.hasCta"
            href="https://t.me/kropka_batumi_admin"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex items-center justify-center px-4 py-2 rounded bg-brand-accent text-white"
          >
            Записаться
          </a>
        </article>
      </div>
      <p class="mt-6 text-xs text-brand-muted">
        Цены указаны в лари (₾). Актуальные слоты и бронирование — через
        <a
          href="https://t.me/kropka_batumi_admin"
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
