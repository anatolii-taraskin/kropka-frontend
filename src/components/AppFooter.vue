<script setup>
import { inject } from 'vue';

const t = inject('t', (key) => key);
</script>

<template>
  <footer class="border-t border-white/10 mt-12">
    <div class="mx-auto max-w-7xl px-4 py-10 grid lg:grid-cols-3 gap-6 items-start">
      <div id="map" class="lg:col-span-2">
        <div class="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-md">
          <iframe
            class="w-full h-64 md:h-72 lg:h-80"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Kropka+Music+Studio+Batumi&output=embed"
            :title="t('footer.mapTitle')"
          ></iframe>
        </div>
      </div>
      <div class="space-y-2">
        <div class="text-sm font-semibold">Kropka Music Studio</div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Kropka+Music+Studio,+Batumi,+Georgia"
          target="_blank"
          rel="noopener noreferrer"
          class="text-brand-muted underline-offset-2 hover:text-brand-accent"
        >
          {{ t('footer.openInMaps') }}
        </a>
        <div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Kropka+Music+Studio,+Batumi,+Georgia"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-brand-muted underline-offset-2 hover:text-brand-accent"
          >
            {{ t('footer.getDirections') }}
          </a>
        </div>
      </div>
    </div>
    <div class="mx-auto max-w-7xl px-4 pb-8 text-sm text-brand-muted">
      © Kropka Studio, Batumi
    </div>
  </footer>
</template>
