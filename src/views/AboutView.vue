<script setup>
import { computed, inject, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import CopyButton from '@/components/CopyButton.vue';
import { useRulesStore, useStudioStore } from '@/stores';

const navigate = inject('navigate', () => {});

const asset = (relativePath) => `${import.meta.env.BASE_URL}assets/${relativePath}`;
const heroImageUrl = asset('main_page/main_img.png');

const studioStore = useStudioStore();
const rulesStore = useRulesStore();

const {
  data: studioData,
  loading: studioLoading,
  error: studioError,
} = storeToRefs(studioStore);

const {
  items: rulesItems,
  loading: rulesLoading,
  error: rulesError,
} = storeToRefs(rulesStore);

const defaultFeatures = [
  { icon: '🎙️', text: 'Репетиционная студия в Батуми' },
  { icon: '🔊', text: 'У нас можно громко' },
  { icon: '❄️', text: 'Кондиционер работает — окна во время занятий не открываем' },
];

const defaultServices = [
  'Репетиции групп и сольных артистов',
  'Запись и продакшн',
  'Уроки музыки',
  'Чистота и аккуратность: вещи после себя возвращаем на место',
];

const defaultLinks = [
  { label: '📸 Instagram', href: 'https://www.instagram.com/kropka_batumi/' },
  { label: '📘 Facebook', href: 'https://www.facebook.com/Kropka.Batumi' },
  { label: '💬 Telegram-канал', href: 'https://t.me/kropka_batumi' },
  { label: '👤 Администратор в TG', href: 'https://t.me/kropka_batumi_admin' },
];

const defaultContacts = [
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

const defaultStudio = {
  name: 'Репетиционная студия в Батуми',
  tagline: 'У нас можно громко 🔊',
  address: '13t Agmashenebeli st., Batumi',
  phone: '+995 596 173 001',
  email: 'kropka.batumi@gmail.com',
  booking_url: 'https://t.me/kropka_batumi_admin',
};

const parseListValue = (value, fallback = []) => {
  if (!value) {
    return [...fallback];
  }

  if (Array.isArray(value)) {
    return value.map((item) => `${item}`.trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      return [...fallback];
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => `${item}`.trim()).filter(Boolean);
      }
    } catch (error) {
      // ignore JSON parse errors – fallback to splitting strategy
    }

    const splitValues = trimmed
      .split(/\r?\n|[•\-–\u2022,;]+/)
      .map((item) => item.trim())
      .filter(Boolean);

    return splitValues.length ? splitValues : [...fallback];
  }

  return [...fallback];
};

const extractPrefixedValues = (source = {}, prefix) =>
  Object.entries(source)
    .filter(([key]) => key.startsWith(`${prefix}_`))
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([, value]) => `${value}`.trim())
    .filter(Boolean);

const normalizePhoneNumber = (value) => {
  if (!value) {
    return '';
  }

  const clean = `${value}`.replace(/[^+\d]/g, '');
  return clean.startsWith('+') ? clean : clean;
};

const mapStudioData = (data) => {
  const merged = { ...defaultStudio, ...(data ?? {}) };

  const features = [
    ...parseListValue(merged.features, []),
    ...parseListValue(merged.features_list, []),
    ...extractPrefixedValues(merged, 'feature'),
  ];

  const services = [
    ...parseListValue(merged.services, []),
    ...parseListValue(merged.services_list, []),
    ...extractPrefixedValues(merged, 'service'),
  ];

  const featureTexts = features.length ? features : defaultFeatures.map((feature) => feature.text);
  const featureIcons = defaultFeatures.map((feature) => feature.icon);

  const normalizedFeatures = featureTexts.map((text, index) => ({
    icon: featureIcons[index] ?? '🎵',
    text,
  }));

  const normalizedServices = services.length ? services : [...defaultServices];

  const phoneDisplay = merged.phone ?? defaultStudio.phone;
  const normalizedPhone = normalizePhoneNumber(phoneDisplay);

  const uniqueContacts = [];
  const contactKeys = new Set();

  const pushContact = (contact) => {
    const key = `${contact.label ?? ''}-${contact.content ?? ''}-${contact.href ?? ''}`;
    if (!contactKeys.has(key)) {
      contactKeys.add(key);
      uniqueContacts.push(contact);
    }
  };

  if (phoneDisplay) {
    pushContact({
      label: '📞',
      content: phoneDisplay,
      isCopy: true,
      value: normalizedPhone,
    });
  }

  if (merged.email) {
    pushContact({
      label: '✉️',
      content: merged.email,
      href: `mailto:${merged.email}`,
    });
  }

  if (merged.address) {
    pushContact({
      label: '📍',
      content: merged.address,
    });
  }

  parseListValue(merged.contacts).forEach((item) => {
    pushContact({ label: '•', content: item });
  });

  const contacts = uniqueContacts.length ? uniqueContacts : [...defaultContacts];

  const linksFromApi = parseListValue(merged.links)
    .map((entry) => ({ label: entry, href: entry }))
    .filter((item) => item.href);

  const mergedLinks = [
    merged.instagram_url ? { label: '📸 Instagram', href: merged.instagram_url } : null,
    merged.facebook_url ? { label: '📘 Facebook', href: merged.facebook_url } : null,
    merged.telegram_channel_url ? { label: '💬 Telegram-канал', href: merged.telegram_channel_url } : null,
    merged.telegram_url ? { label: '💬 Telegram', href: merged.telegram_url } : null,
    merged.telegram_admin_url ? { label: '👤 Администратор в TG', href: merged.telegram_admin_url } : null,
    merged.website_url ? { label: '🌐 Сайт', href: merged.website_url } : null,
    ...linksFromApi,
    ...defaultLinks,
  ]
    .filter(Boolean)
    .reduce((acc, link) => {
      if (!acc.some((item) => item.href === link.href)) {
        acc.push(link);
      }
      return acc;
    }, []);

  return {
    name: merged.name ?? defaultStudio.name,
    tagline: merged.tagline ?? defaultStudio.tagline,
    address: merged.address ?? defaultStudio.address,
    phone: phoneDisplay,
    normalizedPhone,
    features: normalizedFeatures,
    services: normalizedServices,
    contacts,
    links: mergedLinks,
    bookingUrl: merged.booking_url ?? defaultStudio.booking_url,
    scheduleUrl: merged.schedule_url ?? '',
    description: merged.description ?? '',
  };
};

