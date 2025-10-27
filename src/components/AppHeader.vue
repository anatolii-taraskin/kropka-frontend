<script setup>
import { computed, inject, ref } from 'vue';

import { assetUrl } from '@/lib/assets';
import { staticContent } from '@/lib/static-content';

const navigate = inject('navigate', () => {});
const currentRouteName = inject('currentRouteName');
const t = inject('t', (key) => key);
const availableLocales = inject('availableLocales', []);
const setLocale = inject('setLocale', () => {});
const currentLocale = inject('currentLocale');
const localizeRoute = inject('localizeRoute', () => '/');

const mobileOpen = ref(false);

const logoSrc = assetUrl('icons/logo.png');

const navConfig = staticContent.main.header?.navLinks ?? [];

const activeRouteName = computed(() => currentRouteName?.value ?? 'about');

const navLinks = computed(() =>
  navConfig.map((link) => ({
    ...link,
    label: t(link.labelKey),
    href: localizeRoute(link.name),
  })),
);

const localeLinks = computed(() =>
  availableLocales.map((locale) => ({
    code: locale.code,
    label: locale.label,
    href: localizeRoute(activeRouteName.value, locale.code),
    isActive: currentLocale?.value?.code === locale.code,
  })),
);

const closeMenu = () => {
  mobileOpen.value = false;
};

const handleNavigate = (name) => {
  navigate(name);
  closeMenu();
};

const handleLocaleChange = (code) => {
  setLocale(code);
  closeMenu();
};
</script>

