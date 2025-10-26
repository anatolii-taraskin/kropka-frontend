<script setup>
const asset = (relativePath) => `${import.meta.env.BASE_URL}assets/${relativePath}`;

const teachers = [
  {
    name: 'Антон',
    description:
      'Индивидуальные занятия на настоящих живых барабанах 🥁 Урок 60 минут стоит 65 лари. Все ритмы играются под музыку и сопровождаются бас-гитарой. Занятия проходят на двух барабанных установках и укомплектованы фирменными тарелками, а так же двойной педалью💥 Пробное занятие стоит 50 лари 🔥 Для взрослых и детей с 8 лет. Так же в наличии имеются Подарочные Сертификаты на 1 и на 2 занятия - подари классное увлечение длиною в жизнь!',
    image: asset('teachers/anton-900x600.png'),
    alt: 'Антон — преподаватель ударных',
    links: [
      {
        label: 'Написать в TG',
        href: 'https://t.me/tonydrumcoach',
        icon: '💬',
        primary: true,
      },
      {
        label: 'Наш канал',
        href: 'https://t.me/kropka_batumi',
        icon: '📣',
      },
    ],
  },
];
</script>

<template>
  <section class="py-14 bg-brand-dark/50">
    <div class="mx-auto max-w-7xl px-4">
      <h2 class="text-2xl font-bold mb-6">Преподаватели</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="teacher in teachers" :key="teacher.name" class="glass rounded-2xl p-4">
          <div class="rounded-xl overflow-hidden">
            <img
              :src="teacher.image"
              :alt="teacher.alt"
              width="900"
              height="600"
              loading="lazy"
              decoding="async"
              class="w-full aspect-[3/2] object-cover"
            />
          </div>
          <h3 class="mt-3 font-semibold">{{ teacher.name }}</h3>
          <p class="text-sm text-brand-muted mt-2">
            {{ teacher.description }}
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
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
