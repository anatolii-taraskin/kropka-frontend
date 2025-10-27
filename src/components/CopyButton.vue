<script setup>
import { computed, inject, onBeforeUnmount, ref } from 'vue';

const t = inject('t', (key, values) => {
  if (key === 'copyButton.copied') {
    return `Copied: ${values?.value ?? ''}`;
  }

  if (key === 'copyButton.failed') {
    return 'Copy failed';
  }

  return key;
});

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  formatPhone: {
    type: Boolean,
    default: true,
  },
});

const toastVisible = ref(false);
const toastMessage = ref('');
let hideTimeout;

const formattedValue = computed(() => {
  if (!props.formatPhone) {
    return props.value;
  }

  const match = props.value.replace(/\s+/g, '').match(/^\+?(\d)(\d{3})(\d{3})(\d{3})(\d{3})?$/);
  if (!match) {
    return props.value;
  }

  const [, a, b, c, d, e] = match;
  return e ? `+${a} ${b} ${c} ${d} ${e}` : `+${a} ${b} ${c} ${d}`;
});

const showToast = (message) => {
  toastMessage.value = message;
  toastVisible.value = true;
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    toastVisible.value = false;
  }, 1600);
};

const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.value);
    showToast(t('copyButton.copied', { value: formattedValue.value }));
  } catch (error) {
    console.error(error);
    showToast(t('copyButton.failed'));
  }
};

onBeforeUnmount(() => {
  clearTimeout(hideTimeout);
});
</script>

<template>
  <button type="button" v-bind="$attrs" @click="copy">
    <slot />
  </button>
  <Teleport to="body">
    <transition name="toast-fade">
      <div
        v-if="toastVisible"
        class="fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-black/80 text-white text-sm shadow-lg"
      >
        {{ toastMessage }}
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.35s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
}
</style>
