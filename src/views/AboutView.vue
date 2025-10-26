<script setup>
import { inject } from 'vue';

import CopyButton from '@/components/CopyButton.vue';

const navigate = inject('navigate', () => {});

const asset = (relativePath) => `${import.meta.env.BASE_URL}assets/${relativePath}`;
const heroImageUrl = asset('main_page/main_img.png');

const handleNavigate = (path) => {
  navigate(path);
};

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const features = [
  { icon: '🎙️', text: 'Репетиционная студия в Батуми' },
  { icon: '🔊', text: 'У нас можно громко' },
  { icon: '❄️', text: 'Кондиционер работает — окна во время занятий не открываем' },
];

const services = [
  'Репетиции групп и сольных артистов',
  'Запись и продакшн',
  'Уроки музыки',
  'Чистота и аккуратность: вещи после себя возвращаем на место',
];

const contacts = [
  {
    label: '📞',
    content: '+995 596 173 001',
    isCopy: true,
    value: '+995596173001',
  },
  {
    label: '✉️',
    content: 'kropka.batumi@gmail.com',
    href: 'mailto:kropka.batumi@gmail.com',
  },
  {
    label: '📍',
    content: '13t Agmashenebeli st., Batumi, Georgia',
  },
];

const links = [
  {
    label: '📸 Instagram',
    href: 'https://www.instagram.com/kropka_batumi/',
  },
  {
    label: '📘 Facebook',
    href: 'https://www.facebook.com/Kropka.Batumi',
  },
  {
    label: '💬 Telegram-канал',
    href: 'https://t.me/kropka_batumi',
  },
  {
    label: '👤 Администратор в TG',
    href: 'https://t.me/kropka_batumi_admin',
  },
];

const rules = [
  { text: 'Возвращаем на место всё, чем пользовались (микрофоны, комбики, стойки, барабаны, тарелки, стулья). Чистим за собой, моем кружки.' },
  { text: 'Окна во время занятий не открываем — используем кондиционер.' },
  { text: 'В конце занятия: выключаем электроприборы, сетевые фильтры, свет; у микрофонов/пульта/комбиков — Volume на 0.' },
  { text: 'Никакой еды и напитков на оборудовании. Бережное отношение ко всему в студии обязательно.' },
  {
    text: 'О поломках и нарушениях предыдущих гостей сразу сообщаем администратору Михаилу:',
    copy: '+995596173001',
  },
  { text: 'Отмена бесплатно — при уведомлении не менее чем за 2 суток.' },
  { text: 'Оплату приносим без сдачи.' },
  { text: 'За нарушения — предупреждение/штраф (уборщику); за систематические или циничные — бан.' },
  { text: 'Используя помещение, вы автоматически принимаете правила и несёте ответственность за их соблюдение.' },
  { text: 'Будем рады, если отметите нас в соцсетях, расскажете друзьям и поделитесь идеями по улучшению студии.' },
];
</script>

<template>
  <div>
    <section class="relative pt-8 md:pt-12">
      <div class="mx-auto max-w-7xl px-4 grid gap-10 lg:grid-cols-2 items-center lg:h-80">
        <div class="flex flex-col justify-center">
          <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">Репетиционная студия в Батуми</h1>
          <p class="mt-4 text-brand-muted">
            У нас можно громко 🔊 · 13t Agmashenebeli st., Batumi · +995 596 173 001
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a
              href="/pricing"
              class="px-5 py-3 rounded bg-brand-accent text-white"
              @click.prevent="handleNavigate('/pricing')"
            >
              Прайс
            </a>
            <a
              href="#info"
              class="px-5 py-3 rounded border border-white/15 hover:bg-white/5"
              @click.prevent="scrollToSection('info')"
            >
              Расписание и инфо
            </a>
          </div>
        </div>
        <div
          class="rounded-2xl shadow-lg bg-cover bg-center h-56 sm:h-64 md:h-72 lg:h-full"
          :style="{ backgroundImage: `url('${heroImageUrl}')` }"
          role="img"
          aria-label="Kropka Studio"
        ></div>
      </div>
    </section>
    <div class="mx-auto max-w-7xl px-4 pt-12 pb-10">
      <div class="flex items-center">
        <span class="h-px bg-white/10 flex-1"></span>
      </div>
    </div>
    <section id="info" class="mx-auto max-w-7xl px-4">
      <div class="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <h2 class="text-2xl font-bold mb-4">О нас</h2>
          <div class="text-brand-muted space-y-3">
            <div v-for="feature in features" :key="feature.text" class="flex items-start gap-2">
              <span class="text-lg">{{ feature.icon }}</span>
              <span>{{ feature.text }}</span>
            </div>
          </div>
          <ul class="mt-5 space-y-2 text-sm text-brand-muted list-disc list-inside">
            <li v-for="service in services" :key="service">{{ service }}</li>
          </ul>
          <div class="mt-6 flex flex-wrap gap-3">
            <a
              href="https://t.me/kropka_batumi_admin"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-3 rounded bg-brand-accent text-white"
            >
              Записаться в Telegram
            </a>
            <CopyButton
              value="+995596173001"
              class="px-5 py-3 rounded border border-white/15 hover:bg-white/5"
            >
              Скопировать телефон: +995 596 173 001
            </CopyButton>
          </div>
        </div>
        <div class="grid gap-6">
          <div class="mt-6 glass rounded-2xl p-6">
            <div class="font-semibold mb-3">Контакты</div>
            <ul class="text-sm text-brand-muted space-y-2">
              <li v-for="item in contacts" :key="item.label" class="flex items-start gap-2">
                <span>{{ item.label }}</span>
                <template v-if="item.isCopy">
                  <CopyButton class="underline-offset-2 hover:text-brand-accent" :value="item.value">
                    {{ item.content }}
                  </CopyButton>
                </template>
                <template v-else-if="item.href">
                  <a :href="item.href" class="hover:text-brand-accent" target="_blank" rel="noopener">
                    {{ item.content }}
                  </a>
                </template>
                <template v-else>
                  <span>{{ item.content }}</span>
                </template>
              </li>
            </ul>
          </div>
          <div class="glass rounded-2xl p-6">
            <div class="font-semibold mb-3">Ссылки</div>
            <ul class="text-sm text-brand-muted space-y-2">
              <li v-for="link in links" :key="link.href">
                <a :href="link.href" target="_blank" rel="noopener noreferrer" class="hover:text-brand-accent">
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="glass rounded-2xl p-6 mt-10">
        <div class="font-semibold mb-3">Правила студии</div>
        <ul class="text-sm text-brand-muted space-y-2 list-disc pl-5">
          <li v-for="rule in rules" :key="rule.text" class="space-y-1">
            <span>{{ rule.text }}</span>
            <CopyButton
              v-if="rule.copy"
              :value="rule.copy"
              class="inline-flex items-center gap-1 underline-offset-2 hover:text-brand-accent"
            >
              +995 596 173 001
            </CopyButton>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
