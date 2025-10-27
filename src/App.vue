<script setup>
import { computed, onBeforeUnmount, onMounted, provide, ref, watchEffect } from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import AboutView from '@/views/AboutView.vue';
import PricingView from '@/views/PricingView.vue';
import EquipmentView from '@/views/EquipmentView.vue';
import TeachersView from '@/views/TeachersView.vue';
import ApiTestView from '@/views/ApiTestView.vue';

const routes = {
  '/': { path: '/', name: 'about', component: AboutView, title: 'О нас — Kropka Studio' },
  '/pricing': { path: '/pricing', name: 'pricing', component: PricingView, title: 'Цены — Kropka Studio' },
  '/equipment': {
    path: '/equipment',
    name: 'equipment',
    component: EquipmentView,
    title: 'Оборудование — Kropka Studio',
  },
  '/teachers': {
    path: '/teachers',
    name: 'teachers',
    component: TeachersView,
    title: 'Преподаватели — Kropka Studio',
  },
  '/api/test': { path: '/api/test', name: 'api-test', component: ApiTestView, title: 'API тесты — Kropka Studio' },
};

const fallbackRoute = routes['/'] ?? Object.values(routes)[0];
const resolveRoute = (path) => routes[path] ?? fallbackRoute;

const currentRoute = ref(resolveRoute(window.location.pathname));

if (currentRoute.value.path !== window.location.pathname) {
  window.history.replaceState({}, '', currentRoute.value.path);
}

const setRoute = (route) => {
  if (route.path === currentRoute.value.path) {
    return;
  }

  currentRoute.value = route;
  window.history.pushState({}, '', route.path);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const navigate = (path) => {
  setRoute(resolveRoute(path));
};

const handlePopState = () => {
  currentRoute.value = resolveRoute(window.location.pathname);
};

onMounted(() => {
  window.addEventListener('popstate', handlePopState);
});

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopState);
});

watchEffect(() => {
  if (currentRoute.value?.title) {
    document.title = currentRoute.value.title;
  }
});

const currentComponent = computed(() => currentRoute.value.component);
const currentRouteName = computed(() => currentRoute.value.name);

provide('navigate', navigate);
provide('currentRouteName', currentRouteName);
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
