<script setup>
const asset = (relativePath) => `${import.meta.env.BASE_URL}assets/${relativePath}`;

const equipment = [
  {
    title: 'Bass combo “Fender Rumble 500”',
    image: asset('stuff/bass-combo-fender-rumble-500.jpg'),
    alt: 'Bass combo Fender Rumble 500',
  },
  {
    title: 'Guitar combo “Kustom Quad 65 DFX”',
    image: asset('stuff/guitar-combo-kustom-quad-65-dfx.jpg'),
    alt: 'Guitar combo Kustom Quad 65 DFX',
  },
  {
    title: 'Guitar combo “Marshall MG50FX”',
    image: asset('stuff/guitar-combo-marshall-mg50fx.jpg'),
    alt: 'Guitar combo Marshall MG50FX',
  },
  {
    title: 'Drum kit “Gretsch Energy”',
    image: asset('stuff/drum-kit-gretsch-energy.jpg'),
    alt: 'Drum kit Gretsch Energy',
  },
  {
    title: 'Drum kit “Yamaha”',
    image: asset('stuff/drum-kit-yamaha.jpg'),
    alt: 'Drum kit Yamaha',
  },
  {
    title: 'Mixer “Behringer Xenyx 1202FX”',
    image: asset('stuff/mixer-behringer-xenyx-1202fx.jpg'),
    alt: 'Mixer Behringer Xenyx 1202FX',
  },
  {
    title: 'Powered speaker “EV” 12” 1kW',
    image: asset('stuff/powered-speaker-ev-12-1kw.jpg'),
    alt: 'Powered speaker EV 12” 1kW',
  },
  {
    title: 'Microphones “Shure SM-58”',
    image: asset('stuff/microphones-shure-sm-58.jpg'),
    alt: 'Microphones Shure SM-58',
  },
  {
    title: 'Electro guitar “Ibanez”',
    image: asset('stuff/electro-guitar-ibanez.jpg'),
    alt: 'Electro guitar Ibanez',
  },
  {
    title: 'Bass guitar “Washburn”',
    image: asset('stuff/electro-guitar-ibanez.jpg'),
    alt: 'Bass guitar Washburn',
  },
];
</script>

<template>
  <section class="py-14">
    <div class="mx-auto max-w-7xl px-4">
      <h2 class="text-2xl font-bold mb-6">Оборудование</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="item in equipment" :key="item.title" class="glass rounded-2xl overflow-hidden">
          <div
            class="h-44 bg-cover bg-center"
            role="img"
            :aria-label="item.alt"
          :style="{ backgroundImage: `url('${item.image}')` }"
          ></div>
          <div class="p-6 font-semibold">{{ item.title }}</div>
        </article>
      </div>
    </div>
  </section>
</template>
