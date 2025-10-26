<script setup>
import { computed, onBeforeUnmount, onMounted, provide, ref } from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import AboutView from '@/views/AboutView.vue';
import PricingView from '@/views/PricingView.vue';
import EquipmentView from '@/views/EquipmentView.vue';
import TeachersView from '@/views/TeachersView.vue';

const routeConfig = {
  '/': { name: 'about', component: AboutView, title: 'О нас — Kropka Studio' },
  '/pricing': { name: 'pricing', component: PricingView, title: 'Цены — Kropka Studio' },
  '/equipment': { name: 'equipment', component: EquipmentView, title: 'Оборудование — Kropka Studio' },
  '/teachers': { name: 'teachers', component: TeachersView, title: 'Преподаватели — Kropka Studio' },
};

const fallbackPath = '/';

const resolvePath = (path) => (routeConfig[path] ? path : fallbackPath);

const currentPath = ref(resolvePath(window.location.pathname));

const updateTitle = () => {
  const route = routeConfig[currentPath.value];
  if (route?.title) {
    document.title = route.title;
  }
};

if (currentPath.value !== window.location.pathname) {
  window.history.replaceState({}, '', currentPath.value);
}

const navigate = (path) => {
  const target = resolvePath(path);
  if (target === currentPath.value) {
    return;
  }
  currentPath.value = target;
  window.history.pushState({}, '', target);
  updateTitle();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handlePopState = () => {
  currentPath.value = resolvePath(window.location.pathname);
  updateTitle();
};

onMounted(() => {
  window.addEventListener('popstate', handlePopState);
  updateTitle();
});

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopState);
});

const currentComponent = computed(() => routeConfig[currentPath.value].component);
const currentRouteName = computed(() => routeConfig[currentPath.value].name);

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
