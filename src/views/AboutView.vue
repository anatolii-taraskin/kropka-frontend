<script setup>
import { computed, inject, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import CopyButton from '@/components/CopyButton.vue';
import { assetUrl } from '@/lib/assets';
import { staticContent } from '@/lib/static-content';
import { DEFAULT_LOCALE_CODE } from '@/lib/i18n';
import { useApiLanguage } from '@/lib/use-api-language';
import { useRulesStore, useStudioStore } from '@/stores';

const navigate = inject('navigate', () => {});
const t = inject('t', (key) => key);
const currentLocale = inject('currentLocale');
const localizeRoute = inject('localizeRoute', () => '/');

const heroImageUrl = assetUrl(staticContent.about.heroImage);

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

const toStringValue = (value) => (value == null ? '' : `${value}`.trim());

const toList = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map(toStringValue).filter(Boolean);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map(toStringValue).filter(Boolean);
      }
    } catch (error) {
      // ignore invalid JSON strings
    }

    return trimmed
      .split(/\r?\n|[•\-–\u2022,;]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const getValuesByPrefix = (source = {}, prefix) =>
  Object.entries(source)
    .filter(([key]) => key.startsWith(`${prefix}_`))
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([, value]) => toStringValue(value))
    .filter(Boolean);

const normalizePhoneNumber = (value) => {
  const clean = toStringValue(value).replace(/[^+\d]/g, '');
  return clean.startsWith('+') ? clean : clean;
};

const buildFeatureList = (source = {}) => {
  const raw = [];

  const appendValues = (values) => {
    if (!values) {
      return;
    }

    if (Array.isArray(values)) {
      values.forEach((item) => raw.push(item));
      return;
    }

    toList(values).forEach((item) => raw.push(item));
  };

  appendValues(source.features);
  appendValues(source.features_list);
  appendValues(getValuesByPrefix(source, 'feature'));

  const features = [];
  const seen = new Set();

  raw.forEach((item) => {
    if (item && typeof item === 'object') {
      const text = toStringValue(item.text);
      if (!text || seen.has(text)) {
        return;
      }

      seen.add(text);
      features.push({
        icon: toStringValue(item.icon) || '•',
        text,
      });
      return;
    }

    const text = toStringValue(item);
    if (!text || seen.has(text)) {
      return;
    }

    seen.add(text);
    features.push({ icon: '•', text });
  });

  return features;
};

const buildServices = (source = {}) => {
  const raw = [
    ...toList(source.services),
    ...toList(source.services_list),
    ...getValuesByPrefix(source, 'service'),
  ];

  const seen = new Set();
  return raw.filter((item) => {
    if (seen.has(item)) {
      return false;
    }

    seen.add(item);
    return true;
  });
};

const buildContacts = (source = {}, normalizedPhone = '') => {
  const contacts = [];
  const seen = new Set();

  const pushContact = (contact) => {
    const content = toStringValue(contact?.content);
    if (!content) {
      return;
    }

    const label = toStringValue(contact?.label) || '•';
    const href = toStringValue(contact?.href);
    const scrollToId = toStringValue(contact?.scrollToId);

    const key = `${label}-${content}-${href}-${scrollToId}`;
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    contacts.push({
      label,
      content,
      href: href || undefined,
      isCopy: Boolean(contact?.isCopy),
      value: contact?.value ?? undefined,
      scrollToId: scrollToId || undefined,
    });
  };

  const phoneDisplay = toStringValue(source.phone);
  if (phoneDisplay) {
    pushContact({
      label: '📞',
      content: phoneDisplay,
      isCopy: true,
      value: normalizedPhone || phoneDisplay,
    });
  }

  const email = toStringValue(source.email);
  if (email) {
    pushContact({
      label: '✉️',
      content: email,
      href: `mailto:${email}`,
    });
  }

  const address = toStringValue(source.address);
  if (address) {
    pushContact({
      label: '📍',
      content: address,
      scrollToId: 'map',
    });
  }

  toList(source.contacts).forEach((content) => {
    pushContact({ label: '•', content });
  });

  return contacts;
};

const buildLinks = (source = {}) => {
  const known = [
    source.instagram_url
      ? { label: t('about.links.instagram'), href: toStringValue(source.instagram_url) }
      : null,
    source.facebook_url
      ? { label: t('about.links.facebook'), href: toStringValue(source.facebook_url) }
      : null,
    source.telegram_channel_url
      ? { label: t('about.links.telegramChannel'), href: toStringValue(source.telegram_channel_url) }
      : null,
    source.telegram_url ? { label: t('about.links.telegram'), href: toStringValue(source.telegram_url) } : null,
    source.telegram_admin_url
      ? { label: t('about.links.telegramAdmin'), href: toStringValue(source.telegram_admin_url) }
      : null,
    source.website_url ? { label: t('about.links.website'), href: toStringValue(source.website_url) } : null,
  ];

  const additional = toList(source.links).map((entry) => {
    const href = toStringValue(entry);
    if (!href) {
      return null;
    }

    return { label: href, href };
  });

  const links = [];
  const seen = new Set();

  [...known, ...additional].forEach((link) => {
    if (!link) {
      return;
    }

    const href = toStringValue(link.href);
    if (!href || seen.has(href)) {
      return;
    }

    seen.add(href);
    links.push({
      label: toStringValue(link.label) || href,
      href,
    });
  });

  return links;
};

