<script setup>
import { computed, inject } from 'vue';
import { storeToRefs } from 'pinia';

import CopyButton from '@/components/CopyButton.vue';
import { useCachedResourceLoader } from '@/composables/useCachedResourceLoader';
import { assetUrl } from '@/lib/assets';
import { staticContent } from '@/lib/static-content';
import { DEFAULT_LOCALE_CODE } from '@/lib/i18n';
import { useApiLanguage } from '@/lib/use-api-language';
import { useRulesStore, useStudioStore } from '@/stores';

import { buildFallbackStudio, mapStudioData, toStringValue } from '@/lib/about-mappers';

const navigate = inject('navigate', () => {});
const t = inject('t', (key) => key);
const currentLocale = inject('currentLocale');
const localizeRoute = inject('localizeRoute', () => '/');

const translateLinkLabel = (key) => {
  const raw = t(key);
  return typeof raw === 'string' ? raw : toStringValue(raw);
};

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

const currentLocaleCode = computed(() => currentLocale?.value?.code ?? DEFAULT_LOCALE_CODE);
const fallbackStudioRaw = computed(() =>
  buildFallbackStudio(staticContent.about?.fallback ?? {}, {
    localeCode: currentLocaleCode.value,
    defaultLocaleCode: DEFAULT_LOCALE_CODE,
  }),
);

const studioContent = computed(() =>
  mapStudioData(studioData.value ?? {}, fallbackStudioRaw.value, {
    translate: translateLinkLabel,
  }),
);

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

useCachedResourceLoader({
  apiLanguage,
  fetcher: (lang) => studioStore.fetchStudio({ lang }),
  hasData: () => Boolean(studioData.value),
  onError: (fetchError) => {
    console.error('Failed to load studio info from the API', fetchError);
  },
});

useCachedResourceLoader({
  apiLanguage,
  fetcher: (lang) => rulesStore.fetchRules({ lang }),
  hasData: () => rulesItems.value.length > 0,
  onError: (fetchError) => {
    console.error('Failed to load studio rules from the API', fetchError);
  },
});

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
            <div v-for="feature in studioContent.features" :key="feature.text" class="flex items-start gap-2 !mt-[4px]">
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
