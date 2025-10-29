export const staticContent = {
  main: {
    header: {
      navLinks: [
        { name: 'about', labelKey: 'navigation.about' },
        { name: 'pricing', labelKey: 'navigation.pricing' },
        { name: 'equipment', labelKey: 'navigation.equipment' },
        { name: 'teachers', labelKey: 'navigation.teachers' },
      ],
    },
    footer: {
      brandName: {
        ru: 'Kropka Music Studio',
        en: 'Kropka Music Studio',
        ka: 'Kropka Music Studio',
      },
      copyright: {
        ru: '© Kropka Studio, Батуми',
        en: '© Kropka Studio, Batumi',
        ka: '© Kropka Studio, ბათუმი',
      },
      credit: {
        ru: 'Разработка — Anatolii Taraskin',
        en: 'Developed by Anatolii Taraskin',
        ka: 'შექმნილია Anatolii Taraskin-ის მიერ',
      },
      map: {
        embedUrl: 'https://www.google.com/maps?q=Kropka+Music+Studio+Batumi&output=embed',
        searchUrl: 'https://www.google.com/maps/search/?api=1&query=Kropka+Music+Studio,+Batumi,+Georgia',
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kropka+Music+Studio,+Batumi,+Georgia',
      },
    },
  },
  about: {
    heroImage: 'main_page/main_img.png',
    scheduleUrl:
      'https://calendar.google.com/calendar/u/0/embed?src=7qh5sinn2kdu1osa4r45icihck@group.calendar.google.com&ctz=Asia/Tbilisi&pli=1',
    fallback: {
      name: {
        ru: 'Kropka Music Studio',
        en: 'Kropka Music Studio',
        ka: 'Kropka Music Studio',
      },
      tagline: {
        ru: 'Репетиционная студия в Батуми',
        en: 'Rehearsal studio in Batumi',
        ka: 'ბათუმში მდებარე სარეპეტიციო სტუდია',
      },
      bookingUrl: 'https://t.me/kropka_batumi_admin',
      features: [
        {
          icon: '🎙️',
          text: {
            ru: 'Репетиционная студия в Батуми',
            en: 'Rehearsal studio in Batumi',
            ka: 'სარეპეტიციო სტუდია ბათუმში',
          },
        },
        {
          icon: '🔊',
          text: {
            ru: 'У нас можно громко',
            en: 'You can play loud here',
            ka: 'ჩვენთან ხმამაღლა შეგიძლიათ დაკვრა',
          },
        },
        {
          icon: '❄️',
          text: {
            ru: 'Кондиционер работает — окна во время занятий не открываем',
            en: 'The AC is on — we keep the windows closed during sessions',
            ka: 'კონდიციონერი მუშაობს — გაკვეთილებისას ფანჯრებს არ ვაღებთ',
          },
        },
      ],
      services: [
        {
          ru: 'Репетиции групп и сольных артистов',
          en: 'Rehearsals for bands and solo artists',
          ka: 'რეპეტიციები ჯგუფებისა და სოლო არტისტებისთვის',
        },
        {
          ru: 'Запись и продакшн',
          en: 'Recording and production',
          ka: 'ჩაწერა და პროდაქშენი',
        },
        {
          ru: 'Уроки музыки',
          en: 'Music lessons',
          ka: 'სంగীতის გაკვეთილები',
        },
        {
          ru: 'Чистота и аккуратность: вещи после себя возвращаем на место',
          en: 'Keep it tidy: put everything back after your session',
          ka: 'სისუფთავე და მოწესრიგება: სესიის შემდეგ ნივთები ადგილას დავაბრუნოთ',
        },
      ],
    },
  },
  equipment: {
    fallbackImage: 'main_page/main_img.png',
  },
  apiTest: {
    endpoints: [
      {
        path: '/api/v1/studio',
        labelKey: 'apiTest.endpoints.studio.label',
        descriptionKey: 'apiTest.endpoints.studio.description',
      },
      {
        path: '/api/v1/prices',
        labelKey: 'apiTest.endpoints.prices.label',
        descriptionKey: 'apiTest.endpoints.prices.description',
      },
      {
        path: '/api/v1/equipment',
        labelKey: 'apiTest.endpoints.equipment.label',
        descriptionKey: 'apiTest.endpoints.equipment.description',
      },
      {
        path: '/api/v1/teachers',
        labelKey: 'apiTest.endpoints.teachers.label',
        descriptionKey: 'apiTest.endpoints.teachers.description',
      },
      {
        path: '/api/v1/rules',
        labelKey: 'apiTest.endpoints.rules.label',
        descriptionKey: 'apiTest.endpoints.rules.description',
      },
    ],
  },
};

export default staticContent;