const mapStudioData = (data = {}, fallback = {}) => {
  const name = toStringValue(data.name) || toStringValue(fallback.name);
  const tagline = toStringValue(data.tagline) || toStringValue(fallback.tagline);
  const address = toStringValue(data.address);
  const phone = toStringValue(data.phone);
  const email = toStringValue(data.email) || toStringValue(fallback.email);
  const normalizedPhone = normalizePhoneNumber(phone);

  return {
    name,
    tagline,
    address,
    phone,
    normalizedPhone,
    features: (() => {
      const primary = buildFeatureList(data);
      if (primary.length) {
        return primary;
      }

      return buildFeatureList(fallback);
    })(),
    services: (() => {
      const primary = buildServices(data);
      if (primary.length) {
        return primary;
      }

      return buildServices(fallback);
    })(),
    contacts: (() => {
      const primary = buildContacts(
        {
          phone,
          email,
          address,
          contacts: data.contacts,
        },
        normalizedPhone,
      );

      if (primary.length) {
        return primary;
      }

      return buildContacts(
        {
          phone,
          email,
          address,
          contacts: fallback.contacts,
        },
        normalizedPhone,
      );
    })(),
    links: (() => {
      const primary = buildLinks(data);
      if (primary.length) {
        return primary;
      }

      return buildLinks(fallback);
    })(),
    bookingUrl: toStringValue(data.booking_url) || toStringValue(fallback.booking_url),
  };
};

const currentLocaleCode = computed(() => currentLocale?.value?.code ?? DEFAULT_LOCALE_CODE);

const resolveFallbackValue = (value) => {
  if (value == null) {
    return '';
  }

  if (typeof value === 'string') {
    return toStringValue(value);
  }

  if (typeof value === 'object') {
    const localeCode = currentLocaleCode.value;
    if (value[localeCode] != null) {
      return toStringValue(value[localeCode]);
    }

    if (value[DEFAULT_LOCALE_CODE] != null) {
      return toStringValue(value[DEFAULT_LOCALE_CODE]);
    }
  }

  return toStringValue(value);
};

const fallbackStudioRaw = computed(() => {
  const fallback = staticContent.about?.fallback ?? {};

  const features = (fallback.features ?? [])
    .map((item) => ({
      icon: toStringValue(item?.icon) || '•',
      text: resolveFallbackValue(item?.text),
    }))
    .filter((item) => item.text);

  const services = (fallback.services ?? [])
    .map((item) => resolveFallbackValue(item))
    .filter(Boolean);

  return {
    name: resolveFallbackValue(fallback.name),
    tagline: resolveFallbackValue(fallback.tagline),
    address: resolveFallbackValue(fallback.address),
    phone: resolveFallbackValue(fallback.phone),
    email: resolveFallbackValue(fallback.email),
    booking_url: resolveFallbackValue(fallback.bookingUrl),
    features,
    services,
    contacts: (fallback.contacts ?? []).map((item) => resolveFallbackValue(item)).filter(Boolean),
    links: (fallback.links ?? []).map((item) => resolveFallbackValue(item)).filter(Boolean),
  };
});

const studioContent = computed(() => mapStudioData(studioData.value ?? {}, fallbackStudioRaw.value));

const heroSubtitle = computed(() => {
  currentLocaleCode.value;
  const subtitlePrefix = toStringValue(t('about.hero.subtitlePrefix'));
  const parts = [subtitlePrefix, studioContent.value.address, studioContent.value.phone]
    .map((part) => toStringValue(part))
    .filter(Boolean);

  return parts.join(' · ');
});

const scheduleUrl = staticContent.about.scheduleUrl;

const rulesList = computed(() =>
  rulesItems.value
    .slice()
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map((rule) => ({
      id: rule.id,
      text: rule.text,
      copy: rule.property?.includes('phone') ? studioContent.value.normalizedPhone : null,
    })),
);

const hasRules = computed(() => rulesList.value.length > 0);

const errorMessage = computed(() => studioError.value?.message ?? rulesError.value?.message ?? '');

const isLoading = computed(() => studioLoading.value || rulesLoading.value);

const apiLanguage = useApiLanguage();
const lastStudioLang = ref('');
const lastRulesLang = ref('');

const fetchStudioForLang = async (lang) => {
  if (!lang) {
    return;
  }

  if (lastStudioLang.value === lang && studioData.value) {
    return;
  }

  try {
    await studioStore.fetchStudio({ lang });
    lastStudioLang.value = lang;
  } catch (fetchError) {
    console.error('Failed to load studio info from the API', fetchError);
    if (!studioData.value) {
      lastStudioLang.value = '';
    }
  }
};

