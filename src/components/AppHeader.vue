<script setup>
import { computed, inject, ref } from 'vue';

import { assetUrl } from '@/lib/assets';
import { staticContent } from '@/lib/static-content';

import LocaleFlag from './LocaleFlag.vue';

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
            <LocaleFlag :code="locale.code" aria-hidden="true" />
          </a>
        </div>
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          class="transition-colors"
          :class="
            activeRouteName === link.name
              ? 'text-white font-semibold hover:text-white'
              : 'text-white font-normal hover:text-brand-accent'
          "
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
            <LocaleFlag :code="locale.code" aria-hidden="true" />
          </a>
        </div>
        <a
          v-for="link in navLinks"
          :key="`mobile-${link.name}`"
          :href="link.href"
          class="py-2 transition-colors"
          :class="
            activeRouteName === link.name
              ? 'text-white font-semibold hover:text-white'
              : 'text-white font-normal hover:text-brand-accent'
          "
          @click.prevent="handleNavigate(link.name)"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </header>
</template>
