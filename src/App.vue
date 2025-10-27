<script setup>
import { computed, onBeforeUnmount, onMounted, provide, ref, watchEffect } from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import AboutView from '@/views/AboutView.vue';
import PricingView from '@/views/PricingView.vue';
import EquipmentView from '@/views/EquipmentView.vue';
import TeachersView from '@/views/TeachersView.vue';
import ApiTestView from '@/views/ApiTestView.vue';
import { DEFAULT_LOCALE_CODE, LOCALE_MAP, LOCALES, getLocale, translate } from '@/lib/i18n';

const routeDefinitions = [
  { name: 'about', segments: [], component: AboutView, titleKey: 'routes.about.title' },
  { name: 'pricing', segments: ['pricing'], component: PricingView, titleKey: 'routes.pricing.title' },
  { name: 'equipment', segments: ['equipment'], component: EquipmentView, titleKey: 'routes.equipment.title' },
  { name: 'teachers', segments: ['teachers'], component: TeachersView, titleKey: 'routes.teachers.title' },
  { name: 'api-test', segments: ['api', 'test'], component: ApiTestView, titleKey: 'routes.apiTest.title' },
];

const fallbackRoute = routeDefinitions[0];
const routeByName = new Map(routeDefinitions.map((route) => [route.name, route]));
const routeBySegments = new Map(routeDefinitions.map((route) => [route.segments.join('/'), route]));

const normalizeSegments = (pathname) => {
  const normalized = pathname.replace(/\/+/g, '/');
  const trimmed = normalized !== '/' && normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
  return trimmed.split('/').filter(Boolean);
};

const buildPath = (localeCode, segments) => {
  const locale = getLocale(localeCode);
  const parts = [];

  if (locale.pathSegment) {
    parts.push(locale.pathSegment);
  }

  if (Array.isArray(segments) && segments.length) {
    parts.push(...segments);
  }

  return parts.length ? `/${parts.join('/')}` : '/';
};

const resolveLocation = (pathname) => {
  const segments = normalizeSegments(pathname);
  const normalizedPath = segments.length ? `/${segments.join('/')}` : '/';

  let localeCode = DEFAULT_LOCALE_CODE;
  let routeSegments = segments.slice();

  if (segments.length) {
    const [first] = segments;
    const lower = first.toLowerCase();

    if (lower === DEFAULT_LOCALE_CODE) {
      routeSegments = segments.slice(1);
    } else if (LOCALE_MAP[lower] && LOCALE_MAP[lower].code !== DEFAULT_LOCALE_CODE) {
      localeCode = LOCALE_MAP[lower].code;
      routeSegments = segments.slice(1);
    }
  }

  const routeKey = routeSegments.join('/');
  const route = routeBySegments.get(routeKey) ?? fallbackRoute;
  const canonicalPath = buildPath(localeCode, route.segments);
  const needsRedirect = canonicalPath !== normalizedPath;

  return { localeCode, route, canonicalPath, needsRedirect };
};

const initialState = resolveLocation(window.location.pathname);

const currentLocaleCode = ref(initialState.localeCode);
const currentRoute = ref(initialState.route);

const syncUrlWithState = ({ replace = false } = {}) => {
  const targetPath = buildPath(currentLocaleCode.value, currentRoute.value.segments);

  if (targetPath !== window.location.pathname) {
    const method = replace ? 'replaceState' : 'pushState';
    window.history[method]({}, '', targetPath);
  }
};

if (initialState.needsRedirect) {
  window.history.replaceState({}, '', initialState.canonicalPath);
}

const navigate = (targetName) => {
  const route = routeByName.get(targetName) ?? fallbackRoute;
  currentRoute.value = route;
  syncUrlWithState();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const setLocale = (code) => {
  const locale = LOCALE_MAP[code];
  if (!locale) {
    return;
  }

  if (currentLocaleCode.value === locale.code) {
    return;
  }

  currentLocaleCode.value = locale.code;
  syncUrlWithState();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handlePopState = () => {
  const nextState = resolveLocation(window.location.pathname);
  currentLocaleCode.value = nextState.localeCode;
  currentRoute.value = nextState.route;

  if (nextState.needsRedirect) {
    syncUrlWithState({ replace: true });
  }
};

onMounted(() => {
  window.addEventListener('popstate', handlePopState);
});

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopState);
});

const currentLocale = computed(() => getLocale(currentLocaleCode.value));
const currentComponent = computed(() => currentRoute.value.component);
const currentRouteName = computed(() => currentRoute.value.name);

const translateCurrent = (key, values) => translate(currentLocaleCode.value, key, values);
const localizeRoute = (name, localeCode = currentLocaleCode.value) => {
  const route = routeByName.get(name) ?? fallbackRoute;
  return buildPath(localeCode, route.segments);
};

watchEffect(() => {
  document.title = translateCurrent(currentRoute.value.titleKey);
  document.documentElement.setAttribute('lang', currentLocale.value.code);
  document.documentElement.setAttribute('dir', 'ltr');
});

provide('navigate', navigate);
provide('currentRouteName', currentRouteName);
provide('currentLocale', currentLocale);
provide('availableLocales', LOCALES);
provide('setLocale', setLocale);
provide('t', translateCurrent);
provide('localizeRoute', localizeRoute);
</script>

<template>
  <div class="min-h-screen flex flex-col bg-brand-bg text-brand-text font-brand">
    <AppHeader />
    <main class="flex-1">
      <component :is="currentComponent" />
    </main>
    <AppFooter />
  </div>
</template>