const fetchRulesForLang = async (lang) => {
  if (!lang) {
    return;
  }

  if (lastRulesLang.value === lang && rulesItems.value.length) {
    return;
  }

  try {
    await rulesStore.fetchRules({ lang });
    lastRulesLang.value = lang;
  } catch (fetchError) {
    console.error('Failed to load studio rules from the API', fetchError);
    if (!rulesItems.value.length) {
      lastRulesLang.value = '';
    }
  }
};

watch(
  apiLanguage,
  (lang) => {
    fetchStudioForLang(lang);
    fetchRulesForLang(lang);
  },
  { immediate: true },
);

const handleNavigate = (name) => {
  navigate(name);
};

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const openScheduleAndInfo = () => {
  if (typeof window !== 'undefined') {
    window.open(scheduleUrl, '_blank', 'noopener,noreferrer');
  }

  scrollToSection('info');
};
</script>

<template>
  <div>
    <section class="relative pt-8 md:pt-12">
      <div class="mx-auto max-w-7xl px-4 grid gap-10 lg:grid-cols-2 items-center lg:h-80">
        <div class="flex flex-col justify-center">
          <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">{{ studioContent.name }}</h1>
          <p v-if="heroSubtitle" class="mt-4 text-brand-muted">{{ heroSubtitle }}</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a
              :href="localizeRoute('pricing')"
              class="px-5 py-3 rounded bg-brand-accent text-white"
              @click.prevent="handleNavigate('pricing')"
            >
              {{ t('about.hero.pricingCta') }}
            </a>
            <a
              href="#info"
              class="px-5 py-3 rounded border border-white/15 hover:bg-white/5"
              @click.prevent="openScheduleAndInfo"
            >
              {{ t('about.hero.scheduleCta') }}
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
          <h2 class="text-2xl font-bold mb-4">{{ t('about.title') }}</h2>
          <div v-if="studioContent.features.length" class="text-brand-muted space-y-3">
            <div v-for="feature in studioContent.features" :key="feature.text" class="flex items-start gap-2">
              <span class="text-lg">{{ feature.icon }}</span>
              <span>{{ feature.text }}</span>
            </div>
          </div>
          <p v-else-if="!studioLoading" class="text-sm text-brand-muted">{{ t('about.noInfo') }}</p>
          <ul v-if="studioContent.services.length" class="mt-5 space-y-2 text-sm text-brand-muted list-disc list-inside">
            <li v-for="service in studioContent.services" :key="service">{{ service }}</li>
          </ul>
          <div v-if="studioContent.bookingUrl || studioContent.phone" class="mt-6 flex flex-wrap gap-3">
            <a
              v-if="studioContent.bookingUrl"
              :href="studioContent.bookingUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-3 rounded bg-brand-accent text-white"
            >
              {{ t('about.bookingCta') }}
            </a>
            <CopyButton
              v-if="studioContent.phone"
              :value="studioContent.normalizedPhone || studioContent.phone"
              class="px-5 py-3 rounded border border-white/15 hover:bg-white/5"
            >
              {{ t('about.copyPhone', { phone: studioContent.phone }) }}
            </CopyButton>
          </div>
        </div>
        <div class="grid gap-6">
          <div class="mt-6 glass rounded-2xl p-6">
            <div class="font-semibold mb-3">{{ t('about.contactsTitle') }}</div>
            <ul v-if="studioContent.contacts.length" class="text-sm text-brand-muted space-y-2">
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
                <template v-else-if="item.scrollToId">
                  <button
                    type="button"
                    class="hover:text-brand-accent underline-offset-2 text-left"
                    @click="scrollToSection(item.scrollToId)"
                  >
                    {{ item.content }}
                  </button>
                </template>
                <template v-else>
                  <span>{{ item.content }}</span>
                </template>
              </li>
            </ul>
            <p v-else-if="!studioLoading" class="text-sm text-brand-muted">{{ t('about.contactsEmpty') }}</p>
          </div>
          <div class="glass rounded-2xl p-6">
            <div class="font-semibold mb-3">{{ t('about.linksTitle') }}</div>
            <ul v-if="studioContent.links.length" class="text-sm text-brand-muted space-y-2">
              <li v-for="link in studioContent.links" :key="link.href">
                <a :href="link.href" target="_blank" rel="noopener noreferrer" class="hover:text-brand-accent">
                  {{ link.label }}
                </a>
              </li>
            </ul>
            <p v-else-if="!studioLoading" class="text-sm text-brand-muted">{{ t('about.linksEmpty') }}</p>
          </div>
        </div>
      </div>
      <div class="glass rounded-2xl p-6 mt-10">
        <div class="font-semibold mb-3">{{ t('about.rulesTitle') }}</div>
        <div v-if="isLoading" class="text-sm text-brand-muted">{{ t('about.rulesLoading') }}</div>
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
          <p v-else class="text-sm text-brand-muted">{{ t('about.rulesEmpty') }}</p>
        </template>
        <div v-if="errorMessage" class="mt-4 text-sm text-red-300">{{ errorMessage }}</div>
      </div>
    </section>
  </div>
</template>