const studioContent = computed(() => mapStudioData(studioData.value));

const heroSubtitle = computed(() => {
  const parts = [studioContent.value.tagline, studioContent.value.address, studioContent.value.phone]
    .map((part) => part?.trim())
    .filter(Boolean);

  return parts.join(' · ');
});

const rulesList = computed(() =>
  rulesItems.value
    .slice()
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map((rule) => ({
      id: rule.id,
      text: rule.text,
      copy: rule.property?.includes('phone') ? studioContent.value.normalizedPhone : null,
    }))
);

const hasRules = computed(() => rulesList.value.length > 0);

const errorMessage = computed(() => studioError.value?.message ?? rulesError.value?.message ?? '');

const isLoading = computed(() => studioLoading.value || rulesLoading.value);

const handleNavigate = (path) => {
  navigate(path);
};

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const fetchStudio = async () => {
  try {
    await studioStore.fetchStudio();
  } catch (fetchError) {
    console.error('Failed to load studio info from the API', fetchError);
  }
};

const fetchRules = async () => {
  try {
    await rulesStore.fetchRules();
  } catch (fetchError) {
    console.error('Failed to load studio rules from the API', fetchError);
  }
};

onMounted(() => {
  if (!studioData.value && !studioLoading.value) {
    fetchStudio();
  }

  if (!rulesItems.value.length && !rulesLoading.value) {
    fetchRules();
  }
});
</script>

<template>
  <div>
    <section class="relative pt-8 md:pt-12">
      <div class="mx-auto max-w-7xl px-4 grid gap-10 lg:grid-cols-2 items-center lg:h-80">
        <div class="flex flex-col justify-center">
          <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">{{ studioContent.name }}</h1>
          <p class="mt-4 text-brand-muted">{{ heroSubtitle }}</p>
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
            <div v-for="feature in studioContent.features" :key="feature.text" class="flex items-start gap-2">
              <span class="text-lg">{{ feature.icon }}</span>
              <span>{{ feature.text }}</span>
            </div>
          </div>
          <ul class="mt-5 space-y-2 text-sm text-brand-muted list-disc list-inside">
            <li v-for="service in studioContent.services" :key="service">{{ service }}</li>
          </ul>
          <div class="mt-6 flex flex-wrap gap-3">
            <a
              :href="studioContent.bookingUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-3 rounded bg-brand-accent text-white"
            >
              Записаться в Telegram
            </a>
            <CopyButton
              :value="studioContent.normalizedPhone"
              class="px-5 py-3 rounded border border-white/15 hover:bg-white/5"
            >
              Скопировать телефон: {{ studioContent.phone }}
            </CopyButton>
          </div>
        </div>
        <div class="grid gap-6">
          <div class="mt-6 glass rounded-2xl p-6">
            <div class="font-semibold mb-3">Контакты</div>
            <ul class="text-sm text-brand-muted space-y-2">
              <li v-for="item in studioContent.contacts" :key="`${item.label}-${item.content}`" class="flex items-start gap-2">
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
              <li v-for="link in studioContent.links" :key="link.href">
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
        <div v-if="isLoading" class="text-sm text-brand-muted">Загружаем правила студии...</div>
        <template v-else>
          <ul v-if="hasRules" class="text-sm text-brand-muted space-y-2 list-disc pl-5">
            <li v-for="rule in rulesList" :key="rule.id ?? rule.text" class="space-y-1">
              <span>{{ rule.text }}</span>
              <CopyButton
                v-if="rule.copy"
                :value="rule.copy"
                class="inline-flex items-center gap-1 underline-offset-2 hover:text-brand-accent"
              >
                {{ studioContent.phone }}
              </CopyButton>
            </li>
          </ul>
          <p v-else class="text-sm text-brand-muted">Правила пока не опубликованы.</p>
        </template>
        <div v-if="errorMessage" class="mt-4 text-sm text-red-300">{{ errorMessage }}</div>
      </div>
    </section>
  </div>
</template>