<template>
  <header class="sticky top-0 z-20 backdrop-blur backdrop-card shadow-lg">
    <div class="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
      <a :href="localizeRoute('about')" class="flex items-center gap-3" @click.prevent="handleNavigate('about')">
        <img
          :src="logoSrc"
          alt="Kropka Studio"
          class="h-10 w-10 rounded-full ring-2 ring-white/15 object-cover"
        />
        <span class="text-xl font-bold tracking-wide">Kropka Studio</span>
      </a>
      <nav class="hidden md:flex items-center gap-6 text-sm">
        <div class="flex items-center gap-2 pr-3 mr-3 border-r border-white/10">
          <a
            v-for="locale in localeLinks"
            :key="locale.code"
            :href="locale.href"
            :hreflang="locale.code"
            :lang="locale.code"
            :aria-label="locale.label"
            class="inline-flex items-center justify-center w-7 h-7 rounded-full transition"
            :class="locale.isActive ? 'ring-2 ring-brand-accent' : 'hover:ring-2 hover:ring-blue/30'"
            @click.prevent="handleLocaleChange(locale.code)"
          >
            <svg
              v-if="locale.code === 'ru'"
              class="w-12 h-12"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="256" cy="256" fill="#f0f0f0" r="256" />
              <path
                d="m496.077 345.043c10.291-27.733 15.923-57.729 15.923-89.043s-5.633-61.31-15.923-89.043h-480.154c-10.29 27.733-15.923 57.729-15.923 89.043s5.633 61.31 15.923 89.043l240.077 22.261z"
                fill="#0052b4"
              />
              <path
                d="m256 512c110.071 0 203.906-69.472 240.077-166.957h-480.154c36.171 97.485 130.006 166.957 240.077 166.957z"
                fill="#d80027"
              />
            </svg>
            <svg
              v-else-if="locale.code === 'en'"
              class="w-12 h-12"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="256" cy="256" fill="#f0f0f0" r="256" />
              <g fill="#d80027">
                <path d="m244.87 256h267.13c0-23.106-3.08-45.49-8.819-66.783h-258.311z" />
                <path d="m244.87 122.435h229.556c-15.671-25.572-35.708-48.175-59.07-66.783h-170.486z" />
                <path d="m256 512c60.249 0 115.626-20.824 159.356-55.652h-318.712c43.73 34.828 99.107 55.652 159.356 55.652z" />
                <path d="m37.574 389.565h436.852c12.581-20.529 22.338-42.969 28.755-66.783h-494.362c6.417 23.814 16.174 46.254 28.755 66.783z" />
              </g>
              <path
                d="m118.584 39.978h23.329l-21.7 15.765 8.289 25.509-21.699-15.765-21.699 15.765 7.16-22.037c-19.106 15.915-35.852 34.561-49.652 55.337h7.475l-13.813 10.035c-2.152 3.59-4.216 7.237-6.194 10.938l6.596 20.301-12.306-8.941c-3.059 6.481-5.857 13.108-8.372 19.873l7.267 22.368h26.822l-21.7 15.765 8.289 25.509-21.699-15.765-12.998 9.444c-1.301 10.458-1.979 21.11-1.979 31.921h256c0-141.384 0-158.052 0-256-50.572 0-97.715 14.67-137.416 39.978zm9.918 190.422-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822l-21.7 15.765zm-8.289-100.083 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822zm100.115 100.083-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822l-21.7 15.765zm-8.289-100.083 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822zm0-74.574 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822z"
                fill="#0052b4"
              />
            </svg>
            <svg
              v-else
              class="w-12 h-12"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="256" cy="256" fill="#f0f0f0" r="256" />
              <g fill="#d80027">
                <path
                  d="m509.833 222.609h-220.44v-220.442c-10.931-1.423-22.075-2.167-33.392-2.167s-22.461.744-33.391 2.167v220.441h-220.442c-1.423 10.931-2.167 22.075-2.167 33.392 0 11.319.744 22.461 2.167 33.391h220.441v220.442c10.931 1.423 22.075 2.167 33.392 2.167s22.461-.743 33.391-2.167v-220.441h220.442c1.423-10.931 2.167-22.073 2.167-33.392 0-11.317-.744-22.461-2.167-33.391z"
                />
                <path d="m155.826 122.435v-33.392h-33.391v33.392h-33.392v33.391h33.392v33.391h33.391v-33.391h33.391v-33.391z" />
                <path d="m389.565 122.435v-33.392h-33.391v33.392h-33.391v33.391h33.391v33.391h33.391v-33.391h33.392v-33.391z" />
                <path d="m155.826 356.174v-33.391h-33.391v33.391h-33.392v33.391h33.392v33.392h33.391v-33.392h33.391v-33.391z" />
                <path d="m389.565 356.174v-33.391h-33.391v33.391h-33.391v33.391h33.391v33.392h33.391v-33.392h33.392v-33.391z" />
              </g>
            </svg>
          </a>
        </div>
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          class="hover:text-brand-accent"
          :class="{ 'text-brand-accent': activeRouteName === link.name }"
          @click.prevent="handleNavigate(link.name)"
        >
          {{ link.label }}
        </a>
      </nav>
      <button
        class="md:hidden p-2 rounded hover:bg-white/5"
        @click="mobileOpen = !mobileOpen"
        :aria-label="t('header.openMenu')"
      >
        <div class="w-6 h-0.5 bg-current mb-1"></div>
        <div class="w-6 h-0.5 bg-current mb-1"></div>
        <div class="w-6 h-0.5 bg-current"></div>
      </button>
    </div>
    <div v-if="mobileOpen" class="md:hidden border-t border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-3 grid gap-2 text-sm">
        <div class="flex items-center gap-2 pb-3 border-b border-white/10">
          <a
            v-for="locale in localeLinks"
            :key="`mobile-${locale.code}`"
            :href="locale.href"
            :lang="locale.code"
            :aria-label="locale.label"
            class="inline-flex items-center justify-center w-8 h-8 rounded-full transition"
            :class="locale.isActive ? 'ring-2 ring-brand-accent' : 'hover:ring-2 hover:ring-blue/30'"
            @click.prevent="handleLocaleChange(locale.code)"
          >
            <span class="text-xs font-semibold uppercase">{{ locale.code }}</span>
          </a>
        </div>
        <a
          v-for="link in navLinks"
          :key="`mobile-${link.name}`"
          :href="link.href"
          class="py-2"
          :class="{ 'text-brand-accent': activeRouteName === link.name }"
          @click.prevent="handleNavigate(link.name)"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </header>
</template>
